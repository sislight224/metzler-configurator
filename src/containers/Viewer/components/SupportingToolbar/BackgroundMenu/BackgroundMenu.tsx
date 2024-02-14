import { FC, useCallback, useRef, useState } from 'react';
import IconButton from '../../../../../components/common/IconButton/IconButton';
import classnames from 'classnames';
import styles from './/BackgroundMenu.module.scss';
import { useClickAway } from 'react-use';
import { backgroundMenuItems } from './BackgroundsMenuItemList';
import { useControlsStore } from '../../../../../hooks/store/useControlsStore';
import { observer } from 'mobx-react-lite';
import { useEditorStore } from '../../../../../hooks/store/useEditorStore';

const BackgroundMenu: FC = observer(() => {
  const [openMenu, setIsOpenMenu] = useState<boolean>(false);
  const { changeBackground, backgroundName } = useControlsStore();
  const { isInitialize } = useEditorStore();

  const ref = useRef(null);

  useClickAway(ref, () => {
    setIsOpenMenu(false);
  });

  const hintergrundClickHandler = useCallback(() => {
    setIsOpenMenu(!openMenu);
  }, [openMenu]);

  const changeBackgroundHandler = useCallback((background: string) => {
    changeBackground(background);
  }, []);

  return (
    <div
      ref={ref}
      className={styles.root}
    >
      <div className={styles.hoverButton}>
        <IconButton
          isActiveSkeleton={!isInitialize}
          enableTooltip
          onClick={hintergrundClickHandler}
          iconName="colorSwatch"
          tooltipText="Hintergrund"
        />
      </div>
      <div className={classnames(
        styles.menu,
        { [styles.menuVisible]: openMenu },
      )}
      >
        {backgroundMenuItems.map((item) => (
          <IconButton
            enableTooltip
            active={item.background === backgroundName}
            key={item.id}
            onClick={() => changeBackgroundHandler(item.background)}
            iconName={item.icon}
            tooltipText={item.description}
          />
        ))}
      </div>
    </div>
  );
});

export default BackgroundMenu;
