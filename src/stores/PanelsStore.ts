import { makeAutoObservable } from 'mobx';
import EditorStore from 'stores/EditorStore';
import PanelId from 'enums/PanelId';
import MontagePanelState from 'stores/panels/MontagePanelState';
import PanelStore, { AllStatesType, PanelStores } from 'stores/panels/PanelStore';
import ZusatzmodulPanelState from './panels/ZusatzmodulPanelState';
import InnenstationPanelState from './panels/InnenstationPanelState';
import ZusatzmodulErweiterunPanelState from './panels/ZusatzmodulErweiterunPanelState';
import KlingetableuPanelState from './panels/KlingetableuPanelState';
import TextleistePanelState from './panels/TextleistePanelState';
import BriefkastenPanelState from './panels/BriefkastenPanelState';
import RFIDPanelState, { RFIDModule } from './panels/RFIDPanelState';
import LichttasterPanelState from './panels/LichttasterPanelState';
import { WindowId } from '../enums/WindowId';
import { ConfigType } from '../types/configType';
import { createConfig, getConfig, orderConfig, remixConfig } from '../api/metzler/config';
import { ConfigResponse } from '../types/apiResource';
import { ZusatzmodulErweiterunType } from '../data/ZusatzmodulErweiterun';
import { ZusatzmodulType } from '../data/Zusatzmoduls';
import { PanelList } from '../data/panelList';

export default class PanelsStore {
  public activePanelId: PanelId | null = PanelId.MONTAGE;

  public activeWindowId: WindowId | null = null;

  public stepIndex: number = 0;

  public configId: string = '';

  public listPanels: PanelId[] | undefined = undefined;

  public isConfigOrder: boolean = false;

  public isEditConfig: boolean = true;

  private readonly _editorStore: EditorStore;

  private readonly _montagePanelStore: PanelStore<MontagePanelState>;

  private readonly _zusatzmodulPanelStore: PanelStore<ZusatzmodulPanelState>;

  private readonly _klingetableuPanelStore: PanelStore<KlingetableuPanelState>;

  private readonly _zusatzmodulErweiterunPanelStore: PanelStore<ZusatzmodulErweiterunPanelState>;

  private readonly _innenstationPanelStore: PanelStore<InnenstationPanelState>;

  private readonly _briefkastenPanelStore: PanelStore<BriefkastenPanelState>;

  private readonly _textleistePanelState: PanelStore<TextleistePanelState>;

  private readonly _lichttasterPanelState: PanelStore<LichttasterPanelState>;

  private readonly _rfidPanelState: PanelStore<RFIDPanelState>;

  public panelList: PanelStore<MontagePanelState>;

  public isManifestation: boolean = false;

  public panelsConfig: ConfigType = {};

  constructor(editorStore: EditorStore, appConfig: ConfigType) {
    this._editorStore = editorStore;
    this._montagePanelStore = new PanelStore((panelStore) => new MontagePanelState(panelStore), this);
    this._zusatzmodulPanelStore = new PanelStore((panelStore) => new ZusatzmodulPanelState(panelStore), this);
    this._innenstationPanelStore = new PanelStore((panelStore) => new InnenstationPanelState(panelStore), this);
    this._zusatzmodulErweiterunPanelStore = new PanelStore((panelStore) => new ZusatzmodulErweiterunPanelState(panelStore), this);
    this._klingetableuPanelStore = new PanelStore((panelStore) => new KlingetableuPanelState(panelStore), this);
    this._briefkastenPanelStore = new PanelStore((panelStore) => new BriefkastenPanelState(panelStore), this);
    this._textleistePanelState = new PanelStore<TextleistePanelState>((panelStore) => new TextleistePanelState(panelStore), this);
    this._rfidPanelState = new PanelStore<RFIDPanelState>((panelStore) => new RFIDPanelState(panelStore), this);
    this._lichttasterPanelState = new PanelStore<LichttasterPanelState>(
      (panelStore) => new LichttasterPanelState(panelStore),
      this,
    );
    this.panelList = this.montagePanelStore;
    this.initPanelList();
    this.initPanels(appConfig);

    makeAutoObservable(this, {}, { autoBind: true });
  }

