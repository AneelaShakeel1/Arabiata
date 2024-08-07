import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {SplashScreen} from '@src/app/screens';
import AuthNavigator from '../auth';
import {DrawerNavigation} from '../drawer';


import Route from '../routes';
export type RootStackParamList = {
  [Route.ROOT_SPLASH_SCREEN]: undefined;
  [Route.ROOT_HOME_SCREEN]: undefined;
  [Route.ROOT_AUTH_SCREEN]: undefined;
};
export const Stack = createNativeStackNavigator<RootStackParamList>(); //Instead of this const Stack = createNativeStackNavigator(); by typescript

export const commonHeaderOptions = {headerShown: false};

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName={Route.ROOT_SPLASH_SCREEN}>
      <Stack.Screen
        name={Route.ROOT_SPLASH_SCREEN}
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Route.ROOT_HOME_SCREEN}
        component={DrawerNavigation}
        options={commonHeaderOptions}
      />
      <Stack.Screen
        name={Route.ROOT_AUTH_SCREEN}
        component={AuthNavigator}
        options={commonHeaderOptions}
      />
    </Stack.Navigator>
  );
}
