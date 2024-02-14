import { FC, useCallback } from 'react';
import IconButton from '../../../../components/common/IconButton/IconButton';
import styles from './Controls.module.scss';
import { useControlsStore } from '../../../../hooks/store/useControlsStore';
import { ControlsCurrentSelected } from '../../../../stores/ControlsStore';
import { observer } from 'mobx-react-lite';
import { useUndoRedoStore } from '../../../../hooks/store/useUndoRedoStore';
import { WindowId } from '../../../../enums/WindowId';
import usePanelsStore from '../../../../hooks/store/usePanelsStore';
import { useEditorStore } from '../../../../hooks/store/useEditorStore';

export const StateControls: FC = observer(() => {
  const {
    controlsShow: show,
    setControlsShow: setShow,
    controlsCurrent,
    setControlsCurrent,
    zoomOut,
    zoomIn,
  } = useControlsStore();

  const { isInitialize } = useEditorStore();

  const {
    goBack,
    goForward,
    currentIndex,
    undoRedo,
  } = useUndoRedoStore();

  const {
    setActiveWindowId,
  } = usePanelsStore();

  const changeButtonHandler = useCallback((iconName: ControlsCurrentSelected) => {
    setControlsCurrent(iconName);
    setShow(false);
  }, []);

  const chevronClickHandler = useCallback(() => {
    setShow(!show);
  }, [show]);

  const resetHandler = useCallback(() => {
    setActiveWindowId(WindowId.RESET_CONFIGURATION_MODAL);
  }, []);

  const mobileControlHandler = () => {
    switch (controlsCurrent) {
      case 'redo': {
        goForward();
        break;
      }
      case 'undo': {
        goBack();
        break;
      }
      default: {
        resetHandler();
      }
    }
  };

  const getDisabled = (): boolean => {
    switch (controlsCurrent) {
      case 'redo': {
        return currentIndex >= undoRedo.length - 1;
      }
      case 'undo': {
        return currentIndex === 0;
      }
      default: {
        return false;
      }
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.mobileBtn}>
        <IconButton
          isActiveSkeleton={!isInitialize}
          iconName={controlsCurrent}
          onChevronClick={chevronClickHandler}
          onClick={mobileControlHandler}
          disabled={getDisabled()}
        />
      </div>
      <div className={styles.controlBlock}>
        <IconButton
          isActiveSkeleton={!isInitialize}
          iconName="reload"
          tooltipText="Zurücksetzen"
          enableTooltip
          onClick={resetHandler}
        />
        <IconButton
          isActiveSkeleton={!isInitialize}
          iconName="undo"
          tooltipText="Undo"
          enableTooltip
          onClick={() => goBack()}
          disabled={currentIndex === 0}
        />
        <IconButton
          iconName="redo"
          tooltipText="Redo"
          isActiveSkeleton={!isInitialize}
          enableTooltip
          onClick={goForward}
          disabled={currentIndex >= undoRedo.length - 1}
        />
      </div>
      <div className={styles.controlBlock}>
        <IconButton
          isActiveSkeleton={!isInitialize}
          iconName="plus"
          onClick={() => zoomIn()}
          tooltipText="Zoom in"
          enableTooltip
        />
        <IconButton
          onClick={() => zoomOut()}
          iconName="minus"
          isActiveSkeleton={!isInitialize}
          tooltipText="Zoom out"
          enableTooltip
        />
      </div>
      {
        show
        && <div className={styles.controlBlockMobile}>
          {
            controlsCurrent !== 'undo'
            && <IconButton
              iconName="undo"
              onClick={() => changeButtonHandler('undo')}
            />
          }
          {
            controlsCurrent !== 'redo'
            && <IconButton
              iconName="redo"
              onClick={() => changeButtonHandler('redo')}
            />
          }
          {
            controlsCurrent !== 'reload'
            && <IconButton
              iconName="reload"
              onClick={() => changeButtonHandler('reload')}
            />
          }
        </div>
      }
    </div>
  );
});

export default StateControls;
