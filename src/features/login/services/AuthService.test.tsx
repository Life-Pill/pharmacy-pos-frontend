import { act, renderHook } from '@testing-library/react';
import useSignIn from './AuthService';
import axios from 'axios'; // Assuming you use Axios for HTTP requests

// Mock Axios instance for testing
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('useSignIn hook', () => {
  it('should sign in successfully', async () => {
    const setCookie = jest.fn(); // Mock the setCookie function from useUserContext
    const { result } = renderHook(() => useSignIn());

    // Mock successful response from the API
    const successfulResponse = {
      data: {
        code: 200,
        message: 'Authentication successful',
        data: {
          authenticationResponse: {
            message: 'Authentication successful',
            accessToken: 'mocked_access_token', // Mocked access token
            refreshToken: 'mocked_refresh_token',
            employerId: 1,
            employerEmail: 'johndoe@example.com',
            role: 'OWNER'
          },
          employerDetails: {
            employerId: 1,
            branchId: 1,
            employerNicName: 'John',
            employerFirstName: 'John',
            employerLastName: 'Doe',
            employerEmail: 'johndoe@example.com',
            employerPhone: '0771234567',
            employerAddress: 'Test Address',
            employerSalary: 50000,
            employerNic: '123456789V',
            activeStatus: true,
            gender: 'MALE',
            dateOfBirth: '1990-01-01T00:00:00.000+00:00',
            role: 'OWNER',
            pin: 1234,
            profileImageUrl: null
          },
        },
      },
    };

    // Mock Axios post method to return successful response
    mockedAxios.post.mockResolvedValueOnce(successfulResponse);

    // Perform the sign-in action
    act(() => {
      result.current.signIn('testusername', 'testpassword');
    });

    // Wait for the hook to finish the async operation
    await waitForNextUpdate();

    // Assertions
    expect(setCookie).toHaveBeenCalledWith('mocked_access_token');
    expect(result.current.loading).toBe(false);
    // Add more assertions as needed for user data handling
  });

  it('should handle incorrect password', async () => {
    const setCookie = jest.fn();
    const { result } = renderHook(() => useSignIn());

    // Mock error response from the API
    const errorResponse = new Error('Incorrect password. Please try again.');
    mockedAxios.post.mockRejectedValueOnce(errorResponse);

    // Perform the sign-in action
    act(() => {
      result.current.signIn('testusername', 'wrongpassword');
    });

    // Wait for the hook to finish the async operation
    await waitForNextUpdate();

    // Assertions
    expect(setCookie).not.toHaveBeenCalled();
    expect(result.current.loading).toBe(false);
    // Add more assertions for error handling
  });
});
function waitForNextUpdate() {
  // throw new Error('Function not implemented.');
}
