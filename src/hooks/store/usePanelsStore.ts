import PanelsStore from 'stores/PanelsStore';
import PanelStore from 'stores/panels/PanelStore';
import MontagePanelState from 'stores/panels/MontagePanelState';
import ZusatzmodulPanelState from 'stores/panels/ZusatzmodulPanelState';
import ZusatzmodulErweiterunPanelState from 'stores/panels/ZusatzmodulErweiterunPanelState';
import { useEditorStore } from './useEditorStore';
import KlingetableuPanelState from '../../stores/panels/KlingetableuPanelState';
import BriefkastenPanelState from '../../stores/panels/BriefkastenPanelState';
import TextleistePanelState from '../../stores/panels/TextleistePanelState';
import InnenstationPanelState from '../../stores/panels/InnenstationPanelState';
import RFIDPanelState from '../../stores/panels/RFIDPanelState';
import LichttasterPanelState from '../../stores/panels/LichttasterPanelState';

const usePanelsStore = (): PanelsStore => useEditorStore().panelsStore;

const useMontagePanelStore = (): PanelStore<MontagePanelState> => usePanelsStore().montagePanelStore;

const useZusatzmodulPanelStore = (): PanelStore<ZusatzmodulPanelState> => usePanelsStore().zusatzmodulPanelStore;

const useBriefkastenPanelStore = (): PanelStore<BriefkastenPanelState> => usePanelsStore().briefkastenPanelStore;

const useZusatzmodulErweiterunPanelStore = (): PanelStore<ZusatzmodulErweiterunPanelState> => (
  usePanelsStore().zusatzmodulErweiterunPanelStore
);

const useKlingeltableuPanelStore = (): PanelStore<KlingetableuPanelState> => usePanelsStore().klingetableuPanelStore;

const useTextleistePanelStore = (): PanelStore<TextleistePanelState> => usePanelsStore().textleistePanelStore;

const useInnestationPanelStore = (): PanelStore<InnenstationPanelState> => usePanelsStore().innenstationPanelStore;

const useRFIDPanelStore = (): PanelStore<RFIDPanelState> => usePanelsStore().rfidPanelStore;

const useLichttasterPanelState = (): PanelStore<LichttasterPanelState> => usePanelsStore().lichttasterPanelStore;

export {
  useMontagePanelStore,
  useZusatzmodulPanelStore,
  useZusatzmodulErweiterunPanelStore,
  useKlingeltableuPanelStore,
  useBriefkastenPanelStore,
  useTextleistePanelStore,
  useInnestationPanelStore,
  useRFIDPanelStore,
  useLichttasterPanelState,
};

export default usePanelsStore;
