import * as React from 'react';
import {
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  ChangePasswordScreen,
} from '@src/app/screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Route from '../routes';
import { RootStackParamList } from '../app';

export type AuthStackParamList = {
  // [Route.AUTH_INITITAL_SCREEN]: undefined;
  [Route.AUTH_LOGIN_SCREEN]: undefined;
  [Route.AUTH_REGISTER_SCREEN]: undefined;
  [Route.AUTH_FORGOT_SCREEN]: undefined;
  // [Route.AUTH_CHANGE_PASSWORD_SCREEN]: undefined;
};
const Auth = createNativeStackNavigator<AuthStackParamList>(); //Instead of this const Stack = createNativeStackNavigator(); by typescript

const AuthNavigator = ({ }) => (
  <>
    <Auth.Navigator initialRouteName={Route.AUTH_LOGIN_SCREEN}>
      {/* <Auth.Screen
        name={Route.AUTH_INITITAL_SCREEN}
        component={()=><></>}
        options={{ headerShown: false }}
      /> */}
        {/* <Auth.Screen
          name={Route.AUTH_CHANGE_PASSWORD_SCREEN}
          component={ChangePasswordScreen}
          options={{ headerShown: false }}
        /> */}
      <Auth.Screen
        name={Route.AUTH_LOGIN_SCREEN}
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Auth.Screen
        name={Route.AUTH_FORGOT_SCREEN}
        component={ForgotPasswordScreen}
        options={{ headerShown: false }}
      />

      <Auth.Screen
        name={Route.AUTH_REGISTER_SCREEN}
        component={RegisterScreen}
        options={{ headerShown: false }}
      />

    </Auth.Navigator>
  </>
);

export default AuthNavigator;
