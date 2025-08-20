'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { initRightClickBlocker } from '../utils/security';

const SidebarContext = createContext();

export function SidebarProvider({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    // initRightClickBlocker();
  }, []);

  useEffect(() => {
    const savedState = localStorage.getItem('sidebarCollapsed');
    setIsCollapsed(savedState === 'true');
  }, []);

  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem('sidebarCollapsed', newState);
  };

  return (
    <SidebarContext.Provider value={{ isCollapsed, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}

export const useSidebar = () => useContext(SidebarContext);
