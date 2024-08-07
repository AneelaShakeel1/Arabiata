import 'react-native-gesture-handler'
import React, {useEffect, useRef, useState} from 'react';
import {StatusBar, LogBox, Platform, Alert, Text, TextInput, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {setJSExceptionHandler} from 'react-native-exception-handler';
import {OrientationLocker, PORTRAIT} from 'react-native-orientation-locker';
import Config from 'react-native-config';
import {I18nextProvider} from 'react-i18next';
import store, {persistor} from './app/data/redux/store/store';
import i18n from './app/data/json/locale/i18n';
import {useAppConfig} from './app/data/hooks/common/useAppConfig';
import AppNavigator from './app/navigation/app';
import AkLoader from './app/lib/elements/Loader/AkLoader';
import Toast from 'react-native-toast-message';
import {toastConfig} from './app/lib/utils/toast';
import RNModal from './app/lib/elements/Modal/RNModalWrapper';
import {AkInput} from './app/lib/elements/Input/AkInput';
import {AkButton} from './app/lib/elements';
import {useHAuth} from './app/data/hooks/auth/useAuth';
// import * as Sentry from '@sentry/react-native';
// import {ApolloProvider} from '@apollo/client';
// import AppNavigator from './navigation/app';
// import {HApolloClient} from '~/global/common/hooks/gqlConnection';
// import {useAppConfig} from '~/global/common/hooks/useAppConfig';
// import i18n from '~/shared/frontend-data-hooks/json/locale/i18n';
// import AkErrorBoundaryFallback from './epcore/elements/AkErrorBoundary/AkErrorBoundaryFallback';
// import {Settings} from 'react-native-fbsdk-next';

// AkErrorBoundaryFallback

function AppContainer() {
  const {language, themeMode, loading} = useAppConfig();

  function appInit() {
    // Settings.initializeSDK();
    // i18n.changeLanguage(language);
    // LogBox.ignoreLogs(['Require cycle:']);
    LogBox.ignoreAllLogs(true);
    function errorHandler(error: Error, isFatal: boolean) {
      if (isFatal) {
        Alert.alert('Service Error', 'An unknown problem has occurred.');
      } else {
        console.error(error);
      }
    }
    setJSExceptionHandler(errorHandler, Config.IS_DEV === 'false');
  }

  useEffect(() => {
    appInit();
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <OrientationLocker orientation={PORTRAIT} />
      <NavigationContainer>
        {Platform.OS === 'ios' ? (
          <StatusBar
            barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'}
            hidden={false}
          />
        ) : (
          <></>
        )}
        <AppNavigator />
      </NavigationContainer>

      <AkLoader loading={loading} color={'black'} size={'large'} />
      <Toast config={toastConfig} />
    </I18nextProvider>
  );
}

function App() {
  // if (__DEV__) {
  //   Sentry.init({
  //     dsn: 'https://7ead707becc50cbeda1f0f2b0c5ff908@o4505250163720192.ingest.sentry.io/4505662674042880',
  //     tracesSampleRate: 1.0,
  //   });
  // }

  return (
    // <Sentry.ErrorBoundary fallback={AkErrorBoundaryFallback}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContainer />
      </PersistGate>
    </Provider>
    // {/* </Sentry.ErrorBoundary> */}
  );
}
// export default Sentry.wrap(App);
export default App;