  get montagePanelStore(): PanelStore<MontagePanelState> {
    return this._montagePanelStore;
  }

  public setConfig(panelsConfig: ConfigType): void {
    this.panelsConfig = panelsConfig;
  }

  get zusatzmodulPanelStore(): PanelStore<ZusatzmodulPanelState> {
    return this._zusatzmodulPanelStore;
  }

  get klingetableuPanelStore(): PanelStore<KlingetableuPanelState> {
    return this._klingetableuPanelStore;
  }

  get briefkastenPanelStore(): PanelStore<BriefkastenPanelState> {
    return this._briefkastenPanelStore;
  }

  get lichttasterPanelStore(): PanelStore<LichttasterPanelState> {
    return this._lichttasterPanelState;
  }

  get rfidPanelStore(): PanelStore<RFIDPanelState> {
    return this._rfidPanelState;
  }

  get zusatzmodulErweiterunPanelStore(): PanelStore<ZusatzmodulErweiterunPanelState> {
    return this._zusatzmodulErweiterunPanelStore;
  }

  get innenstationPanelStore(): PanelStore<InnenstationPanelState> {
    return this._innenstationPanelStore;
  }

  public setActiveWindowId(windowId: WindowId | null): void {
    this.activeWindowId = windowId;
  }

  get textleistePanelStore(): PanelStore<TextleistePanelState> {
    return this._textleistePanelState;
  }

  get canSaveConfiguration(): boolean {
    return this.textleistePanelStore.isCompleted;
  }

  public setIsManifestation(value: boolean): void {
    this.isManifestation = value;
  }

  public initPanels(config: ConfigType): void {
    this.montagePanelStore.state.initPanel(config);
    this.zusatzmodulErweiterunPanelStore.state.initPanel(config);
    this.zusatzmodulPanelStore.state.initPanel(config);
    this.textleistePanelStore.state.initPanel(config);
    this.rfidPanelStore.state.initPanel(config);
    this.lichttasterPanelStore.state.initPanel(config);
    this.klingetableuPanelStore.state.initPanel(config);
    this.briefkastenPanelStore.state.initPanel(config);
  }

  // todo: потом стоит избавиться от этого
  public initPanelList(): void {
    this.panelList.setNextPanel(this.zusatzmodulPanelStore);
    this.zusatzmodulPanelStore.setNextPanel(this.textleistePanelStore);
    this.zusatzmodulErweiterunPanelStore.setNextPanel(this.klingetableuPanelStore);
  }

  public canOpenPanel(id: PanelId | null): boolean {
    if (!id) return true;

    return this.panelList.checkPanel(id);
  }

  public panelIsVisible(id: PanelId): boolean {
    const panel = this.getState(id);
    if (panel && panel.isCompleted) return true;

    if (this.listPanels) {
      const index = this.listPanels.findIndex((item) => item === id);
      return index <= this.stepIndex && index !== -1;
    }
    return false;
  }

  public setListPanels(list: PanelId[]): void {
    this.listPanels = list;
  }

  public remixConfig(configId: string): Promise<ConfigResponse> {
    return remixConfig(configId);
  }

  public createConfig(data: ConfigType): Promise<ConfigResponse> {
    return createConfig(data);
  }

  public getPanelsConfig(configId: string): Promise<ConfigResponse> {
    return getConfig(configId);
  }

  public orderPanelsConfig(configId: string): Promise<ConfigResponse> {
    return orderConfig(configId);
  }

  public updateConfig<
    T extends { updatePanelConfig: (id: string, data: ConfigType) => Promise<ConfigResponse> },
  >(configId: string, panelId: PanelId, state: T, data: ConfigType): Promise<ConfigResponse> {
    return state.updatePanelConfig(configId, data);
  }

  public nextStep(): void {
    const index = this.listPanels?.findIndex((item) => item === this.activePanelId);
    if (index !== undefined) {
      if (index < 0) this.stepIndex = 0;
      else this.stepIndex = index + 1;
    }
  }

  public setNextPanel(): void {
    if (this.listPanels && this.activePanelId) {
      const nextPanel = this.getState(this.listPanels[this.stepIndex]);
      const currentPanel = this.getState(this.listPanels[this.stepIndex - 1]) || this.zusatzmodulPanelStore;
      if (nextPanel) currentPanel?.setNextPanel(nextPanel);
    }
  }

