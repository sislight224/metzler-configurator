import PanelId from 'enums/PanelId';
import { makeAutoObservable } from 'mobx';
import PanelStore from './PanelStore';
import Colors from '../../enums/data/Colors';
import BriefkastenType from '../../enums/data/BriefkastenType';
import briefkastenType from '../../enums/data/BriefkastenType';
import { Namensschild } from './KlingetableuPanelState';
import { updateConfig } from '../../api/metzler/config';
import { ConfigType } from '../../types/configType';
import { ConfigResponse } from '../../types/apiResource';
import EventEmitter from 'eventemitter3';
import { cloneDeep, isEqual } from 'lodash';

export type BriefcastenPanelEventsType = {
  setVisibleDies: (value: boolean) => void;
  setNamensschildList: (value: string[]) => void;
  setType: (value: string) => void;
  setFont: (font: string) => void;
  setHandleColor: (color: boolean) => void;
  setCurrentBriefcasten: (briefcastenId: number) => void;
};

export default class BriefkastenPanelState {
  public readonly panelId: PanelId = PanelId.BRIEFKASTEN;

  public readonly panelTitle: string = 'Briefkasten';

  private readonly _panelStore: PanelStore<BriefkastenPanelState>;

  public namensschildList: Namensschild[] = [];

  public briefkasteType: BriefkastenType = briefkastenType.PAPIEREINLEGER;

  public griffleisteColor: Colors = Colors.STAINLESS_STEEL;

  public schriftart: string = 'Schriftart7';

  public visibleBriefkasteType: boolean = true;

  public isShowResetModal: boolean = false;

  public isError: boolean = false;

  public isRestored: boolean = false;

  private readonly eventEmitter!: EventEmitter<BriefcastenPanelEventsType>;

