export interface PuzzleType {
  procedures: {
    chenge_handle_color: () => void;
    cam_position: () => void;
    clone_group: () => void;
    cofigure_skeleton: () => void;
    configure_addon_module: () => void;
    configure_addon_plates: () => void;
    configure_basic_plates: () => void;
    configure_mounting: () => void;
    configure_plates_names: () => void;
    configure_top_lable: () => void;
    configure_top_lable_name: () => void;
    init: () => void;
    light_on: () => void;
    pass_names_to_arr: () => void;
    rows_avto: () => void;
    set_transparent: () => void;
    up_camera: () => void;
    zoom_in: () => void;
    zoom_out: () => void;
    scene: () => void;
    set_ruler_visibility: (visibility: boolean) => void;
    make_screenshot: () => Promise<string>;
  };
}
