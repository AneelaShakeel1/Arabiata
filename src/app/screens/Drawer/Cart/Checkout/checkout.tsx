import React, {useState, useEffect, useLayoutEffect, useRef} from 'react';
import {Alert, Image, Text, TouchableOpacity} from 'react-native';
import {Icon} from '@rneui/themed';
import {useTranslation} from 'react-i18next';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import useAKThemeImages from '~/app/lib/hooks/useAKImages';
import {useHUser} from '~/app/data/hooks/common/useUser';
import {useHDrawer} from '~/app/data/hooks/common/useDrawer';
import useAKTheme from '~/app/lib/hooks/useAKTheme';
import {useHSettings} from '~/app/data/hooks/common/useSettings';
import Header from '~/app/lib/components/Header/Header';
import {AkButton, AkText, AkView} from '~/app/lib/elements';
import Col from '~/app/lib/elements/AkView/Col/Col';
import Row from '~/app/lib/elements/AkView/Row/Row';
import AkInputWithFormik from '~/app/lib/elements/Input/AkInput';
import FormikWrapper from '~/app/lib/wrappers/formik';
import Route from '~/app/navigation/routes';
import RNModal from '~/app/lib/elements/Modal/RNModalWrapper';
import {getUserId} from '~/app/lib/utils/userId';
import {FormikProps, FormikValues} from 'formik';
import {useAppConfig} from '~/app/data/hooks/common/useAppConfig';
import {ScrollView} from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import {useHCheckout} from '~/app/data/hooks/checkout/useHCheckout';
import AkSwitch from '~/app/lib/elements/Switch/AkSwitch';

