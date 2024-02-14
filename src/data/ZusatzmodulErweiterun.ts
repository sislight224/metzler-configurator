import DesktopKlingeltaster from 'assets/ZusatzmodulErweiterun/desktop/klingeltaster.png';
import DesktopKlingeltasterTouch from 'assets/ZusatzmodulErweiterun/desktop/klingeltaster_touch_display.png';
import DesktopRfid from 'assets/ZusatzmodulErweiterun/desktop/klingeltaster_rfid.png';
import DesktopTouch from 'assets/ZusatzmodulErweiterun/desktop/touch_display.png';
import MobileKlingeltaster from 'assets/ZusatzmodulErweiterun/mobile/klingeltaster.png';
import MobileKlingeltasterTouch from 'assets/ZusatzmodulErweiterun/mobile/klingeltaster_touch_display.png';
import MobileRfid from 'assets/ZusatzmodulErweiterun/mobile/klingeltaster_rfid.png';
import MobileTouch from 'assets/ZusatzmodulErweiterun/mobile/touch_display.png';

export type ZusatzmodulErweiterunValueType =
  'klingetaster'
  | 'klingetaster_rfid' | 'klingetaster_touchDisplay' | 'touch_display';

export interface ZusatzmodulErweiterunType {
  title: string;
  value: ZusatzmodulErweiterunValueType;
  preview?: {
    desktop: string;
    mobile: string;
  };
  description?: string;
}

const ZusatzmodulErweiterun: ZusatzmodulErweiterunType[] = [
  {
    title: 'Klingeltaster',
    value: 'klingetaster',
    preview: {
      desktop: DesktopKlingeltaster.src,
      mobile: MobileKlingeltaster.src,
    },
    description: 'Edelstahl Klingeltaster mit LED-Ring signalisieren dem Besucher wo die Klingel gedrückt werden muss.',
  },
  {
    title: 'Klingeltaster & RFID',
    value: 'klingetaster_rfid',
    preview: {
      desktop: DesktopRfid.src,
      mobile: MobileRfid.src,
    },
    description: 'Nutzen Sie die Komfort Türöffnung per RFID Zugangskontrolle',
  },
  {
    title: 'Klingeltaster & Touch Display',
    value: 'klingetaster_touchDisplay',
    preview: {
      desktop: DesktopKlingeltasterTouch.src,
      mobile: MobileKlingeltasterTouch.src,
    },
    description: 'Neben der komfortablen RFID Türöffnung können Sie mittels des\n'
      + 'hochauflösenden Touch Displays auch per persönlichem Zugangscode\n'
      + 'die Türe öffnen sowie die Klingelschilder über digitiale Klingeltaster abbilden\n'
      + 'Sie können auch ein Foto oder Logo hochladen. Dieses wird bei Annäherung an\n'
      + 'die Anlage automatisch gezeigt.\n',
  },
  {
    title: 'Touch Display',
    value: 'touch_display',
    preview: {
      desktop: DesktopTouch.src,
      mobile: MobileTouch.src,
    },
    description: 'Neben der komfortablen RFID Türöffnung können Sie mittels des\n'
      + 'hochauflösenden Touch Displays auch per persönlichem Zugangscode\n'
      + 'die Türe öffnen sowie die Klingelschilder über digitiale Klingeltaster abbilden\n'
      + 'Sie können auch ein Foto oder Logo hochladen. Dieses wird bei Annäherung an\n'
      + 'die Anlage automatisch gezeigt.\n',
  },
];

export default ZusatzmodulErweiterun;
