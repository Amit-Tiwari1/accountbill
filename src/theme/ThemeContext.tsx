import React, { createContext, useContext } from 'react';
import { AppTheme, LightTheme } from './Theme';

// Create theme context
const ThemeContext = createContext<AppTheme>(LightTheme);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode; theme: AppTheme }> = ({ children, theme }) => {
    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    );
};
