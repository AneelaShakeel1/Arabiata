import React, {useState, useEffect} from 'react';
import {Alert, ImageBackground, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import {Icon} from '@rneui/base';
import {SafeAreaView} from 'react-native-safe-area-context';
import useAKTheme from '~/app/lib/hooks/useAKTheme';
import {useAppConfig} from '~/app/data/hooks/common/useAppConfig';
import {useHDrawer} from '~/app/data/hooks/common/useDrawer';
import Col from '~/app/lib/elements/AkView/Col/Col';
import Header from '~/app/lib/components/Header/Header';
import {AkText, AkView} from '~/app/lib/elements';
import {getUserId} from '~/app/lib/utils/userId';
import {useTranslation} from 'react-i18next';
import AkInputWithFormik from '~/app/lib/elements/Input/AkInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
import {useHCart} from '~/app/data/hooks/cart/useHCart';
import {useHHome} from '~/app/data/hooks/categories/useHHome';
import {useHRedux} from '~/app/data/hooks/common/useRedux';
import {useHUser} from '~/app/data/hooks/common/useUser';
import Route from '~/app/navigation/routes';
import {TTabScreen} from '~/app/navigation/tab/topTab';
import {checkLogin} from '~/app/lib/utils/login';
import Item from '~/app/lib/components/Item/Item';

export default function SearchItems(props: any) {
  const [searchItems, setSearchItems] = useState<Array<any>>([]);
  const [search, setSearch] = useState<string>('');
  const {t} = useTranslation();
  const {colors} = useAKTheme();
  const {language} = useAppConfig();
  const {loginInfo} = useHUser();
  const {getSearchItem} = useHDrawer();
  const {getProductsByMenuApi} = useHHome();
  const {addFavourite, favouritesList, deleteFavourite} = useHDrawer();
  const {getCartCount, addToCart} = useHCart();
  const {setReduxCartCount} = useHRedux();

  useEffect(() => {
    (async () => {
      const userId = await getUserId();
      const response = await getSearchItem({user_id: userId});
      setSearchItems(response.data);
    })();
  }, [search]);

  function onItemPressed(item: any) {
    props.navigation.navigate(Route.HOME_ITEM_DETAILS_SCREEN, {data: item});
  }
  async function onFavouriteItem(item: any) {
    await checkLogin(loginInfo, props.navigation, async () => {
      const isFavourited =
        item.is_favorite === 0
          ? await addFavourite({
              item_id: item.id,
            })
          : await deleteFavourite(item.favorite_id);
      if (isFavourited.error) {
        Toast.show({position: 'bottom', text1: isFavourited.error.message});
      } else {
        const userId = await getUserId();
        const response = await getSearchItem({user_id: userId});
        setSearchItems(response.data);
        Toast.show({position: 'bottom', text1: isFavourited.message});
      }
    });
  }
  async function increaseQuantity(item: any, i: number) {
    let tempItems = searchItems;
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
    setSearchItems([...tempItems]);
  }
  async function decreaseQuantity(item: any, i: number) {
    let tempItems = searchItems;
    tempItems = tempItems.map((tempItem: any, i: number) => {
      if (tempItem.id === item.id && tempItem?.quantity && tempItem?.quantity > 1) {
        return (tempItem = {
          ...tempItem,
          quantity: tempItem.quantity - 1,
        });
      }
      return tempItem;
    });
    setSearchItems([...tempItems]);
  }
  async function addItemToCart(item: any) {
    let finalItem: any = {
      item_id: item.id,
      qty: item.quantity,
      price: item.item_price,
      item_name: item.item_name,
      [loginInfo ? 'user_id' : 'device_id']: await getUserId(),
      item_name_ar: item.item_name_ar,
    };
    const itemAdded: any = await addToCart(finalItem);
    if (itemAdded.error) {
      Toast.show({position: 'bottom', text1: itemAdded.error.message});
    } else {
      let tempItems = searchItems;
      tempItems = tempItems.map((tempItem: any, i: number) => {
        if (tempItem.id === item.id && tempItem?.quantity) {
          return (tempItem = {
            ...tempItem,
            quantity: 1,
          });
        }
        return tempItem;
      });
      setSearchItems([...tempItems]);
      setReduxCartCount(itemAdded.cart);
      Toast.show({position: 'bottom', text1: itemAdded.message});
    }
  }

  const filteredItems = search
    ? searchItems.filter(
        (item) =>
          item.item_name.toLowerCase().includes(search.toLowerCase()) ||
          item.item_name_ar.includes(search) ||
          item.item_price.toString().includes(search),
      )
    : [];

  return (
    <SafeAreaView style={{flex: 1, width: '100%'}}>
      <Header title={t('search')} />
      <Col
        style={{
          // paddingBottom: 10,
          backgroundColor: colors.light_gray,
          marginHorizontal: 10,
          borderRadius: 10,
          paddingHorizontal: 10,
        }}>
        {/* <AkInputWithFormik
          name='search'
          placeholder='Search'
          /> */}
        <TextInput
          onChangeText={setSearch}
          placeholder="Search"
          value={search}
          style={{marginLeft: 10, fontSize: 16, textAlign: language == 'ar' ? 'right' : 'left'}}
        />
      </Col>

      <Item
        items={filteredItems}
        colors={colors}
        language={language}
        onItemPressed={onItemPressed}
        onFavouriteItem={onFavouriteItem}
        decreaseQuantity={decreaseQuantity}
        increaseQuantity={increaseQuantity}
        addItemToCart={addItemToCart}
      />

      {search == '' && filteredItems.length === 0 && (
        <AkView style={{alignItems: 'center', justifyContent: 'center', height: '90%'}}>
          <AkText style={{color: colors.gray, fontSize: 18, paddingHorizontal: 20}}>
            {t('no_data_found')}
          </AkText>
        </AkView>
      )}
    </SafeAreaView>
  );
}
