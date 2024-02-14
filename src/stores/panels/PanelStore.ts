import PanelId from '../../enums/PanelId';
import { makeAutoObservable } from 'mobx';
import PanelsStore from 'stores/PanelsStore';
import MontagePanelState from './MontagePanelState';
import ZusatzmodulPanelState from './ZusatzmodulPanelState';
import ZusatzmodulErweiterunPanelState from './ZusatzmodulErweiterunPanelState';
import InnenstationPanelState from './InnenstationPanelState';
import KlingetableuPanelState from './KlingetableuPanelState';
import BriefkastenPanelState from './BriefkastenPanelState';
import TextleistePanelState from './TextleistePanelState';
import RFIDPanelState from './RFIDPanelState';
import LichttasterPanelState from './LichttasterPanelState';
import { ConfigResponse } from '../../types/apiResource';

// TODO: Подумать, как лучше типизировать состояние панели внутри стора
export type PanelStates = MontagePanelState
| ZusatzmodulPanelState
| ZusatzmodulErweiterunPanelState
| InnenstationPanelState
| KlingetableuPanelState
| BriefkastenPanelState
| RFIDPanelState
| LichttasterPanelState
| TextleistePanelState;

export type PanelStores = PanelStore<MontagePanelState>
| PanelStore<ZusatzmodulPanelState>
| PanelStore<ZusatzmodulErweiterunPanelState>
| PanelStore<BriefkastenPanelState>
| PanelStore<TextleistePanelState>
| PanelStore<InnenstationPanelState>
| PanelStore<LichttasterPanelState>
| PanelStore<KlingetableuPanelState>
| PanelStore<RFIDPanelState>;

export type AllStatesType = Record<string, any>;

export default class PanelStore<T extends PanelStates> {
  public isCompleted: boolean = false;

  private readonly _panelsStore: PanelsStore;

  private readonly _state: T;

  public nextPanel?: PanelStore<PanelStates> = undefined;

  constructor(initState: (store: PanelStore<T>) => T, panelStore: PanelsStore) {
    this._panelsStore = panelStore;
    this._state = initState(this);
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get isActive(): boolean {
    return this.state.panelId === this._panelsStore.activePanelId;
  }

  get state(): T {
    return this._state;
  }

  get panelsStore(): PanelsStore {
    return this._panelsStore;
  }

  public checkPanel(id: PanelId | null): boolean {
    if (id === this.state.panelId) {
      return true;
    }

    if (this.nextPanel && this.isCompleted) {
      return this.nextPanel.checkPanel(id);
    }

    return true;
  }

  public setNextPanel(panel: PanelStores): void {
    this.nextPanel = panel;
  }

  public setIsCompleted(value: boolean): void {
    this.isCompleted = value;

    if (value && this.nextPanel) {
      this.panelsStore.setActivePanelId(this.nextPanel.state.panelId);
    }
  }

  // todo: подумать как переделать слишком запутанно
  public reset(resetNext?: boolean, activePanel?: PanelStores): Promise<void> | undefined {
    if (activePanel) {
      activePanel.setIsCompleted(false);
      if (resetNext && activePanel.nextPanel) {
        return (activePanel.nextPanel.state.reset() as Promise<ConfigResponse>)
          .then(() => {
            // this.panelsStore.conf
            if (activePanel && activePanel.nextPanel) activePanel.nextPanel.setIsCompleted(false);
            if (!activePanel.nextPanel) return Promise.resolve();
            return this.reset(true, activePanel.nextPanel as any);
          });
      }
    }
  }
}
