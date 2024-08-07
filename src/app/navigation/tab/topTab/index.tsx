import {
  MaterialTopTabNavigationOptions,
  createMaterialTopTabNavigator,
} from '@react-navigation/material-top-tabs';
import {RouteConfig} from '@react-navigation/native';
import useAKTheme from '@lib/hooks/useAKTheme';

const Tab = createMaterialTopTabNavigator();

export type TTabScreen = RouteConfig<any, any, any, any, any>;

export default function RenderTabs({
  screens,
  config,
}: {
  screens: TTabScreen[];
  config?: MaterialTopTabNavigationOptions;
}) {
  const {colors} = useAKTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        swipeEnabled: config?.swipeEnabled ?? true,
        tabBarScrollEnabled: config?.tabBarScrollEnabled ?? true,
        tabBarLabelStyle: {fontSize: 12},
        tabBarActiveTintColor: colors.black,
        tabBarInactiveTintColor: '#4E5969',
        tabBarItemStyle: {
          width: 'auto',
          alignItems: 'flex-start',
        },
        tabBarStyle: {
          backgroundColor: colors.white,
          shadowColor: colors.white,
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0,
          shadowRadius: 0,
          elevation: 0,
        },

        tabBarIndicatorStyle: {backgroundColor: colors.black},
        ...config,
      }}
      sceneContainerStyle={{backgroundColor: colors.white}}>
      {screens.map((Screen: (typeof screens)[0]) => {
        return <Tab.Screen {...Screen} />;
      })}
    </Tab.Navigator>
  );
}
