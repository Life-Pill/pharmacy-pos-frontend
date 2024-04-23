import React, { ReactNode, createContext, useContext, useState } from 'react';
import { IEmployeeInterface } from '../interfaces/IEmployeeInterface';

interface UserContextType {
  user: IEmployeeInterface | null;
  setUser: (user: IEmployeeInterface | null) => void;
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

  return (
    <UserContext.Provider value={{ user, setUser }}>
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
