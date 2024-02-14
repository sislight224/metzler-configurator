import { makeAutoObservable } from 'mobx';
import PanelId from 'enums/PanelId';
import ZusatzmodulPosition from 'enums/data/ZusatzmodulPosition';
import zusatzmoduls, { ZusatzmodulType } from 'data/Zusatzmoduls';
import PanelStore from './PanelStore';
import { PanelList } from '../../data/panelList';
import { updateConfig } from '../../api/metzler/config';
import { ConfigType } from '../../types/configType';
import { ConfigResponse } from '../../types/apiResource';
import EventEmitter from 'eventemitter3';
import { cloneDeep, isEqual } from 'lodash';
import updateRanks from '../../helpers/updateRanks';

const [zusatzmodulsInitial] = zusatzmoduls;

export type ZusatzmodulPanelEventsType = {
  setMailRanksCount: (count: number) => void;
  setAddonModulePosition: (isRight: boolean) => void;
  setIsAddonModule: (value: boolean) => void;
  setIsAddonPlatesVisible: (value: boolean) => void;
  setIsCamera: (value: boolean) => void;
  setIsAudio: (value: boolean) => void;
  setIsLight: (value: boolean) => void;
};

export default class ZusatzmodulPanelState {
  public readonly panelId: PanelId = PanelId.ZUSATZMODUL;

  public readonly panelTitle: string = 'Zusatzmodul';

  public isShowResetModal: boolean = false;

  public zusatzmodulType: ZusatzmodulType = zusatzmodulsInitial;

  public isRestored: boolean = false;

  public isHasAddonModule: boolean = false;

  public zusatzmodulPosition: ZusatzmodulPosition = ZusatzmodulPosition.LINKS;

  private readonly _panelStore: PanelStore<ZusatzmodulPanelState>;

  public mailBoxesRanksCount = 1;

  private readonly eventEmitter!: EventEmitter<ZusatzmodulPanelEventsType>;

