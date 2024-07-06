import { readFile } from "node:fs/promises";
import { join } from "path";

import Editor from "../src/containers/Editor/Editor";
import { ExtendedNextPage } from "../src/types/next";
import { getDefaultLayout } from "../src/helpers/getDefaultLayout";
import { GetServerSideProps } from "next";
import { useEffect } from "react";
import { ProductsProvider } from "context/ProductsContext";

const SaveJTLToken = ({ jtlToken }) => {
  useEffect(() => {
    localStorage.setItem("jtlToken", jtlToken);
  }, []);

  return <></>;
};

const Home: ExtendedNextPage = (props) => {
  return (
    <ProductsProvider products={props.products}>
      <SaveJTLToken jtlToken={props.jtlToken} />
      <Editor />
    </ProductsProvider>
  );
};

Home.getLayout = getDefaultLayout;
Home.needRedirect = false;

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

  const products = await fetch(
    `${process.env.NEXT_PUBLIC_PRODUCTS_URL}?hash=${Date.now()}`
  ).then((res) => res.json());

  return {
    props: {
      products,
      jtlToken: extractJtlToken(html),
      title: "Home",
    },
  };
};

export default Home;
