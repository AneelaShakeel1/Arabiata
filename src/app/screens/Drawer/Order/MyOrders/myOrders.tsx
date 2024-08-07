import {useIsFocused} from '@react-navigation/native';
import {useLayoutEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, Image, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useHDrawer} from '~/app/data/hooks/common/useDrawer';
import {AkText, AkView} from '~/app/lib/elements';
import Col from '~/app/lib/elements/AkView/Col/Col';
import Row from '~/app/lib/elements/AkView/Row/Row';
import useAKThemeImages from '~/app/lib/hooks/useAKImages';
import useAKTheme from '~/app/lib/hooks/useAKTheme';
import Route from '~/app/navigation/routes';
import Header from '~/app/lib/components/Header/Header';

export default function MyOrders(props: any) {
  const [orderList, setOrderList] = useState<null | any[]>(null);
  const {t} = useTranslation();
  const isFocused = useIsFocused();
  const {colors} = useAKTheme();
  const {ArrowBack, Navigation} = useAKThemeImages();
  const {ordersList} = useHDrawer();

  useLayoutEffect(() => {
    callGetOrdersListAPI();
  }, [isFocused]);

  async function callGetOrdersListAPI() {
    const result = await ordersList();
    if (result?.data) {
      setOrderList(result.data);
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

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header title={t('my_orders')} />
      {orderList && orderList !== null && orderList.length > 0 ? (
        <FlatList
          data={orderList}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate(Route.HOME_ORDER_DETAILS_SCREEN, {orderId: item.id});
                }}
                style={{marginVertical: 10}}>
                <AkView
                  style={{backgroundColor: colors.white, borderRadius: 10, marginHorizontal: 20}}>
                  <Col style={{width: '100%'}}>
                    <AkView
                      style={{
                        justifyContent: 'space-between',
                        marginVertical: 10,
                        paddingHorizontal: 10,
                      }}>
                      <AkText>
                        {t('order_id_')}: {item.order_number}
                      </AkText>
                      <AkText>{renderOrderType(item.order_type)}</AkText>
                    </AkView>
                    <AkView
                      style={{
                        justifyContent: 'space-between',
                        marginVertical: 10,
                        paddingHorizontal: 10,
                      }}>
                      <AkText>
                        {t('payment_type_')} {renderOrderPaymentType(item.payment_type)}
                      </AkText>
                      <AkText>KD {item.total_price}</AkText>
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
                      <AkText style={{color: colors.white}}>{item.date}</AkText>
                    </AkView>
                  </Col>
                </AkView>
              </TouchableOpacity>
            );
          }}
        />
      ) : (
        <AkView style={{height: '90%', alignItems: 'center', justifyContent: 'center'}}>
          <AkText style={{fontSize: 20, color: colors.black}}>No {t('orders')} Available</AkText>
        </AkView>
      )}
    </SafeAreaView>
  );
}
