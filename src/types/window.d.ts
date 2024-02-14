export {};

declare global {
  interface Window {
    html2canvas : (element: HTMLElement) => Promise;
    _VARS: {
      calculated_width: number;
      calculated_height: number;
      calculated_depth: number;
      calc_dimensions: () => void;
      _STATE_scene: {
        background: string;
        zoom_step: number;
        'defalult_cam position': boolean;
      };
      _STATE_skeleton: {
        mirrored: boolean;
        transparent: boolean;
        amount: number;
        rows: number;
        addon_module: boolean;
        rows_avto: boolean;
        mounting: boolean;
        cam_addon_target: boolean;
        handle_color: boolean;
        light_on: boolean;
        top_lable: boolean;
        screws: boolean;
      };
      _STATE_addon_plates: {
        visible: boolean;
        custom: boolean;
        type: string;
        amount: number;
        names: string[];
        font: string;
        default_name: string;
        light_ring: boolean;
        light_ring_on: boolean;
        light_on: boolean;
        light_ring_color: string;
      };
      _STATE_basic_plates: {
        visible: boolean;
        type: string;
        names: any;
        font: string;
        default_name: string;
      };
      _STATE_basic_module: {
        id: number;
      };
      _STATE_addon_module: {
        light_button: boolean;
        camera: boolean;
        RFID: boolean;
        touch: boolean;
        audio: boolean;
        paper_engraving: boolean;
      };
      _STATE_top_lable: {
        top_lable: boolean;
        name: string;
        default_name: string;
        top_text: string;
        light_on: boolean;
      };
    };
  }
}
