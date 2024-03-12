import { FC, useCallback, useEffect } from "react";
import IconButton from "../../../../components/common/IconButton/IconButton";
import BackgroundMenu from "./BackgroundMenu/BackgroundMenu";
import styles from "./SupportingToolbar.module.scss";
import classnames from "classnames";
import { useEditorStore } from "hooks/store/useEditorStore";
import { useControlsStore } from "../../../../hooks/store/useControlsStore";
import { observer } from "mobx-react-lite";
import usePanelsStore from "../../../../hooks/store/usePanelsStore";
import { WindowId } from "../../../../enums/WindowId";

export const SupportingToolbar: FC = observer(() => {
  const {
    setIsShowRuler,
    isShowRuler,
    supportingToolbarShow: show,
    setSupportingToolbarShow: setShow,
  } = useControlsStore();

  const { setActiveWindowId } = usePanelsStore();

  const { puzzles, isInitialize } = useEditorStore();

  const clickDotsHandler = useCallback(() => {
    setShow(!show);
  }, [show]);

  const clickButtonHandler = useCallback(() => {
    setShow(false);
    // todo: action
  }, []);

  useEffect(() => {
    // todo: подумать как убрать
    if (puzzles && puzzles.procedures) {
      setTimeout(() => {
        setIsShowRuler(false);
      }, 150);
    }
  }, [puzzles]);

  const rulerClickHandler = useCallback(() => {
    setIsShowRuler(!isShowRuler);
    setShow(false);
  }, [isShowRuler]);

  return (
    <>
      <div className={styles.root}>
        {isInitialize && (
          <div className={styles.mobileBtn}>
            <IconButton iconName="dots" onClick={clickDotsHandler} />
          </div>
        )}
        <div className={classnames(styles.box, { [styles.box_hide]: !show })}>
          <IconButton
            isActiveSkeleton={!isInitialize}
            iconName="academic"
            tooltipText="Erklärung des Konfigurators"
            enableTooltip
            onClick={clickButtonHandler}
          />
          <IconButton
            isActiveSkeleton={!isInitialize}
            active={isShowRuler}
            iconName="ruler"
            tooltipText="Maßband"
            enableTooltip
            onClick={rulerClickHandler}
          />
          <BackgroundMenu />
          <IconButton
            isActiveSkeleton={!isInitialize}
            iconName="save"
            tooltipText="Speichern"
            enableTooltip
            onClick={() => setActiveWindowId(WindowId.COPY_LINK)}
          />
          <IconButton
            iconName="home"
            tooltipText="Zurück zum Shop"
            enableTooltip
            onClick={() => setActiveWindowId(WindowId.BACK_TO_SHOP_MODAL)}
          />
        </div>
      </div>
    </>
  );
});

export default SupportingToolbar;
