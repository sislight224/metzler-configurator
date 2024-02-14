import PanelId from 'enums/PanelId';
import { makeAutoObservable } from 'mobx';
import zusatzmodulErweiterun, { ZusatzmodulErweiterunType } from 'data/ZusatzmodulErweiterun';
import PanelStore from './PanelStore';
import { PanelList } from '../../data/panelList';
import { updateConfig } from '../../api/metzler/config';
import { ConfigType } from '../../types/configType';
import { ConfigResponse } from '../../types/apiResource';
import EventEmitter from 'eventemitter3';
import { cloneDeep, isEqual } from 'lodash';

const [zusatzmodulErweiterunInitial] = zusatzmodulErweiterun;

export type ZusatzmodulErweiterunPanelEventsType = {
  setRfid: (value: boolean) => void;
  setTouchDisplay: (value: boolean) => void;
  setKlingVisible: (value: boolean) => void;
};

export default class ZusatzmodulErweiterunPanelState {
  public readonly panelId: PanelId = PanelId.ZUSATZMODUL_ERWEITERUN;

  public readonly panelTitle: string = 'Zusatzmodul Erweiterung';

  public zusatzmodulErweiterung: ZusatzmodulErweiterunType = zusatzmodulErweiterunInitial;

  public isShowResetModal: boolean = false;

  public isRestored: boolean = false;

  private readonly _panelStore: PanelStore<ZusatzmodulErweiterunPanelState>;

  private readonly eventEmitter!: EventEmitter<ZusatzmodulErweiterunPanelEventsType>;

  constructor(panelStore: PanelStore<ZusatzmodulErweiterunPanelState>) {
    this._panelStore = panelStore;
    this.eventEmitter = new EventEmitter<ZusatzmodulErweiterunPanelEventsType>();
    makeAutoObservable(this, {}, { autoBind: true });
  }

  public getStates() {
    return {
      isCompleted: this._panelStore.isCompleted,
      zusatzmodulErweiterung: cloneDeep(this.zusatzmodulErweiterung),
    };
  }

  public setStates(state: ZusatzmodulErweiterunPanelState & PanelStore<ZusatzmodulErweiterunPanelState>) {
    if (!isEqual(this.zusatzmodulErweiterung, state.zusatzmodulErweiterung)) {
      this.setZusatzmodulErweiterung(state.zusatzmodulErweiterung);
    }
    this._panelStore.setIsCompleted(state.isCompleted);
  }

  public setAddonModules(value: ZusatzmodulErweiterunType): void {
    if (value.value === 'klingetaster_rfid') {
      this.eventEmitter.emit('setRfid', true);
      this.eventEmitter.emit('setTouchDisplay', false);
      this.eventEmitter.emit('setKlingVisible', true);
    }

    if (value.value === 'klingetaster') {
      this.eventEmitter.emit('setRfid', false);
      this.eventEmitter.emit('setTouchDisplay', false);
      this.eventEmitter.emit('setKlingVisible', true);
      return;
    }

    if (value.value === 'klingetaster_touchDisplay') {
      this.eventEmitter.emit('setRfid', false);
      this.eventEmitter.emit('setTouchDisplay', true);
      this.eventEmitter.emit('setKlingVisible', true);
      return;
    }

    if (value.value === 'touch_display') {
      this.eventEmitter.emit('setRfid', false);
      this.eventEmitter.emit('setTouchDisplay', true);
      this.eventEmitter.emit('setKlingVisible', false);
    }
  }

