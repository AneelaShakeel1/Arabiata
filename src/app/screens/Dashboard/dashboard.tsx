import React, {useEffect, useState,useLayoutEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Dimensions, Image, TouchableOpacity, View} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useHCart} from '~/app/data/hooks/cart/useHCart';
import {useHHome} from '~/app/data/hooks/categories/useHHome';
import {useAppConfig} from '~/app/data/hooks/common/useAppConfig';
import {AkText} from '~/app/lib/elements';
import Col from '~/app/lib/elements/AkView/Col/Col';
import Row from '~/app/lib/elements/AkView/Row/Row';
import useAKTheme from '~/app/lib/hooks/useAKTheme';
import {getUserId} from '~/app/lib/utils/userId';
import Route from '~/app/navigation/routes';
import { useIsFocused } from "@react-navigation/native";
import Header from '~/app/lib/components/Header/Header';

export default function Dashboard(props: any) {
  const [cartCount, setCartCount] = useState(0);
  const [menuItem, setmenuItem] = useState<Array<any>>([]);
  const [banner, setBanner] = useState<Array<any>>([]);
  const width = Dimensions.get('window').width;
  const {t} = useTranslation();
  const {colors} = useAKTheme();
  const {language} = useAppConfig();
  const {getCategories, getBoards} = useHHome();

  const getAllCategories = async () => {
    const response = await getCategories();
    if (response?.status == 1) {
      setmenuItem(response.data);
    }
  };

  const getAllBoards = async () => {
    const response = await getBoards();
    console.log('=======>', response, '=======>');
    if (response) {
      setBanner(response.banner);
    }
  };

  useEffect(() => {
    getAllBoards();
    getAllCategories();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, width: '100%'}}>
      <Header/>
      <Col style={{height: '30%'}}>
        {banner?.length != 0 && (
          <Carousel
            loop
            width={width}
            height={width / 2}
            // autoPlay={true}
            data={banner?.map((banner) => ({image: banner.image}))}
            scrollAnimationDuration={1000}
            mode="parallax"
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    paddingHorizontal: 10,
                  }}>
                  <Image
                    source={{uri: item.image}}
                    style={{width: null, height: 180, borderRadius: 8}}
                  />
                </View>
              );
            }}
          />
        )}
        <AkText
          style={{
            paddingHorizontal: 35,
            fontSize: 22,
            color: colors.black,
            fontWeight: 'bold',
            paddingBottom: 15,
          }}>
         {t('menus')}
        </AkText>
      </Col>
      <Row style={{flexWrap: 'wrap', justifyContent: 'center'}}>
        {menuItem.map((menuItem, index) => {
          return (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate(Route.HOME_CATEGORY_DETAILS_SCREEN, {
                  data: menuItem,
                });
              }}
              key={index}
              style={{
                backgroundColor: colors.colorPrimary,
                alignSelf: 'flex-start',
                width: 150,
                height: 120,
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 10,
                marginVertical: 10,
              }}>
              <Image source={{uri: menuItem.image}} style={{width: 50, height: 50}} />
              <AkText style={{color: colors.white, fontWeight: 'bold', fontSize: 14}}>
                {language == 'ar' ? menuItem.category_name_ar : menuItem.category_name}
              </AkText>
            </TouchableOpacity>
          );
        })}
      </Row>
    </SafeAreaView>
  );
}
