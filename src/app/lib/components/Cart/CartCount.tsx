import Col from '~/app/lib/elements/AkView/Col/Col';
import Row from '~/app/lib/elements/AkView/Row/Row';
import {useEffect} from 'react';
import {AkText} from '~/app/lib/elements';
import {Icon} from '@rneui/themed';
import useAKTheme from '~/app/lib/hooks/useAKTheme';
import {useHCart} from '~/app/data/hooks/cart/useHCart';
import {useNavigation} from '@react-navigation/native';
import Route from '~/app/navigation/routes';
import {useAppConfig} from '~/app/data/hooks/common/useAppConfig';
import {useHRedux} from '~/app/data/hooks/common/useRedux';
import {getUserId} from '../../utils/userId';
import {useHUser} from '~/app/data/hooks/common/useUser';
import {TouchableOpacity} from 'react-native';

interface ICartCountProps {
  // cartCount: number;
}

export default function CartCount(props: ICartCountProps) {
  const {language} = useAppConfig();
  const navigation: any = useNavigation();
  // const {
  //   ArrowBack,
  //   Navigation,
  //   Logo,
  //   Banner1,
  //   Banner2,
  //   Banner3,
  //   Oriental,
  //   Food,
  //   Noodles,
  //   Sandwich,
  //   Addon,
  //   SideItems,
  // } = useAKThemeImages();
  const {colors} = useAKTheme();
  const {getCartCount} = useHCart();
  const {loginInfo} = useHUser();
  const {cartCount, setReduxCartCount} = useHRedux();

  useEffect(() => {
    (async () => {
      const cartCount = await getCartCount({
        [loginInfo ? 'user_id' : 'device_id']: await getUserId(),
      });
      setReduxCartCount(cartCount.cart);
    })();
  }, []);

  function onCartIconPressed() {
    navigation.navigate(Route.CART_ROOT, {screen: Route.CART_SCREEN});
  }

  return (
    <TouchableOpacity
      onPress={onCartIconPressed}
      style={{
        backgroundColor: colors.white,
        // marginHorizontal: 10,
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
      }}>
      <Icon
        name={'shopping-cart'}
        type="entypo"
        size={25}
        style={{borderRadius: 6, alignSelf: 'flex-end'}}
      />
      <AkText
        style={{
          color: colors.white,
          backgroundColor: colors.red,
          paddingHorizontal: 6,
          position: 'absolute',
          bottom: 20,
          right: 4,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 100,
        }}>
        {cartCount ?? 0}
      </AkText>
    </TouchableOpacity>
  );
}