  constructor(panelStore: PanelStore<BriefkastenPanelState>) {
    this.eventEmitter = new EventEmitter();
    this._panelStore = panelStore;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  public getStates() {
    return {
      isCompleted: this._panelStore.isCompleted,
      namensschildList: cloneDeep(this.namensschildList),
      briefkasteType: this.briefkasteType,
      griffleisteColor: this.griffleisteColor,
      schriftart: this.schriftart,
    };
  }

  public setVisibleType(visible: boolean): void {
    this.visibleBriefkasteType = visible;
  }

  public setStates(state: BriefkastenPanelState & PanelStore<BriefkastenPanelState>) {
    if (!isEqual(this.namensschildList, state.namensschildList)) {
      this.namensschildList = state.namensschildList;
      const newNamensschildList = state.namensschildList.map((item) => item.value);
      this.eventEmitter.emit('setNamensschildList', newNamensschildList);
    }
    if (!isEqual(this.briefkasteType, state.briefkasteType)) {
      this.setBriefkasteType(state.briefkasteType);
    }
    if (!isEqual(this.griffleisteColor, state.griffleisteColor)) {
      this.setGriffleisteColor(state.griffleisteColor);
    }
    if (!isEqual(this.schriftart, state.schriftart)) {
      const fontNumber = state.schriftart?.replace(/\D+/g, '') || '2';
      this.setSchriftart(state.schriftart, Number(fontNumber));
    }
    this._panelStore.setIsCompleted(state.isCompleted);
  }

  public setBriefkasteType(type: briefkastenType): void {
    this.briefkasteType = type;

    if (type === briefkastenType.GRAVUR) {
      this.eventEmitter.emit('setType', 'engrave');
    }
    if (type === briefkastenType.PAPIEREINLEGER) {
      this.eventEmitter.emit('setType', 'plate');
    }
  }

  public setIsError(value: boolean): void {
    this.isError = value;
  }

  public setSchriftart(value: string, fontIndex: number): void {
    this.schriftart = value;
    this.eventEmitter.emit('setFont', `schriftart_${fontIndex}`);
  }

  public setIsRestored(isRestored: boolean): void {
    this.isRestored = isRestored;
  }

  public initNamensschildList(mailBoxCount: number, list?: Namensschild[]): void {
    const namesList = list;
    if (namesList && namesList.length > 0) {
      const lastNames = [...this.namensschildList];
      this.namensschildList = namesList;
      if (this.namensschildList.length < mailBoxCount) {
        const difference = mailBoxCount - this.namensschildList.length;
        const newList = Array.from({ length: difference }).map((_item, index) => {
          const value = lastNames[lastNames.length - (index + 1)];
          const newValue = value ? value.value : '';
          return {
            value: newValue,
            id: this.namensschildList.length + index + 1,
          };
        });
        this.namensschildList = this.namensschildList.concat(newList);
      }
      if (this.namensschildList.length > mailBoxCount) {
        this.namensschildList.splice(mailBoxCount, this.namensschildList.length - mailBoxCount);
      }
    } else {
      this.namensschildList = Array.from({ length: mailBoxCount }).map((_, index) => {
        return {
          value: this.namensschildList[index]?.value || '',
          id: index + 1,
        };
      });
    }
  }

  public setIsShowResetModal(value: boolean): void {
    this.isShowResetModal = value;
  }

  public compareConfig(config: ConfigType): boolean {
    if (config.briefkasten) {
      const { briefkasten: state } = config;
      if (state?.briefkasteType !== this.briefkasteType) return false;
      if (state?.schriftart !== this.schriftart) return false;
      if (state.griffleisteColor !== this.griffleisteColor) return false;
    }
    return true;
  }

  public setGriffleisteColor(color: Colors): void {
    this.griffleisteColor = color;

    if (color === Colors.STAINLESS_STEEL) {
      this.eventEmitter.emit('setHandleColor', false);
    } else this.eventEmitter.emit('setHandleColor', true);
  }

  public setVisibleDies(visible: boolean): void {
    this.eventEmitter.emit('setVisibleDies', visible);
  }

  public updatePanelConfig(configId: string, data: ConfigType): Promise<ConfigResponse> {
    return updateConfig(configId, {
      ...data,
      briefkasten: {
        griffleisteColor: this.griffleisteColor,
        briefkasteType: this.briefkasteType,
        schriftart: this.schriftart,
        namensschildList: this.namensschildList,
      },
    });
  }

  public setRemixConfig(): void {
    const { panelsConfig } = this._panelStore.panelsStore;
    if (panelsConfig.briefkasten && panelsConfig.montage) {
      const { griffleisteColor, briefkasteType, schriftart, namensschildList } = panelsConfig.briefkasten;
      const { mailBoxes } = panelsConfig.montage;

      const klingNamensschildList = panelsConfig[PanelId.KLINGETABLEU]?.namensschildList;
      if (namensschildList) {
        const names = namensschildList.length > 0 ? namensschildList : klingNamensschildList;
        this.initNamensschildList(mailBoxes, names);
        if (names) {
          const newNamensschildList = names.map((item) => item.value);
          this.eventEmitter.emit('setNamensschildList', newNamensschildList);
        }
      }

      const fontIndex = parseInt(schriftart.replace(/\D/g, ''), 10) || 0;
      this.setSchriftart(schriftart, fontIndex);

      this.setBriefkasteType(briefkasteType);
      this.setGriffleisteColor(griffleisteColor as Colors);
    }
  }

  public initPanel(config: ConfigType): void {
    const { briefkasten } = config;
    if (briefkasten) {
      this.schriftart = briefkasten.schriftart;
      this.griffleisteColor = briefkasten.griffleisteColor as Colors;
      this.briefkasteType = briefkasten.briefkasteType;
    }
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

  public subscribe<T extends keyof BriefcastenPanelEventsType>(
    event: T,
    handler: BriefcastenPanelEventsType[T],
  ): void {
    // TODO небольшой хак, нужно разобраться с типами
    this.eventEmitter.on(event, handler as (...args: any) => void);
  }

  public setCurrentBriefcasten(value: number): void {
    this.eventEmitter.emit('setCurrentBriefcasten', value);
  }

  public reset(): Promise<ConfigResponse> {
    const { getPanelsConfig, configId } = this._panelStore.panelsStore;
    const { state: montageState } = this._panelStore.panelsStore.montagePanelStore;
    const { state: klingetableuState } = this._panelStore.panelsStore.klingetableuPanelStore;

    const schriftartIndex = Number(klingetableuState.schriftart?.replace(/\D+/g, '') || 7);
    this.setSchriftart(klingetableuState.schriftart, schriftartIndex);
    this.setGriffleisteColor(Colors.ANTRAHZIT);

    const namensschildList = [...klingetableuState.namensschildList];
    this.initNamensschildList(montageState.mailBoxesCount, namensschildList);

    this.eventEmitter.emit('setCurrentBriefcasten', 999);

    return getPanelsConfig(configId)
      .then((response) => {
        const config = { ...response.payload } as any;
        Object.keys(config).forEach((data) => {
          if (data === 'briefkasten') delete config[data];
        });
        return updateConfig(configId, config);
      });
  }
}
