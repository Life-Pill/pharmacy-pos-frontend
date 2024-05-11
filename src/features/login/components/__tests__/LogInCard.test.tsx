import React from 'react';
import { render, screen } from '@testing-library/react';
import { UserProvider } from '../../../../context/UserContext'; // Assuming you have a UserProvider component
import LogInCard from '../LogInCard'; // Assuming LogInCard.tsx is in the same directory as LogInCard.test.tsx
import '@testing-library/jest-dom'; // Import the Jest DOM matchers

jest.mock('../../../../assets/logo/logo.png', () => 'logo-path');

describe('LogInCard Component', () => {
  it('renders correctly', () => {
    // Render the LogInCard component within a UserProvider
    render(
      <UserProvider>
        <LogInCard />
      </UserProvider>
    );

    // Your test assertions go here
    // For example, checking if certain elements are rendered
    const logoElement = screen.getByAltText('Logo');
    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const signInButton = screen.getByText('Sign In');
    const forgotPasswordLink = screen.getByText('Forgot Password?');
    const userAgreementText = screen.getByText('End User Agreement');

    expect(logoElement).toBeInTheDocument();
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(signInButton).toBeInTheDocument();
    expect(forgotPasswordLink).toBeInTheDocument();
    expect(userAgreementText).toBeInTheDocument();
  });

  // Add your other tests here
});
