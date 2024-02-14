import PanelId from 'enums/PanelId';
import { makeAutoObservable } from 'mobx';
import PanelStore from './PanelStore';
import { updateConfig } from '../../api/metzler/config';
import { ConfigType } from '../../types/configType';
import { ConfigResponse } from '../../types/apiResource';
import EventEmitter from 'eventemitter3';

export type LichttasterPanelEventsType = {
  setLight: (value: boolean) => void;
  setIsAddon: (isAddon: boolean) => void;
};

export default class LichttasterPanelState {
  public readonly panelId: PanelId = PanelId.LICHTTASTER;

  public readonly panelTitle: string = 'Lichttaster';

  public isLight: boolean = false;

  public isShowResetModal: boolean = false;

  public isRestored: boolean = false;

  private readonly eventEmitter!: EventEmitter<LichttasterPanelEventsType>;

  private readonly _panelStore: PanelStore<LichttasterPanelState>;

  constructor(panelStore: PanelStore<LichttasterPanelState>) {
    this._panelStore = panelStore;
    this.eventEmitter = new EventEmitter<LichttasterPanelEventsType>();
    makeAutoObservable(this, {}, { autoBind: true });
  }

  public updatePanelConfig(configId: string, data: ConfigType): Promise<ConfigResponse> {
    return updateConfig(configId, {
      ...data,
      lichttaster: {
        isLight: this.isLight,
      },
    });
  }

  public getStates() {
    return {
      isCompleted: this._panelStore.isCompleted,
      isLight: this.isLight,
    };
  }

  public setStates(state: LichttasterPanelState & PanelStore<LichttasterPanelState>) {
    if (this.isLight !== state.isLight) {
      this.isLight = state.isLight;
      this.eventEmitter.emit('setLight', this.isLight);
    }
    this._panelStore.setIsCompleted(state.isCompleted);
  }

  public setIsShowResetModal(value: boolean): void {
    this.isShowResetModal = value;
  }

  public setRemixConfig(): void {
    const { panelsConfig } = this._panelStore.panelsStore;
    if (panelsConfig.lichttaster) {
      const { isLight } = panelsConfig.lichttaster;
      this.isLight = isLight;
      this.eventEmitter.emit('setLight', isLight);
    }
  }

  public setIsRestored(isRestored: boolean): void {
    this.isRestored = isRestored;
  }

  public compareConfig(config: ConfigType): boolean {
    if (config.lichttaster) {
      const { lichttaster: state } = config;
      if (state?.isLight !== this.isLight) return false;
    }
    return true;
  }

  public initPanel(config: ConfigType): void {
    const { lichttaster } = config;
    if (lichttaster) {
      this.isLight = lichttaster.isLight;
    }
  }

  public subscribe<T extends keyof LichttasterPanelEventsType>(
    event: T,
    handler: LichttasterPanelEventsType[T],
  ): void {
    // TODO небольшой хак, нужно разобраться с типами
    this.eventEmitter.on(event, handler as (...args: any) => void);
  }

  switchLight(value?: boolean): void {
    this.isLight = value || !this.isLight;
    this.eventEmitter.emit('setLight', this.isLight);
  }

  public setIsAddon(): void {
    this.eventEmitter.emit('setIsAddon', true);
  }

  public reset(): Promise<ConfigResponse> {
    const { getPanelsConfig, configId } = this._panelStore.panelsStore;

    this.switchLight(false);

    return getPanelsConfig(configId)
      .then((response) => {
        const config = { ...response.payload } as any;
        Object.keys(config).forEach((data) => {
          if (data === 'lichttaster') delete config[data];
        });
        return updateConfig(configId, config);
      });
  }
}
