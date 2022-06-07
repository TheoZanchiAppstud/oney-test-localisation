/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import i18next from 'i18next';
import React from 'react';
import {I18nextProvider, useTranslation} from 'react-i18next';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {i18n} from './src/localization/i18n';

const App: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const {t} = useTranslation();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const fs = () => {};

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Text>{i18n().home.hello}</Text>
          <Text>{i18n().home.next}</Text>
          <Text>{i18n().home.date(new Date().toISOString())}</Text>
          <Text>{i18n().home.localText}</Text>
          <Text>{i18n().home.addedFromLokalise}</Text>
          <Text>{i18n().home.addedFromLokalise2}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
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
