export interface EmployerData {
  employerId: number;
  branchId: number;
  employerNicName: string;
  employerFirstName: string;
  employerLastName: string;
  employerPassword: string;
  employerEmail: string;
  employerPhone: string | null;
  employerAddress: string;
  employerSalary: number;
  employerNic: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  dateOfBirth: Date; // This can be changed to a Date type if required
  role: 'OWNER' | 'MANAGER' | 'EMPLOYEE'; // Add other possible roles if needed
  pin: number;
  profileImage: string | null; // Assuming a URL to the image
  activeStatus: boolean;
}
