import styles from "./FooterControls.module.scss";
import ConfirmConfiguration from "../../components/ConfirmConfiguration/ConfirmConfiguration";
import { useCallback } from "react";
import { observer } from "mobx-react-lite";
import usePanelsStore from "../../../../hooks/store/usePanelsStore";
import { useAppSnackbar } from "../../../../hooks/useAppSnackbar";
import ModelControls from "../ModelControls/ModelControls";
import { useUndoRedoStore } from "../../../../hooks/store/useUndoRedoStore";
import { useRouter } from "next/router";

const montage = {
  "Freistehend mit Standfuß zum Einbetonieren": {
    url: "Erweiterung-des-StandfuAYes-zum-Einbetonieren",
    id: 22,
  },
  "Freistehend mit Standfuß zum Anschrauben": {
    url: "StandfuAY-zum-Anschrauben",
    id: 21,
  },
};

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
        onConfirm={async () => {
          const states = getAllStates();
          console.log({ states: states.montage.montageType });
          const montageProduct = montage[states.montage.montageType];
          let products = [];
          if (montageProduct) {
            products.push({
              url: montageProduct.url,
              amount: 1,
              id: montageProduct.id,
            });
          }

          function getFormData(id: number, amount: number = 1) {
            const formData = new FormData();
            formData.append("jtl_token", String(router.query["jtl-token"]));
            formData.append("wlPos", "0");
            formData.append("inWarenkorb", "1");
            formData.append("a", id.toString());
            formData.append("wke", "1");
            formData.append("show", "1");
            formData.append("kKundengruppe", "1");
            formData.append("kSprache", "1");
            formData.append("anzahl", amount.toString());
            formData.append("inWarenkorb", "In den Warenkorb");
            return formData;
          }

          const fetches = products.map((product) => {
            const formData = getFormData(product.id, product.amount);
            return fetch(`http://wm-dev.de/${product.url}`, {
              method: "POST",
              body: formData,
            }).then((res) => res.ok);
          });

          const result = await Promise.all(fetches);

          setTimeout(() => {
            window.location.href = `http://wm-dev.de/Warenkorb`;
          }, 2000);
          console.log(result);
        }}
      />
    </div>
  );
});

export default FooterControls;
