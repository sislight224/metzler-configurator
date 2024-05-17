import Button from "components/common/Button/Button";
import classNames from "./ConfirmConfiguration.module.scss";
import { FC, useCallback, useContext } from "react";
import ModelControls from "../../containers/ModelControls/ModelControls";
import IconButton from "../../../../components/common/IconButton/IconButton";
import cl from "classnames";
import { useControlsStore } from "../../../../hooks/store/useControlsStore";
import { observer } from "mobx-react-lite";
import { useCalculatorStore } from "../../../../hooks/store/useCalculatorStore";
import usePanelsStore from "hooks/store/usePanelsStore";
import { calculateProducts } from "helpers/calculateProducts";
import { ProductsContext } from "context/ProductsContext";

export interface ConfirmConfigurationProps {
  onConfirm: () => void;
}

export const ConfirmConfiguration: FC<ConfirmConfigurationProps> = observer(
  (props) => {
    const { onConfirm = () => undefined } = props;

    const { getAllStates } = usePanelsStore();
    const { priceConfiguration } = useCalculatorStore();

    const { confirmMenuShow: show, setConfirmMenuShow: setShow } =
      useControlsStore();

    const clickDotsHandler = useCallback(() => {
      setShow(!show);
    }, [show]);

    const closeMenu = useCallback(() => {
      setShow(false);
    }, []);

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

    return (
      <div className={classNames.root}>
        <div className={classNames.info}>
          <div className={classNames.label}>Gesamt</div>
          <div className={classNames.value}>
            <span className={classNames.price}>{priceString} €</span>
            <span className={classNames.vat}>Inkl. 19% MwSt.</span>
          </div>
        </div>
        <div className={classNames.buttonWrap}>
          <div className={classNames.modelControls}>
            <div
              className={cl(classNames.list, { [classNames.list_hide]: !show })}
            >
              <ModelControls handleClick={closeMenu} />
            </div>
            <IconButton iconName="dots" onClick={clickDotsHandler} />
          </div>
          <Button onClick={onConfirm} label="In den Warenkorb" width="160px" />
        </div>
      </div>
    );
  }
);

export default ConfirmConfiguration;
