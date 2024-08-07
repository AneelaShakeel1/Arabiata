import {useAppConfig} from '~/app/data/hooks/common/useAppConfig';

// Theme Images (dark/ light)
// import LogoDark from '@assets/images/dark/logo.png';
// import LogoLight from '@assets/images/light/logo.png';

// import UserAvatarImageDark from '@assets/images/dark/user.png';
// import UserAvatarImageLight from '@assets/images/light/user.png';

// import EmptyListIconDark from '@assets/images/dark/svg/empty';
// import EmptyListIconLight from '@assets/images/light/svg/empty';

// import GoogleDark from '@assets/images/dark/google.png';
// import GoogleLight from '@assets/images/dark/google.png';

// import FBDark from '@assets/images/dark/fb.png';
// import FBLight from '@assets/images/dark/fb.png';

// import AppleDark from '@assets/images/light/apple.png';
// import AppleLight from '@assets/images/light/apple.png';

// // SVGs

// Common Images (same throughout the themes)
import Logo from '@assets/images/common/pngs/logo.png';
import Apple from '@assets/images/common/pngs/apple.png';
import Facebook from '@assets/images/common/pngs/facebook.png';
import Instagram from '@assets/images/common/pngs/instagram.png';
import Youtube from '@assets/images/common/pngs/youtube.png';
import Google from '@assets/images/common/pngs/google.png';
import AppBackground from '@assets/images/common/pngs/app_bg.png';
import DriveThrough from '@assets/images/common/pngs/drivethrough.png';
import AboutUs from '@assets/images/common/pngs/ic_aboutus.png';
import Add from '@assets/images/common/pngs/ic_add.png';
import AddService from '@assets/images/common/pngs/ic_add_sevice.png';
import AppIconHorizontal from '@assets/images/common/pngs/ic_appicon.png';
import ArrowBack from '@assets/images/common/pngs/ic_back.png';
import ArrowRight from '@assets/images/common/pngs/ic_right.png';
import ArrowDown from '@assets/images/common/pngs/ic_down_arrow.png';
import Camera from '@assets/images/common/pngs/ic_camera.png';
import Cart from '@assets/images/common/pngs/ic_cart.png';
import Category from '@assets/images/common/pngs/ic_category.png';
import Check from '@assets/images/common/pngs/ic_check.png';
import Close from '@assets/images/common/pngs/ic_close.png';
import COD from '@assets/images/common/pngs/ic_cod.png';
import Cross from '@assets/images/common/pngs/ic_cross.png';
import Delete from '@assets/images/common/pngs/ic_delete.png';
import DropDown from '@assets/images/common/pngs/ic_dropdown.png';
import Edit from '@assets/images/common/pngs/ic_edit.png';
import EditProfile from '@assets/images/common/pngs/ic_edit_profile.png';
import Favourite from '@assets/images/common/pngs/ic_favourite_like.png';
import FillRound from '@assets/images/common/pngs/ic_fill_round.png';
import Gift from '@assets/images/common/pngs/ic_gift.png';
import Delivery from '@assets/images/common/pngs/ic_delivery.png';
import PickUp from '@assets/images/common/pngs/ic_pickup.png';
import DriveBy from '@assets/images/common/pngs/ic_driveby.png';
import Grid from '@assets/images/common/pngs/ic_grid.png';
import Home from '@assets/images/common/pngs/ic_home.png';
import HomeWallet from '@assets/images/common/pngs/ic_homewallet.png';
import Line from '@assets/images/common/pngs/ic_line.png';
import ListItem from '@assets/images/common/pngs/ic_listitem.png';
import Location from '@assets/images/common/pngs/ic_location.png';
import Logout from '@assets/images/common/pngs/ic_logout.png';
import Mail from '@assets/images/common/pngs/ic_mail.png';
import Minus from '@assets/images/common/pngs/ic_minus.png';
import Money from '@assets/images/common/pngs/ic_money.png';
import Navigation from '@assets/images/common/pngs/ic_nevigation.png';
import Next from '@assets/images/common/pngs/ic_next.png';
import Online from '@assets/images/common/pngs/ic_online.png';
import OrderHistory from '@assets/images/common/pngs/ic_orderhistory.png';
import OrderSuccessFull from '@assets/images/common/pngs/ic_ordersucessfull.png';
import PageOne from '@assets/images/common/pngs/ic_pageone.png';
import PageTwo from '@assets/images/common/pngs/ic_pagetwo.png';
import PageThree from '@assets/images/common/pngs/ic_pagethree.png';
import Password from '@assets/images/common/pngs/ic_password.png';
import Phone from '@assets/images/common/pngs/ic_phone.png';
import Placeholder from '@assets/images/common/pngs/ic_placeholder.png';
import Plus from '@assets/images/common/pngs/ic_plus.png';
import Rating from '@assets/images/common/pngs/ic_ratting.png';
import Refer from '@assets/images/common/pngs/ic_refer.png';
import Reward from '@assets/images/common/pngs/ic_reward.png';
import RoundCheck from '@assets/images/common/pngs/ic_round_check.png';
import RoundUnCheck from '@assets/images/common/pngs/ic_round_uncheck.png';
import Search from '@assets/images/common/pngs/ic_search.png';
import Settings from '@assets/images/common/pngs/ic_settings.png';
import Share from '@assets/images/common/pngs/ic_share.png';
import StartGreen from '@assets/images/common/pngs/ic_start_green.png';
import Stripe from '@assets/images/common/pngs/ic_stripe.png';
import TrophyGreen from '@assets/images/common/pngs/ic_trgreen.png';
import TrophyRed from '@assets/images/common/pngs/ic_trred.png';
import Trophy from '@assets/images/common/pngs/ic_trophy.png';
import UnCheck from '@assets/images/common/pngs/ic_uncheck.png';
import Unlike from '@assets/images/common/pngs/ic_unlike.png';
import User from '@assets/images/common/pngs/ic_user.png';
import Vehicle from '@assets/images/common/pngs/ic_vechicle.png';
import Wallet from '@assets/images/common/pngs/ic_wallet.png';
import Catering from '@assets/images/common/pngs/ic_catering_red.png';

