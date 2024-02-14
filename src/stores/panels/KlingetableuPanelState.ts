import PanelId from 'enums/PanelId';
import { makeAutoObservable } from 'mobx';
import PanelStore from './PanelStore';
import Colors from '../../enums/data/Colors';
import BeschriftungNamensschild from '../../enums/data/BeschriftungNamensschild';
import { updateConfig } from '../../api/metzler/config';
import { ConfigType } from '../../types/configType';
import { ConfigResponse } from '../../types/apiResource';
import _, { cloneDeep, isEqual } from 'lodash';
import EventEmitter from 'eventemitter3';
import BeleuchtungColorList from '../../data/BeleuchtungColorList';

export interface Namensschild {
  value: string;
  id: number;
}

export type KlingetableuPanelEventsType = {
  setKlingeltasterCount: (count: number) => void;
  setKlingColor: (color: string) => void;
  setNamensschildList: (value: string[]) => void;
  setKlingLight: (value: boolean) => void;
  setAddonLight: (isLight: boolean) => void;
  setType: (value: string) => void;
  setFont: (font: string) => void;
  setIsLightPaper: (isLight: boolean) => void;
};

export default class KlingetableuPanelState {
  public readonly panelId: PanelId = PanelId.KLINGETABLEU;

  public readonly panelTitle: string = 'Klingelanlage';

  private readonly _panelStore: PanelStore<KlingetableuPanelState>;

  public klingeltasterCount: number = 9;

  public beleuchtungDerKlingeltasterEnabled: boolean = false;

  public beleuchtungColor: Colors = Colors.WHITE;

  public beschriftungNamensschild: BeschriftungNamensschild = BeschriftungNamensschild.EINSTECKSCHILD_MIT_PAPIEREINLEGER;

  public namensschildBeleuchtungEnabled: boolean = false;

  public lichttasterEnabled: boolean = false;

  public schriftart: string = 'Schriftart7';

  public isRestored: boolean = false;

  public namensschildList: Namensschild[] = [];

  private readonly eventEmitter!: EventEmitter<KlingetableuPanelEventsType>;

  public isShowResetModal: boolean = false;

  public isError: boolean = false;

