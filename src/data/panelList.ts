import PanelId from '../enums/PanelId';

export const PanelList: Record<string, PanelId[]> = {
  ohne:
    [PanelId.BRIEFKASTEN, PanelId.TEXTLEISTE],
  klingetableu:
    [PanelId.KLINGETABLEU, PanelId.BRIEFKASTEN, PanelId.TEXTLEISTE],
  klingetaster:
    [PanelId.ZUSATZMODUL_ERWEITERUN, PanelId.KLINGETABLEU, PanelId.INNENSTATION, PanelId.BRIEFKASTEN, PanelId.TEXTLEISTE],
  klingetaster_rfid:
    [PanelId.ZUSATZMODUL_ERWEITERUN, PanelId.KLINGETABLEU,
      PanelId.INNENSTATION, PanelId.RFID, PanelId.BRIEFKASTEN, PanelId.TEXTLEISTE],
  klingetaster_touchDisplay:
    [PanelId.ZUSATZMODUL_ERWEITERUN, PanelId.KLINGETABLEU, PanelId.INNENSTATION, PanelId.BRIEFKASTEN, PanelId.TEXTLEISTE],
  touch_display:
    [PanelId.ZUSATZMODUL_ERWEITERUN, PanelId.LICHTTASTER, PanelId.INNENSTATION, PanelId.BRIEFKASTEN, PanelId.TEXTLEISTE],
};
