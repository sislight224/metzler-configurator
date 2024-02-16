import styles from "./FooterControls.module.scss";
import ConfirmConfiguration from "../../components/ConfirmConfiguration/ConfirmConfiguration";
import { useCallback } from "react";
import { observer } from "mobx-react-lite";
import usePanelsStore from "../../../../hooks/store/usePanelsStore";
import { useAppSnackbar } from "../../../../hooks/useAppSnackbar";
import ModelControls from "../ModelControls/ModelControls";
import { useUndoRedoStore } from "../../../../hooks/store/useUndoRedoStore";
import { useRouter } from "next/router";

const FooterControls = observer(() => {
  const {
    orderPanelsConfig,
    configId,
    setIsOrderConfig,
    getState,
    activePanelId,
    getAllStates,
  } = usePanelsStore();

  const { enqueueErrorSnackbar } = useAppSnackbar({
    defaultErrorMessage: "",
  });

  const router = useRouter();

  const { cleanUndoRedo } = useUndoRedoStore();

  const confirmConfigurationHandler = useCallback(() => {
    const formData = new FormData();

    formData.append("jtl_token", String(router.query["jtl-token"]));
    formData.append("wlPos", "0");
    formData.append("inWarenkorb", "1");
    formData.append("a", "10");
    formData.append("wke", "1");
    formData.append("show", "1");
    formData.append("kKundengruppe", "1");
    formData.append("kSprache", "1");
    formData.append("anzahl", "1");
    formData.append("inWarenkorb", "In den Warenkorb");

    fetch("http://wm-dev.de/Briefkasten-BK212-Blindmodul", {
      method: "POST",
      body: formData,
    }).then((res) => {
      if (res.ok) {
        window.location.href = "http://wm-dev.de/Warenkorb";
      }
    });

    /* orderPanelsConfig(configId)
     *   .then(() => {
     *     setIsOrderConfig(true);
     *     cleanUndoRedo();
     *     alert("Order placed");
     *   })
     *   .catch((error) => {
     *     enqueueErrorSnackbar(error.message);
     *   }); */
  }, [configId]);

  return (
    <div className={styles.root}>
      <div className={styles.modelControls}>
        <ModelControls />
      </div>
      <ConfirmConfiguration
        onConfirm={() => {
          const formData = new FormData();

          formData.append("jtl_token", String(router.query["jtl-token"]));
          formData.append("wlPos", "0");
          formData.append("inWarenkorb", "1");
          formData.append("a", "10");
          formData.append("wke", "1");
          formData.append("show", "1");
          formData.append("kKundengruppe", "1");
          formData.append("kSprache", "1");
          formData.append("anzahl", "1");
          formData.append("inWarenkorb", "In den Warenkorb");

          fetch("http://wm-dev.de/Briefkasten-BK212-Blindmodul", {
            method: "POST",
            body: formData,
          }).then((res) => {
            if (res.ok) {
              window.location.href = "http://wm-dev.de/Warenkorb";
            }
          });
        }}
      />
    </div>
  );
});

export default FooterControls;
