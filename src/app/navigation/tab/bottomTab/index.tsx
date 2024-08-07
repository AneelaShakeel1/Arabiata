import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Feather';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import useAKTheme from '~/app/lib/hooks/useAKTheme';

// import {Job, Client, Schedule, Chat} from '@screens';
// import HomeNavigator from '../../home';
// import JobNavigator from '~/navigation/job';
// import useAKTheme from '@lib/hooks/useAKTheme';
// import ClientNavigator from '~/navigation/client';


export type RootStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  Login: undefined;
  Signup: undefined;
  Forgot: undefined;
  OTP: undefined;
  ChangePassword: undefined;
  EditProfile: {isSignup: boolean};
  ChangeTheme: undefined;
  Contractor: undefined;
  CompanyInformation: undefined;
  //  Home Navigator
  Jobs: undefined;
  Payment: undefined;
  Quotations: undefined;
  Projects: undefined;
  Request: undefined;
  Profile: undefined;
  Dashboard: undefined;
  Initial: undefined;
  Invoice: undefined;
  RequestView: {data: any};
  QuotationView: {data: any};
  ClientView: {data?: any};
  EditCompany: undefined;
  DrawerNavigator: undefined;
  EditAddress: undefined;
  Client: undefined;
  BottomTab: undefined;
  AllJobs: undefined;
  CreateNew: undefined;
  Chat: undefined;
}; // RootStackParamList is the list of screens that we use in the app
export const Stack = createNativeStackNavigator<RootStackParamList>(); //Instead of this const Stack = createNativeStackNavigator(); by typescript

const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const {
    colors: {colorPrimary},
  } = useAKTheme();
  let tabOptions = {
    headerShown: false,
    // tabBarShowLabel: false,
    tabBarActiveTintColor: colorPrimary,
    tabBarInactiveTintColor: '#cccccc',
  };
  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarStyle: {backgroundColor: colorPrimary},
      }}
      backBehavior="history">
      <BottomTab.Screen
        options={{
          ...tabOptions,
          tabBarIcon: ({color, size}) => <Icon size={6} name="home" color={color} />,
        }}
        name="Home"
        component={()=><></>}
      />
      {/* <BottomTab.Screen
        options={{
          ...tabOptions,
          tabBarIcon: ({color, size}) => <FeatherIcon size={wp(6)} name="calendar" color={color} />,
        }}
        name="Calendar"
        component={Schedule}
      />
      <BottomTab.Screen
        options={{
          ...tabOptions,
          tabBarIcon: ({color, size}) => <Icon size={wp(7)} name="user-check" color={color} />,
        }}
        name="Client"
        // component={Client}
        component={ClientNavigator}
      />
      <BottomTab.Screen
        options={{
          ...tabOptions,
          tabBarIcon: ({color, size}) => <Icon size={wp(6)} name="briefcase" color={color} />,
        }}
        name="Jobs"
        component={JobNavigator}
      />

      <BottomTab.Screen
        options={{
          ...tabOptions,
          tabBarIcon: ({color, size}) => (
            <FeatherIcon size={wp(6)} name="message-circle" color={color} />
          ),
        }}
        name="Chat"
        component={Chat}
      /> */}
    </BottomTab.Navigator>
  );
};
export default BottomTabNavigator;
