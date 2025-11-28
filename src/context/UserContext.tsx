import React, { createContext, useContext, useState } from 'react';
import { IEmployeeInterface } from '../interfaces/IEmployeeInterface';

interface UserContextType {
  user: IEmployeeInterface | null;
  setUser: (user: IEmployeeInterface | null) => void;
  cookie: String | null;
  setCookie: (cookie: String | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<IEmployeeInterface | null>(() => {
    // Initialize user from local storage if available
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [cookie, setCookie] = useState<String | null>(() => {
    const storedCookie = localStorage.getItem('cookie');
    return storedCookie ? JSON.parse(storedCookie) : null;
  });

  // Wrapper function to persist cookie to localStorage
  const handleSetCookie = (newCookie: String | null) => {
    setCookie(newCookie);
    if (newCookie) {
      localStorage.setItem('cookie', JSON.stringify(newCookie));
    } else {
      localStorage.removeItem('cookie');
    }
  };

  // Wrapper function to persist user to localStorage
  const handleSetUser = (newUser: IEmployeeInterface | null) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem('user', JSON.stringify(newUser));
    } else {
      localStorage.removeItem('user');
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser: handleSetUser, cookie, setCookie: handleSetCookie }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
