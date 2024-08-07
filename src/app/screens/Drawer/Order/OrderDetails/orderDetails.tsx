import {useIsFocused} from '@react-navigation/native';
import {useEffect, useLayoutEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, Image, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useHDrawer} from '~/app/data/hooks/common/useDrawer';
import {AkText, AkView} from '~/app/lib/elements';
import Col from '~/app/lib/elements/AkView/Col/Col';
import Row from '~/app/lib/elements/AkView/Row/Row';
import useAKThemeImages from '~/app/lib/hooks/useAKImages';
import useAKTheme from '~/app/lib/hooks/useAKTheme';
import Header from '~/app/lib/components/Header/Header';
import {getUserId} from '~/app/lib/utils/userId';
import {useHUser} from '~/app/data/hooks/common/useUser';
import {useAppConfig} from '~/app/data/hooks/common/useAppConfig';

export default function OrderDetails(props: any) {
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const {t} = useTranslation();
  const isFocused = useIsFocused();
  const {colors} = useAKTheme();
  const {language} = useAppConfig();
  const {Logo} = useAKThemeImages();
  const {ordersDetails} = useHDrawer();

  useEffect(() => {
    if (isFocused) {
      (async () => {
        await callGetOrderDetailsAPI();
      })();
    }
  }, [isFocused]);

  async function callGetOrderDetailsAPI() {
    const user_id = await getUserId();
    const order_id = props.route.params?.orderId;
    const result = await ordersDetails({order_id, user_id});
    if (result) {
      setOrderDetails(result);
    }
  }

  function renderOrderType(orderType: number) {
    switch (orderType) {
      case 1:
        return <AkText>{t('delivery')}</AkText>;
      case 2:
        return <AkText>{t('pickup')}</AkText>;
      case 3:
        return <AkText>{t('drive_by')}</AkText>;

      default:
        break;
    }
  }

  function renderOrderPaymentType(orderPaymentType: number) {
    switch (orderPaymentType) {
      case 0:
        return <AkText>{t('my_fatoorah')}</AkText>;
      case 1:
        return <AkText>{t('cash')}</AkText>;
      default:
        break;
    }
  }

  function renderTotal() {
    return (
      parseFloat(orderDetails?.summery.order_total) +
      parseFloat(orderDetails?.summery.delivery_charge)
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header title={t('order_detail')} />
      <ScrollView>
        <AkView style={{backgroundColor: colors.white, borderRadius: 10, marginHorizontal: 20}}>
          <Col style={{width: '100%'}}>
            <AkView
              style={{justifyContent: 'space-between', marginVertical: 10, paddingHorizontal: 10}}>
              <AkText>
                {t('order_id')}: {orderDetails?.order_number}
              </AkText>
              <AkText>{renderOrderType(orderDetails?.order_type)}</AkText>
            </AkView>
            <AkView
              style={{justifyContent: 'space-between', marginVertical: 10, paddingHorizontal: 10}}>
              <AkText>
                {t('payment_type_')} {renderOrderPaymentType(orderDetails?.payment_type)}
              </AkText>
            </AkView>
            <AkView
              style={{
                justifyContent: 'space-between',
                backgroundColor: colors.red,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                padding: 5,
              }}>
              <AkText style={{color: colors.white}}>{t('order_cancelled_admin')}</AkText>
              <AkText style={{color: colors.white}}>{orderDetails?.date}</AkText>
            </AkView>
          </Col>
        </AkView>
        <FlatList
          data={orderDetails?.data}
          renderItem={({item}) => {
            return (
              <AkView
                style={{
                  marginHorizontal: 20,
                  paddingHorizontal: 8,
                  backgroundColor: colors.white,
                  borderRadius: 8,
                  marginVertical: 10,
                }}>
                <Image
                  source={item.item_image ? {uri: item.item_image} : Logo}
                  style={{width: 60, height: 60, marginRight: 10, borderRadius: 6}}
                />
                <Col style={{flex: 1}}>
                  <AkView>
                    <AkText style={{marginTop: 10}}>
                      {language === 'en' ? item.item_name : item.item_name_ar}
                    </AkText>
                  </AkView>
                  <AkView style={{justifyContent: 'space-between', marginTop: 5}}>
                    <AkText>{item.order_total.toFixed(3)}</AkText>
                    <AkText>
                      {t('qty')} {item.qty}
                    </AkText>
                  </AkView>
                </Col>
              </AkView>
            );
          }}
        />
        <AkView style={{backgroundColor: colors.white, padding: 16, borderRadius: 8}}>
          <Col style={{flex: 1, justifyContent: 'space-evenly'}}>
            <AkText>{t('payment_summery')}</AkText>

            <AkView style={{justifyContent: 'space-between'}}>
              <AkText>{t('order_total')}</AkText>
              <AkText>
                {t('kd')} {orderDetails?.summery.order_total.toFixed(3)}
              </AkText>
            </AkView>

            {parseFloat(orderDetails?.summery.discount_amount) > 0 && (
              <AkView style={{justifyContent: 'space-between'}}>
                <AkText>{t('discount_offer')}</AkText>
                <AkText>
                  {t('kd')} {orderDetails?.summery.discount_amount}
                </AkText>
              </AkView>
            )}

            {parseFloat(orderDetails?.summery.delivery_charge) > 0 && (
              <AkView style={{justifyContent: 'space-between'}}>
                <AkText>{t('delivery_charge')}</AkText>
                <AkText>
                  {t('kd')} {orderDetails?.summery.delivery_charge}
                </AkText>
              </AkView>
            )}

            <AkView style={{borderBottomWidth: 0.2}} />

            <AkView style={{justifyContent: 'space-between'}}>
              <AkText style={{color: colors.colorPrimary}}>{t('total_amount')}</AkText>
              <AkText style={{color: colors.colorPrimary}}>
                {t('kd')} {renderTotal().toFixed(3)}
              </AkText>
            </AkView>
          </Col>
        </AkView>
        <AkView
          style={{
            backgroundColor: colors.white,
            padding: 16,
            borderRadius: 8,
            marginVertical: 10,
          }}></AkView>
      </ScrollView>
    </SafeAreaView>
  );
}
