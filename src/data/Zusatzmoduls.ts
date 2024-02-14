import DesktopOhne from 'assets/ZusatzmodulPosition/desktop/ohne.png';
import DesktopKlingetableu from 'assets/ZusatzmodulPosition/desktop/klingeltableu.png';
import DesktopVideo from 'assets/ZusatzmodulPosition/desktop/video_gegensprechmodul.png';
import DesktopAudio from 'assets/ZusatzmodulPosition/desktop/audio_gegensprechmodul.png';
import MobileOhne from 'assets/ZusatzmodulPosition/mobile/ohne.png';
import MobileKlingetableu from 'assets/ZusatzmodulPosition/mobile/klingeltableu.png';
import MobileVideo from 'assets/ZusatzmodulPosition/mobile/video_gegensprechmodul.png';
import MobileAudio from 'assets/ZusatzmodulPosition/mobile/audio_gegensprechmodul.png';

export type ZusatzmodulValueType = 'ohne' | 'klingetableu' | 'videoGegensprechmodul' | 'audioGegensprechmodul';

export interface ZusatzmodulType {
  title: string;
  value: ZusatzmodulValueType;
  preview?: {
    mobile: string;
    desktop: string;
  };
  description?: string;
}

const Zusatzmoduls: ZusatzmodulType[] = [
  {
    title: 'Ohne',
    value: 'ohne',
    preview: {
      desktop: DesktopOhne.src,
      mobile: MobileOhne.src,
    },
    description: 'Es wird die reine Briefkastenanlage ohne Klingel, Gegensprechanlage geliefert',
  },
  {
    title: 'Klingelanlage',
    value: 'klingetableu',
    preview: {
      desktop: DesktopKlingetableu.src,
      mobile: MobileKlingetableu.src,
    },
    description: 'Nutzen Sie das Klingeltableu um eine einfache Klingelanlage ohne Gegensprechanlage zu nutzen. Gongs zur Signalisierung in den Wohnungen sind nicht im Lieferumfang enthalten.',
  },
  {
    title: 'Video Gegensprechmodul',
    value: 'videoGegensprechmodul',
    preview: {
      desktop: DesktopVideo.src,
      mobile: MobileVideo.src,
    },
    description: 'Erhalten Sie den vollen Funktionsumfang mit dem VDM10 Gegensprechmodul. HD-Videoübertragung, optional RFID und Zugangscode Türöffnung und weitere Features. Pro Klingeltaster ist eine Innenstation erforderlich!',
  },
  {
    title: 'Audio Gegensprechmodul',
    value: 'audioGegensprechmodul',
    preview: {
      desktop: DesktopAudio.src,
      mobile: MobileAudio.src,
    },
    description: 'Nutzen Sie die Metzler ADM10 Audio Gegensprechanlage zur bidirektionalen Kommunikation zwischen Wohnung und Türe. Optional mit RFID Zugangssteuerung. Pro Klingeltaster ist eine Innenstation erforderlich!',
  },
];

export default Zusatzmoduls;
