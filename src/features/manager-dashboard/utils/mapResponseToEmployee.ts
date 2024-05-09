import { CashierDetailsType } from '../../cashier-management/interfaces/CashierDetailsType';

export const mapResponseToEmployee = (employee: any): CashierDetailsType => {
  return {
    employerId: employee.employerId,
    branchId: employee.branchId,
    employerNicName: employee.employerNicName,
    employerFirstName: employee.employerFirstName,
    employerLastName: employee.employerLastName,
    employerPassword: employee.employerPassword,
    employerConfirmPassword: '',
    employerEmail: employee.employerEmail,
    employerPhone: employee.employerPhone,
    employerAddress: employee.employerAddress,
    employerSalary: employee.employerSalary,
    employerNic: employee.employerNic,
    gender: employee.gender,
    dateOfBirth: new Date(employee.dateOfBirth),
    role: employee.role,
    pin: employee.pin,
    activeStatus: employee.activeStatus,
    profileImage: employee.profileImage,
  };
};