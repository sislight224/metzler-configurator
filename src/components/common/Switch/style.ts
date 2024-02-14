import { styled, Switch } from '@mui/material';

export const SwitchWrapper = styled(Switch)`
  width: 38px;
  height: 22px;
  padding: 0;
  border: 1px solid #DDDDDD;
  margin-right: 8px;
  border-radius: 32px;
  flex-shrink: 0;
  
  &:active {
    border: 1px solid #C5DAF7;
    box-shadow: 0 0 0 4px rgba(49, 132, 253, 0.5);
  }
  
  .MuiButtonBase-root {
    padding: 2px;
    
    .MuiSwitch-thumb {
      width: 14px;
      height: 14px;
      background: #DDDDDD;
      box-shadow: none;
      transform: translateY(1px);
    }

    &.Mui-checked {
      &+.MuiSwitch-track {
        background-color: #337575 !important;
      }
      .MuiSwitch-thumb {
        transform: translateY(1px) translateX(-2px);
        background: white;
      }
    }
  }
  
  .MuiSwitch-track {
    border-radius: 32px;
    background-color: white;
    opacity: 1 !important;
    transition: .2s;
  }
`;
