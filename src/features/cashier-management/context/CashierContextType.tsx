import { ComponentState } from 'react';
import { CashierDetailsType } from '../interfaces/CashierDetailsType';

export interface CashierContextType {
  currentComponent: ComponentState;
  setCurrentComponent: React.Dispatch<React.SetStateAction<ComponentState>>;
  setCashierDetails: React.Dispatch<React.SetStateAction<any>>;
  cashierDetails: CashierDetailsType;
}
