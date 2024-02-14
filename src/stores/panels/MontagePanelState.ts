import { makeAutoObservable } from 'mobx';
import PanelId from 'enums/PanelId';
import MontageType from 'enums/data/MontageType';
import PanelStore from './PanelStore';
import { getConfig, updateConfig } from '../../api/metzler/config';
import { ConfigType } from '../../types/configType';
import { ConfigResponse } from '../../types/apiResource';
import EventEmitter from 'eventemitter3';
import { isEqual } from 'lodash';
import updateRanks from '../../helpers/updateRanks';

export type MontagePanelEventsType = {
  setMailBoxesCount: (count: number) => void;
  setMontageType: (type: MontageType) => void;
  setIsZoomToAddon: (value: boolean) => void;
  setIsAddon: (isAddon: boolean) => void;
};

export default class MontagePanelState {
  public readonly panelId: PanelId = PanelId.MONTAGE;

  public readonly panelTitle: string = 'Anzahl, Ausrichtung & Montage';

  public montageType: MontageType = MontageType.EINBETONIEREN;

  public mailBoxesCount: number = 9;

  public isShowResetModal: boolean = false;

  public isRestored: boolean = false;

  private readonly _panelStore: PanelStore<MontagePanelState>;

  private readonly eventEmitter!: EventEmitter<MontagePanelEventsType>;

  constructor(panelStore: PanelStore<MontagePanelState>) {
    this.eventEmitter = new EventEmitter();
    this._panelStore = panelStore;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  public getStates() {
    return {
      isCompleted: this._panelStore.isCompleted,
      montageType: this.montageType,
      mailBoxesCount: this.mailBoxesCount,
    };
  }

  public setStates(state: MontagePanelState & PanelStore<MontagePanelState>) {
    if (!isEqual(this.montageType, state.montageType)) {
      this.setMontageType(state.montageType);
    }
    if (!isEqual(this.mailBoxesCount, state.mailBoxesCount)) {
      this.setMailBoxesCount(state.mailBoxesCount);
    }
    this._panelStore.setIsCompleted(state.isCompleted);
  }

  public initPanel(config: ConfigType): void {
    const { montage } = config;
    if (montage) {
      this.mailBoxesCount = montage.mailBoxes;
      this.montageType = montage.montageType;
    }
  }

  public setMontageType(type: MontageType): void {
    this.montageType = type;
    this.eventEmitter.emit('setMontageType', type);
  }

  public updatePanelConfig(configId: string, data: ConfigType): Promise<ConfigResponse> {
    return updateConfig(configId, {
      ...data,
      montage: {
        montageType: this.montageType,
        mailBoxes: this.mailBoxesCount,
      },
    });
  }

  public setIsRestored(isRestored: boolean): void {
    this.isRestored = isRestored;
  }

  public setIsShowResetModal(value: boolean): void {
    this.isShowResetModal = value;
  }

  public setRemixConfig(): void {
    const { panelsConfig } = this._panelStore.panelsStore;
    const { state: { setMailBoxesRanksCount } } = this._panelStore.panelsStore.zusatzmodulPanelStore;
    const { isHasAddonModule } = this._panelStore.panelsStore.zusatzmodulPanelStore.state;
    const { state: klingetableuPanelState } = this._panelStore.panelsStore.klingetableuPanelStore;
    if (panelsConfig.montage) {
      const { montageType, mailBoxes } = panelsConfig.montage;
      if (!panelsConfig[PanelId.KLINGETABLEU]) klingetableuPanelState.setKlingeltasterCount(mailBoxes);
      this.setMailBoxesCount(mailBoxes);
      this.setMontageType(montageType);

      updateRanks(
        mailBoxes,
        isHasAddonModule,
        setMailBoxesRanksCount,
      );
    }
  }

  public compareConfig(config: ConfigType): boolean {
    if (config.montage) {
      const { montage: state } = config;
      if (state) {
        if (state?.mailBoxes !== this.mailBoxesCount) return false;
        if (state?.montageType !== this.montageType) return false;
      }
    }
    return true;
  }

  public setMailBoxesCount(count: number): void {
    this.mailBoxesCount = count;
    this._panelStore.panelsStore.briefkastenPanelStore.state.setVisibleType(true);
    this.eventEmitter.emit('setMailBoxesCount', count);
  }

  public reset(): Promise<ConfigResponse> {
    const { configId } = this._panelStore.panelsStore;

    this.setMontageType(MontageType.EINBETONIEREN);
    this.setMailBoxesCount(1);

    return getConfig(configId);
  }

  public setIsAddon(): void {
    this.eventEmitter.emit('setIsAddon', false);
  }

  public subscribe<T extends keyof MontagePanelEventsType>(
    event: T,
    handler: MontagePanelEventsType[T],
  ): void {
    // TODO небольшой хак, нужно разобраться с типами
    this.eventEmitter.on(event, handler as (...args: any) => void);
  }
}
