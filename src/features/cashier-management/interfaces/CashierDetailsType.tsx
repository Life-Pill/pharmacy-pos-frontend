export interface CashierDetailsType {
  employerId: number;
  branchId: number;
  employerNicName: string;
  employerFirstName: string;
  employerLastName: string;
  employerPassword: string;
  employerConfirmPassword: string;
  employerEmail: string;
  employerPhone: string;
  employerAddress: string;
  employerSalary: number;
  employerNic: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER' | string; // Assuming gender can be one of these values
  dateOfBirth: string;
  role: 'OWNER' | 'MANAGER' | 'CASHIER' | 'OTHER' | string; // Assuming role can be one of these values
  pin: number;
  activeStatus: boolean;
  profileImage: string;
}
