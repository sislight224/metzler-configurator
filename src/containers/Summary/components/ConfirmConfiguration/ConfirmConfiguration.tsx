import Button from 'components/common/Button/Button';
import classNames from './ConfirmConfiguration.module.scss';
import { FC, useCallback } from 'react';
import ModelControls from '../../containers/ModelControls/ModelControls';
import IconButton from '../../../../components/common/IconButton/IconButton';
import cl from 'classnames';
import { useControlsStore } from '../../../../hooks/store/useControlsStore';
import { observer } from 'mobx-react-lite';
import { useCalculatorStore } from '../../../../hooks/store/useCalculatorStore';

export interface ConfirmConfigurationProps {
  onConfirm: () => void;
}

export const ConfirmConfiguration: FC<ConfirmConfigurationProps> = observer((props) => {
  const {
    onConfirm = () => undefined,
  } = props;

  const { priceConfiguration } = useCalculatorStore();

  const {
    confirmMenuShow: show,
    setConfirmMenuShow: setShow,
  } = useControlsStore();

  const clickDotsHandler = useCallback(() => {
    setShow(!show);
  }, [show]);

  const closeMenu = useCallback(() => {
    setShow(false);
  }, []);

  return (
    <div className={classNames.root}>
      <div className={classNames.info}>
        <div className={classNames.label}>Gesamt</div>
        <div className={classNames.value}>
          <span className={classNames.price}>
            {priceConfiguration.toFixed(2)}
            {' '}
            €
          </span>
          <span className={classNames.vat}>Inkl. 19% MwSt.</span>
        </div>
      </div>
      <div className={classNames.buttonWrap}>
        <div className={classNames.modelControls}>
          <div className={cl(
            classNames.list,
            { [classNames.list_hide]: !show },
          )}
          >
            <ModelControls
              handleClick={closeMenu}
            />
          </div>
          <IconButton
            iconName="dots"
            onClick={clickDotsHandler}
          />
        </div>
        <Button
          onClick={onConfirm}
          label="In den Warenkorb"
          width="160px"
        />
      </div>
    </div>
  );
});

export default ConfirmConfiguration;