export default function Checkout(props: any) {
  const [orderType, setOrderType] = useState(1);
  const [orderTotal, setOrderTotal] = useState('');
  const [deliveryFee, setDeliveryFee] = useState('');
  const [discount, setDiscount] = useState('');
  const [total, setTotal] = useState('');
  const [offerCode, setOfferCode] = useState('');
  const [usePoints, setUsePoints] = useState(false);
  const [showBranchModal, setShowBranchModal] = useState(false);
  const [showAreaModal, setShowAreaModal] = useState(false);
  const [showPromoCodeModal, setShowPromoCodeModal] = useState(false);
  const [deliveryCharge, setDeliveryCharge] = useState((0).toFixed(3));
  const selectedAddress = props.route.params?.selectedAddress;
  const [branches, setBranches] = useState<any[]>([]);
  const [areas, setAreas] = useState<any[]>([]);
  const {t} = useTranslation();
  const {colors} = useAKTheme();
  const {getOrderSummary} = useHDrawer();
  const {Gift, DriveThrough, Vehicle, Delivery, DriveBy, PickUp} = useAKThemeImages();
  const {loginInfo} = useHUser();
  const {language} = useAppConfig();
  const {getAreaList} = useHSettings();
  const {getPromoCodes, verifyPromoCode} = useHCheckout();
  const formikRef = useRef<FormikProps<FormikValues>>();

  async function callGetAreaListAPI() {
    const result = await getAreaList();
    setAreas(result.state);
    setBranches(result.branch);
  }

  useLayoutEffect(() => {
    callGetAreaListAPI();
  }, []);

  useEffect(() => {
    handleOrderSummary('');
  }, []);

  useEffect(() => {
    if (selectedAddress?.delivery_charge != null) {
      setDeliveryCharge(selectedAddress.delivery_charge);
    }
  }, [selectedAddress]);

  async function handleOrderSummary(promoCode: string) {
    let orderSummaryApiData = {
      [loginInfo ? 'user_id' : 'device_id']: await getUserId(),
      city_id: selectedAddress?.city_id ?? formikRef.current?.values.city_id,
      offer_code: promoCode,
    };
    if (loginInfo) {
      orderSummaryApiData = {
        ...orderSummaryApiData,
        use_points: usePoints,
      };
    }
    const response = await getOrderSummary(orderSummaryApiData);
    if (response.status === 0) {
      Toast.show({
        position: 'bottom',
        text1: response.error.message,
      });
    } else {
      setOrderTotal(response.summery.subtotal);
      setDiscount(response.summery.discount);
      setDeliveryFee(response.summery.delivery_fee);
      setTotal(response.summery.total);
    }
  }

  function CheckoutForm({values, setFieldValue}: FormikProps<FormikValues>) {
    function handleItemSelect(modalType: 'branch' | 'area') {
      const branch = modalType === 'branch';
      const area = modalType === 'area';
      return (
        <RNModal
          visible={branch ? showBranchModal : showAreaModal}
          // onBackDropPress={() => (branch ? setShowBranchModal(false) : setShowAreaModal(false))}
          // withBackDrop
        >
          <Col
            style={{
              backgroundColor: colors.white,
              padding: 20,
              borderRadius: 8,
              width: '80%',
              maxHeight: 400,
            }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <AkView style={{justifyContent: 'space-between', alignItems: 'center'}}>
                {branch && (
                  <AkText style={{fontWeight: 'bold', fontSize: 17}}>{t('select_branch')}</AkText>
                )}
                {area && (
                  <AkText style={{fontWeight: 'bold', fontSize: 17}}>{t('select_city')}</AkText>
                )}
                <TouchableOpacity
                  onPress={() => (branch ? setShowBranchModal(false) : setShowAreaModal(false))}
                  style={{}}>
                  <Icon name="close" size={24} color={colors.black} />
                </TouchableOpacity>
              </AkView>

              {branch &&
                branches.map((branch, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setFieldValue(
                        'branch_name',
                        language === 'en' ? branch.branch_name : branch.branch_name_ar,
                      );
                      setFieldValue('branch_id', branch.id);
                      setShowBranchModal(false);
                    }}
                    style={{marginVertical: 10, paddingLeft: 10}}>
                    <AkText style={{color: colors.black, width: '100%'}}>
                      {language === 'en' ? branch.branch_name : branch.branch_name_ar}
                    </AkText>
                  </TouchableOpacity>
                ))}
              {area &&
                areas.map((area: any, index: number) => (
                  <>
                    <Text style={{fontWeight: 'bold', paddingVertical: 20}}>
                      {language === 'en' ? area.state_name : area.state_name_ar}
                    </Text>
                    {area.city.map((city: any, index: number) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          setFieldValue(
                            'city_name',
                            language === 'en' ? city.city_name : city.city_name_ar,
                          );
                          setFieldValue('city_id', city.id);
                          setShowAreaModal(false);
                        }}
                        style={{marginVertical: 10, paddingLeft: 10}}>
                        <AkText
                          style={{
                            color: colors.black,
                            width: '100%',
                            borderBottomWidth: 0.5,
                          }}>
                          {language === 'en' ? city.city_name : city.city_name_ar}
                        </AkText>
                      </TouchableOpacity>
                    ))}
                  </>
                ))}
            </ScrollView>
          </Col>
        </RNModal>
      );
    }

    async function handleVerifyPromoCode(promoCode: string) {
      if (!promoCode) {
        Toast.show({
          position: 'bottom',
          text1: 'enter promocode',
        });
      } else {
        setOfferCode(promoCode);
        const result: any = await verifyPromoCode({offer_code: promoCode});
        if (result.status === 0) {
          Toast.show({
            position: 'bottom',
            text1: result.error.message,
          });
        } else {
          //verified promocode now apply
          handleOrderSummary(promoCode);
        }
      }
    }

    async function handleProceedToPayment() {
      if (!loginInfo && orderType === 1 && !values.city_id) {
        Toast.show({
          position: 'bottom',
          text1: 'Kindly select a area',
        });
      } else if (loginInfo && orderType === 1 && !selectedAddress) {
        Toast.show({
          position: 'bottom',
          text1: 'Kindly select an address',
        });
      } else if (
        loginInfo &&
        orderType === 1 &&
        selectedAddress &&
        parseFloat(orderTotal) <= parseFloat(selectedAddress.min_order)
      ) {
        Toast.show({
          position: 'bottom',
          text1: `At least order amount must be ${selectedAddress.min_order}`,
        });
      } else if (orderType === 2 && !values.branch_id) {
        Toast.show({
          position: 'bottom',
          text1: 'Kindly select a branch',
        });
      } else if (
        (!values.branch_id || !values.car_name || !values.car_color || !values.car_number) &&
        orderType === 3
      ) {
        Toast.show({
          position: 'bottom',
          text1: 'Kindly provide car information with branch information',
        });
      } else {
        props.navigation.navigate(Route.CART_PAYMENT_METHOD_SCREEN, {
          selectedAddress: selectedAddress,
          orderType: orderType,
          cityId: values.city_id,
          branchId: values.branch_id,
          carName: values.car_name,
          carColor: values.car_color,
          carNumPlate: values.car_number,
        });
      }
    }

    return (
      <>
        <AkView style={{height: 120, backgroundColor: colors.white, padding: 16, borderRadius: 8}}>
          <Col style={{flex: 1, justifyContent: 'space-evenly'}}>
            <AkText style={{marginVertical: 10}}>{t('payment_summery')}</AkText>
            <AkView style={{justifyContent: 'space-between', alignItems: 'center'}}>
              <AkText>{t('order_total')}</AkText>
              <AkText>
                {t('kd')} {orderTotal}
              </AkText>
            </AkView>
            <AkView style={{justifyContent: 'space-between', alignItems: 'center'}}>
              <AkText style={{marginVertical: 10}}>{t('delivery_charge')}</AkText>
              <AkText>
                {t('kd')} {deliveryFee ?? 0}
              </AkText>
            </AkView>
            <AkView style={{justifyContent: 'space-between', alignItems: 'center'}}>
              <AkText>{t('discount')}</AkText>
              <AkText>
                {t('kd')} {discount ?? 0}
              </AkText>
            </AkView>
            <AkView style={{borderBottomWidth: 0.2, marginVertical: 20}} />
            <AkView style={{justifyContent: 'space-between', alignItems: 'center'}}>
              <AkText style={{color: colors.colorPrimary}}>{t('total_amount')}</AkText>
              <AkText style={{color: colors.colorPrimary}}>
                {t('kd')} {total}
              </AkText>
            </AkView>
          </Col>
        </AkView>

        {/* PROMO CODE VERIFICATION */}
        <AkView
          style={{backgroundColor: colors.white, padding: 16, borderRadius: 8, marginTop: 10}}>
          <Col style={{flex: 1}}>
            <AkText>{t('promo_code')}</AkText>
            <AkView style={{justifyContent: 'center', marginVertical: 10, gap: 7}}>
              <AkInputWithFormik
                name="promo_code"
                placeholder={t('promo_code')}
                fieldContainerStyle={{flex: 1, marginTop: 0}}
                style={{backgroundColor: colors.light_gray}}
              />
              <AkButton
                btnText={t('apply')}
                onClick={() => handleVerifyPromoCode(values.promo_code)}
                containerStyles={{flex: 0.2, marginTop: 0, marginBottom: 0}}
              />
            </AkView>
          </Col>
        </AkView>

        {/* USE LOYALTY POINTS */}
        {loginInfo && (
          <AkView
            style={{backgroundColor: colors.white, padding: 16, borderRadius: 8, marginTop: 10}}>
            <AkView style={{flex: 1, alignItems: 'center', justifyContent: 'space-between'}}>
              <AkText>{t('use_loyalty_points')}</AkText>
              <AkSwitch
                isEnabled={usePoints}
                toggleSwitch={() => {
                  setUsePoints(!usePoints);
                }}
                color={colors.colorPrimary}
              />
            </AkView>
          </AkView>
        )}

        {/* ORDER TYPE SELECTION */}
        <AkView style={{justifyContent: 'space-between', marginTop: 20}}>
          <TouchableOpacity onPress={() => setOrderType(1)}>
            <Col
              style={{
                backgroundColor: orderType === 1 ? colors.colorPrimary : colors.white,
                width: 100,
                height: 80,
                borderRadius: 6,
                alignItems: 'center',
              }}>
              <Image
                source={Delivery}
                style={{width: 40, height: 40, marginTop: 10}}
                resizeMode="contain"
              />
              <AkText
                style={{
                  color: orderType === 1 ? colors.white : colors.black,
                  marginTop: 5,
                  fontWeight: 'bold',
                }}>
                {' '}
                {t('delivery')}
              </AkText>
            </Col>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setOrderType(2)}>
            <Col
              style={{
                backgroundColor: orderType === 2 ? colors.colorPrimary : colors.white,
                width: 100,
                height: 80,
                borderRadius: 6,
                alignItems: 'center',
              }}>
              <Image
                source={PickUp}
                style={{width: 40, height: 40, marginTop: 10}}
                resizeMode="contain"
              />
              <AkText
                style={{
                  color: orderType === 2 ? colors.white : colors.black,
                  marginTop: 5,
                  fontWeight: 'bold',
                }}>
                {' '}
                {t('pickup')}
              </AkText>
            </Col>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setOrderType(3)}>
            <Col
              style={{
                backgroundColor: orderType === 3 ? colors.colorPrimary : colors.white,
                width: 100,
                height: 80,
                borderRadius: 6,
                alignItems: 'center',
              }}>
              <Image
                source={DriveBy}
                style={{width: 40, height: 40, marginTop: 10}}
                resizeMode="contain"
              />
              <AkText
                style={{
                  color: orderType === 3 ? colors.white : colors.black,
                  marginTop: 5,
                  fontWeight: 'bold',
                }}>
                {' '}
                {t('drive_by')}
              </AkText>
            </Col>
          </TouchableOpacity>
        </AkView>

        {/* ORDER TYPE INFORMATION COLLECTION */}
        {loginInfo && orderType === 1 && (
          <AkView
            style={{backgroundColor: colors.white, padding: 16, borderRadius: 8, marginTop: 10}}>
            <Col style={{flex: 1}}>
              <AkView style={{alignItems: 'center', justifyContent: 'space-between'}}>
                <AkText style={{fontWeight: 'bold', fontSize: 17}}>{t('delivery_address')}</AkText>
                <AkText
                  onPress={() =>
                    props.navigation.navigate(Route.SETTINGS_ROOT, {
                      screen: Route.SETTINGS_MANAGE_ADDRESS_SCREEN,
                    })
                  }
                  style={{fontWeight: 'bold', fontSize: 13, color: colors.colorPrimary}}>
                  {t('select_address')}
                </AkText>
              </AkView>
              <AkView
                style={[
                  selectedAddress ? {alignItems: 'flex-start'} : {alignItems: 'center'},
                  {marginTop: 10},
                ]}>
                <Icon name="location-pin" type="entypo" color={colors.colorPrimary} size={25} />
                {selectedAddress ? (
                  <Col>
                    <AkText style={{fontWeight: 'bold'}}>
                      {selectedAddress.address_type === 1
                        ? t('home')
                        : selectedAddress.address_type === 2
                        ? t('office')
                        : selectedAddress.address_type === 3
                        ? t('flat')
                        : null}
                    </AkText>
                    <AkText style={{fontWeight: 'bold'}}>
                      {t('city')} : {selectedAddress.city_name}
                    </AkText>
                    <AkText style={{fontWeight: 'bold'}}>
                      {t('block')} : {selectedAddress.block}
                    </AkText>
                    <AkText style={{fontWeight: 'bold'}}>
                      {t('street_title')} : {selectedAddress.address}
                    </AkText>
                    {selectedAddress.address_type === 1 ? (
                      <AkText style={{fontWeight: 'bold'}}>
                        {t('house_number_')} : {selectedAddress.house_no}
                      </AkText>
                    ) : selectedAddress.address_type === 2 ? (
                      <AkText style={{fontWeight: 'bold'}}>
                        {t('office_number')} : {selectedAddress.house_no}
                      </AkText>
                    ) : selectedAddress.address_type === 3 ? (
                      <AkText style={{fontWeight: 'bold'}}>
                        {t('flat_number_')} : {selectedAddress.house_no}
                      </AkText>
                    ) : null}
                    {selectedAddress.address_type === 1 ||
                      (2 && (
                        <AkText style={{fontWeight: 'bold'}}>
                          {t('building_')} : {selectedAddress.building}
                        </AkText>
                      ))}
                  </Col>
                ) : (
                  <AkText>{t('address')}</AkText>
                )}
              </AkView>
            </Col>
          </AkView>
        )}

        {!loginInfo && orderType === 1 && (
          <AkView
            style={{
              backgroundColor: colors.white,
              padding: 16,
              borderRadius: 8,
              marginTop: 10,
            }}>
            <Col style={{flex: 1}}>
              <AkView style={{alignItems: 'center', justifyContent: 'space-between'}}>
                <AkText style={{fontWeight: 'bold', fontSize: 17}}>{t('select_city')}</AkText>
              </AkView>
              <TouchableOpacity onPress={() => setShowAreaModal(true)}>
                <AkView
                  style={{
                    alignItems: 'center',
                    marginTop: 10,
                    backgroundColor: colors.light_gray,
                    padding: 10,
                  }}>
                  {/* <Icon name="location-pin" type="entypo" color={colors.colorPrimary} size={20} /> */}
                  <AkText style={{fontWeight: 'bold', fontSize: 13, color: colors.medium_gray}}>
                    {values.city_name ? values.city_name : t('select_city')}
                  </AkText>
                </AkView>
              </TouchableOpacity>
              {showAreaModal && handleItemSelect('area')}
            </Col>
          </AkView>
        )}

        {(orderType === 2 || orderType === 3) && (
          <AkView
            style={{
              backgroundColor: colors.white,
              padding: 16,
              borderRadius: 8,
              marginTop: 10,
            }}>
            <Col style={{flex: 1}}>
              <AkText style={{fontWeight: 'bold', fontSize: 17}}>{t('select_branch')}</AkText>
              <TouchableOpacity onPress={() => setShowBranchModal(true)}>
                <AkView
                  style={{
                    alignItems: 'center',
                    marginTop: 10,
                    backgroundColor: colors.light_gray,
                    padding: 10,
                  }}>
                  <AkText style={{fontWeight: 'bold', fontSize: 13, color: colors.medium_gray}}>
                    {values.branch_name ? values.branch_name : t('select_branch')}
                  </AkText>
                </AkView>
              </TouchableOpacity>
              {showBranchModal && handleItemSelect('branch')}
            </Col>
          </AkView>
        )}

        {orderType === 3 && (
          <AkView style={{backgroundColor: colors.white, marginTop: 10, padding: 8}}>
            <Col style={{flex: 1}}>
              <AkText style={{fontWeight: 'bold', fontSize: 17}}>{t('car_info')}</AkText>
              <AkInputWithFormik
                name="car_name"
                placeholder={t('car_name')}
                fieldContainerStyle={{flex: 1, marginTop: 5}}
                style={{backgroundColor: colors.light_gray}}
              />
              <AkInputWithFormik
                name="car_color"
                placeholder={t('car_color')}
                fieldContainerStyle={{flex: 1, marginTop: 5}}
                style={{backgroundColor: colors.light_gray}}
              />
              <AkInputWithFormik
                name="car_number"
                placeholder={t('car_plate_number')}
                fieldContainerStyle={{flex: 1, marginTop: 5}}
                style={{backgroundColor: colors.light_gray}}
                keyboardType="number-pad"
              />
            </Col>
          </AkView>
        )}

        <Row style={{backgroundColor: colors.white, marginTop: 10}}>
          <AkInputWithFormik
            name="orderNotes"
            label={t('note')}
            placeholder={t('note')}
            inputType="textArea"
            fieldContainerStyle={{
              flex: 1,
              backgroundColor: 'transparent',
              height: 160,
              justifyContent: 'center',
              padding: 10,
              borderRadius: 6,
            }}
            style={{backgroundColor: colors.light_gray, height: 160}}
          />
        </Row>

        <AkButton
          btnText={t('proceed_to_payment')}
          onClick={handleProceedToPayment}
          containerStyles={{marginVertical: 20}}
        />
      </>
    );
  }

  return (
    <SafeAreaView style={{flex: 1, paddingHorizontal: 20}}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <Header title={t('checkout')} />
        <FormikWrapper
          initialValues={{
            car_name: '',
            car_color: '',
            car_number: '',
            branch_id: null,
            branch_name: '',
            // branch_name_ar: '',
            // branch_mobile: '',
            selectedAddress,
            promocode: '',
            city_id: null,
            city_name: '',
          }}
          onSubmit={() => {}}
          children={CheckoutForm}
          innerRef={formikRef}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
