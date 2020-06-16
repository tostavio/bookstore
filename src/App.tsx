import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { theme } from './shared/theme';
import { Router } from './router';
import { ThemeProvider } from './shared/styles/styled-components';
import store, { persistor } from './state/store';
import { PersistGate } from 'redux-persist/integration/react';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={theme}>
          <Router />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
