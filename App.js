/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useContext, Suspense} from 'react';
import {useTranslation} from 'react-i18next';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import {translations} from './src/localization/PhraseTranslation';
import {
  LocalizationContext,
  LocalizationProvider,
} from './src/localization/Translation';

const App = () => {
  return (
    <Suspense fallback={<Text>Loading... </Text>}>
      <AppSync />
    </Suspense>
  );
};

const AppSync = () => {
  const {t} = useTranslation();

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Suspense fallback={<></>}>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <Header />
          <View
            style={{
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}>
            <Text>{t('home.hello')}</Text>
            <Text>{t('home.next')}</Text>
            <Text>
              {t('home.date', {
                date: new Date().toISOString(),
              })}
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Suspense>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
