import Summary from "../src/containers/Summary/Summary";
import SummaryProvider from "../src/containers/Summary/provider/SummaryProvider";
import { ExtendedNextPage } from "../src/types/next";
import { getDefaultLayout } from "../src/helpers/getDefaultLayout";
import { GetServerSideProps } from "next";
import { ProductsProvider } from "context/ProductsContext";
import { useEffect } from "react";

const SaveJTLToken = ({ jtlToken }) => {
  useEffect(() => {
    localStorage.setItem("jtlToken", jtlToken);
  }, []);

  return <></>;
};

const SummaryPage: ExtendedNextPage = (props) => {
  return (
    <ProductsProvider products={props.products}>
      <SaveJTLToken jtlToken={props.jtlToken} />
      <SummaryProvider>
        <Summary />
      </SummaryProvider>
    </ProductsProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const response = await fetch(process.env.NEXT_PUBLIC_SHOP_URL, {
    headers: {
      cookie: ctx.req.headers["cookie"],
    },
  });

  if (!ctx.req.headers["cookie"]?.includes("JTLSHOP")) {
    const headers = Object.fromEntries(response.headers.entries());
    ctx.res.setHeader("Set-Cookie", headers["set-cookie"]);
  }
  const html = await response.text();

  function extractJtlToken(htmlText: string): string | null {
    try {
      const regex =
        /<input\s+type="hidden"\s+class="jtl_token"\s+name="jtl_token"\s+value="([^"]+)"\s*\/?>/i;
      const match = htmlText.match(regex);
      if (match && match[1]) {
        return match[1];
      } else {
        return null;
      }
    } catch (err) {
      console.log(err);
    }
    return null;
  }
  const products = await fetch(process.env.NEXT_PUBLIC_PRODUCTS_URL).then(
    (res) => res.json()
  );
  return {
    props: { products, jtlToken: extractJtlToken(html) },
  };
};

SummaryPage.needRedirect = true;
SummaryPage.getLayout = getDefaultLayout;

export default SummaryPage;
