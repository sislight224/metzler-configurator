import { FC, useCallback, useEffect } from "react";
import styles from "./Editor.module.scss";
import dynamic from "next/dynamic";
import { observer } from "mobx-react-lite";
import { useEditorStore } from "../../hooks/store/useEditorStore";
import SupportingToolbar from "../Viewer/components/SupportingToolbar/SupportingToolbar";
import Controls from "../Viewer/components/Controls/Controls";
import { useRouter } from "next/router";
import usePanelsStore from "../../hooks/store/usePanelsStore";
import { OrderStatus } from "../../enums/data/OrderStatus";
import { AxiosError } from "axios";
import { ErrorCodes } from "../../enums/ErrorCodes";
import Preloader from "./containers/Preloader/Preloader";

const WorkArea = dynamic(() => import("./containers/WorkArea/WorkArea"), {
  ssr: false,
});

const Editor: FC = observer(() => {
  const router = useRouter();
  const { query } = router;
  const { setConfigUrl } = useEditorStore();

  const {
    createConfig,
    setConfigId,
    setIsEditConfig,
    setConfig,
    getPanelsConfig,
    determinePathFromRequest,
  } = usePanelsStore();

  const createNewConfig = useCallback(() => {
    setIsEditConfig(true);
    createConfig({}).then((response) => {
      setConfigId(response.id);
      router.replace({
        query: { uuid: response.id, ...query },
      });
    });
  }, []);

  const fixMobileHeight = () => {
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    const vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  useEffect(() => {
    fixMobileHeight();
    window.addEventListener("resize", fixMobileHeight);

    return () => {
      window.removeEventListener("resize", fixMobileHeight);
    };
  }, []);

  useEffect(() => {
    if (query.uuid) setConfigUrl(`${window.location.origin}${router.asPath}`);
  }, [query, router]);

  useEffect(() => {
    const { uuid } = query;
    if (!uuid) createNewConfig();
    else {
      getPanelsConfig(uuid as string)
        .then((response) => {
          if (response.status === OrderStatus.ORDERED) {
            setIsEditConfig(false);
            setConfig(response.payload);
            return;
          }
          if (response.status === OrderStatus.CREATED) {
            setIsEditConfig(true);
            determinePathFromRequest(response);
          }
          setConfigId(response.id);
        })
        .catch((error: AxiosError) => {
          if (error.response?.status === ErrorCodes.UNEXPECTED_ERROR)
            router.replace("/500");
        });
    }
  }, [query]);

  return (
    <div className={styles.root}>
      <Preloader />
      <WorkArea />
      <SupportingToolbar />
      <Controls />
    </div>
  );
});

export default Editor;
