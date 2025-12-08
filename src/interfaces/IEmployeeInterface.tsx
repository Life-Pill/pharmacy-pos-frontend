export interface IEmployeeInterface {
  employerId: number;
  branchId: number;
  employerNicName: string;
  employerFirstName: string;
  employerLastName: string;
  employerEmail: string;
  employerPhone: string;
  employerAddress: string;
  employerSalary: number;
  employerNic: string;
  isActiveStatus: boolean;
  gender: string;
  dateOfBirth: Date;
  role: string;
  pin: number;
  profileImageUrl: string | null;
}
