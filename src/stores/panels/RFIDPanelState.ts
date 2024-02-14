import PanelId from 'enums/PanelId';
import { makeAutoObservable } from 'mobx';
import PanelStore from './PanelStore';
import { updateConfig } from '../../api/metzler/config';
import { ConfigType } from '../../types/configType';
import { ConfigResponse } from '../../types/apiResource';
import _, { cloneDeep } from 'lodash';

export interface RFIDModule {
  modulePrice?: string;
  moduleName: RFIDCardsEnum;
  countModule: number;
}
export enum RFIDCardsEnum {
  REGULAR = 'regular',
  EXCLUSIVE = 'exclusive',
  SCHLUSSELANHANGER = 'schlusselanhanger',
}
export default class RFIDPanelState {
  public readonly panelId: PanelId = PanelId.RFID;

  public readonly panelTitle: string = 'RFID Zugangskontrolle';

  private exclusiveCard: RFIDModule | null = null;

  public isShowResetModal: boolean = false;

  private regularCard: RFIDModule | null = null;

  public isRestored: boolean = false;

  private schlusselanhangerCard: RFIDModule | null = null;

  public RFIDCard: Record<RFIDCardsEnum, RFIDModule | null> = {
    [RFIDCardsEnum.REGULAR]: this.regularCard,
    [RFIDCardsEnum.EXCLUSIVE]: this.exclusiveCard,
    [RFIDCardsEnum.SCHLUSSELANHANGER]: this.schlusselanhangerCard,
  };

  private readonly _panelStore: PanelStore<RFIDPanelState>;

  constructor(panelStore: PanelStore<RFIDPanelState>) {
    this._panelStore = panelStore;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  public getStates() {
    return {
      isCompleted: this._panelStore.isCompleted,
      RFIDCard: cloneDeep(this.RFIDCard),
    };
  }

  public setStates(state: RFIDPanelState & PanelStore<RFIDPanelState>) {
    this.RFIDCard = state.RFIDCard;
    this._panelStore.setIsCompleted(state.isCompleted);
  }

  public updatePanelConfig(configId: string, data: ConfigType): Promise<ConfigResponse> {
    return updateConfig(configId, {
      ...data,
      [PanelId.RFID]: {
        exclusiveCard: { ...this.RFIDCard.exclusive } as RFIDModule,
        regularCard: { ...this.RFIDCard.regular } as RFIDModule,
        schlusselanhangerCard: { ...this.RFIDCard.schlusselanhanger } as RFIDModule,
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
    if (panelsConfig[PanelId.RFID]) {
      const { regularCard, exclusiveCard, schlusselanhangerCard } = panelsConfig[PanelId.RFID];
      if (regularCard) this.setDataCard(regularCard);
      if (exclusiveCard) this.setDataCard(exclusiveCard);
      if (schlusselanhangerCard) this.setDataCard(schlusselanhangerCard);
    }
  }

  public compareConfig(config: ConfigType): boolean {
    const state = config[PanelId.RFID];
    if (state) {
      if (!_.isEqual(state?.regularCard, this.getDataCard(RFIDCardsEnum.REGULAR))) return false;
      if (!_.isEqual(state?.schlusselanhangerCard, this.getDataCard(RFIDCardsEnum.SCHLUSSELANHANGER))) return false;
    }
    return true;
  }

  public initPanel(config: ConfigType): void {
    const state = config[PanelId.RFID];
    if (state) {
      if (state.schlusselanhangerCard) this.setDataCard(state.schlusselanhangerCard);
      if (state.regularCard) this.setDataCard(state.regularCard);
    }
  }

  public setDataCard(data: RFIDModule): void {
    this.RFIDCard[data.moduleName] = { ...data };
  }

  public getDataCard(cardName: RFIDCardsEnum): RFIDModule | null {
    return this.RFIDCard[cardName];
  }

  public reset(): Promise<ConfigResponse> {
    const { getPanelsConfig, configId } = this._panelStore.panelsStore;

    this.setDataCard({ countModule: 0, moduleName: RFIDCardsEnum.REGULAR, modulePrice: '299,99' });
    this.setDataCard({ countModule: 0, moduleName: RFIDCardsEnum.EXCLUSIVE, modulePrice: '0' });
    this.setDataCard({ countModule: 0, moduleName: RFIDCardsEnum.SCHLUSSELANHANGER, modulePrice: '399,99' });

    return getPanelsConfig(configId)
      .then((response) => {
        const config = { ...response.payload } as any;
        Object.keys(config).forEach((data) => {
          if (data === 'RFID') delete config[data];
        });
        return updateConfig(configId, config);
      });
  }
}