  public setZusatzmodulErweiterung(value: ZusatzmodulErweiterunType): void {
    this.zusatzmodulErweiterung = value;
    if (value.value === 'klingetaster_rfid') {
      this._panelStore.panelsStore.setListPanels(PanelList.klingetaster_rfid);
      this._panelStore.panelsStore.nextStep();
      if (this._panelStore.panelsStore.montagePanelStore.state.mailBoxesCount === 1) {
        this._panelStore.panelsStore.briefkastenPanelStore.state.setVisibleDies(false);
        this._panelStore.panelsStore.briefkastenPanelStore.state.setVisibleType(false);
      }
      this.setAddonModules(value);
      return;
    }

    if (value.value === 'klingetaster') {
      this._panelStore.panelsStore.setListPanels(PanelList.klingetaster);
      this._panelStore.panelsStore.nextStep();
      if (this._panelStore.panelsStore.montagePanelStore.state.mailBoxesCount === 1) {
        this._panelStore.panelsStore.briefkastenPanelStore.state.setVisibleDies(false);
        this._panelStore.panelsStore.briefkastenPanelStore.state.setVisibleType(false);
      }
      this.setAddonModules(value);
      return;
    }

    if (value.value === 'klingetaster_touchDisplay') {
      this._panelStore.panelsStore.setListPanels(PanelList.klingetaster_touchDisplay);
      this._panelStore.panelsStore.nextStep();
      if (this._panelStore.panelsStore.montagePanelStore.state.mailBoxesCount === 1) {
        this._panelStore.panelsStore.briefkastenPanelStore.state.setVisibleDies(false);
        this._panelStore.panelsStore.briefkastenPanelStore.state.setVisibleType(false);
      }
      this.setAddonModules(value);
      return;
    }

    if (value.value === 'touch_display') {
      if (this._panelStore.panelsStore.montagePanelStore.state.mailBoxesCount === 1) {
        this._panelStore.panelsStore.briefkastenPanelStore.state.setVisibleDies(true);
        this._panelStore.panelsStore.briefkastenPanelStore.state.setVisibleType(true);
      }
      this._panelStore.panelsStore.setListPanels(PanelList.touch_display);
      this._panelStore.panelsStore.nextStep();
      this.setAddonModules(value);
    }
  }

  public setIsShowResetModal(value: boolean): void {
    this.isShowResetModal = value;
  }

  public setIsRestored(isRestored: boolean): void {
    this.isRestored = isRestored;
  }

  public compareConfig(config: ConfigType): boolean {
    if (config.zusatzmodulErweiterun) {
      const { zusatzmodulErweiterun: state } = config;
      return state?.zusatzmodulErweiterunType.value === this.zusatzmodulErweiterung.value;
    }
    return true;
  }

  public updatePanelConfig(configId: string, data: ConfigType): Promise<ConfigResponse> {
    return updateConfig(configId, {
      ...data,
      zusatzmodulErweiterun: {
        zusatzmodulErweiterunType: this.zusatzmodulErweiterung,
      },
    });
  }

  public setRemixConfig(): void {
    const { panelsConfig } = this._panelStore.panelsStore;
    if (panelsConfig.zusatzmodulErweiterun) {
      const { zusatzmodulErweiterunType } = panelsConfig.zusatzmodulErweiterun;
      this.setZusatzmodulErweiterung(zusatzmodulErweiterunType);
      this.setAddonModules(zusatzmodulErweiterunType);
    }
  }

  public initPanel(config: ConfigType): void {
    const { zusatzmodulErweiterun: zusatState } = config;
    if (zusatState) {
      this.zusatzmodulErweiterung = zusatState.zusatzmodulErweiterunType;
    }
  }

  public reset(): Promise<ConfigResponse> {
    const { getPanelsConfig, configId } = this._panelStore.panelsStore;

    this.zusatzmodulErweiterung = zusatzmodulErweiterunInitial;

    this.eventEmitter.emit('setRfid', false);
    this.eventEmitter.emit('setTouchDisplay', false);

    return getPanelsConfig(configId)
      .then((response) => {
        const config = { ...response.payload } as any;
        Object.keys(config).forEach((data) => {
          if (data === 'zusatzmodulErweiterun') delete config[data];
        });

        return updateConfig(configId, config);
      });
  }

  public subscribe<T extends keyof ZusatzmodulErweiterunPanelEventsType>(
    event: T,
    handler: ZusatzmodulErweiterunPanelEventsType[T],
  ): void {
    // TODO небольшой хак, нужно разобраться с типами
    this.eventEmitter.on(event, handler as (...args: any) => void);
  }

  // todo: подумать как убрать ее
  public resetPanelConfig(): void {
    const {
      getPanelsConfig,
      configId,
      updateConfig: updateConfiguration,
      zusatzmodulErweiterunPanelStore,
    } = this._panelStore.panelsStore;

    getPanelsConfig(configId)
      .then((response) => {
        const config = { ...response.payload } as any;
        Object.keys(config).forEach((data) => {
          if (data === 'zusatzmodule') return;
          if (data === 'montage') return;
          delete config[data];
        });

        updateConfiguration<ZusatzmodulErweiterunPanelState>(
          configId,
          this.panelId,
          zusatzmodulErweiterunPanelStore.state,
          config,
        );
      });
  }
}