import EditProfileRed from '@assets/images/common/pngs/ic_edit_profile_red.png';
import LockRed from '@assets/images/common/pngs/ic_password_red.png';
import CoinRed from '@assets/images/common/pngs/ic_money_red.png';
import LocationRed from '@assets/images/common/pngs/ic_location_red.png';
import UserRed from '@assets/images/common/pngs/ic_user_red.png';
import NoteRed from '@assets/images/common/pngs/ic_note_red.png';
import InformationRed from '@assets/images/common/pngs/ic_information_red.png';

import Oriental from '@assets/images/common/pngs/oriental.png';
import Food from '@assets/images/common/pngs/food.png';
import Noodles from '@assets/images/common/pngs/noodles.png';
import Sandwich from '@assets/images/common/pngs/sandwich.png';
import Addon from '@assets/images/common/pngs/addon.png';
import SideItems from '@assets/images/common/pngs/mystery.png';

//JPG
import Banner1 from '@assets/images/common/jpg/banner.jpg';
import Banner2 from '@assets/images/common/jpg/banner2.jpg';
import Banner3 from '@assets/images/common/jpg/banner3.jpg';

export default function useAKThemeImages() {
  const {themeMode} = useAppConfig();

  if (themeMode === 'dark') {
    return {
      // Logo: LogoDark,
      // // EmptyListIcon: EmptyListIconDark,
      // UserAvatarImage: UserAvatarImageDark,
      // SunIcon: SunIconDark,
      // MoonIcon: MoonIconDark,
    };
  }

  return {
    //Light Theme Images
    // Logo: LogoLight,
    // EmptyListIcon: EmptyListIconLight,
    // UserAvatarImage: UserAvatarImageLight,
    // SunIcon: SunIconLight,
    // MoonIcon: MoonIconLight,

    //Common Images
    Logo,
    Apple,
    Facebook,
    Instagram,
    Youtube,
    Google,
    AppBackground,
    DriveThrough,
    AboutUs,
    Add,
    AddService,
    AppIconHorizontal,
    ArrowBack,
    ArrowRight,
    ArrowDown,
    Camera,
    Cart,
    Category,
    Check,
    Close,
    COD,
    Cross,
    Delete,
    DropDown,
    Edit,
    EditProfile,
    Favourite,
    FillRound,
    Gift,
    Delivery,
    PickUp,
    DriveBy,
    Grid,
    Home,
    HomeWallet,
    Line,
    ListItem,
    Location,
    Logout,
    Mail,
    Minus,
    Money,
    Navigation,
    Next,
    Online,
    OrderHistory,
    OrderSuccessFull,
    PageOne,
    PageTwo,
    PageThree,
    Password,
    Phone,
    Placeholder,
    Plus,
    Rating,
    Refer,
    Reward,
    RoundCheck,
    RoundUnCheck,
    Search,
    Settings,
    Share,
    StartGreen,
    Stripe,
    TrophyGreen,
    TrophyRed,
    Trophy,
    UnCheck,
    Unlike,
    User,
    Vehicle,
    Wallet,
    Catering,
    EditProfileRed,
    LockRed,
    CoinRed,
    LocationRed,
    UserRed,
    NoteRed,
    InformationRed,
    Oriental,
    Food,
    Noodles,
    Sandwich,
    Addon,
    SideItems,
    Banner1,
    Banner2,
    Banner3,
  };
}
