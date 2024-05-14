import { CashierDetailsType } from '../../../cashier-management/interfaces/CashierDetailsType';
import { mapResponseToEmployee } from '../mapResponseToEmployee';

describe('mapResponseToEmployee', () => {
  it('should map employee data correctly', () => {
    const employeeData = {
      employerId: '123',
      branchId: '456',
      employerNicName: 'john_doe',
      employerFirstName: 'John',
      employerLastName: 'Doe',
      employerPassword: 'password123',
      employerEmail: 'john.doe@example.com',
      employerPhone: '1234567890',
      employerAddress: '123 Main Street',
      employerSalary: 50000,
      employerNic: '123456789V',
      gender: 'MALE',
      dateOfBirth: '1990-01-01',
      role: 'Cashier',
      pin: '1234',
      activeStatus: true,
      profileImage: 'path/to/image.jpg',
    };

    const mappedEmployee: CashierDetailsType =
      mapResponseToEmployee(employeeData);

    expect(mappedEmployee).toEqual({
      employerId: '123',
      branchId: '456',
      employerNicName: 'john_doe',
      employerFirstName: 'John',
      employerLastName: 'Doe',
      employerPassword: 'password123',
      employerConfirmPassword: '',
      employerEmail: 'john.doe@example.com',
      employerPhone: '1234567890',
      employerAddress: '123 Main Street',
      employerSalary: 50000,
      employerNic: '123456789V',
      gender: 'MALE',
      dateOfBirth: new Date('1990-01-01'),
      role: 'Cashier',
      pin: '1234',
      activeStatus: true,
      profileImage: 'path/to/image.jpg',
    });
  });

  it('should handle edge case of missing profile image', () => {
    const employeeData = {
      employerId: '123',
      branchId: '456',
      employerNicName: 'john_doe',
      employerFirstName: 'John',
      employerLastName: 'Doe',
      employerPassword: 'password123',
      employerEmail: 'john.doe@example.com',
      employerPhone: '1234567890',
      employerAddress: '123 Main Street',
      employerSalary: 50000,
      employerNic: '123456789V',
      gender: 'MALE',
      dateOfBirth: '1990-01-01',
      role: 'Cashier',
      pin: '1234',
      activeStatus: true,
      profileImage: undefined,
    };

    const mappedEmployee: CashierDetailsType =
      mapResponseToEmployee(employeeData);

    expect(mappedEmployee.profileImage).toBeUndefined();
  });

  // Add more test cases as needed to cover different scenarios and edge cases
});
