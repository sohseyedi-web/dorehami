'use client';
import { createContext, useState, useEffect, useContext } from 'react';

type ResponsiveContextType = {
  active: boolean;
  setActive: (active: boolean) => void;
  updateMedia: () => void;
};

const ResponsiveContext = createContext<ResponsiveContextType | null>(null);

export const ResponsiveProvider = ({ children }: { children: React.ReactNode }) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setActive(window.innerWidth > 1024);
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const updateMedia = () => {
    setActive(window.innerWidth > 1024);
  };

  return (
    <ResponsiveContext.Provider value={{ active, setActive, updateMedia }}>
      {children}
    </ResponsiveContext.Provider>
  );
};

export const useResponsive = () => {
  const context = useContext(ResponsiveContext);

  if (!context) {
    throw new Error('useResponsive must be used within a ResponsiveProvider');
  }

  return context;
};