  constructor(panelStore: PanelStore<KlingetableuPanelState>) {
    this.eventEmitter = new EventEmitter();
    this._panelStore = panelStore;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  public getStates() {
    return {
      isCompleted: this._panelStore.isCompleted,
      klingeltasterCount: this.klingeltasterCount,
      beleuchtungDerKlingeltasterEnabled: this.beleuchtungDerKlingeltasterEnabled,
      beleuchtungColor: this.beleuchtungColor,
      beschriftungNamensschild: this.beschriftungNamensschild,
      namensschildBeleuchtungEnabled: this.namensschildBeleuchtungEnabled,
      lichttasterEnabled: this.lichttasterEnabled,
      schriftart: this.schriftart,
      namensschildList: cloneDeep(this.namensschildList),
    };
  }

  public setStates(state: KlingetableuPanelState & PanelStore<KlingetableuPanelState>) {
    if (!isEqual(this.namensschildList, state.namensschildList)) {
      this.namensschildList = state.namensschildList;
      const newNamensschildList = state.namensschildList.map((item) => item.value);
      this.eventEmitter.emit('setNamensschildList', newNamensschildList);
    }
    if (!isEqual(this.klingeltasterCount, state.klingeltasterCount)) {
      this.setKlingeltasterCount(state.klingeltasterCount);
    }
    if (!isEqual(this.beleuchtungDerKlingeltasterEnabled, state.beleuchtungDerKlingeltasterEnabled)) {
      this.setBeleuchtungDerKlingeltasterEnabled(state.beleuchtungDerKlingeltasterEnabled);
    }
    if (!isEqual(this.beleuchtungColor, state.beleuchtungColor)) {
      this.setBeleuchtungColor(state.beleuchtungColor);
    }
    if (!isEqual(this.beschriftungNamensschild, state.beschriftungNamensschild)) {
      this.setBeschriftungNamensschild(state.beschriftungNamensschild);
    }
    if (!isEqual(this.namensschildBeleuchtungEnabled, state.namensschildBeleuchtungEnabled)) {
      this.setNamensschildBeleuchtungEnabled(state.namensschildBeleuchtungEnabled);
    }
    if (!isEqual(this.lichttasterEnabled, state.lichttasterEnabled)) {
      this.setLichttasterEnabled(state.lichttasterEnabled);
    }
    if (!isEqual(this.schriftart, state.schriftart)) {
      const fontNumber = state.schriftart?.replace(/\D+/g, '') || '2';
      this.setSchriftart(state.schriftart, Number(fontNumber));
    }
    this._panelStore.setIsCompleted(state.isCompleted);
  }

  public setKlingeltasterCount(value: number): void {
    this.klingeltasterCount = value;
    this.eventEmitter.emit('setKlingeltasterCount', value);
  }

  public setIsRestored(isRestored: boolean): void {
    this.isRestored = isRestored;
  }

  public setLichttasterEnabled(value: boolean): void {
    this.lichttasterEnabled = value;
    this.eventEmitter.emit('setAddonLight', value);
  }

  public setBeleuchtungDerKlingeltasterEnabled(value: boolean): void {
    this.beleuchtungDerKlingeltasterEnabled = value;
    this.eventEmitter.emit('setKlingLight', value);
  }

  public setBeleuchtungColor(value: Colors): void {
    this.beleuchtungColor = value;
    const currentColor = BeleuchtungColorList.find((item) => item.value === value);
    if (currentColor) this.eventEmitter.emit('setKlingColor', currentColor.color);
  }

  public initPanel(config: ConfigType): void {
    const klingetableu = config[PanelId.KLINGETABLEU];
    if (klingetableu) {
      this.schriftart = klingetableu.schriftart;
      this.beleuchtungColor = klingetableu.color as Colors;
      this.beschriftungNamensschild = klingetableu.beschriftungNamensschild;
      this.klingeltasterCount = klingetableu.klingeltasterCount;
    }
  }

  public setBeschriftungNamensschild(value: BeschriftungNamensschild): void {
    this.beschriftungNamensschild = value;

    if (value === BeschriftungNamensschild.NAMENSSCHILD_MIT_GRAVUR) {
      this.eventEmitter.emit('setType', 'engrave');
    }
    if (value === BeschriftungNamensschild.EINSTECKSCHILD_MIT_PAPIEREINLEGER) {
      this.eventEmitter.emit('setType', 'plate');
    }
  }

  public setIsError(value: boolean): void {
    this.isError = value;
  }

  public setNamensschildBeleuchtungEnabled(value: boolean): void {
    this.namensschildBeleuchtungEnabled = value;
    this.eventEmitter.emit('setIsLightPaper', value);
  }

  public setSchriftart(value: string, fontIndex: number): void {
    this.schriftart = value;
    this.eventEmitter.emit('setFont', `schriftart_${fontIndex}`);
  }

  public setIsShowResetModal(value: boolean): void {
    this.isShowResetModal = value;
  }

  public resetNamensschildList(): void {
    this.namensschildList = [];
  }

  public setNamensschildList(value: Namensschild): void {
    this.namensschildList = this.namensschildList.map((item) => {
      if (item.id === value.id) {
        return {
          ...item,
          value: value.value,
        };
      }
      return item;
    });

    const newNamensschildList = this.namensschildList.map((item) => item.value);
    this.eventEmitter.emit('setNamensschildList', newNamensschildList);
  }

  public initNamensschildList(list?: Namensschild[]): void {
    if (list) {
      this.namensschildList = list;
      return;
    }

    if (this.namensschildList.length < 1) {
      this.namensschildList = Array.from({ length: this.klingeltasterCount }).map((_item, index) => {
        return {
          value: '',
          id: index + 1,
        };
      });
      return;
    }

    if (this.namensschildList.length > this.klingeltasterCount) {
      this.namensschildList.splice(this.klingeltasterCount, this.namensschildList.length - this.klingeltasterCount);
      return;
    }

    if (this.namensschildList.length < this.klingeltasterCount) {
      const difference = this.klingeltasterCount - this.namensschildList.length;
      const newList = Array.from({ length: difference }).map((_item, index) => {
        return {
          value: '',
          id: this.namensschildList.length + index + 1,
        };
      });
      this.namensschildList = this.namensschildList.concat(newList);
    }
  }

  public updatePanelConfig(configId: string, data: ConfigType): Promise<ConfigResponse> {
    return updateConfig(configId, {
      ...data,
      [PanelId.KLINGETABLEU]: {
        beleuchtungDerKlingeltasterEnabled: this.beleuchtungDerKlingeltasterEnabled,
        beschriftungNamensschild: this.beschriftungNamensschild,
        color: this.beleuchtungColor,
        klingeltasterCount: this.klingeltasterCount,
        schriftart: this.schriftart,
        namensschildList: this.namensschildList,
      },
    });
  }

  public compareConfig(config: ConfigType): boolean {
    const state = config[PanelId.KLINGETABLEU];
    if (state) {
      if (state?.klingeltasterCount !== this.klingeltasterCount) return false;
      if (state?.color !== this.beleuchtungColor) return false;
      if (state.schriftart !== this.schriftart) return false;
      if (state.beleuchtungDerKlingeltasterEnabled !== this.beleuchtungDerKlingeltasterEnabled) return false;
      if (!_.isEqual(state.beschriftungNamensschild, this.beschriftungNamensschild)) return false;
    }
    return true;
  }

  public setRemixConfig(): void {
    const { panelsConfig } = this._panelStore.panelsStore;
    if (panelsConfig[PanelId.KLINGETABLEU]) {
      const {
        beschriftungNamensschild,
        color,
        klingeltasterCount,
        schriftart,
        beleuchtungDerKlingeltasterEnabled,
        namensschildList,
      } = panelsConfig[PanelId.KLINGETABLEU];

      const schriftartIndex = Number(schriftart?.replace(/\D+/g, '') || 7);
      this.setSchriftart(schriftart, schriftartIndex);

      if (color) this.setBeleuchtungColor(color as Colors);
      this.setKlingeltasterCount(klingeltasterCount);
      this.setBeleuchtungDerKlingeltasterEnabled(beleuchtungDerKlingeltasterEnabled);

      this.setBeschriftungNamensschild(beschriftungNamensschild);

      this.initNamensschildList(namensschildList);
      if (namensschildList) {
        namensschildList.forEach((item) => {
          this.setNamensschildList(item);
        });
      }
    }
  }

  public reset(): Promise<ConfigResponse> {
    const { getPanelsConfig, configId, montagePanelStore } = this._panelStore.panelsStore;
    this.setKlingeltasterCount(montagePanelStore.state.mailBoxesCount);
    this.setBeleuchtungColor(Colors.WHITE);
    this.setSchriftart('Schriftart7', 7);
    this.setBeleuchtungDerKlingeltasterEnabled(false);
    this.setLichttasterEnabled(false);

    this.namensschildList = [];
    this.initNamensschildList();
    this.eventEmitter.emit('setNamensschildList', []);

    this.setBeschriftungNamensschild(BeschriftungNamensschild.EINSTECKSCHILD_MIT_PAPIEREINLEGER);

    return getPanelsConfig(configId)
      .then((response) => {
        const config = { ...response.payload } as any;
        Object.keys(config).forEach((data) => {
          if (data === 'klingetableu') delete config[data];
        });
        return updateConfig(configId, config);
      });
  }

  public subscribe<T extends keyof KlingetableuPanelEventsType>(
    event: T,
    handler: KlingetableuPanelEventsType[T],
  ): void {
    // TODO небольшой хак, нужно разобраться с типами
    this.eventEmitter.on(event, handler as (...args: any) => void);
  }
}
