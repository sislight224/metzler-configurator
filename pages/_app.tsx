import "normalize.css/normalize.css";
import "rc-menu/assets/index.css";
import "../styles/globals.scss";
import { SnackbarProvider } from "notistack";
import AppHead from "../src/components/head/Head";
import Viewer from "../src/containers/Viewer/Viewer";
import { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";
import { useEditorStore } from "../src/hooks/store/useEditorStore";
import { ExtendedAppProps } from "../src/types/next";
import dynamic from "next/dynamic";
import { validationSchema } from "../src/validation/envValidation/validation-schema";
import { envConfig } from "../src/config/env";

const RedirectProvider = dynamic(
  () => import("../src/containers/RedirectProvider/RedirectProvider"),
  { ssr: false }
);

const App = ({ Component, pageProps }: ExtendedAppProps) => {
  const router = useRouter();
  const { setIsShowScene } = useEditorStore();
  const { needRedirect } = Component;

  const getLayout = Component.getLayout
    ? Component.getLayout
    : (page: ReactElement) => page;

  const validate = validationSchema.validate(envConfig, { allowUnknown: true });
  if (validate.error) {
    throw validate.error;
  }

  useEffect(() => {
    if (router.pathname !== "/") setIsShowScene(false);
    else setIsShowScene(true);
  }, [router.pathname]);

  return (
    <>
      <AppHead />
      <SnackbarProvider>
        <RedirectProvider needRedirect={needRedirect}>
          {getLayout(<Component {...pageProps} />)}
        </RedirectProvider>
        <Viewer />
      </SnackbarProvider>
    </>
  );
};

export default App;
