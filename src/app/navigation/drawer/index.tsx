import React, {useEffect, useState} from 'react';
import {Avatar, Icon} from '@rneui/themed';
import {DrawerContentScrollView, DrawerContentComponentProps} from '@react-navigation/drawer';
import {AkText, AkView} from '@src/app/lib/elements';
import useAKTheme from '@lib/hooks/useAKTheme';
import {TouchableOpacity, Image} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import useAKThemeImages from '@lib/hooks/useAKImages';
import {useTranslation} from 'react-i18next';
import styles from './styles';
import {useAppConfig} from '~/app/data/hooks/common/useAppConfig';
import {useHSettings} from '~/app/data/hooks/common/useSettings';
import {
  ArabiataClubScreen,
  CategoryDetailsScreen,
  ItemDetailsScreen,
  CateringScreen,
  DashboardScreen,
  FavouritesScreen,
  JobScreen,
  MyOrdersScreen,
  NewAddressScreen,
  OrderDetailsScreen,
  RatingScreen,
  SearchItemsScreen,
} from '~/app/screens';
import Col from '~/app/lib/elements/AkView/Col/Col';
import SettingsNavigator from '../settings';
import CartNavigator from '../cart';
import Route from '../routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useHUser} from '~/app/data/hooks/common/useUser';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {getUserId} from '~/app/lib/utils/userId';

interface IUserProfileProps {
  profile_image: string;
  name: string;
}

export type DrawerStackParamList = {
  [Route.HOME_DASHBOARD_SCREEN]: undefined;
  [Route.HOME_CATEGORY_DETAILS_SCREEN]: undefined;
  [Route.HOME_MY_ORDERS_SCREEN]: undefined;
  [Route.HOME_ORDER_DETAILS_SCREEN]: undefined;
  [Route.HOME_FAVOURITE_SCREEN]: undefined;
  [Route.HOME_RATING_SCREEN]: undefined;
  [Route.HOME_ARABIATA_CLUB_SCREEN]: undefined;
  [Route.SETTINGS_ROOT]: undefined;
  [Route.CART_ROOT]: undefined;
  [Route.HOME_JOB_SCREEN]: undefined;
  [Route.HOME_CATERING_SCREEN]: undefined;
  [Route.HOME_NEW_ADDRESS_SCREEN]: undefined;
  [Route.HOME_SEARCH_ITEMS_SCREEN]: undefined;
  [Route.HOME_ITEM_DETAILS_SCREEN]: undefined;
};

