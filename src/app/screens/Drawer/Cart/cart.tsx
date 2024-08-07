import {useIsFocused} from '@react-navigation/native';
import {Icon} from '@rneui/themed';
import React, {useState, useLayoutEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, Image, TouchableWithoutFeedback} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {SafeAreaView} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {useHCart} from '~/app/data/hooks/cart/useHCart';
import {useAppConfig} from '~/app/data/hooks/common/useAppConfig';
import {useHRedux} from '~/app/data/hooks/common/useRedux';
import {useHUser} from '~/app/data/hooks/common/useUser';
import Header from '~/app/lib/components/Header/Header';
import {AkButton, AkText, AkView} from '~/app/lib/elements';
import Col from '~/app/lib/elements/AkView/Col/Col';
import useAKThemeImages from '~/app/lib/hooks/useAKImages';
import useAKTheme from '~/app/lib/hooks/useAKTheme';
import {getUserId} from '~/app/lib/utils/userId';

export default function Cart(props: any) {
  const [cartItems, setCartItems] = useState<any>([]);
  const {t} = useTranslation();
  const isFocused = useIsFocused();
  const {colors} = useAKTheme();
  const {Navigation, Logo} = useAKThemeImages();
  const {removeCartItem, getCartItems, getCartCount, qtyUpdate} = useHCart();
  const {setReduxCartCount} = useHRedux();
  const {loginInfo} = useHUser();
  const {language} = useAppConfig();

  useLayoutEffect(() => {
    if (isFocused) {
      (async () => {
        const result = await getCartItems({
          [loginInfo ? 'user_id' : 'device_id']: await getUserId(),
        });
        if (result.error) {
          Toast.show({position: 'bottom', text1: result.error.message});
        } else {
          setCartItems(result.data);
        }
      })();
    }
  }, [isFocused]);

  async function handleRemoveCartItem(item: any) {
    const cartItemRemoved = await removeCartItem({
      user_id: await getUserId(),
      cart_id: item.id,
    });
    if (cartItemRemoved.error) {
      Toast.show({position: 'bottom', text1: cartItemRemoved.error.message});
    } else {
      const result = await getCartItems({
        user_id: await getUserId(),
      });
      if (result.error) {
        Toast.show({position: 'bottom', text1: result.error.message});
      } else {
        setReduxCartCount(cartItemRemoved.cart);
        setCartItems(result.data);
      }
    }
  }

  async function handleQuantityUpdate(item: any, type: 'increaseValue' | 'decreaseValue') {
    try {
      const userId = await getUserId();
      const response = await qtyUpdate({
        item_id: item.item_id,
        cart_id: item.id,
        type,
        user_id: userId ? userId : undefined,
        device_id: !userId ? await DeviceInfo.getUniqueId() : undefined,
      });
      if (response.error) {
        Toast.show({position: 'bottom', text1: response.error.message});
      } else {
        const updatedCartResponse = await getCartItems({
          user_id: await getUserId(),
        });
        if (updatedCartResponse.error) {
          Toast.show({position: 'bottom', text1: updatedCartResponse.error.message});
        } else {
          setCartItems(updatedCartResponse.data);
          Toast.show({position: 'bottom', text1: 'Quantity updated successfully'});
        }
      }
    } catch (error) {
      Toast.show({position: 'bottom', text1: 'Error updating quantity'});
    }
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header title={t('cart')} />
      <Col style={{flex: 1, paddingHorizontal: 20, marginBottom: 10}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={cartItems}
          renderItem={({item, index}) => {
            const totalPrice = item.price * item.qty;
            return (
              <AkView>
                <Col>
                  <Image
                    source={item.item_image ? {uri: item.item_image} : Logo}
                    style={{
                      width: 80,
                      height: 80,
                      marginRight: 5,
                      marginBottom: 5,
                      borderRadius: 10,
                    }}
                  />
                </Col>
                <Col style={{flex: 1, marginHorizontal: 10, marginVertical: 10}}>
                  <AkView
                    style={{alignItems: 'center', justifyContent: 'space-between', marginTop: 10}}>
                    <AkText style={{width: '80%'}} ellipsizeMode="tail">
                      {language === 'en' ? item.item_name : item.item_name_ar}
                    </AkText>
                    <Icon
                      name="trash"
                      size={30}
                      type="evilicon"
                      color={colors.red}
                      onPress={() => handleRemoveCartItem(item)}
                    />
                  </AkView>
                  <AkView
                    style={{alignItems: 'center', justifyContent: 'space-between', marginTop: 10}}>
                    <AkView style={{alignItems: 'center'}}>
                      <Icon
                        name={'pluscircleo'}
                        type="antdesign"
                        size={18}
                        color={colors.colorPrimary}
                        style={{margin: 0, padding: 0}}
                        onPress={() => handleQuantityUpdate(item, 'increaseValue')}
                      />
                      <AkText style={{marginHorizontal: 5}}>{item.qty}</AkText>
                      <Icon
                        name={'minuscircleo'}
                        type="antdesign"
                        size={18}
                        color={colors.colorPrimary}
                        onPress={() => handleQuantityUpdate(item, 'decreaseValue')}
                      />
                    </AkView>
                    <AkText>
                      {t('kd')} {totalPrice.toFixed(3)}
                    </AkText>
                  </AkView>
                </Col>
              </AkView>
            );
          }}
        />
      </Col>
      {cartItems && cartItems !== null && cartItems.length > 0 ? (
        <AkButton
          btnText={t('checkout')}
          containerStyles={{marginBottom: 20, width: '90%', alignSelf: 'center'}}
          onClick={() => {
            props.navigation.navigate('Checkout');
          }}
        />
      ) : (
        <AkView style={{height: '90%', alignItems: 'center', justifyContent: 'center'}}>
          <AkText style={{fontSize: 20, color: colors.black}}>{t('no_cart_available')}</AkText>
        </AkView>
      )}
    </SafeAreaView>
  );
}
