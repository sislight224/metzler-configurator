import { action, makeAutoObservable } from 'mobx';
import PanelsStore from 'stores/PanelsStore';
import { ConfigType } from '../types/configType';
import { appConfig } from '../config/appConfig';
import MontageType from '../enums/data/MontageType';
import Textausrichtung from '../enums/data/Textausrichtung';
import { PuzzleType } from '../types/PuzzleType';
import ControlsStore from './ControlsStore';
import UndoRedoStore from './UndoRedoStore';
import { VergeConfig } from '../config/vergeConfig';
import { SceneViewport } from '../modules';
import CalculatorStore from './CalculatorStore';

export default class EditorStore {
  public controlsStore!: ControlsStore;

  public undoRedoStore!: UndoRedoStore;

  public panelsStore!: PanelsStore;

  public calculatorStore!: CalculatorStore;

  public puzzles!: PuzzleType;

  private _sceneUrl: string = '';

  private _logicUrl: string = '';

  private _vergeId: string = '';

  public isInitialize: boolean = false;

  public isLoading: boolean = false;

  public isLoadingPreview: boolean = false;

  public previewMailsUrl: string = '';

  public configUrl: string = '';

  public sceneViewport!: SceneViewport;

  isShowScene: boolean = false;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    this.calculatorStore = new CalculatorStore();
    this.initializeEditor(appConfig);
  }

  public get vergeId(): string {
    return this._vergeId;
  }

  public get logicUrl(): string {
    return this._logicUrl;
  }

  public get sceneUrl(): string {
    return this._sceneUrl;
  }

  public setVergeConfig(config: VergeConfig): void {
    this._sceneUrl = config.sceneURL;
    this._logicUrl = config.logicURL;
    this._vergeId = config.id;
  }

  public setPreview(): Promise<void> {
    this.isLoadingPreview = true;
    const VARS = window._VARS;
    VARS._STATE_scene['defalult_cam position'] = true;
    VARS._STATE_skeleton.cam_addon_target = false;
    this.puzzles.procedures.cam_position();

    // setTimeout нужен из-за долгой анимации камеры
    return new Promise((resolve) => {
      resolve();
      setTimeout(() => {
        VARS._STATE_scene.background = 'default';
        this.puzzles.procedures.scene();
        this.getScreenshot()
          .then(action((preview) => {
            this.setIsShowScene(false);
            this.isLoadingPreview = false;
            this.previewMailsUrl = preview;
          }))
          .finally(() => {
            VARS._STATE_scene.background = this.controlsStore.backgroundName;
            this.puzzles.procedures.set_ruler_visibility(false);
            this.puzzles.procedures.scene();
            this.updateViewOffset(window.innerWidth, window.innerHeight);
            this.pauseRenderer();
          });
      }, 2500);
    });
  }

  public initializeEditor(config: ConfigType): void {
    this.panelsStore = new PanelsStore(this, config);
    this.controlsStore = new ControlsStore();
    this.undoRedoStore = new UndoRedoStore(this.panelsStore.getAllStates(), this.panelsStore);
  }

  public setConfigUrl(url: string): void {
    this.configUrl = url;
  }

  public initVerge(puzzles: PuzzleType, scene: any): void {
    const VARS = window._VARS;
    this.puzzles = puzzles;
    this.sceneViewport = new SceneViewport({ scene });

    this.sceneSubscribe(VARS);
    this.controlsSubscribe(VARS);
    this.initScene(VARS);
  }

  private initScene(VARS: typeof window._VARS): void {
    setTimeout(() => {
      this.setIsInitialize(true);
    }, 1000);

    VARS._STATE_skeleton.transparent = false;

    setTimeout(() => {
      this.isLoading = true;
      VARS._STATE_scene['defalult_cam position'] = true;
      this.puzzles.procedures.cam_position();
      VARS._STATE_skeleton.transparent = true;
      this.puzzles.procedures.set_transparent();
      this.puzzles.procedures.configure_basic_plates();
      this.setNames();
    }, 2500);
  }

  public updateViewOffset(width: number, height: number): void {
    this.sceneViewport.updateSceneViewOffset(width, height);
  }

  public runRenderer(): void {
    this.sceneViewport.runRendererCycle();
  }

  public pauseRenderer(): void {
    this.sceneViewport.pauseRendererCycle();
  }

  setIsShowScene(value: boolean): void {
    this.isShowScene = value;
  }

  public setIsInitialize(value: boolean): void {
    this.isInitialize = value;
  }

  public getScreenshot(): Promise<string> {
    return this.puzzles.procedures.make_screenshot();
  }

  private controlsSubscribe(VARS: typeof window._VARS): void {
    this.controlsStore.subscribe('setIsShowRuler', (value) => {
      this.puzzles.procedures.set_ruler_visibility(value);
    });

    this.controlsStore.subscribe('setMailSizes', () => {
      this.puzzles.procedures.set_ruler_visibility(true);
      this.controlsStore.mailWidth = VARS.calculated_width;
      this.controlsStore.mailDepth = VARS.calculated_depth;
      this.controlsStore.mailHeight = VARS.calculated_height;
    });

    this.controlsStore.subscribe('setBackground', (background) => {
      VARS._STATE_scene.background = background;
      this.puzzles.procedures.scene();
    });

    this.controlsStore.subscribe('zoomOut', () => {
      VARS._STATE_scene.zoom_step = this.sceneViewport.zoomDistance;
      this.puzzles.procedures.zoom_out();
    });

    this.controlsStore.subscribe('setTransparent', (value: boolean) => {
      VARS._STATE_skeleton.transparent = value;
      this.puzzles.procedures.set_transparent();
    });

    this.controlsStore.subscribe('zoomIn', () => {
      VARS._STATE_scene.zoom_step = this.sceneViewport.zoomDistance;
      this.puzzles.procedures.zoom_in();
    });
  }

  private sceneSubscribe(VARS: typeof window._VARS): void {
    this.montagePanelSubscribe(VARS);
    this.zusatzmodulPanelSubscribe(VARS);
    this.textleistePanelSubscribe(VARS);
    this.klingetableuPanelSubscribe(VARS);
    this.briefkastenPanelSubscribe(VARS);
    this.klingetableuPanelSubscribe(VARS);
    this.zusatzmodulErweiterunPanelSubscribe(VARS);
    this.lichttasterPanelSubscribe(VARS);
  }

  private montagePanelSubscribe(VARS: typeof window._VARS): void {
    this.panelsStore.montagePanelStore.state.subscribe('setMontageType', (type) => {
      if (type === MontageType.WANDMONTAGE) {
        VARS._STATE_skeleton.mounting = true;
        VARS._STATE_skeleton.screws = true;
      }
      if (type === MontageType.EINBETONIEREN) {
        VARS._STATE_skeleton.mounting = false;
        VARS._STATE_skeleton.screws = true;
      }
      if (type === MontageType.ANSCHRAUBEN) {
        VARS._STATE_skeleton.screws = false;
        VARS._STATE_skeleton.mounting = false;
      }
      this.puzzles.procedures.configure_mounting();
      this.setNames();
    });

    this.panelsStore.montagePanelStore.state.subscribe('setIsAddon', () => {
      VARS._STATE_scene['defalult_cam position'] = true;
      this.puzzles.procedures.cam_position();
      this.setNames();
    });

    this.panelsStore.montagePanelStore.state.subscribe('setMailBoxesCount', (count) => {
      VARS._STATE_skeleton.amount = count;
      VARS._STATE_skeleton.cam_addon_target = false;
      VARS._STATE_basic_module.id = -9;
      VARS._STATE_scene['defalult_cam position'] = true;
      this.puzzles.procedures.cofigure_skeleton();
      this.setNames();
    });
  }

  private zusatzmodulPanelSubscribe(VARS: typeof window._VARS): void {
    this.panelsStore.zusatzmodulPanelStore.state.subscribe('setMailRanksCount', (count) => {
      VARS._STATE_skeleton.rows = count;
      this.puzzles.procedures.cofigure_skeleton();
      VARS._STATE_skeleton.cam_addon_target = false;
      VARS._STATE_basic_module.id = -9;
      VARS._STATE_scene['defalult_cam position'] = true;
      this.puzzles.procedures.cam_position();
      this.setNames();
    });

    this.panelsStore.zusatzmodulPanelStore.state.subscribe('setIsAddonModule', (value) => {
      VARS._STATE_skeleton.addon_module = value;
      this.puzzles.procedures.cofigure_skeleton();
      VARS._STATE_skeleton.cam_addon_target = this.panelsStore.zusatzmodulPanelStore.state.zusatzmodulType.value !== 'ohne';
      this.puzzles.procedures.cam_position();
      VARS._STATE_skeleton.cam_addon_target = true;
      this.puzzles.procedures.cam_position();
      this.setNames();
    });

    this.panelsStore.zusatzmodulPanelStore.state.subscribe('setAddonModulePosition', (value) => {
      VARS._STATE_skeleton.mirrored = value;
      this.puzzles.procedures.cofigure_skeleton();
      this.puzzles.procedures.cam_position();
      VARS._STATE_skeleton.cam_addon_target = true;
      this.puzzles.procedures.cam_position();
      this.setNames();
    });

    this.panelsStore.zusatzmodulPanelStore.state.subscribe('setIsAddonPlatesVisible', (value) => {
      VARS._STATE_addon_plates.visible = value;
      this.puzzles.procedures.cofigure_skeleton();
      VARS._STATE_skeleton.cam_addon_target = true;
      this.puzzles.procedures.cam_position();
      this.setNames();
    });

    this.panelsStore.zusatzmodulPanelStore.state.subscribe('setIsCamera', (value) => {
      VARS._STATE_addon_module.camera = value;
      this.puzzles.procedures.configure_addon_module();
      VARS._STATE_skeleton.cam_addon_target = true;
      this.puzzles.procedures.cam_position();
      this.setNames();
    });

    this.panelsStore.zusatzmodulPanelStore.state.subscribe('setIsAudio', (value) => {
      VARS._STATE_addon_module.audio = value;
      this.puzzles.procedures.configure_addon_module();
      VARS._STATE_skeleton.cam_addon_target = true;
      this.puzzles.procedures.cam_position();
      this.setNames();
    });
  }

  private textleistePanelSubscribe(VARS: typeof window._VARS): void {
    this.panelsStore.textleistePanelStore.state.subscribe('setIsBeschriftungEnabled', (value) => {
      VARS._STATE_top_lable.top_lable = value;
      if (value) VARS._STATE_top_lable.default_name = 'Metzler';
      this.puzzles.procedures.cofigure_skeleton();
      this.setNames();
    });

    this.panelsStore.textleistePanelStore.state.subscribe('setIsAddon', () => {
      VARS._STATE_skeleton.cam_addon_target = false;
      VARS._STATE_basic_module.id = -9;
      VARS._STATE_scene['defalult_cam position'] = true;
      this.puzzles.procedures.cam_position();
      this.setNames();
    });

    this.panelsStore.textleistePanelStore.state.subscribe('setName', (value) => {
      VARS._STATE_top_lable.name = value;
      this.puzzles.procedures.cofigure_skeleton();
      this.setNames();
    });

    this.panelsStore.textleistePanelStore.state.subscribe('setLed', (value) => {
      VARS._STATE_top_lable.light_on = value;
      this.puzzles.procedures.light_on();
      this.setNames();
    });

    this.panelsStore.textleistePanelStore.state.subscribe('setSide', (value) => {
      if (value === Textausrichtung.MITTE) VARS._STATE_top_lable.top_text = 'center';
      if (value === Textausrichtung.RECHTS) VARS._STATE_top_lable.top_text = 'right';
      if (value === Textausrichtung.LINKS) VARS._STATE_top_lable.top_text = 'left';
      this.puzzles.procedures.cofigure_skeleton();
      this.setNames();
    });
  }

  private klingetableuPanelSubscribe(VARS: typeof window._VARS): void {
    this.panelsStore.klingetableuPanelStore.state.subscribe('setKlingColor', (value) => {
      VARS._STATE_addon_plates.light_ring_color = value;
      this.puzzles.procedures.light_on();
      VARS._STATE_skeleton.cam_addon_target = true;
      this.puzzles.procedures.cam_position();
      this.setNames();
    });

    this.panelsStore.klingetableuPanelStore.state.subscribe('setAddonLight', (value) => {
      VARS._STATE_addon_module.light_button = value;
      VARS._STATE_addon_plates.light_ring = value;
      this.puzzles.procedures.configure_addon_module();
      this.puzzles.procedures.configure_addon_plates();
      VARS._STATE_skeleton.cam_addon_target = true;
      this.puzzles.procedures.cam_position();
      this.setNames();
    });

    this.panelsStore.klingetableuPanelStore.state.subscribe('setNamensschildList', (value) => {
      VARS._STATE_addon_plates.names = value;
      this.puzzles.procedures.configure_plates_names();
      VARS._STATE_skeleton.cam_addon_target = true;
      this.puzzles.procedures.cam_position();
    });

    this.panelsStore.klingetableuPanelStore.state.subscribe('setType', (value) => {
      VARS._STATE_addon_plates.type = value;
      this.puzzles.procedures.configure_addon_plates();
      VARS._STATE_skeleton.cam_addon_target = true;
      this.puzzles.procedures.cam_position();
      this.setNames();
    });

    this.panelsStore.klingetableuPanelStore.state.subscribe('setKlingLight', (value) => {
      VARS._STATE_addon_plates.light_ring_on = value;
      this.puzzles.procedures.light_on();
      VARS._STATE_skeleton.cam_addon_target = true;
      this.puzzles.procedures.cam_position();
      this.setNames();
    });

    this.panelsStore.klingetableuPanelStore.state.subscribe('setFont', (value) => {
      VARS._STATE_addon_plates.font = value;
      this.puzzles.procedures.configure_addon_plates();

      VARS._STATE_skeleton.cam_addon_target = true;
      this.setNames();
      this.puzzles.procedures.cam_position();
    });

    this.panelsStore.klingetableuPanelStore.state.subscribe('setKlingeltasterCount', (value) => {
      VARS._STATE_addon_plates.amount = value;
      VARS._STATE_addon_plates.custom = true;
      this.puzzles.procedures.cofigure_skeleton();
      this.setNames();
    });

    this.panelsStore.klingetableuPanelStore.state.subscribe('setIsLightPaper', (isLight) => {
      VARS._STATE_addon_plates.light_on = isLight;
      this.puzzles.procedures.light_on();
      VARS._STATE_skeleton.cam_addon_target = true;
      this.puzzles.procedures.cam_position();
      this.setNames();
    });
  }

  private briefkastenPanelSubscribe(VARS: typeof window._VARS): void {
    this.panelsStore.briefkastenPanelStore.state.subscribe('setVisibleDies', (value) => {
      VARS._STATE_basic_plates.visible = value;
      this.puzzles.procedures.configure_basic_plates();
      this.setNames();
    });

    this.panelsStore.briefkastenPanelStore.state.subscribe('setCurrentBriefcasten', (briefcastenId) => {
      VARS._STATE_basic_module.id = briefcastenId + 1;
      VARS._STATE_skeleton.cam_addon_target = false;
      this.puzzles.procedures.cam_position();
      this.setNames();
    });

    this.panelsStore.briefkastenPanelStore.state.subscribe('setNamensschildList', (value) => {
      VARS._STATE_basic_plates.names = value;
      if (!value.length) {
        VARS._STATE_basic_plates.default_name = 'METZLER';
        this.puzzles.procedures.configure_basic_plates();
      }
      this.puzzles.procedures.configure_plates_names();
    });

    this.panelsStore.briefkastenPanelStore.state.subscribe('setType', (value) => {
      VARS._STATE_basic_plates.type = value;
      this.puzzles.procedures.configure_basic_plates();
      this.setNames();
    });

    this.panelsStore.briefkastenPanelStore.state.subscribe('setFont', (value) => {
      VARS._STATE_basic_plates.font = value;
      this.puzzles.procedures.configure_basic_plates();
      this.setNames();
    });

    this.panelsStore.briefkastenPanelStore.state.subscribe('setHandleColor', (value) => {
      VARS._STATE_skeleton.handle_color = value;
      this.puzzles.procedures.chenge_handle_color();
      VARS._STATE_skeleton.cam_addon_target = true;
      this.puzzles.procedures.cam_position();
      this.setNames();
    });
  }

  private zusatzmodulErweiterunPanelSubscribe(VARS: typeof window._VARS): void {
    this.panelsStore.zusatzmodulErweiterunPanelStore.state.subscribe('setRfid', (value) => {
      VARS._STATE_addon_module.RFID = value;
      this.puzzles.procedures.configure_addon_module();
      VARS._STATE_skeleton.cam_addon_target = true;
      this.puzzles.procedures.cam_position();
      this.setNames();
    });

    this.panelsStore.zusatzmodulErweiterunPanelStore.state.subscribe('setTouchDisplay', (value) => {
      VARS._STATE_addon_module.touch = value;
      this.puzzles.procedures.configure_addon_module();
      VARS._STATE_skeleton.cam_addon_target = true;
      this.puzzles.procedures.cam_position();
      this.setNames();
    });

    this.panelsStore.zusatzmodulErweiterunPanelStore.state.subscribe('setKlingVisible', (value) => {
      VARS._STATE_addon_plates.visible = value;
      this.puzzles.procedures.configure_addon_plates();
      VARS._STATE_skeleton.cam_addon_target = true;
      this.puzzles.procedures.cam_position();
      this.setNames();
    });
  }

  private lichttasterPanelSubscribe(VARS: typeof window._VARS): void {
    this.panelsStore.lichttasterPanelStore.state.subscribe('setLight', (value) => {
      VARS._STATE_addon_module.light_button = value;
      this.puzzles.procedures.configure_addon_module();
      VARS._STATE_skeleton.cam_addon_target = true;
      this.puzzles.procedures.cam_position();
      this.puzzles.procedures.configure_addon_plates();
      this.setNames();
    });

    this.panelsStore.lichttasterPanelStore.state.subscribe('setIsAddon', (value) => {
      VARS._STATE_skeleton.cam_addon_target = value;
      VARS._STATE_skeleton.cam_addon_target = true;
      this.puzzles.procedures.cam_position();
    });
  }

  private setNames(): void {
    setTimeout(() => {
      const VARS = window._VARS;
      VARS._STATE_addon_plates.names = this.panelsStore.klingetableuPanelStore.state.namensschildList
        .map((item) => item.value);

      VARS._STATE_basic_plates.names = this.panelsStore.briefkastenPanelStore.state.namensschildList
        .map((item) => item.value);

      this.puzzles.procedures.configure_plates_names();
    }, 100);
  }
}