const DrawerContent = (props: DrawerContentComponentProps) => {
  const [userProfile, setUserProfile] = useState<IUserProfileProps | null>(null);
  const [userImage, setUserImage] = useState<string | undefined>(undefined);
  const [userName, setUserName] = useState<string>('');
  const {language} = useAppConfig();
  const {setReduxLoginInfo, loginInfo} = useHUser();
  const {colors} = useAKTheme();
  const {Logo, User} = useAKThemeImages();
  const {getProfile} = useHSettings();
  const {t} = useTranslation();
  const routes = [
    {
      screenName: t('home'),
      icon: {
        name: 'home',
        size: 25,
        type: 'antdesign',
      },
      onPress: null,
      routeName: Route.HOME_DASHBOARD_SCREEN,
    },
    {
      screenName: t('my_orders'),
      icon: {
        name: 'copy',
        size: 25,
        type: 'entypo',
      },
      onPress: async () => {
        !loginInfo
          ? props.navigation.navigate(Route.ROOT_AUTH_SCREEN)
          : props.navigation.navigate(Route.HOME_DASHBOARD_ORDER_ROOT);
      },
      routeName: Route.HOME_DASHBOARD_ORDER_ROOT,
    },
    {
      screenName: t('favourite_list'),
      icon: {
        name: 'heart-outlined',
        size: 25,
        type: 'entypo',
      },
      onPress: async () => {
        !loginInfo
          ? props.navigation.navigate(Route.ROOT_AUTH_SCREEN)
          : props.navigation.navigate(Route.HOME_DASHBOARD_FAVOURITE_ROOT);
      },
      routeName: Route.HOME_DASHBOARD_FAVOURITE_ROOT,
    },
    {
      screenName: t('ratting_amp_review'),
      icon: {
        name: 'star-outlined',
        size: 25,
        type: 'entypo',
      },
      onPress: null,
      routeName: Route.HOME_RATING_SCREEN,
    },
    {
      screenName: t('loyalty'),
      icon: {
        name: 'trophy-outline',
        size: 25,
        type: 'ionicon',
      },
      onPress: async () => {
        !loginInfo
          ? props.navigation.navigate(Route.ROOT_AUTH_SCREEN)
          : props.navigation.navigate(Route.HOME_ARABIATA_CLUB_SCREEN);
      },
      routeName: Route.HOME_ARABIATA_CLUB_SCREEN,
    },
    {
      screenName: t('setting'),
      icon: {
        name: 'settings-outline',
        size: 25,
        type: 'ionicon',
      },
      onPress: null,
      routeName: Route.SETTINGS_ROOT,
    },
    {
      screenName: t('jobs'),
      icon: {
        name: 'briefcase-outline',
        size: 25,
        type: 'ionicon',
      },
      onPress: null,
      routeName: Route.HOME_JOB_SCREEN,
    },
    {
      screenName: t('catering'),
      icon: {
        name: 'room-service-outline',
        size: 25,
        type: 'material-community',
      },
      onPress: null,
      routeName: Route.HOME_CATERING_SCREEN,
    },
    {
      screenName: loginInfo ? t('log_out') : t('log_in'),
      icon: {
        name: loginInfo ? 'logout' : 'login',
        size: 25,
      },
      onPress: !loginInfo
        ? () => props.navigation.navigate(Route.ROOT_AUTH_SCREEN)
        : async () => {
            await AsyncStorage.removeItem('loginInfo');
            setReduxLoginInfo(null);
            props.navigation.navigate(Route.ROOT_AUTH_SCREEN);
          },
    },
  ];

  useEffect(() => {
    (async () => {
      const res = await getProfile({user_id: await getUserId()});
      if (res.status === 1 && res.data) {
        setUserProfile(res.data);
        setUserImage(res.data.profile_image);
        setUserName(res.data.name);
      }
    })();
  }, []);

  function onDrawerItemPressed(route: typeof routes[0]) {
    if (route.onPress) {
      return route.onPress();
    } else {
      route && route.routeName && props.navigation.navigate(route.routeName as string);
    }
  }

  return (
    <Col
      style={[
        styles.conntainer,
        // {backgroundColor: primary, borderWidth: 1, borderColor: bgModal1},
      ]}>
      <DrawerContentScrollView {...props} style={{paddingHorizontal: 10}}>
        {/* <Col style={{ alignItems: 'center' }}>
            <Avatar source={User} containerStyle={{ width: 100, height: 100 }} />
            <AkText>asfdsfsdf</AkText>
          </Col> */}
        <Col style={{alignItems: 'center'}}>
          <Avatar
            source={loginInfo ? {uri: loginInfo?.profile_image} : Logo}
            containerStyle={{width: 150, height: 150}}
          />
          <AkText style={{fontSize: 18, fontWeight: 'bold'}}>
            {loginInfo ? loginInfo?.name : t('app_name')}
          </AkText>
        </Col>
        <Col style={{marginTop: 40}}>
          {routes.map((route, index) => {
            return (
              <TouchableOpacity activeOpacity={0.5} onPress={() => onDrawerItemPressed(route)}>
                <AkView
                  style={{
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottomWidth: 0.2,
                    borderBottomColor: colors.medium_gray,
                    marginBottom: 10,
                    paddingBottom: 10,
                  }}>
                  <AkView style={{alignItems: 'center'}}>
                    <Icon {...route.icon} color={colors.colorPrimaryDark} />
                    <AkText style={{marginHorizontal: 5}}>{route.screenName}</AkText>
                  </AkView>
                  <Icon
                    name={`chevron-${language === 'en' ? 'right' : 'left'}`}
                    color={'#949494'}
                  />
                </AkView>
              </TouchableOpacity>
            );
          })}
        </Col>

        {/* <AkView
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 5,
          }}>
          <AkText>Change Theme :</AkText>
          <AkThemeSwitch />
        </AkView> */}

        {/* <AkView
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 5,
            marginTop: 10,
          }}>
          <AkText>Change Language :</AkText>
          <Formik onSubmit={() => { }} initialValues={{ sad: '' }}>
            <AkPicker
              // name={'sad'}
              data={[
                { label: 'en', value: 'en' },
                { label: 'ar', value: 'ar' },
              ]}
              value={language}
              onChange={(value) => {
                setReduxLanguage(value);
                changeLanguage(value);
              }}
              dropDownStyles={{ width: 120 }}
            />
          </Formik>
        </AkView> */}

        {/* <AkView style={{marginTop: 10, alignItems: 'center'}}>
          <AkButton
            onClick={() => {
              props.navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [
                    {
                      name: Route.ROOT_AUTH_SCREEN,
                      // state: {
                      //   routes: [
                      //     {
                      //       name: Route.AUTH_LOGIN_SCREEN,
                      //     },
                      //   ],
                      // },
                    },
                  ],
                }),
              );
            }}
            btnText="Log out"
            width={'80%'}
          />
        </AkView> */}

        <AkView style={{marginTop: 20, paddingHorizontal: 10}}>
          <AkText numberOfLines={2} style={{textAlign: 'center'}}>
            {t('copyright', {year: new Date().getFullYear()})}
          </AkText>
        </AkView>
      </DrawerContentScrollView>
    </Col>
  );
};

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function DashboardStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={Route.HOME_DASHBOARD_SCREEN}>
      <Stack.Screen name={Route.HOME_DASHBOARD_SCREEN} component={DashboardScreen} />
      <Stack.Screen name={Route.HOME_CATEGORY_DETAILS_SCREEN} component={CategoryDetailsScreen} />
      <Stack.Screen name={Route.HOME_ITEM_DETAILS_SCREEN} component={ItemDetailsScreen} />
      <Stack.Screen name={Route.CART_ROOT} component={CartNavigator} />
    </Stack.Navigator>
  );
}

function OrderStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={Route.HOME_MY_ORDERS_SCREEN}>
      <Stack.Screen name={Route.HOME_MY_ORDERS_SCREEN} component={MyOrdersScreen} />
      <Stack.Screen name={Route.HOME_ORDER_DETAILS_SCREEN} component={OrderDetailsScreen} />
    </Stack.Navigator>
  );
}

function FavouriteStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={Route.HOME_FAVOURITE_SCREEN}>
      <Stack.Screen name={Route.HOME_FAVOURITE_SCREEN} component={FavouritesScreen} />
      <Stack.Screen name={Route.HOME_ITEM_DETAILS_SCREEN} component={ItemDetailsScreen} />
      <Stack.Screen name={Route.CART_ROOT} component={CartNavigator} />
    </Stack.Navigator>
  );
}

export const DrawerNavigation = () => {
  const {language, setReduxLanguage, themeMode} = useAppConfig();
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerType: 'front',
        drawerPosition: language === 'en' ? 'left' : 'right',
        headerShown: false,
      }}
      // useLegacyImplementation={false}
      drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen
        name={Route.HOME_DASHBOARD_ROOT}
        component={DashboardStack}
        options={{
          drawerItemStyle: {height: 0},
        }}
      />
      <Drawer.Screen
        name={Route.HOME_DASHBOARD_ORDER_ROOT}
        component={OrderStack}
        options={{
          drawerItemStyle: {height: 0},
        }}
      />
      <Drawer.Screen
        name={Route.HOME_DASHBOARD_FAVOURITE_ROOT}
        component={FavouriteStack}
        options={{
          drawerItemStyle: {height: 0},
        }}
      />

      {/* <Drawer.Screen
        name={Route.HOME_MY_ORDERS_SCREEN}
        component={MyOrdersScreen}
        options={{
          drawerItemStyle: {height: 0},
        }}
      />
      <Drawer.Screen
        name={Route.HOME_ORDER_DETAILS_SCREEN}
        component={OrderDetailsScreen}
        options={{
          drawerItemStyle: {height: 0},
        }}
      /> */}
      {/* <Drawer.Screen
        name={Route.HOME_FAVOURITE_SCREEN}
        component={FavouritesScreen}
        options={{
          drawerItemStyle: {height: 0},
        }}
      /> */}
      <Drawer.Screen
        name={Route.HOME_RATING_SCREEN}
        component={RatingScreen}
        options={{
          drawerItemStyle: {height: 0},
        }}
      />
      <Drawer.Screen
        name={Route.HOME_ARABIATA_CLUB_SCREEN}
        component={ArabiataClubScreen}
        options={{
          drawerItemStyle: {height: 0},
        }}
      />
      <Drawer.Screen
        name={Route.SETTINGS_ROOT}
        component={SettingsNavigator}
        options={{
          drawerItemStyle: {height: 0},
        }}
      />
      <Drawer.Screen
        name={Route.CART_ROOT}
        component={CartNavigator}
        options={{
          drawerItemStyle: {height: 0},
        }}
      />
      <Drawer.Screen
        name={Route.HOME_JOB_SCREEN}
        component={JobScreen}
        options={{
          drawerItemStyle: {height: 0},
        }}
      />
      <Drawer.Screen
        name={Route.HOME_CATERING_SCREEN}
        component={CateringScreen}
        options={{
          drawerItemStyle: {height: 0},
        }}
      />
      <Drawer.Screen
        name={Route.HOME_NEW_ADDRESS_SCREEN}
        component={NewAddressScreen}
        options={{
          drawerItemStyle: {height: 0},
        }}
      />
      <Drawer.Screen
        name={Route.HOME_SEARCH_ITEMS_SCREEN}
        component={SearchItemsScreen}
        options={{
          drawerItemStyle: {height: 0},
        }}
      />
    </Drawer.Navigator>
  );
};
