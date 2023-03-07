import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../screens/Home/home-screen';
import EpisodeDetailScreen from '../screens/Episode/episode-detail-screen';
import FavoritesScreen from '../screens/Favorites';

const RootStack = createStackNavigator();

const RootNavigator = () => {
  return (
    <RootStack.Navigator screenOptions={{headerMode: 'none'}}>
      <RootStack.Screen name="HomeStack" component={HomeScreen} />
      <RootStack.Screen name="EpisodeStack" component={EpisodeDetailScreen} />
      <RootStack.Screen name="FavoritesStack" component={FavoritesScreen} />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
