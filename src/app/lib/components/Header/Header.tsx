import {Image, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import Row from '../../elements/AkView/Row/Row';
import {AkText, AkView} from '../../elements';
import useAKThemeImages from '../../hooks/useAKImages';
import useAKTheme from '../../hooks/useAKTheme';
import {useTranslation} from 'react-i18next';
import Route from '~/app/navigation/routes';
import {useNavigation, useRoute} from '@react-navigation/native';
import CartCount from '../Cart/CartCount';
import {useAppConfig} from '~/app/data/hooks/common/useAppConfig';

interface IHeaderProps {
  title?: string;
}

export default function Header(props: IHeaderProps) {
  const {t} = useTranslation();
  const navigation: any = useNavigation();
  const route: any = useRoute();
  const {colors} = useAKTheme();
  const {Navigation, Search, ArrowBack, ArrowRight} = useAKThemeImages();
  const {language} = useAppConfig();

  const menuIconAllowedOnScreens = [
    Route.HOME_DASHBOARD_SCREEN,
    Route.HOME_FAVOURITE_SCREEN,
    Route.HOME_ARABIATA_CLUB_SCREEN,
    Route.HOME_JOB_SCREEN,
    Route.HOME_CATERING_SCREEN,
    Route.SETTINGS_SCREEN,
    Route.HOME_MY_ORDERS_SCREEN,
  ];

  const cartIconAllowedOnScreens = [
    Route.HOME_DASHBOARD_SCREEN,
    Route.HOME_CATEGORY_DETAILS_SCREEN,
    Route.HOME_ITEM_DETAILS_SCREEN,
    Route.HOME_FAVOURITE_SCREEN,
    Route.HOME_SEARCH_ITEMS_SCREEN,
  ];
  const searchIconAllowedOnScreens = [Route.HOME_DASHBOARD_SCREEN];

  const backArrowIconAllowedOnScreens = [
    Route.HOME_CATEGORY_DETAILS_SCREEN,
    Route.HOME_ITEM_DETAILS_SCREEN,
    Route.HOME_ORDER_DETAILS_SCREEN,
    Route.HOME_NEW_ADDRESS_SCREEN,
    Route.HOME_SEARCH_ITEMS_SCREEN,
    Route.AUTH_CHANGE_PASSWORD_SCREEN,
    Route.SETTINGS_EDIT_PROFILE_SCREEN,
    Route.SETTINGS_REFER_SCREEN,
    Route.CART_SCREEN,
    Route.CART_CHECKOUT_SCREEN,
    Route.CART_PAYMENT_METHOD_SCREEN,
    Route.SETTINGS_EDIT_ADDRESS_SCREEN,
    Route.SETTINGS_CONTACT_US_SCREEN,
  ];

  function renderTitle() {
    return props?.title
      ? props.title
      : route.name === Route.HOME_DASHBOARD_SCREEN
      ? t('app_name')
      : t(route.name.toLowerCase());
  }

  function onMenuIconPressed() {
    navigation?.openDrawer();
  }

  function onSearchIconPressed() {
    navigation.navigate(Route.ROOT_HOME_SCREEN, {screen: Route.HOME_SEARCH_ITEMS_SCREEN});
  }

  function onBackArrowPressed() {
    navigation.goBack();
  }

  function renderMenuIcon() {
    return menuIconAllowedOnScreens.includes(route.name) ? (
      <TouchableWithoutFeedback onPress={onMenuIconPressed}>
        <Image source={Navigation} style={{width: 25, height: 25}} />
      </TouchableWithoutFeedback>
    ) : (
      <></>
    );
  }

  function renderCartIcon() {
    return cartIconAllowedOnScreens.includes(route.name) ? <CartCount /> : <></>;
  }

  function renderBackArrowIcon() {
    return backArrowIconAllowedOnScreens.includes(route.name) ? (
      <TouchableWithoutFeedback onPress={onBackArrowPressed}>
        <Image
          source={language == 'ar' ? ArrowRight : ArrowBack}
          style={{width: language == 'ar' ? 20 : 25, height: language == 'ar' ? 20 : 25}}
        />
      </TouchableWithoutFeedback>
    ) : (
      <></>
    );
  }

  function renderSearchIcon() {
    return searchIconAllowedOnScreens.includes(route.name) ? (
      <TouchableOpacity
        onPress={onSearchIconPressed}
        style={{
          backgroundColor: colors.white,
          marginHorizontal: 10,
          padding: 10,
          borderRadius: 10,
        }}>
        <Image
          source={Search}
          style={{
            width: 30,
            height: 30,
          }}
        />
      </TouchableOpacity>
    ) : (
      <></>
    );
  }

  return (
    <AkView
      style={{
        height: 60,
        paddingHorizontal: 10,
        backgroundColor: colors.gray_orange,
        alignItems: 'center',
      }}>
      {renderMenuIcon()}
      {renderBackArrowIcon()}
      <AkView style={{justifyContent: 'space-evenly', flex: 1}}>
        <AkText style={{fontWeight: 'bold', fontSize: 18}}>{renderTitle()}</AkText>
      </AkView>
      {renderSearchIcon()}
      {renderCartIcon()}
    </AkView>
  );
}
