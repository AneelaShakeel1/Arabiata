import * as React from 'react';
import {

  ChangePasswordScreen, ContactUsScreen, EditAddressScreen, EditProfileScreen, ManageAddressScreen, NewAddressScreen, ReferScreen, SettingsScreen,
} from '@src/app/screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Route from '../routes';


export type SettingsStackParamList = {
  [Route.SETTINGS_SCREEN]: undefined;
  [Route.SETTINGS_EDIT_PROFILE_SCREEN]: undefined;
  [Route.SETTINGS_CHANGE_PASSWORD_SCREEN]: undefined;
  [Route.SETTINGS_REFER_SCREEN]: undefined;
  [Route.SETTINGS_MANAGE_ADDRESS_SCREEN]: undefined;
  [Route.SETTINGS_NEW_ADDRESS_SCREEN]: undefined;
  [Route.SETTINGS_EDIT_ADDRESS_SCREEN]: undefined;
  [Route.SETTINGS_CONTACT_US_SCREEN]: undefined;
};
const Settings = createNativeStackNavigator<SettingsStackParamList>(); //Instead of this const Stack = createNativeStackNavigator(); by typescript

const SettingsNavigator = ({ }) => (
  <>
    <Settings.Navigator initialRouteName={Route.SETTINGS_SCREEN}>
      <Settings.Screen
        name={Route.SETTINGS_SCREEN}
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
      <Settings.Screen
        name={Route.SETTINGS_EDIT_PROFILE_SCREEN}
        component={EditProfileScreen}
        options={{ headerShown: false }}
      />
      <Settings.Screen
        name={Route.SETTINGS_CHANGE_PASSWORD_SCREEN}
        component={ChangePasswordScreen}
        options={{ headerShown: false }}
      />

      <Settings.Screen
        name={Route.SETTINGS_REFER_SCREEN}
        component={ReferScreen}
        options={{ headerShown: false }}
      />

      <Settings.Screen
        name={Route.SETTINGS_MANAGE_ADDRESS_SCREEN}
        component={ManageAddressScreen}
        options={{ headerShown: false }}
      />
     
      <Settings.Screen
        name={Route.SETTINGS_NEW_ADDRESS_SCREEN}
        component={NewAddressScreen}
        options={{ headerShown: false }}
      />
     
      <Settings.Screen
        name={Route.SETTINGS_EDIT_ADDRESS_SCREEN}
        component={EditAddressScreen}
        options={{ headerShown: false }}
      />

      <Settings.Screen
        name={Route.SETTINGS_CONTACT_US_SCREEN}
        component={ContactUsScreen}
        options={{ headerShown: false }}
      />
    </Settings.Navigator>
  </>
);

export default SettingsNavigator;
