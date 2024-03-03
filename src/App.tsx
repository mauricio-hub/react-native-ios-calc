/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import { styles } from './config/theme/app-theme';

import { CalculatorScreen} from './presentation/screens/CalculatorScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;




function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';


  return (
    <View style={styles.background}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={'black'}
      />
      <CalculatorScreen />
    </View>
  );
}



export default App;
