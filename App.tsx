// App.tsx
import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation';
import { LightTheme } from './src/theme/Theme';
import { ThemeProvider } from './src/theme/ThemeContext';
import { SnackbarProvider } from './src/components/GlobalSnackbar';

function App() {
  const theme = LightTheme;

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <StatusBar
            barStyle={'light-content'}
            backgroundColor={theme.colors.background}
          />
          <AppNavigator />
        </SnackbarProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;
