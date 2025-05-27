'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface AppContextType {
  user: { name: string } | null;
  setUser: (user: { name: string } | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{ name: string } | null>(null);

  // Check authentication status when the app loads
  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch('http://127.0.0.1:8000/api/accounts/profile/', {
            method: 'GET',
            headers: {
              Authorization: `Token ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setUser({ name: data.username }); // Assume `data.username` exists and is correct
          } else {
            // Clear token if invalid
            localStorage.removeItem('token');
            setUser(null);
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      }
    };

    checkUser();
  }, []);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};