  public initList(): void {
    this.montagePanelStore.setNextPanel(this.zusatzmodulPanelStore);
    if (this.listPanels) {
      const nextAfterZusatzmodul = this.getState(this.listPanels[0]);
      if (nextAfterZusatzmodul) this.zusatzmodulPanelStore.setNextPanel(nextAfterZusatzmodul);
    }

    const panelsName = Object.keys(this.panelsConfig);
    this.stepIndex = panelsName.length - 3 || 0;
    this.listPanels?.forEach((panelItem, index) => {
      const state = this.getState(panelItem);
      if (state && this.listPanels) {
        const nextPanelId = this.listPanels[index + 1];
        const nextPanel = this.getState(nextPanelId);
        if (nextPanel) state.setNextPanel(nextPanel);
      }
    });
  }

  public getState(panelId: PanelId): PanelStores | undefined {
    if (panelId === PanelId.LICHTTASTER) return this.lichttasterPanelStore;
    if (panelId === PanelId.ZUSATZMODUL_ERWEITERUN) return this.zusatzmodulErweiterunPanelStore;
    if (panelId === PanelId.ZUSATZMODUL) return this.zusatzmodulPanelStore;
    if (panelId === PanelId.INNENSTATION) return this.innenstationPanelStore;
    if (panelId === PanelId.MONTAGE) return this.montagePanelStore;
    if (panelId === PanelId.BRIEFKASTEN) return this.briefkastenPanelStore;
    if (panelId === PanelId.TEXTLEISTE) return this.textleistePanelStore;
    if (panelId === PanelId.KLINGETABLEU) return this.klingetableuPanelStore;
    if (panelId === PanelId.RFID) return this.rfidPanelStore;
  }

  public setIsOrderConfig(value: boolean): void {
    this.isConfigOrder = value;
  }

  public setConfigId(configId: string): void {
    this.configId = configId;
  }

  public setIsEditConfig(isEditConfig: boolean): void {
    this.isEditConfig = isEditConfig;
  }

  public resetPanels(): Promise<void> | undefined {
    if (this.activePanelId) {
      const currentPanel = this.getState(this.activePanelId);
      if (currentPanel && currentPanel.nextPanel) {
        const promise = currentPanel.nextPanel.reset(true, currentPanel);
        if (promise) {
          return promise.then(() => {
            if (this.activePanelId === PanelId.MONTAGE) {
              this.listPanels = PanelList.ohne;
              this.stepIndex = 0;
            }
          });
        }
      }
    }
  }

  public setActivePanelId(id: PanelId | null): void {
    const isCanOpen = this.canOpenPanel(id);
    if (isCanOpen) this.activePanelId = id;
  }

  public determinePathFromRequest(response: ConfigResponse): void {
    const { zusatzmodulErweiterun, zusatzmodule } = response.payload;
    this.setConfig(response.payload);
    if (zusatzmodulErweiterun) {
      const type = zusatzmodulErweiterun.zusatzmodulErweiterunType as ZusatzmodulErweiterunType;
      this.zusatzmodulErweiterunPanelStore.state.setZusatzmodulErweiterung(type);
    }
    if (zusatzmodule && !zusatzmodulErweiterun) {
      const type = zusatzmodule.zusatzmodulType as ZusatzmodulType;
      this.zusatzmodulPanelStore.state.setZusatzmodulType(type);
    }
  }

  public resetNotCompletePanelState(previewPanel: PanelId): void {
    const previewPanelState = this.getState(previewPanel);
    if (!previewPanelState?.isCompleted) previewPanelState?.state.reset();
  }

