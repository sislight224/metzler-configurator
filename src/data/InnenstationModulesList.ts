import {
  VDM10HomeSchwarz,
  VDM10HomeWeib,
  VDM10ProGrau,
  VDM10ProSchwarzRose,
  VDM10UltraSchwarz,
  VDM10HomeWeibDraht,
  VDM10HomeSchwarzDraht,
} from "./modulesDescription";
import InnenstationType from "../enums/data/InnenstationType";

export type PriceTagType =
  | "InnenstationHomeWeibLanPoe"
  | "InnenstationHomeSchwarzLanPoe"
  | "InnenstationUltraSchwarz"
  | "InnenstationProGrau"
  | "InnenstationProSchwarzRose"
  | "InnenstationHomeWeibDraht"
  | "InnenstationHomeSchwarzDraht";

export type InnenstationModulesListType = {
  moduleName: string;
  id: number;
  priceTag: PriceTagType;
  price: string;
  connectionType: InnenstationType;
  description: string[];
  value: number;
  previewForDescription?: string[];
  mainPreview?: string;
};

export const innenstationModulesList: InnenstationModulesListType[] = [
  {
    priceTag: "InnenstationHomeWeibLanPoe",
    moduleName: "Metzler VDM10 2.0 Innenstation Home, weiß",
    id: 1,
    price: "199,99",
    value: 0,
    description: VDM10HomeWeib,
    connectionType: InnenstationType.LAN_POE,
    previewForDescription: [
      "/konfigurator/images/VDM10_Home_weib/metzler-vdm10-20-innenstation-home-7-zoll-touchscreen-lan-poe-weiss.jpg",
      "/konfigurator/images/VDM10_Home_weib/metzler-vdm10-20-innenstation-home-7-zoll-touchscreen-lan-poe-weiss-2.jpg",
      "/konfigurator/images/VDM10_Home_weib/metzler-vdm10-20-innenstation-home-7-zoll-touchscreen-lan-poe-weiss-3.jpg",
      "/konfigurator/images/VDM10_Home_weib/metzler-vdm10-20-innenstation-home-7-zoll-touchscreen-lan-poe-weiss-4.jpg",
    ],
    mainPreview: "/konfigurator/images/VDM10_Home_weib/VDM10_Home_weib.png",
  },
  {
    moduleName: "Metzler VDM10 2.0 Innenstation Home, schwarz",
    id: 2,
    priceTag: "InnenstationHomeSchwarzLanPoe",
    price: "199,99",
    value: 0,
    connectionType: InnenstationType.LAN_POE,
    description: VDM10HomeSchwarz,
    previewForDescription: [
      "/konfigurator/images/VDM10_Home_schwarz/metzler-vdm10-20-innenstation-home-7-zoll-touchscreen-lan-poe-schwarz.jpg",
      "/konfigurator/images/VDM10_Home_schwarz/metzler-vdm10-20-innenstation-home-7-zoll-touchscreen-lan-poe-schwarz-2.jpg",
      "/konfigurator/images/VDM10_Home_schwarz/metzler-vdm10-20-innenstation-home-7-zoll-touchscreen-lan-poe-schwarz-4.jpg",
      "/konfigurator/images/VDM10_Home_schwarz/metzler-vdm10-20-innenstation-home-7-zoll-touchscreen-lan-poe-schwarz-5.jpg",
    ],
    mainPreview:
      "/konfigurator/images/VDM10_Home_schwarz/VDM10_Home_schwarz.png",
  },
  {
    moduleName: "Metzler VDM10 2.0 Innenstation Ultra, schwarz",
    id: 3,
    priceTag: "InnenstationUltraSchwarz",
    price: "449,99",
    value: 0,
    connectionType: InnenstationType.LAN_POE,
    description: VDM10UltraSchwarz,
    previewForDescription: [
      "/konfigurator/images/VDM10_Ultra_schwarz/metzler-vdm10-20-innenstation-ultra-10-zoll-touchscreen-lan-poe-schwarz.jpg",
      "/konfigurator/images/VDM10_Ultra_schwarz/metzler-vdm10-20-innenstation-ultra-10-zoll-touchscreen-lan-poe-schwarz-2.jpg",
      "/konfigurator/images/VDM10_Ultra_schwarz/metzler-vdm10-20-innenstation-ultra-10-zoll-touchscreen-lan-poe-schwarz-3.jpg",
      "/konfigurator/images/VDM10_Ultra_schwarz/metzler-vdm10-20-innenstation-ultra-10-zoll-touchscreen-lan-poe-schwarz-4.jpg",
    ],
    mainPreview:
      "/konfigurator/images/VDM10_Ultra_schwarz/VDM10_Ultra_schwarz.png",
  },
  {
    moduleName: "Metzler VDM10 2.0 Innenstation Pro, grau",
    id: 4,
    priceTag: "InnenstationProGrau",
    price: "439,99",
    value: 0,
    connectionType: InnenstationType.LAN_POE,
    description: VDM10ProGrau,
    previewForDescription: [
      "/konfigurator/images/VDM10_Pro_grau/metzler-vdm10-20-innenstation-pro-7-zoll-ips-touchscreen-lan-poe-schwarz-grau.jpg",
      "/konfigurator/images/VDM10_Pro_grau/metzler-vdm10-20-innenstation-pro-7-zoll-ips-touchscreen-lan-poe-schwarz-grau-2.jpg",
      "/konfigurator/images/VDM10_Pro_grau/metzler-vdm10-20-innenstation-pro-7-zoll-ips-touchscreen-lan-poe-schwarz-grau-3.jpg",
      "/konfigurator/images/VDM10_Pro_grau/metzler-vdm10-20-innenstation-pro-7-zoll-ips-touchscreen-lan-poe-schwarz-grau-6.jpg",
    ],
    mainPreview: "/konfigurator/images/VDM10_Pro_grau/VDM10_Pro_grau.png",
  },
  {
    moduleName: "Metzler VDM10 2.0 Innenstation Pro, schwarz - rose",
    id: 5,
    price: "439,99",
    value: 0,
    priceTag: "InnenstationProSchwarzRose",
    connectionType: InnenstationType.LAN_POE,
    description: VDM10ProSchwarzRose,
    previewForDescription: [
      "/konfigurator/images/VDM10_Pro_schwarz_rose/metzler-vdm10-20-innenstation-pro-7-zoll-ips-touchscreen-lan-poe-schwarz-rose.jpg",
      "/konfigurator/images/VDM10_Pro_schwarz_rose/metzler-vdm10-20-innenstation-pro-7-zoll-ips-touchscreen-lan-poe-schwarz-rose-2.jpg",
      "/konfigurator/images/VDM10_Pro_schwarz_rose/metzler-vdm10-20-innenstation-pro-7-zoll-ips-touchscreen-lan-poe-schwarz-rose-3.jpg",
    ],
    mainPreview:
      "/konfigurator/images/VDM10_Pro_schwarz_rose/VDM10_Pro_schwarz_rose.png",
  },

  {
    moduleName: "Metzler VDM10 2.0 Innenstation Home, weiß",
    id: 6,
    price: "199,99",
    value: 0,
    priceTag: "InnenstationHomeWeibDraht",
    description: VDM10HomeWeibDraht,
    connectionType: InnenstationType.DRAHT,
    previewForDescription: [
      "/konfigurator/images/VDM10_Home_weib/metzler-vdm10-20-innenstation-home-7-zoll-touchscreen-lan-poe-weiss.jpg",
      "/konfigurator/images/VDM10_Home_weib/metzler-vdm10-20-innenstation-home-7-zoll-touchscreen-lan-poe-weiss-2.jpg",
      "/konfigurator/images/VDM10_Home_weib/metzler-vdm10-20-innenstation-home-7-zoll-touchscreen-lan-poe-weiss-3.jpg",
      "/konfigurator/images/VDM10_Home_weib/metzler-vdm10-20-innenstation-home-7-zoll-touchscreen-lan-poe-weiss-4.jpg",
    ],
    mainPreview: "/konfigurator/images/VDM10_Home_weib/VDM10_Home_weib.png",
  },
  {
    moduleName: "Metzler VDM10 2.0 Innenstation Home, schwarz",
    id: 7,
    price: "199,99",
    priceTag: "InnenstationHomeSchwarzDraht",
    value: 0,
    connectionType: InnenstationType.DRAHT,
    description: VDM10HomeSchwarzDraht,
    previewForDescription: [
      "/konfigurator/images/VDM10_Home_schwarz/metzler-vdm10-20-innenstation-home-7-zoll-touchscreen-lan-poe-schwarz.jpg",
      "/konfigurator/images/VDM10_Home_schwarz/metzler-vdm10-20-innenstation-home-7-zoll-touchscreen-lan-poe-schwarz-2.jpg",
      "/konfigurator/images/VDM10_Home_schwarz/metzler-vdm10-20-innenstation-home-7-zoll-touchscreen-lan-poe-schwarz-4.jpg",
      "/konfigurator/images/VDM10_Home_schwarz/metzler-vdm10-20-innenstation-home-7-zoll-touchscreen-lan-poe-schwarz-5.jpg",
    ],
    mainPreview:
      "/konfigurator/images/VDM10_Home_schwarz/VDM10_Home_schwarz.png",
  },
];
