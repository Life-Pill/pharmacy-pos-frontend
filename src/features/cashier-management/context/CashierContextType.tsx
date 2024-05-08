import { ComponentState } from 'react';
import { CashierDetailsType } from '../interfaces/CashierDetailsType';
import { EmployerBankDetails } from '../interfaces/EmployerBankDetails';

export interface CashierContextType {
  currentComponent: ComponentState;
  setCurrentComponent: React.Dispatch<React.SetStateAction<ComponentState>>;
  setCashierDetails: React.Dispatch<React.SetStateAction<any>>;
  cashierDetails: CashierDetailsType;
  cashierBankDetails: EmployerBankDetails;
  setCashierBankDetails: React.Dispatch<
    React.SetStateAction<EmployerBankDetails>
  >;
}
