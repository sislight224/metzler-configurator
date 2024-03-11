import { FC, useCallback } from "react";
import { observer } from "mobx-react-lite";
import usePanelsStore, {
  useBriefkastenPanelStore,
  useInnestationPanelStore,
  useKlingeltableuPanelStore,
  useMontagePanelStore,
} from "../../../../hooks/store/usePanelsStore";
import { WindowId } from "../../../../enums/WindowId";
import InnestationModal from "../InnestationModal/InnestationModal";
import SchriftartModal from "../SchriftartModal/SchriftartModal";
import { fontsFamilyList } from "../../../../data/FontsFamilyList";
import PanelId from "../../../../enums/PanelId";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import EditableModal from "../../../Editor/components/EditableModal/EditableModal";
import ResetConfigurationModal from "../../../Editor/components/ResetConfigurationModal/ResetConfigurationModal";
import { useUndoRedoStore } from "../../../../hooks/store/useUndoRedoStore";
import { innenstationModulesList } from "../../../../data/InnenstationModulesList";
import BackToShopModal from "containers/Editor/components/BackToShopModal/BackToShopModal";

const CopyLinkModal = dynamic(
  () => import("../../../Editor/components/CopyLinkModal/CopyLinkModal"),
  { ssr: false }
);

const Windows: FC = observer(() => {
  const router = useRouter();
  const { query } = router;

  const { resetPanels, setActivePanelId } = usePanelsStore();
  const { setIsCompleted, reset } = useMontagePanelStore();

  const { addStateRecord } = useUndoRedoStore();

  const { activeWindowId, setActiveWindowId, activePanelId, remixConfig } =
    usePanelsStore();

  const {
    state: { setSchriftart: setSchriftartBriefkasten },
  } = useBriefkastenPanelStore();
  const {
    state: { setSchriftart: setSchriftartKlingeltableu },
  } = useKlingeltableuPanelStore();

  const {
    state: { activeInnenstationViewModuleIndex },
  } = useInnestationPanelStore();

  const { resetState } = useUndoRedoStore();

  const changeIsOpenInnerstationModalHandler = useCallback((value: boolean) => {
    if (!value) setActiveWindowId(null);
    else setActiveWindowId(WindowId.INNESTATION_VIEW);
  }, []);

  const changeIsOpenSchriftartModalHandler = useCallback((value: boolean) => {
    if (!value) setActiveWindowId(null);
    else setActiveWindowId(WindowId.SCHRIFTART_MODAL);
  }, []);

  const changeFontHandler = useCallback(
    (fontName: string, fontNumber: number) => {
      if (activePanelId === PanelId.KLINGETABLEU) {
        addStateRecord();
        setSchriftartKlingeltableu(fontName, fontNumber);
        setSchriftartBriefkasten(fontName, fontNumber);
      }
      if (activePanelId === PanelId.BRIEFKASTEN) {
        addStateRecord();
        setSchriftartBriefkasten(fontName, fontNumber);
      }
      setActiveWindowId(null);
    },
    [activeWindowId]
  );

  const closeModal = useCallback(() => {
    setActiveWindowId(null);
  }, [setActiveWindowId]);

  const copyLinkHandler = useCallback((link: string) => {
    navigator.clipboard?.writeText(link);
  }, []);

  const editConfigClickHandler = useCallback(() => {
    const uuid = query.uuid as string;
    remixConfig(uuid as string).then((remixResponse) => {
      router.replace({ query: { uuid: remixResponse.id } });
      setActiveWindowId(null);
    });
  }, []);

  const resetToDefaultHandler = useCallback(() => {
    setActivePanelId(PanelId.MONTAGE);
    resetPanels();
    reset();
    setIsCompleted(false);
    resetState();
    setActiveWindowId(null);
    router.push("/");
  }, []);

  const currentInnestationModule =
    innenstationModulesList[activeInnenstationViewModuleIndex];

  return (
    <>
      <CopyLinkModal
        isOpen={activeWindowId === WindowId.COPY_LINK}
        onClose={closeModal}
        onCopyLink={copyLinkHandler}
      />
      <InnestationModal
        description={currentInnestationModule.description}
        activeInnenstationViewModuleIndex={activeInnenstationViewModuleIndex}
        innenstationViewModules={
          currentInnestationModule.previewForDescription ?? []
        }
        title={currentInnestationModule.moduleName}
        onChangeIsOpen={changeIsOpenInnerstationModalHandler}
        isOpen={activeWindowId === WindowId.INNESTATION_VIEW}
      />
      <SchriftartModal
        onChangeIsOpen={(value) => changeIsOpenSchriftartModalHandler(value)}
        fontsList={fontsFamilyList}
        onChangeFont={changeFontHandler}
        title="Wählen Sie eine Schriftart"
        onClose={() => setActiveWindowId(null)}
        isOpen={activeWindowId === WindowId.SCHRIFTART_MODAL}
      />
      <EditableModal
        isOpen={activeWindowId === WindowId.EDITABLE_MODAL}
        onCancelClick={() => setActiveWindowId(null)}
        onClose={() => setActiveWindowId(null)}
        onEditClick={editConfigClickHandler}
      />
      <ResetConfigurationModal
        isOpen={activeWindowId === WindowId.RESET_CONFIGURATION_MODAL}
        onCancelClick={closeModal}
        onClose={closeModal}
        onResetToDefaultClick={resetToDefaultHandler}
      />
      <BackToShopModal
        isOpen={activeWindowId === WindowId.BACK_TO_SHOP_MODAL}
        onCancelClick={closeModal}
        onClose={closeModal}
        onResetToDefaultClick={resetToDefaultHandler}
      />
    </>
  );
});

export default Windows;
