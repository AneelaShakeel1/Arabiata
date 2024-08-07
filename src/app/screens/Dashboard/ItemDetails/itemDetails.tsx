import {useRoute} from '@react-navigation/native';
import {Icon} from '@rneui/themed';
import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, ScrollView, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAppConfig} from '~/app/data/hooks/common/useAppConfig';
import Header from '~/app/lib/components/Header/Header';
import {AkButton, AkText, AkView} from '~/app/lib/elements';
import Col from '~/app/lib/elements/AkView/Col/Col';
import useAKTheme from '~/app/lib/hooks/useAKTheme';
import {useHCart} from '~/app/data/hooks/cart/useHCart';
import {useHUser} from '~/app/data/hooks/common/useUser';
import Route from '~/app/navigation/routes';
import Toast from 'react-native-toast-message';
import {getUserId} from '~/app/lib/utils/userId';
import {useHRedux} from '~/app/data/hooks/common/useRedux';

export default function ItemDetails(props: any) {
  const [itemDescription, setItemDescription] = useState<string>('');
  const [itemDescriptionAr, setItemDescriptionAr] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const {t} = useTranslation();
  const route: any = useRoute();
  const {colors} = useAKTheme();
  const {language} = useAppConfig();
  const {addToCart, getCartCount, getItemDetails} = useHCart();
  const {loginInfo} = useHUser();
  const {setReduxCartCount} = useHRedux();

  const {id, item_name, item_name_ar, item_price, image} = route.params.data;

  const getDetails = async () => {
    const response = await getItemDetails(id);
    if (response?.status == 1) {
      const itemDetails = response.data;
      setItemDescription(itemDetails.item_description || 'No item description available');
      setItemDescriptionAr(itemDetails.item_description_ar || 'لا توجد تفاصيل متاحة لهذا العنصر');
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : prevQuantity));
  };

  const addItemToCart = async () => {
    let finalItem: any = {
      item_id: id,
      qty: quantity,
      price: item_price,
      item_name: item_name,
      [loginInfo ? 'user_id' : 'device_id']: await getUserId(),
      item_name_ar: item_name_ar,
    };
    const itemAdded: any = await addToCart(finalItem);
    if (itemAdded.error) {
      Toast.show({position: 'bottom', text1: itemAdded.error.message});
    } else {
      setReduxCartCount(itemAdded.cart);
      Toast.show({position: 'bottom', text1: itemAdded.message});
    }
  };

  return (
    <SafeAreaView style={{flex: 1, width: '100%'}}>
      <Header title={language === 'en' ? item_name : item_name_ar} />
      <ScrollView>
        <Image source={{uri: image}} style={{width: '100%', height: 300}} resizeMode="cover" />

        <Col style={{marginHorizontal: 10}}>
          <AkText style={{fontSize: 20, fontWeight: 'bold', marginVertical: 20}}>
            {t('description')}
          </AkText>
          <AkText>{language === 'ar' ? itemDescriptionAr : itemDescription}</AkText>
        </Col>
      </ScrollView>

      <AkView
        style={{
          justifyContent: 'space-between',
          width: '100%',
          paddingHorizontal: 20,
        }}>
        <AkButton
          btnText={t('addtocart')}
          containerStyles={{width: '70%', alignSelf: 'center'}}
          onClick={addItemToCart}
        />
        <AkView style={{alignItems: 'center'}}>
          <Icon
            name={'pluscircleo'}
            type="antdesign"
            size={18}
            color={colors.colorPrimary}
            style={{margin: 0, padding: 0}}
            onPress={increaseQuantity}
          />
          <AkText style={{marginHorizontal: 5}}>{quantity}</AkText>
          <Icon
            name={'minuscircleo'}
            type="antdesign"
            size={18}
            color={colors.colorPrimary}
            onPress={decreaseQuantity}
          />
        </AkView>
      </AkView>
    </SafeAreaView>
  );
}
