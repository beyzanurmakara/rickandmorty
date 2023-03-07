/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import RootNavigator from './navigation/RootNavigator';
import {Provider} from 'react-redux';
import store from './redux/store';

const App = () => {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaView style={{flex: 1}}>
          <RootNavigator />
        </SafeAreaView>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
