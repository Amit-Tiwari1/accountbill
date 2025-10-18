// App.tsx
import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation';
import { LightTheme, DarkTheme } from './src/theme/Theme';
import { ThemeProvider } from './src/theme/ThemeContext';
import { SnackbarProvider } from './src/components/GlobalSnackbar';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const theme = isDarkMode ? DarkTheme : LightTheme;

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={theme.colors.background}
          />
          <AppNavigator />
        </SnackbarProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;
