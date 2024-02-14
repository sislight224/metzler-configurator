import PanelId from 'enums/PanelId';
import { makeAutoObservable } from 'mobx';
import PanelStore from './PanelStore';
import InnenstationType from '../../enums/data/InnenstationType';
import { innenstationModulesList, InnenstationModulesListType } from '../../data/InnenstationModulesList';
import Image1 from '../../assets/Innenstation/VIewModules/image1.png';
import Image2 from '../../assets/Innenstation/VIewModules/image2.png';
import Image3 from '../../assets/Innenstation/VIewModules/image3.png';
import Image4 from '../../assets/Innenstation/VIewModules/image4.png';
import { updateConfig } from '../../api/metzler/config';
import { ConfigType } from '../../types/configType';
import { ConfigResponse } from '../../types/apiResource';
import _, { cloneDeep } from 'lodash';

export default class InnenstationPanelState {
  public readonly panelId: PanelId = PanelId.INNENSTATION;

  public readonly panelTitle: string = 'Innenstation';

  public innenstationType: InnenstationType = InnenstationType.LAN_POE;

  public minimumCountModules: number = 0;

  public currentCountModules: number = 0;

  public innestationsModulesCount: InnenstationModulesListType[] = [];

  public isError: boolean = false;

  public isRestored: boolean = false;

  public activeInnenstationViewModuleIndex: number = 0;

  public isShowResetModal: boolean = false;

  public innenstationViewModules: string[] = [];

  private readonly _panelStore: PanelStore<InnenstationPanelState>;

  constructor(panelStore: PanelStore<InnenstationPanelState>) {
    this._panelStore = panelStore;
    makeAutoObservable(this, {}, { autoBind: true });

    this.initInnestationsViewModules();
  }

  public getStates() {
    return {
      isCompleted: this._panelStore.isCompleted,
      innenstationType: this.innenstationType,
      minimumCountModules: this.minimumCountModules,
      innestationsModulesCount: cloneDeep(this.innestationsModulesCount),
      activeInnenstationViewModuleIndex: this.activeInnenstationViewModuleIndex,
      innenstationViewModules: cloneDeep(this.innenstationViewModules),
    };
  }

  public setStates(state: InnenstationPanelState & PanelStore<InnenstationPanelState>) {
    this.setInnenstationType(state.innenstationType);
    this.setMinimumCountModules(state.minimumCountModules);
    this.innestationsModulesCount = state.innestationsModulesCount;
    this.setActiveInnenstationViewModuleIndex(state.activeInnenstationViewModuleIndex);
    this.setViewModules(state.innenstationViewModules);
    this.countCommonCountModules();
    this._panelStore.setIsCompleted(state.isCompleted);
  }

  public setInnenstationType(type: InnenstationType): void {
    this.innenstationType = type;
  }

  public setIsShowResetModal(value: boolean): void {
    this.isShowResetModal = value;
  }

  public setActiveInnenstationViewModuleIndex(index: number): void {
    this.activeInnenstationViewModuleIndex = index;
  }

  public setViewModules(viewModules: string[]): void {
    this.innenstationViewModules = viewModules;
  }

  public setMinimumCountModules(value: number): void {
    this.minimumCountModules = value;
  }

  public initInnestationsModules(): void {
    this.innestationsModulesCount = innenstationModulesList;
  }

  public initInnestationsViewModules(): void {
    this.innenstationViewModules = [Image1.src, Image2.src, Image3.src, Image4.src];
  }

  public setErrorStatus(status: boolean): void {
    this.isError = status;
  }

  public compareConfig(config: ConfigType): boolean {
    if (config.innenstation) {
      const { innenstation: state } = config;
      if (!_.isEqual(state?.modules, this.innestationsModulesCount)) return false;
      if (state?.innenstationType !== this.innenstationType) return false;
    }
    return true;
  }

  public updatePanelConfig(configId: string, data: ConfigType): Promise<ConfigResponse> {
    return updateConfig(configId, {
      ...data,
      innenstation: {
        innenstationType: this.innenstationType,
        modules: this.innestationsModulesCount,
      },
    });
  }

  public setIsRestored(isRestored: boolean): void {
    this.isRestored = isRestored;
  }

  public setRemixConfig(): void {
    const { panelsConfig } = this._panelStore.panelsStore;
    if (panelsConfig.innenstation) {
      const { innenstationType, modules } = panelsConfig.innenstation;
      this.innenstationType = innenstationType;
      this.innestationsModulesCount = modules;
    }
    this.countCommonCountModules();
  }

  public setInnestationsModulesCount(value: number, id: number): void {
    this.innestationsModulesCount = this.innestationsModulesCount.map((item) => {
      if (item.id === id) item.value = value;
      return item;
    });
  }

  public countCommonCountModules(): void {
    this.currentCountModules = this.innestationsModulesCount.reduce((initialValue, currentValue) => {
      return initialValue + currentValue.value;
    }, 0);
  }

  public reset(): Promise<ConfigResponse> {
    const { getPanelsConfig, configId } = this._panelStore.panelsStore;

    this.innestationsModulesCount = innenstationModulesList;
    this.currentCountModules = 0;
    this.setInnenstationType(InnenstationType.LAN_POE);

    return getPanelsConfig(configId)
      .then((response) => {
        const config = { ...response.payload } as any;
        Object.keys(config).forEach((data) => {
          if (data === 'innenstation') delete config[data];
        });

        return updateConfig(configId, config);
      });
  }
}