  constructor(panelStore: PanelStore<ZusatzmodulPanelState>) {
    this.eventEmitter = new EventEmitter();
    this._panelStore = panelStore;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  public getStates() {
    return {
      isCompleted: this._panelStore.isCompleted,
      zusatzmodulType: cloneDeep(this.zusatzmodulType),
      zusatzmodulPosition: this.zusatzmodulPosition,
      mailBoxesRanksCount: this.mailBoxesRanksCount,
    };
  }

  public setStates(state: ZusatzmodulPanelState & PanelStore<ZusatzmodulPanelState>) {
    if (!isEqual(this.zusatzmodulType, state.zusatzmodulType)) {
      this.setZusatzmodulType(state.zusatzmodulType);
    }
    if (!isEqual(this.zusatzmodulPosition, state.zusatzmodulPosition)) {
      this.setZusatzmodulPosition(state.zusatzmodulPosition);
    }
    if (!isEqual(this.mailBoxesRanksCount, state.mailBoxesRanksCount)) {
      this.setMailBoxesRanksCount(state.mailBoxesRanksCount);
    }
    this._panelStore.setIsCompleted(state.isCompleted);
  }

  public setIsShowResetModal(value: boolean): void {
    this.isShowResetModal = value;
  }

  public setAddonsModules(value: ZusatzmodulType): void {
    if (value.value === 'klingetableu') {
      this.eventEmitter.emit('setIsCamera', false);
      this.eventEmitter.emit('setIsAudio', false);
      if (this._panelStore.panelsStore.montagePanelStore.state.mailBoxesCount === 1) {
        this._panelStore.panelsStore.briefkastenPanelStore.state.setVisibleDies(false);
      }
      this.isHasAddonModule = true;
      this.setRankForAddon();
      this.eventEmitter.emit('setIsLight', false);
      this.eventEmitter.emit('setIsAddonModule', false);
      this.eventEmitter.emit('setIsAddonPlatesVisible', true);
      return;
    }
    if (value.value === 'ohne') {
      this.eventEmitter.emit('setIsAddonModule', false);
      this.eventEmitter.emit('setIsAddonPlatesVisible', false);
      this.isHasAddonModule = false;
      if (this._panelStore.panelsStore.montagePanelStore.state.mailBoxesCount === 1) {
        this._panelStore.panelsStore.briefkastenPanelStore.state.setVisibleDies(true);
      }
      this.setRankForAddon();
      this.eventEmitter.emit('setIsCamera', false);
      this.eventEmitter.emit('setIsAudio', false);
      this.eventEmitter.emit('setIsLight', false);
      return;
    }

    this.isHasAddonModule = true;
    this.setRankForAddon();
    if (this._panelStore.panelsStore.montagePanelStore.state.mailBoxesCount === 1) {
      this._panelStore.panelsStore.briefkastenPanelStore.state.setVisibleDies(false);
    }
    this.eventEmitter.emit('setIsAddonModule', true);
    this.eventEmitter.emit('setIsAddonPlatesVisible', true);
    this.eventEmitter.emit('setIsLight', true);

    if (value.value === 'videoGegensprechmodul') {
      this.eventEmitter.emit('setIsAudio', false);
      this.eventEmitter.emit('setIsCamera', true);
    }
    if (value.value === 'audioGegensprechmodul') {
      this.eventEmitter.emit('setIsAudio', true);
      this.eventEmitter.emit('setIsCamera', false);
    }
  }

  public setRankForAddon(): void {
    const { mailBoxesCount } = this._panelStore.panelsStore.montagePanelStore.state;

    updateRanks(
      mailBoxesCount,
      this.isHasAddonModule,
      this.setMailBoxesRanksCount,
    );
  }

  public setZusatzmodulType(value: ZusatzmodulType): void {
    this.zusatzmodulType = value;
    const { state: montageState } = this._panelStore.panelsStore.montagePanelStore;
    const type = this._panelStore.panelsStore.montagePanelStore.state.montageType;

    if (value.value === 'klingetableu') {
      this._panelStore.panelsStore.setListPanels(PanelList.klingetableu);
      this._panelStore.panelsStore.nextStep();
      this.setAddonsModules(value);
      if (montageState.mailBoxesCount < 2) {
        this._panelStore.panelsStore.briefkastenPanelStore.state.setVisibleDies(false);
        this._panelStore.panelsStore.briefkastenPanelStore.state.setVisibleType(false);
      }
      this._panelStore.panelsStore.montagePanelStore.state.montageType = type;
      return;
    }

    if (value.value === 'ohne') {
      this._panelStore.panelsStore.setListPanels(PanelList.ohne);
      this._panelStore.panelsStore.nextStep();
      this.setAddonsModules(value);
      if (montageState.mailBoxesCount < 2) {
        this._panelStore.panelsStore.briefkastenPanelStore.state.setVisibleDies(true);
        this._panelStore.panelsStore.briefkastenPanelStore.state.setVisibleType(true);
      }
      this._panelStore.panelsStore.montagePanelStore.state.montageType = type;
      return;
    }

    this.eventEmitter.emit('setIsAddonModule', true);
    if (montageState.mailBoxesCount < 2) {
      this._panelStore.panelsStore.briefkastenPanelStore.state.setVisibleDies(false);
      this._panelStore.panelsStore.briefkastenPanelStore.state.setVisibleType(false);
    }
    this.eventEmitter.emit('setIsAddonPlatesVisible', true);
    this.eventEmitter.emit('setIsLight', true);

    if (value.value === 'videoGegensprechmodul') this.setAddonsModules(value);

    if (value.value === 'audioGegensprechmodul') this.setAddonsModules(value);

    this._panelStore.panelsStore.setListPanels(PanelList.klingetaster);
    this._panelStore.panelsStore.nextStep();
    this._panelStore.panelsStore.montagePanelStore.state.montageType = type;
  }

  public setIsRestored(isRestored: boolean): void {
    this.isRestored = isRestored;
  }

  public setZusatzmodulPosition(position: ZusatzmodulPosition): void {
    this.zusatzmodulPosition = position;
    if (position === ZusatzmodulPosition.LINKS) this.eventEmitter.emit('setAddonModulePosition', false);
    else this.eventEmitter.emit('setAddonModulePosition', true);
  }

  public setMailBoxesRanksCount(count: number): void {
    this.mailBoxesRanksCount = count;
    this.eventEmitter.emit('setMailRanksCount', count);
  }

  public initPanel(config: ConfigType): void {
    const { zusatzmodule } = config;
    if (zusatzmodule) {
      this.mailBoxesRanksCount = zusatzmodule.mailBoxesRanksCount;
      this.zusatzmodulPosition = zusatzmodule.zusatzmodulPosition;
      this.zusatzmodulType = zusatzmodule.zusatzmodulType;
    }
  }

  public compareConfig(config: ConfigType): boolean {
    if (config.zusatzmodule) {
      const { zusatzmodule: state } = config;
      if (state) {
        if (state?.zusatzmodulType.value !== this.zusatzmodulType.value) return false;
        if (state?.zusatzmodulPosition !== this.zusatzmodulPosition) return false;
        if (state.mailBoxesRanksCount !== this.mailBoxesRanksCount) return false;
      }
    }
    return true;
  }

  public updatePanelConfig(configId: string, data: ConfigType): Promise<ConfigResponse> {
    return updateConfig(configId, {
      ...data,
      zusatzmodule: {
        zusatzmodulType: this.zusatzmodulType,
        zusatzmodulPosition: this.zusatzmodulPosition,
        mailBoxesRanksCount: this.mailBoxesRanksCount,
      },
    });
  }

  public setRemixConfig(): void {
    const { panelsConfig } = this._panelStore.panelsStore;
    if (panelsConfig.zusatzmodule) {
      const { zusatzmodulType, zusatzmodulPosition, mailBoxesRanksCount } = panelsConfig.zusatzmodule;
      this.mailBoxesRanksCount = mailBoxesRanksCount;
      this.eventEmitter.emit('setMailRanksCount', mailBoxesRanksCount);

      this.zusatzmodulType = zusatzmodulType;

      this.setZusatzmodulType(zusatzmodulType);
      this.setAddonsModules(zusatzmodulType);

      this.zusatzmodulPosition = zusatzmodulPosition;
      if (zusatzmodulPosition === ZusatzmodulPosition.LINKS) this.eventEmitter.emit('setAddonModulePosition', false);
      else this.eventEmitter.emit('setAddonModulePosition', true);
    }
  }

  public reset(): Promise<ConfigResponse> {
    const { mailBoxesCount } = this._panelStore.panelsStore.montagePanelStore.state;
    const { setVisibleDies } = this._panelStore.panelsStore.briefkastenPanelStore.state;

    this.setZusatzmodulType(zusatzmodulsInitial);
    this.setZusatzmodulPosition(ZusatzmodulPosition.LINKS);
    setVisibleDies(true);

    updateRanks(
      mailBoxesCount,
      this.isHasAddonModule,
      this.setMailBoxesRanksCount,
    );

    const { getPanelsConfig, configId } = this._panelStore.panelsStore;

    return getPanelsConfig(configId)
      .then((response) => {
        const config = { ...response.payload } as any;
        Object.keys(config).forEach((data) => {
          if (data === 'zusatzmodule') delete config[data];
        });
        return updateConfig(configId, config);
      });
  }

  public resetPanelConfig(): void {
    const { getPanelsConfig, configId, updateConfig: updateConfiguration, zusatzmodulPanelStore } = this._panelStore.panelsStore;
    getPanelsConfig(configId)
      .then((response) => {
        const config = { ...response.payload } as any;
        Object.keys(config).forEach((data) => {
          if (data === 'zusatzmodule') return;
          if (data === 'montage') return;
          delete config[data];
        });

        return updateConfiguration<ZusatzmodulPanelState>(
          configId,
          this.panelId,
          zusatzmodulPanelStore.state,
          config,
        );
      });
  }

  public subscribe<T extends keyof ZusatzmodulPanelEventsType>(
    event: T,
    handler: ZusatzmodulPanelEventsType[T],
  ): void {
    // TODO небольшой хак, нужно разобраться с типами
    this.eventEmitter.on(event, handler as (...args: any) => void);
  }
}
