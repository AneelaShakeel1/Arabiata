import React, {useState, useEffect} from 'react';
import {Alert, Image} from 'react-native';
import {useTranslation} from 'react-i18next';
import DeviceInfo from 'react-native-device-info';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {useHCart} from '~/app/data/hooks/cart/useHCart';
import {useHUser} from '~/app/data/hooks/common/useUser';
import {useHSettings} from '~/app/data/hooks/common/useSettings';
import useAKThemeImages from '~/app/lib/hooks/useAKImages';
import useAKTheme from '~/app/lib/hooks/useAKTheme';
import {useHDrawer} from '~/app/data/hooks/common/useDrawer';
import Header from '~/app/lib/components/Header/Header';
import Webview from '~/app/lib/components/WebView/Webview';
import {AkButton, AkText, AkView} from '~/app/lib/elements';
import Col from '~/app/lib/elements/AkView/Col/Col';
import Row from '~/app/lib/elements/AkView/Row/Row';
import AkInputWithFormik from '~/app/lib/elements/Input/AkInput';
import FormikWrapper from '~/app/lib/wrappers/formik';
import {getUserId} from '~/app/lib/utils/userId';
import Route from '~/app/navigation/routes';
import {FormikProps, FormikValues} from 'formik';

export default function PaymentMethod(props: any) {
  const [paymentMethodType, setPaymentMethodType] = useState<number | null>(null);
  const [webViewBaseUrl, setWebViewBaseUrl] = useState('');
  const [showWebView, setShowWebView] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const {t} = useTranslation();
  const {colors} = useAKTheme();
  const {Wallet, COD} = useAKThemeImages();
  const {loginInfo} = useHUser();
  const {getPaymentLink} = useHCart();
  const {getProfile} = useHSettings();
  const {newOrder} = useHDrawer();
  const selectedAddress = props.route.params?.selectedAddress;
  const orderType = props.route.params?.orderType;
  const cityId = props.route.params?.cityId;
  const branchId = props.route.params?.branchId;
  const carName = props.route.params?.carName;
  const carColor = props.route.params?.carColor;
  const carNumPlate = props.route.params?.carNumPlate;

  async function handleCashPMPress() {
    setPaymentMethodType(0);
  }

  async function handleMyFatoorahPMPress() {
    setPaymentMethodType(1);
  }

  function PaymentMethodForm({values}: FormikProps<FormikValues>) {
    const full_name = loginInfo?.name ?? values.full_name;
    const email = loginInfo?.email ?? values.email;
    const mobile = loginInfo?.mobile ?? values.mobile;

    async function handlePayment() {
      try {
        const commonData = {
          [loginInfo ? 'user_id' : 'device_id']: await getUserId(),
          order_type: orderType,
          payment_type: paymentMethodType,
          full_name,
          email,
          mobile,
        };
        if (!full_name || !mobile || !orderType || ![0, 1].includes(paymentMethodType!!)) {
          return Alert.alert('kindly provide full name, mobile, order type, payment type');
        } else {
          let orderData = commonData;
          if (orderType === 1) {
            orderData = {
              ...orderData,
              city_id: selectedAddress?.city_id ?? cityId,
              block: selectedAddress?.block ?? 0,
              address_type: selectedAddress?.address_type ?? 1,
            };
          }
          if (orderType === 2) {
            orderData = {
              ...orderData,
              branch_id: branchId,
            };
          }
          if (orderType === 3) {
            orderData = {
              ...orderData,
              branch_id: branchId,
              car_name: orderType === 3 ? carName : undefined,
              car_color: orderType === 3 ? carColor : undefined,
              car_number: orderType === 3 ? carNumPlate : undefined,
            };
          }
          if (paymentMethodType === 0) {
            const result = await newOrder(orderData);
            if (result.status === 1) {
              const newOrderID = result.order_id;
              setOrderId(newOrderID);
              props.navigation.navigate(Route.HOME_ORDER_DETAILS_SCREEN, {
                orderId: newOrderID,
              });
            } else {
              Toast.show({position: 'bottom', text1: result.message});
            }
          } else if (paymentMethodType === 1) {
            const result = await getPaymentLink(orderData);
            if (result.status === 0) {
              Toast.show({position: 'bottom', text1: result.message});
            } else {
              setWebViewBaseUrl(result.link);
              setShowWebView(true);
            }
          }
        }
      } catch (error: any) {
        Toast.show({position: 'bottom', text1: error.message});
      }
    }

    return (
      <>
        {
          <>
            <AkView style={{flex: 1}}>
              <Col style={{marginVertical: 10, flex: 1}}>
                <AkText style={{fontWeight: 'bold', fontSize: 17}}>{t('full_name')}</AkText>
                <AkInputWithFormik
                  name="full_name"
                  value={full_name}
                  placeholder={t('full_name')}
                />
              </Col>
            </AkView>
            <AkView style={{flex: 1}}>
              <Col style={{marginVertical: 10, flex: 1}}>
                <AkText style={{fontWeight: 'bold', fontSize: 17}}>{t('email')}</AkText>
                <AkInputWithFormik
                  name="email"
                  value={email}
                  placeholder={t('email')}
                  keyboardType="email-address"
                />
              </Col>
            </AkView>
            <AkView style={{flex: 1}}>
              <Col style={{marginVertical: 10, flex: 1}}>
                <AkText style={{fontWeight: 'bold', fontSize: 17}}>{t('mobileno')}</AkText>
                <AkInputWithFormik
                  name="mobile"
                  value={mobile}
                  placeholder={t('mobile')}
                  keyboardType="number-pad"
                  maxLength={8}
                />
              </Col>
            </AkView>
          </>
        }

        <Row style={{flex: 1, marginVertical: 10}}>
          <Col style={{marginVertical: 10, flex: 1}}>
            <AkText style={{fontWeight: 'bold', fontSize: 17, marginVertical: 10}}>
              {t('select_payment_method')}
            </AkText>
            <AkText style={{}}>{t('choose_desired_payment')}</AkText>
            {orderType !== 3 && (
              <TouchableOpacity style={{marginVertical: 10}} onPress={handleCashPMPress}>
                <AkView
                  style={{
                    backgroundColor: paymentMethodType === 0 ? colors.colorPrimary : colors.white,
                    flex: 1,
                    height: 80,
                    borderRadius: 6,
                    alignItems: 'center',
                    paddingHorizontal: 10,
                  }}>
                  <Image
                    source={COD}
                    style={{
                      width: 40,
                      height: 40,
                      tintColor: paymentMethodType === 0 ? colors.white : colors.black,
                    }}
                  />
                  <AkText
                    style={{
                      color: paymentMethodType === 0 ? colors.white : colors.black,
                      marginTop: 5,
                      fontWeight: 'bold',
                    }}>
                    {' '}
                    {t('cash_payment')}
                  </AkText>
                </AkView>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={{marginVertical: 10}} onPress={handleMyFatoorahPMPress}>
              <AkView
                style={{
                  backgroundColor: paymentMethodType === 1 ? colors.colorPrimary : colors.white,
                  flex: 1,
                  height: 80,
                  borderRadius: 6,
                  alignItems: 'center',
                  paddingHorizontal: 10,
                }}>
                <Image
                  source={Wallet}
                  style={{
                    width: 40,
                    height: 40,
                    tintColor: paymentMethodType === 1 ? colors.white : colors.black,
                  }}
                />
                <AkText
                  style={{
                    color: paymentMethodType === 1 ? colors.white : colors.black,
                    marginTop: 5,
                    fontWeight: 'bold',
                  }}>
                  {' '}
                  {t('my_fatoorah')}
                </AkText>
              </AkView>
            </TouchableOpacity>
          </Col>
        </Row>

        <AkButton
          btnText={t('order_now')}
          onClick={handlePayment}
          containerStyles={{marginVertical: 20, marginHorizontal: 20}}
        />
      </>
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      {!showWebView && (
        <>
          <Header title={t('payment_method')} />
          <Col style={{paddingHorizontal: 20}}>
            <FormikWrapper
              initialValues={{
                full_name: '',
                email: '',
                mobile: '',
              }}
              onSubmit={() => {}}
              children={PaymentMethodForm}
            />
          </Col>
        </>
      )}

      {showWebView && (
        <Webview baseUrl={webViewBaseUrl} handleOnMessage={(message) => Alert.alert(message)} />
      )}
    </SafeAreaView>
  );
}
