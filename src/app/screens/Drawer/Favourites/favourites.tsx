import {useIsFocused} from '@react-navigation/native';
import {Icon} from '@rneui/themed';
import {useEffect, useLayoutEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Alert, FlatList, ImageBackground} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {useHDrawer} from '~/app/data/hooks/common/useDrawer';
import {AkText, AkView} from '~/app/lib/elements';
import Col from '~/app/lib/elements/AkView/Col/Col';
import {useHCart} from '~/app/data/hooks/cart/useHCart';
import useAKThemeImages from '~/app/lib/hooks/useAKImages';
import useAKTheme from '~/app/lib/hooks/useAKTheme';
import Header from '~/app/lib/components/Header/Header';
import Item from '~/app/lib/components/Item/Item';
import {useAppConfig} from '~/app/data/hooks/common/useAppConfig';
import {useHRedux} from '~/app/data/hooks/common/useRedux';
import {useHHome} from '~/app/data/hooks/categories/useHHome';
import {useHUser} from '~/app/data/hooks/common/useUser';
import Route from '~/app/navigation/routes';
import {getUserId} from '~/app/lib/utils/userId';

export default function Favourites(props: any) {
  const [favouriteList, setFavouriteList] = useState<any>();
  const {t} = useTranslation();
  const isFocused = useIsFocused();
  const {language} = useAppConfig();
  const {colors} = useAKTheme();
  const {ArrowBack, Navigation, Logo} = useAKThemeImages();
  const {favouritesList, deleteFavourite} = useHDrawer();
  const {loginInfo} = useHUser();
  const {getProductsByMenuApi} = useHHome();
  const {getCartCount, addToCart} = useHCart();
  const {setReduxCartCount} = useHRedux();

  useEffect(() => {
    if (isFocused) {
      callGetRatingAndReviewListAPI();
    }
  }, [isFocused]);

  async function callGetRatingAndReviewListAPI() {
    const result = await favouritesList();
    if (result?.data) {
      setFavouriteList(result.data);
    }
  }

  async function handleDeleteFavourite(favouriteId: number) {
    const result = await deleteFavourite(favouriteId);
    if (result?.message) {
      Toast.show({position: 'bottom', text1: result?.message});
      callGetRatingAndReviewListAPI();
    }
  }

  function onItemPressed(item: any) {
    props.navigation.navigate(Route.HOME_ITEM_DETAILS_SCREEN, {data: item});
  }
  async function onFavouriteItem(item: any) {
    if (loginInfo === null) {
      Alert.alert(
        'Please Login First',
        'You need to be logged in to add items to favourite.',
        [
          {
            text: 'OK',
            onPress: () =>
              props.navigation.navigate(Route.ROOT_AUTH_SCREEN, {
                screen: Route.AUTH_LOGIN_SCREEN,
              }),
          },
        ],
        {cancelable: false},
      );
      return;
    } else {
      const isFavourited = await deleteFavourite(item.favorite_id);
      if (isFavourited.error) {
        Toast.show({position: 'bottom', text1: isFavourited.error.message});
      } else {
        Toast.show({position: 'bottom', text1: isFavourited.message});
        await callGetRatingAndReviewListAPI();
      }
    }
  }
  async function increaseQuantity(item: any, i: number) {
    let tempItems = favouriteList;
    tempItems = tempItems.map((tempItem: any, i: number) => {
      if (tempItem.id === item.id && tempItem?.quantity) {
        return (tempItem = {
          ...tempItem,
          quantity: (tempItem.quantity || 1) + 1,
        });
      }
      if (tempItem.id === item.id && !tempItem?.quantity) {
        return (tempItem = {
          ...tempItem,
          quantity: 1,
        });
      }
      return tempItem;
    });
    setFavouriteList([...tempItems]);
  }
  async function decreaseQuantity(item: any, i: number) {
    let tempItems = favouriteList;
    tempItems = tempItems.map((tempItem: any, i: number) => {
      if (tempItem.id === item.id && tempItem?.quantity && tempItem?.quantity > 1) {
        return (tempItem = {
          ...tempItem,
          quantity: tempItem.quantity - 1,
        });
      }
      return tempItem;
    });
    setFavouriteList([...tempItems]);
  }
  async function addItemToCart(item: any) {
    let finalItem: any = {
      item_id: item.id,
      qty: item.quantity ?? 1,
      price: item.item_price,
      item_name: item.item_name,
      [loginInfo ? 'user_id' : 'device_id']: await getUserId(),
      item_name_ar: item.item_name_ar,
    };
    const itemAdded: any = await addToCart(finalItem);
    if (itemAdded.error) {
      Toast.show({position: 'bottom', text1: itemAdded.error.message});
    } else {
      let tempItems = favouriteList;
      tempItems = tempItems.map((tempItem: any, i: number) => {
        if (tempItem.id === item.id && tempItem?.quantity) {
          return (tempItem = {
            ...tempItem,
            quantity: 1,
          });
        }
        return tempItem;
      });
      setFavouriteList([...tempItems]);
      setReduxCartCount(itemAdded.cart);
      Toast.show({position: 'bottom', text1: itemAdded.message});
    }
  }

  return (
    <SafeAreaView style={{flex: 1, width: '100%'}}>
      <Header title={t('favourites')} />
      {favouriteList && favouriteList !== null && favouriteList.length > 0 ? (
        // <FlatList
        //   data={favouriteList}
        //   numColumns={2}
        //   renderItem={({item, index}) => {
        //     return (
        //       <AkView
        //         style={{
        //           backgroundColor: colors.white,
        //           borderRadius: 10,
        //           marginHorizontal: 10,
        //           marginVertical: 10,
        //           padding: 0,
        //           alignSelf: 'flex-start',
        //         }}>
        //         <Col style={{padding: 5}}>
        //           <AkView>
        //             <ImageBackground
        //               source={item?.item_image ? item.item_image : Logo}
        //               style={{
        //                 margin: 0,
        //                 padding: 0,
        //                 backgroundColor: '#8a0304',
        //                 width: 150,
        //                 height: 150,
        //                 borderRadius: 10,
        //               }}>
        //               <Icon
        //                 name={'heart'}
        //                 type="entypo"
        //                 size={20}
        //                 color={colors.colorPrimary}
        //                 backgroundColor={colors.white}
        //                 style={{alignSelf: 'flex-end', padding: 8, borderRadius: 6, margin: 5}}
        //                 onPress={() => handleDeleteFavourite(item.favorite_id)}
        //               />
        //             </ImageBackground>
        //           </AkView>
        //           <AkText style={{fontWeight: '800', fontSize: 12}}>{item.item_name}</AkText>
        //           <AkText style={{fontWeight: 'bold', fontSize: 12, marginVertical: 5}}>
        //             KD {item.item_price}
        //           </AkText>
        //           <AkView style={{justifyContent: 'space-between'}}>
        //             <AkView style={{alignItems: 'center'}}>
        //               <Icon
        //                 name={'pluscircleo'}
        //                 type="antdesign"
        //                 size={18}
        //                 color={colors.colorPrimary}
        //                 style={{margin: 0, padding: 0}}
        //               />
        //               <AkText style={{marginHorizontal: 5}}>1</AkText>
        //               <Icon
        //                 name={'minuscircleo'}
        //                 type="antdesign"
        //                 size={18}
        //                 color={colors.colorPrimary}
        //               />
        //             </AkView>
        //             <Icon
        //               name={'shopping-cart'}
        //               type="entypo"
        //               size={12}
        //               color={colors.white}
        //               backgroundColor={colors.colorPrimary}
        //               style={{padding: 6, borderRadius: 6}}
        //             />
        //           </AkView>
        //         </Col>
        //       </AkView>
        //     );
        //   }}
        // />
        <Item
          items={favouriteList}
          colors={colors}
          language={language}
          onItemPressed={onItemPressed}
          onFavouriteItem={onFavouriteItem}
          decreaseQuantity={decreaseQuantity}
          increaseQuantity={increaseQuantity}
          addItemToCart={addItemToCart}
        />
      ) : (
        <AkView style={{height: '90%', alignItems: 'center', justifyContent: 'center'}}>
          <AkText style={{fontSize: 20, color: colors.black}}>
            No {t('favourites')} Available
          </AkText>
        </AkView>
      )}
    </SafeAreaView>
  );
}
