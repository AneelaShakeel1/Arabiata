import Col from '~/app/lib/elements/AkView/Col/Col';
import Row from '~/app/lib/elements/AkView/Row/Row';
import {useEffect} from 'react';
import {AkText, AkView} from '~/app/lib/elements';
import {Icon} from '@rneui/themed';
import useAKTheme from '~/app/lib/hooks/useAKTheme';
import {useHCart} from '~/app/data/hooks/cart/useHCart';
import {useNavigation} from '@react-navigation/native';
import Route from '~/app/navigation/routes';
import {useAppConfig} from '~/app/data/hooks/common/useAppConfig';
import {useHRedux} from '~/app/data/hooks/common/useRedux';
import {getUserId} from '../../utils/userId';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ImageBackground, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';

interface IItemProps {
  // cartCount: number;
  items: any;
  colors: any;
  language: any;
  onItemPressed: any;
  onFavouriteItem: any;
  decreaseQuantity: any;
  increaseQuantity: any;
  addItemToCart: any;
}

export default function Item(props: IItemProps) {
  const {
    items,
    colors,
    language,
    onItemPressed,
    onFavouriteItem,
    decreaseQuantity,
    increaseQuantity,
    addItemToCart,
  } = props;
  const {t} = useTranslation();
  return (
    <KeyboardAwareScrollView>
      <AkView style={{flexWrap: 'wrap', justifyContent: 'center'}}>
        {items?.map((d: any, i: number) => {
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => onItemPressed(d)}
              style={{
                backgroundColor: colors.white,
                borderRadius: 10,
                marginHorizontal: 10,
                marginVertical: 10,
                padding: 0,
                alignSelf: 'flex-start',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                width: 160,
              }}>
              <AkView>
                <Col style={{padding: 5}}>
                  <AkView>
                    <ImageBackground
                      source={{uri: d.image}}
                      style={{
                        margin: 0,
                        padding: 0,
                        width: 150,
                        height: 150,
                        borderRadius: 10,
                      }}>
                      <Icon
                        name={d.is_favorite === 0 ? 'heart-outlined' : 'heart'}
                        type="entypo"
                        size={20}
                        color={colors.white}
                        backgroundColor={colors.black}
                        style={{
                          alignSelf: 'flex-end',
                          padding: 8,
                          borderRadius: 6,
                          margin: 5,
                        }}
                        onPress={() => onFavouriteItem(d)}
                      />
                    </ImageBackground>
                  </AkView>
                  <AkText
                    style={{
                      fontWeight: '800',
                      fontSize: 12,
                    }}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {language === 'ar' ? d.item_name_ar : d.item_name}
                  </AkText>
                  <AkText style={{fontWeight: 'bold', fontSize: 12, marginVertical: 5}}>
                    {t('kd')} {d.item_price}
                  </AkText>
                  <AkView
                    style={{alignItems: 'center', justifyContent: 'space-between', width: 150}}>
                    <AkView style={{alignItems: 'center'}}>
                      <Icon
                        name={'minuscircleo'}
                        type="antdesign"
                        size={18}
                        color={colors.colorPrimary}
                        onPress={() => decreaseQuantity(d, i)}
                      />
                      <AkText style={{marginHorizontal: 5}}>{d.quantity ?? 1}</AkText>
                      <Icon
                        name={'pluscircleo'}
                        type="antdesign"
                        size={18}
                        color={colors.colorPrimary}
                        style={{margin: 0, padding: 0}}
                        onPress={() => increaseQuantity(d, i)}
                      />
                    </AkView>
                    <Icon
                      name={'shopping-cart'}
                      type="entypo"
                      size={12}
                      color={colors.white}
                      backgroundColor={colors.colorPrimary}
                      style={{padding: 6, borderRadius: 6}}
                      onPress={() => addItemToCart(d)}
                    />
                  </AkView>
                </Col>
              </AkView>
            </TouchableOpacity>
          );
        })}
      </AkView>
    </KeyboardAwareScrollView>
  );
}
