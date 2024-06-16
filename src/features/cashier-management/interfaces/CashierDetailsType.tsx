// export interface CashierDetailsType {
//   employerId: number;
//   branchId: number;
//   employerNicName: string;
//   employerFirstName: string;
//   employerLastName: string;
//   employerPassword: string;
//   employerConfirmPassword: string;
//   employerEmail: string;
//   employerPhone: string;
//   employerAddress: string;
//   employerSalary: number;
//   employerNic: string;
//   gender: 'MALE' | 'FEMALE' | 'OTHER' | string; // Assuming gender can be one of these values
//   dateOfBirth: string;
//   role: 'OWNER' | 'MANAGER' | 'CASHIER' | 'OTHER' | string; // Assuming role can be one of these values
//   pin: number;
//   activeStatus: boolean;
//   profileImage: string;
// }

export interface CashierDetailsType {
  employerId: number;
  branchId: number;
  employerNicName: string;
  employerFirstName: string;
  employerLastName: string;
  employerPassword: string;
  employerEmail: string;
  employerPhone: string;
  employerAddress: string;
  employerSalary: number;
  employerNic: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER'; // Assuming gender can be MALE, FEMALE, or OTHER
  dateOfBirth: string; // Date string in ISO 8601 format, e.g., "2024-06-15T17:01:10.445Z"
  role: 'OWNER' | 'EMPLOYEE' | 'MANAGER' | 'OTHER_ROLE'; // Define other possible roles as needed
  pin: number;
  profileImage: string[]; // Array of strings representing image URLs
  activeStatus: boolean;
}
