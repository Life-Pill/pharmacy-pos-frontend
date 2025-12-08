import { mapEmployeeReponseToIEmployee } from '../mapEmployeeReponseToIEmployee';

describe('mapEmployeeReponseToIEmployee function', () => {
  it('should map employee response correctly', () => {
    const mockEmployeeResponse = {
      employerId: 1,
      branchId: 101,
      employerNicName: 'JohnDoe',
      employerFirstName: 'John',
      employerLastName: 'Doe',
      employerEmail: 'johndoe@example.com',
      employerPhone: '1234567890',
      employerAddress: '123 Street, City',
      employerSalary: 50000,
      employerNic: '123456789X',
      activeStatus: true,
      gender: 'Male',
      dateOfBirth: '1990-01-01',
      role: 'Manager',
      pin: '1234',
      profileImageUrl: 'path/to/image.jpg',
    };

    const mappedEmployee = mapEmployeeReponseToIEmployee(mockEmployeeResponse);

    expect(mappedEmployee).toEqual({
      employerId: 1,
      branchId: 101,
      employerNicName: 'JohnDoe',
      employerFirstName: 'John',
      employerLastName: 'Doe',
      employerEmail: 'johndoe@example.com',
      employerPhone: '1234567890',
      employerAddress: '123 Street, City',
      employerSalary: 50000,
      employerNic: '123456789X',
      isActiveStatus: true,
      gender: 'Male',
      dateOfBirth: '1990-01-01',
      role: 'Manager',
      pin: '1234',
      profileImageUrl: 'path/to/image.jpg',
    });
  });

  it('should handle missing properties gracefully', () => {
    const mockEmployeeResponse = {
      employerId: 1,
      // Missing other properties intentionally for testing
    };

    const mappedEmployee = mapEmployeeReponseToIEmployee(mockEmployeeResponse);

    // Ensure that missing properties are mapped to undefined
    expect(mappedEmployee).toEqual({
      employerId: 1,
      branchId: undefined,
      employerNicName: undefined,
      employerFirstName: undefined,
      employerLastName: undefined,
      employerEmail: undefined,
      employerPhone: undefined,
      employerAddress: undefined,
      employerSalary: undefined,
      employerNic: undefined,
      isActiveStatus: undefined,
      gender: undefined,
      dateOfBirth: undefined,
      role: undefined,
      pin: undefined,
      profileImageUrl: undefined,
    });
  });
});
