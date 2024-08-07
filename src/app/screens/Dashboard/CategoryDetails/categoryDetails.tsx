import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useRoute} from '@react-navigation/native';
import {Icon} from '@rneui/themed';
import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ImageBackground, TouchableOpacity, Alert} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {useHCart} from '~/app/data/hooks/cart/useHCart';
import {useHHome} from '~/app/data/hooks/categories/useHHome';
import {useAppConfig} from '~/app/data/hooks/common/useAppConfig';
import {useHDrawer} from '~/app/data/hooks/common/useDrawer';
import {useHRedux} from '~/app/data/hooks/common/useRedux';
import {useHUser} from '~/app/data/hooks/common/useUser';
import Header from '~/app/lib/components/Header/Header';
import Item from '~/app/lib/components/Item/Item';
import {AkText, AkView} from '~/app/lib/elements';
import Col from '~/app/lib/elements/AkView/Col/Col';
import useAKTheme from '~/app/lib/hooks/useAKTheme';
import {getUserId} from '~/app/lib/utils/userId';
import Route from '~/app/navigation/routes';
import {TTabScreen} from '~/app/navigation/tab/topTab';

const CategoriesTopTab = createMaterialTopTabNavigator();

export default function CategoryDetails(props: any) {
  const [tabDataa, settabDataa] = useState<TTabScreen[]>();
  const {t} = useTranslation();
  const route: any = useRoute();
  const {colors} = useAKTheme();
  const {language} = useAppConfig();
  const {loginInfo} = useHUser();
  const {getProductsByMenuApi} = useHHome();
  const {addFavourite, favouritesList, deleteFavourite} = useHDrawer();
  const {getCartCount, addToCart} = useHCart();
  const {setReduxCartCount} = useHRedux();

  const category = route.params.data;
  const {id, category_name, category_name_ar} = category;

  const getAllProducts = async (categoryId: number) => {
    const response = await getProductsByMenuApi({cat_id: categoryId});
    if (response.status == 1) {
      const favouriteList = await favouritesList();
      const data = [...response.data];
      data.map((d: any) => {
        const itemData: any = favouriteList?.data
          ? updateKeyAndAddNewKey(d.item, favouriteList.data, 'is_favorite', true, 'favorite_id')
          : null;
        d['name'] = language === 'en' ? d.subcategory_name : d.subcategory_name_ar;
        d['options'] = language === 'en' ? d.subcategory_name : d.subcategory_name_ar;
        d['component'] = () => <RenderTab items={d.item} />;
      });
      settabDataa(data);
    }
  };

  // Function to update the key and add a new key in array1 based on array2
  function updateKeyAndAddNewKey(
    array1: any[],
    array2: any[],
    keyToUpdate: string,
    newValue: any,
    newKey: any,
  ) {
    // Iterate through array1
    array1.forEach((item1) => {
      // Find the corresponding item in array2
      const correspondingItem = array2.find((item2) => item2.id === item1.id);
      // If a corresponding item is found, update the key and add newKey
      if (correspondingItem) {
        item1[keyToUpdate] = newValue;
        item1[newKey] = correspondingItem[newKey];
      }
    });
  }

  useEffect(() => {
    getAllProducts(id);
  }, [id]);

  function RenderTab({items}: any) {
    const [currentItems, setCurrentItems] = useState<any[]>([]);

    useEffect(() => {
      const updatedItems = items.map((item: any) => ({
        ...item,
        quantity: item.quantity ?? 1,
      }));
      setCurrentItems(updatedItems);
    }, [items]);

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
        const isFavourited =
          item.is_favorite === 0
            ? await addFavourite({
                item_id: item.id,
              })
            : await deleteFavourite(item.favorite_id);
        if (isFavourited.error) {
          Toast.show({position: 'bottom', text1: isFavourited.error.message});
        } else {
          Toast.show({position: 'bottom', text1: isFavourited.message});
          getAllProducts(id);
        }
      }
    }
    async function increaseQuantity(item: any, i: number) {
      let tempItems = currentItems;
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
      setCurrentItems([...tempItems]);
    }
    async function decreaseQuantity(item: any, i: number) {
      let tempItems = currentItems;
      tempItems = tempItems.map((tempItem: any, i: number) => {
        if (tempItem.id === item.id && tempItem?.quantity && tempItem?.quantity > 1) {
          return (tempItem = {
            ...tempItem,
            quantity: tempItem.quantity - 1,
          });
        }
        return tempItem;
      });
      setCurrentItems([...tempItems]);
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
        let tempItems = currentItems;
        tempItems = tempItems.map((tempItem: any, i: number) => {
          if (tempItem.id === item.id && tempItem?.quantity) {
            return (tempItem = {
              ...tempItem,
              quantity: 1,
            });
          }
          return tempItem;
        });
        setCurrentItems([...tempItems]);
        setReduxCartCount(itemAdded.cart);
        Toast.show({position: 'bottom', text1: itemAdded.message});
      }
    }

    return (
      <Item
        items={currentItems}
        colors={colors}
        language={language}
        onItemPressed={onItemPressed}
        onFavouriteItem={onFavouriteItem}
        decreaseQuantity={decreaseQuantity}
        increaseQuantity={increaseQuantity}
        addItemToCart={addItemToCart}
      />
    );
  }

  return (
    <SafeAreaView style={{flex: 1, width: '100%'}}>
      <Header title={language === 'en' ? category_name : category_name_ar} />
      {tabDataa?.length && (
        <CategoriesTopTab.Navigator
          screenOptions={{
            swipeEnabled: true,
            tabBarScrollEnabled: true,
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
          }}
          sceneContainerStyle={{backgroundColor: colors.white}}>
          {tabDataa?.map((screen, i) => {
            return <CategoriesTopTab.Screen {...screen} key={i} />;
          })}
        </CategoriesTopTab.Navigator>
      )}

      {/* <TopSubCategoriesListTab tabsData={tabDataa} /> */}
    </SafeAreaView>
  );
}
