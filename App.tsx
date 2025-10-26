// App.tsx
import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation';
import { LightTheme } from './src/theme/Theme';
import { ThemeProvider } from './src/theme/ThemeContext';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

function App() {
  const theme = LightTheme;




  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <ThemeProvider theme={theme}>
          <StatusBar
            barStyle={'light-content'}
            backgroundColor={theme.colors.background}
          />
          <AppNavigator />
        </ThemeProvider>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
