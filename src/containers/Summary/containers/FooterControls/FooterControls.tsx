import styles from "./FooterControls.module.scss";
import ConfirmConfiguration from "../../components/ConfirmConfiguration/ConfirmConfiguration";
import { observer } from "mobx-react-lite";
import usePanelsStore from "../../../../hooks/store/usePanelsStore";
import ModelControls from "../ModelControls/ModelControls";
import { calculateProducts } from "helpers/calculateProducts";
import { useContext } from "react";
import { ProductsContext } from "context/ProductsContext";

const FooterControls = observer(() => {
  const { getAllStates } = usePanelsStore();
  const { products } = useContext(ProductsContext);

  return (
    <div className={styles.root}>
      <div className={styles.modelControls}>
        <ModelControls />
      </div>
      <ConfirmConfiguration
        onConfirm={async () => {
          const states = getAllStates();
          const calculatedProducts = calculateProducts(states);
          console.log({ calculatedProducts });
          const basketProducts = calculatedProducts
            .map((calculatedProduct) => {
              const product = products.find(
                (p) => calculatedProduct.configuratorId === p.configuratorId
              );

              if (!product) {
                return;
              }

              return {
                ...calculatedProduct,
                articleNumber: product.articleNumber,
                extraFieldId: product.extraFieldId,
              };
            })
            .filter(Boolean);

          console.log(states);
          console.log({ basketProducts });

          return;

          await fetch("/konfigurator/api/checkout", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              products: basketProducts,
              jtlToken: localStorage.getItem("jtlToken"),
            }),
          })
            .then((res) => res.json())
            .then(console.log);

          window.location.href = `${process.env.NEXT_PUBLIC_SHOP_URL}/Warenkorb`;
        }}
      />
    </div>
  );
});

export default FooterControls;
