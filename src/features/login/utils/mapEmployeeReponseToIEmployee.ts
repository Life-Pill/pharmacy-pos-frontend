import { IEmployeeInterface } from '../../../interfaces/IEmployeeInterface';

export const mapEmployeeReponseToIEmployee = (
  employee: any
): IEmployeeInterface => {
  return {
    employerId: employee.employerId,
    branchId: employee.branchId,
    employerNicName: employee.employerNicName,
    employerFirstName: employee.employerFirstName,
    employerLastName: employee.employerLastName,
    employerEmail: employee.employerEmail,
    employerPhone: employee.employerPhone,
    employerAddress: employee.employerAddress,
    employerSalary: employee.employerSalary,
    employerNic: employee.employerNic,
    isActiveStatus: employee.activeStatus,
    gender: employee.gender,
    dateOfBirth: employee.dateOfBirth,
    role: employee.role,
    pin: employee.pin,
    profileImageUrl: employee.profileImageUrl,
  };
};
