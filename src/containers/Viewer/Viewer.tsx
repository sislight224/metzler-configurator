import styles from "./Viewer.module.scss";
import { useEffect, useMemo } from "react";
import { createApp } from "../v3dApp/app";
import classnames from "classnames";
import { observer } from "mobx-react-lite";
import { useEditorStore } from "../../hooks/store/useEditorStore";
import { PuzzleType } from "../../types/PuzzleType";
import html2canvas from "html2canvas";
import { useWindowSize } from "react-use";
import { vergeConfig } from "../../config/vergeConfig";

const Viewer = observer(() => {
  const {
    initVerge,
    isShowScene,
    updateViewOffset,
    setVergeConfig,
    vergeId,
    sceneUrl,
    logicUrl,
    isInitialize,
  } = useEditorStore();

  const { width, height } = useWindowSize();

  const appData = useMemo(() => {
    return { app: null, PUZZLE: null };
  }, []);

  useEffect(() => {
    window.html2canvas = html2canvas;
    setVergeConfig(vergeConfig);
  }, []);

  useEffect(() => {
    if (isInitialize) updateViewOffset(width, height);
  }, [width, isInitialize, height]);

  const loadApp = async () => {
    ({ app: appData.app, PL: appData.PUZZLE } = await createApp({
      containerId: vergeId,
      fsButtonId: null,
      sceneURL: sceneUrl,
      logicURL: logicUrl,
    }));

    if (appData.PUZZLE) {
      initVerge(appData.PUZZLE as PuzzleType, appData.app);
      updateViewOffset(width, height);
    }
  };

  useEffect(() => {
    if (sceneUrl && logicUrl) loadApp();
  }, [sceneUrl, logicUrl]);

  return (
    <div
      className={classnames(styles.root, { [styles.root_hide]: !isShowScene })}
    >
      <div id={vergeId} className={styles.scene} />
    </div>
  );
});

export default Viewer;
