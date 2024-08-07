// eslint-disable-next-line no-shadow
enum Route {
  // ROOT STACK SCREEN
  ROOT_SPLASH_SCREEN = 'Splash',
  ROOT_HOME_SCREEN = 'Home',
  ROOT_AUTH_SCREEN = 'Auth',

  // AUTH STACK SCREEN  
  AUTH_INITITAL_SCREEN = 'Introduction',
  AUTH_LOGIN_SCREEN = 'Login',
  AUTH_REGISTER_SCREEN = 'Signup',
  AUTH_FORGOT_SCREEN = 'Forgot',
  AUTH_CHANGE_PASSWORD_SCREEN = 'ChangePassword',

  // HOME_STACK_SCREENS (in drawer)
  HOME_DASHBOARD_ROOT = 'DashboardStack',
  HOME_DASHBOARD_ORDER_ROOT = 'OrderStack',
  HOME_DASHBOARD_FAVOURITE_ROOT = 'FavouriteStack',
  HOME_DASHBOARD_SCREEN = 'Dashboard',
  HOME_CATEGORY_DETAILS_SCREEN = 'CategoryDetails',
  HOME_ITEM_DETAILS_SCREEN = 'ItemDetails',
  HOME_MY_ORDERS_SCREEN = 'MyOrders',
  HOME_ORDER_DETAILS_SCREEN = 'OrderDetails',
  HOME_FAVOURITE_SCREEN = 'Favourite',
  HOME_RATING_SCREEN = 'Rating',
  HOME_ARABIATA_CLUB_SCREEN = 'ArabiataClub',
  HOME_JOB_SCREEN = 'Job',
  HOME_CATERING_SCREEN = 'Catering',
  HOME_NEW_ADDRESS_SCREEN = 'NewAddress',
  HOME_SEARCH_ITEMS_SCREEN = "SearchItems",

  // SETTINGS_STACK_SCREENS (in drawer)
  SETTINGS_ROOT = 'SettingsStack',
  SETTINGS_SCREEN = 'Settings',
  SETTINGS_EDIT_PROFILE_SCREEN = 'EditProfile',
  SETTINGS_CHANGE_PASSWORD_SCREEN = 'ChangePassword',
  SETTINGS_REFER_SCREEN = 'Refer',
  SETTINGS_MANAGE_ADDRESS_SCREEN = 'ManageAddress',
  SETTINGS_NEW_ADDRESS_SCREEN = 'NewAddress',
  SETTINGS_EDIT_ADDRESS_SCREEN = 'EditAddress',
  SETTINGS_CONTACT_US_SCREEN = 'ContactUs',

  // CART_STACK_SCREENS (in drawer)
  CART_ROOT = 'CartStack',
  CART_SCREEN = 'Cart',
  CART_CHECKOUT_SCREEN = 'Checkout',
  CART_PAYMENT_METHOD_SCREEN = 'PaymentMethod',
}

export default Route;
