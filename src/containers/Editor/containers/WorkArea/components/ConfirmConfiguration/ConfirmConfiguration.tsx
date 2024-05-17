import { FC, useCallback, useContext, useEffect, useMemo } from "react";
import Button from "components/common/Button/Button";
import classNames from "./ConfirmConfiguration.module.scss";
import classnames from "classnames";
import { useRouter } from "next/router";
import { observer } from "mobx-react-lite";
import usePanelsStore, {
  useInnestationPanelStore,
  useKlingeltableuPanelStore,
  useLichttasterPanelState,
  useMontagePanelStore,
  useRFIDPanelStore,
  useTextleistePanelStore,
  useZusatzmodulErweiterunPanelStore,
  useZusatzmodulPanelStore,
} from "hooks/store/usePanelsStore";
import { useEditorStore } from "../../../../../../hooks/store/useEditorStore";
import { WindowId } from "../../../../../../enums/WindowId";
import { useCalculatorStore } from "../../../../../../hooks/store/useCalculatorStore";
import MontageType from "../../../../../../enums/data/MontageType";
import BeschriftungNamensschild from "../../../../../../enums/data/BeschriftungNamensschild";
import { PriceTagType } from "../../../../../../data/InnenstationModulesList";
import { RFIDCardsEnum } from "../../../../../../stores/panels/RFIDPanelState";
import placementRules from "../../../../../../../public/configurator/json/placement_rules.json";
import { calculateProducts } from "helpers/calculateProducts";
import { ProductsContext } from "context/ProductsContext";

export const ConfirmConfiguration: FC = observer(() => {
  const { canSaveConfiguration, configId, isEditConfig, setActiveWindowId } =
    usePanelsStore();
  const { isInitialize, setPreview, isLoadingPreview } = useEditorStore();
  const router = useRouter();

  const { getAllStates } = usePanelsStore();
  const productList = calculateProducts(getAllStates());

  const { products } = useContext(ProductsContext);

  const totalPrice = productList.reduce(
    (acc, { configuratorId, amount }) => {
      const product = products.find(
        (product) => product.configuratorId === configuratorId
      );
      if (!product) return acc;
      let [euros, cents] = product.price.split(",");
      let _cents = acc.cents + Number(cents) * amount;
      let _euros = 0;
      while (_cents >= 100) {
        _cents -= 100;
        _euros++;
      }
      return {
        euros: _euros + acc.euros + Number(euros) * amount,
        cents: _cents,
      };
    },
    {
      euros: 0,
      cents: 0,
    }
  );

  const { euros, cents } = totalPrice;

  const priceString = `${euros.toLocaleString("de")},${cents
    .toString()
    .padStart(2, "0")}`;

  const saveClickHandler = useCallback(() => {
    if (!canSaveConfiguration) return;
    router.replace({
      pathname: "/summary",
      query: { uuid: configId, ...router.query },
    });
    setPreview();
  }, [canSaveConfiguration, configId]);

  const disabledButtonConfiguration = useMemo(() => {
    return !canSaveConfiguration || isLoadingPreview;
  }, [canSaveConfiguration, isLoadingPreview]);

  const editClickHandler = useCallback(() => {
    setActiveWindowId(WindowId.EDITABLE_MODAL);
  }, []);

  return (
    <div
      className={classnames(classNames.root, {
        [classNames.skeleton]: !isInitialize,
      })}
    >
      {isInitialize && (
        <>
          <div className={classNames.info}>
            <div className={classNames.label}>Gesamt</div>
            <div className={classNames.value}>
              <span className={classNames.price}>{priceString} €</span>
              <span className={classNames.vat}>Inkl. 19% MwSt.</span>
            </div>
          </div>
          <div className={classNames.buttonWrap}>
            {isEditConfig && (
              <Button
                label="Bestätigen"
                width="140px"
                onClick={saveClickHandler}
                disabled={disabledButtonConfiguration}
              />
            )}
            {!isEditConfig && (
              <Button label="Edit" width="70px" onClick={editClickHandler} />
            )}
          </div>
        </>
      )}
    </div>
  );
});

export default ConfirmConfiguration;
