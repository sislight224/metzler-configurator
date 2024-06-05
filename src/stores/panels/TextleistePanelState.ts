import PanelId from "enums/PanelId";
import PanelStore from "./PanelStore";
import { makeAutoObservable } from "mobx";
import Textausrichtung from "enums/data/Textausrichtung";
import { updateConfig } from "../../api/metzler/config";
import { ConfigType } from "../../types/configType";
import { ConfigResponse } from "../../types/apiResource";
import EventEmitter from "eventemitter3";
import { isEqual } from "lodash";

export type TextleistePanelEventsType = {
  setIsBeschriftungEnabled: (value: boolean) => void;
  setName: (name: string) => void;
  setSide: (side: Textausrichtung) => void;
  setLed: (value: boolean) => void;
  setIsAddon: () => void;
};

export default class TextleistePanelState {
  public readonly panelId: PanelId = PanelId.TEXTLEISTE;

  public readonly panelTitle: string = "3D-Textleiste";

  public beschriftungOberhalbIsEnabled: boolean = false;

  public beschriftung: string = "";

  public textausrichtung: Textausrichtung = Textausrichtung.LINKS;

  public hintergrundbeleuchtungIsEnabled: boolean = false;

  public isRestored: boolean = false;

  public isEnabled: boolean = false;

  private readonly _panelStore: PanelStore<TextleistePanelState>;

  private readonly eventEmitter!: EventEmitter<TextleistePanelEventsType>;

  public isError: boolean = false;

  constructor(panelStore: PanelStore<TextleistePanelState>) {
    this._panelStore = panelStore;
    this.eventEmitter = new EventEmitter<TextleistePanelEventsType>();
    makeAutoObservable(this, {}, { autoBind: true });
  }

  public getStates() {
    return {
      isCompleted: this._panelStore.isCompleted,
      beschriftungOberhalbIsEnabled: this.beschriftungOberhalbIsEnabled,
      beschriftung: this.beschriftung,
      textausrichtung: this.textausrichtung,
      hintergrundbeleuchtungIsEnabled: this.hintergrundbeleuchtungIsEnabled,
      isEnabled: this.isEnabled,
    };
  }

  public setStates(
    state: TextleistePanelState & PanelStore<TextleistePanelState>
  ) {
    if (
      !isEqual(
        this.beschriftungOberhalbIsEnabled,
        state.beschriftungOberhalbIsEnabled
      )
    ) {
      this.setBeschriftungOberhalbIsEnabled(
        state.beschriftungOberhalbIsEnabled
      );
    }
    if (!isEqual(this.beschriftung, state.beschriftung)) {
      this.setBeschriftung(state.beschriftung);
    }
    if (!isEqual(this.textausrichtung, state.textausrichtung)) {
      this.setTextausrichtung(state.textausrichtung);
    }
    if (
      !isEqual(
        this.hintergrundbeleuchtungIsEnabled,
        state.hintergrundbeleuchtungIsEnabled
      )
    ) {
      this.setHintergrundbeleuchtungIsEnabled(
        state.hintergrundbeleuchtungIsEnabled
      );
    }
    this._panelStore.setIsCompleted(state.isCompleted);
  }

  public setIsError(isError: boolean): void {
    this.isError = isError;
  }

  public setIsEnabled(value: boolean): void {
    this.isEnabled = value;
  }

  public setBeschriftungOberhalbIsEnabled(value: boolean): void {
    this.beschriftungOberhalbIsEnabled = value;
    this.eventEmitter.emit("setIsBeschriftungEnabled", value);
  }

  public setBeschriftungDefaultValue(value: string): void {
    this.eventEmitter.emit("setName", value);
  }

  public setBeschriftung(value: string): void {
    this.beschriftung = value;
    this.eventEmitter.emit("setName", value);
  }

  public updatePanelConfig(
    configId: string,
    data: ConfigType
  ): Promise<ConfigResponse> {
    return updateConfig(configId, {
      ...data,
      textleiste: {
        beschriftungOberhalbIsEnabled: this.beschriftungOberhalbIsEnabled,
        hintergrundbeleuchtungIsEnabled: this.hintergrundbeleuchtungIsEnabled,
        textausrichtung: this.textausrichtung,
        beschriftung: this.beschriftung,
      },
    });
  }

  public initPanel(config: ConfigType): void {
    const { textleiste } = config;
    if (textleiste) {
      this.hintergrundbeleuchtungIsEnabled =
        textleiste.hintergrundbeleuchtungIsEnabled;
      this.beschriftung = textleiste.beschriftung;
      this.beschriftungOberhalbIsEnabled =
        textleiste.beschriftungOberhalbIsEnabled;
      this.textausrichtung = textleiste.textausrichtung;
    }
  }

  public setRemixConfig(): void {
    const { panelsConfig } = this._panelStore.panelsStore;
    if (panelsConfig.textleiste) {
      const {
        beschriftungOberhalbIsEnabled,
        hintergrundbeleuchtungIsEnabled,
        textausrichtung,
        beschriftung,
      } = panelsConfig.textleiste;

      this.beschriftungOberhalbIsEnabled = beschriftungOberhalbIsEnabled;
      this.eventEmitter.emit(
        "setIsBeschriftungEnabled",
        beschriftungOberhalbIsEnabled
      );

      this.hintergrundbeleuchtungIsEnabled = hintergrundbeleuchtungIsEnabled;
      this.eventEmitter.emit("setLed", hintergrundbeleuchtungIsEnabled);

      this.textausrichtung = textausrichtung;
      this.eventEmitter.emit("setSide", textausrichtung);

      this.beschriftung = beschriftung;
      this.eventEmitter.emit("setName", beschriftung);
    }
  }

  public setTextausrichtung(value: Textausrichtung): void {
    this.textausrichtung = value;
    this.eventEmitter.emit("setSide", value);
  }

  public setHintergrundbeleuchtungIsEnabled(value: boolean): void {
    this.hintergrundbeleuchtungIsEnabled = value;
    this.eventEmitter.emit("setLed", value);
  }

  public subscribe<T extends keyof TextleistePanelEventsType>(
    event: T,
    handler: TextleistePanelEventsType[T]
  ): void {
    // TODO небольшой хак, нужно разобраться с типами
    this.eventEmitter.on(event, handler as (...args: any) => void);
  }

  public setIsAddon(): void {
    this.eventEmitter.emit("setIsAddon");
  }

  public setIsRestored(isRestored: boolean): void {
    this.isRestored = isRestored;
  }

  public reset(): Promise<ConfigResponse> {
    const { getPanelsConfig, configId } = this._panelStore.panelsStore;
    this._panelStore.setIsCompleted(false);
    this.setBeschriftungOberhalbIsEnabled(false);

    this.setBeschriftung("");
    this.setIsError(false);
    this.eventEmitter.emit("setName", "Metzler");

    this.setTextausrichtung(Textausrichtung.MITTE);
    this.setHintergrundbeleuchtungIsEnabled(false);
    return getPanelsConfig(configId).then((response) => {
      const config = { ...response.payload } as any;
      Object.keys(config).forEach((data) => {
        if (data === "textleiste") {
          delete config[data];
        }
      });
      return updateConfig(configId, config);
    });
  }
}