  public getAllStates(): AllStatesType {
    return {
      activePanelId: this.activePanelId,
      [PanelId.ZUSATZMODUL_ERWEITERUN]: this.zusatzmodulErweiterunPanelStore.state.getStates(),
      [PanelId.ZUSATZMODUL]: this.zusatzmodulPanelStore.state.getStates(),
      [PanelId.INNENSTATION]: this.innenstationPanelStore.state.getStates(),
      [PanelId.MONTAGE]: this.montagePanelStore.state.getStates(),
      [PanelId.BRIEFKASTEN]: this.briefkastenPanelStore.state.getStates(),
      [PanelId.TEXTLEISTE]: this.textleistePanelStore.state.getStates(),
      [PanelId.KLINGETABLEU]: this.klingetableuPanelStore.state.getStates(),
      [PanelId.RFID]: this.rfidPanelStore.state.getStates(),
      [PanelId.LICHTTASTER]: this.lichttasterPanelStore.state.getStates(),
    };
  }

  public setAllStates(state: AllStatesType) {
    this.zusatzmodulErweiterunPanelStore.state.setStates(state[PanelId.ZUSATZMODUL_ERWEITERUN]);
    this.zusatzmodulPanelStore.state.setStates(state[PanelId.ZUSATZMODUL]);
    this.innenstationPanelStore.state.setStates(state[PanelId.INNENSTATION]);
    this.montagePanelStore.state.setStates(state[PanelId.MONTAGE]);
    this.briefkastenPanelStore.state.setStates(state[PanelId.BRIEFKASTEN]);
    this.textleistePanelStore.state.setStates(state[PanelId.TEXTLEISTE]);
    this.klingetableuPanelStore.state.setStates(state[PanelId.KLINGETABLEU]);
    this.rfidPanelStore.state.setStates(state[PanelId.RFID]);
    this.lichttasterPanelStore.state.setStates(state[PanelId.LICHTTASTER]);
    this.setActivePanelId(state.activePanelId);
  }

  // update panels config

  public updateMontagePanelConfig(data: MontagePanelState) {
    this.panelsConfig[PanelId.MONTAGE] = {
      montageType: data.montageType,
      mailBoxes: data.mailBoxesCount,
    };
  }

  public updateBriefkastenPanelConfig(data: BriefkastenPanelState) {
    this.panelsConfig[PanelId.BRIEFKASTEN] = {
      griffleisteColor: data.griffleisteColor,
      briefkasteType: data.briefkasteType,
      schriftart: data.schriftart,
      namensschildList: data.namensschildList,
    };
  }

  public updateInnenstationPanelConfig(data: InnenstationPanelState) {
    this.panelsConfig[PanelId.INNENSTATION] = {
      innenstationType: data.innenstationType,
      modules: data.innestationsModulesCount,
    };
  }

  public updateKlingeltableuPanelConfig(data: KlingetableuPanelState) {
    this.panelsConfig[PanelId.KLINGETABLEU] = {
      beleuchtungDerKlingeltasterEnabled: data.beleuchtungDerKlingeltasterEnabled,
      beschriftungNamensschild: data.beschriftungNamensschild,
      color: data.beleuchtungColor,
      klingeltasterCount: data.klingeltasterCount,
      schriftart: data.schriftart,
      namensschildList: data.namensschildList,
    };
  }

  public updateLichttasterPanelConfig(data: LichttasterPanelState) {
    this.panelsConfig[PanelId.LICHTTASTER] = {
      isLight: data.isLight,
    };
  }

  public updateRFIDPanelConfig(data: RFIDPanelState) {
    this.panelsConfig[PanelId.RFID] = {
      exclusiveCard: { ...data.RFIDCard.exclusive } as RFIDModule,
      regularCard: { ...data.RFIDCard.regular } as RFIDModule,
      schlusselanhangerCard: { ...data.RFIDCard.schlusselanhanger } as RFIDModule,
    };
  }

  public updateZusatzmodulErwPanelConfig(data: ZusatzmodulErweiterunPanelState) {
    this.panelsConfig[PanelId.ZUSATZMODUL_ERWEITERUN] = {
      zusatzmodulErweiterunType: data.zusatzmodulErweiterung,
    };
  }

  public updateZusatzmodulPanelConfig(data: ZusatzmodulPanelState) {
    this.panelsConfig[PanelId.ZUSATZMODUL] = {
      zusatzmodulType: data.zusatzmodulType,
      zusatzmodulPosition: data.zusatzmodulPosition,
      mailBoxesRanksCount: data.mailBoxesRanksCount,
    };
  }
}
