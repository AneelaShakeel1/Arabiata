import {Icon} from '@rneui/themed';
import {FormikHelpers, FormikProps, FormikValues} from 'formik';
import {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  FlatList,
  Image,
  Modal,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {useHSettings} from '~/app/data/hooks/common/useSettings';
import {AkButton, AkText, AkView} from '~/app/lib/elements';
import Col from '~/app/lib/elements/AkView/Col/Col';
import Row from '~/app/lib/elements/AkView/Row/Row';
import AkCheckbox from '~/app/lib/elements/Checkbox/AkCheckbox';
import AkInputWithFormik from '~/app/lib/elements/Input/AkInput';
import {newAddressFormInitialValues} from '~/app/lib/global/forms/initialValues';
import {newAddressFormValidationSchema} from '~/app/lib/global/forms/schema';
import useAKThemeImages from '~/app/lib/hooks/useAKImages';
import useAKTheme from '~/app/lib/hooks/useAKTheme';
import FormikWrapper from '~/app/lib/wrappers/formik';
import Header from '~/app/lib/components/Header/Header';

export default function NewAddress(props: any) {
  const [statesList, setStatesList] = useState<null | any[]>(null);
  const [showAreaList, setShowAreaList] = useState(false);
  const [selectedArea, setSelectedArea] = useState<any>(null);
  const formikRef = useRef<FormikProps<FormikValues> | null>(null);
  const {t} = useTranslation();
  const {colors} = useAKTheme();
  const {
    ArrowBack,
    Navigation,
    EditProfileRed,
    LockRed,
    CoinRed,
    LocationRed,
    UserRed,
    NoteRed,
    InformationRed,
    Home,
  } = useAKThemeImages();
  const {getAreaList, newAddress} = useHSettings();

  useLayoutEffect(() => {
    callGetAreaListAPI();
  }, []);

  async function callGetAreaListAPI() {
    const result = await getAreaList();
    if (result?.state) {
      setStatesList(result.state);
    }
    // console.log(result.state[0], "AREA LIST STATE");
    // console.log(result.branch[0], "AREA LIST BRANCH");
  }

  function NewAddressForm({handleSubmit, values, setFieldValue}: FormikProps<FormikValues>) {
    console.log(values, '===========VALUES NEW ADRESS==========');

    let colorForAddressType1 = values.addressType === 1 ? colors.colorPrimary : colors.white;
    let colorForAddressType1IconText = values.addressType === 1 ? colors.white : colors.black;
    let colorForAddressType2 = values.addressType === 2 ? colors.colorPrimary : colors.white;
    let colorForAddressType2IconText = values.addressType === 2 ? colors.white : colors.black;
    let colorForAddressType3 = values.addressType === 3 ? colors.colorPrimary : colors.white;
    let colorForAddressType3IconText = values.addressType === 3 ? colors.white : colors.black;
    return (
      <>
        <AkView style={{justifyContent: 'space-between', marginTop: 20}}>
          <TouchableOpacity onPress={() => setFieldValue('addressType', 1)}>
            <Col
              style={{
                backgroundColor: colorForAddressType1,
                width: 100,
                height: 80,
                padding: 10,
                borderRadius: 6,
                alignItems: 'center',
              }}>
              <Icon name="home" type="antdesign" size={40} color={colorForAddressType1IconText} />
              <AkText
                style={{color: colorForAddressType1IconText, marginTop: 5, fontWeight: 'bold'}}>
                {t('house')}
              </AkText>
            </Col>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFieldValue('addressType', 2)}>
            <Col
              style={{
                backgroundColor: colorForAddressType2,
                width: 100,
                height: 80,
                padding: 10,
                borderRadius: 6,
                alignItems: 'center',
              }}>
              <Icon
                name="office-building-cog-outline"
                type="material-community"
                size={40}
                color={colorForAddressType2IconText}
              />
              <AkText
                style={{color: colorForAddressType2IconText, marginTop: 5, fontWeight: 'bold'}}>
                {t('office')}
              </AkText>
            </Col>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setFieldValue('addressType', 3)}>
            <Col
              style={{
                backgroundColor: colorForAddressType3,
                width: 100,
                height: 80,
                padding: 10,
                borderRadius: 6,
                alignItems: 'center',
              }}>
              <Icon
                name="building-o"
                type="font-awesome"
                size={40}
                color={colorForAddressType3IconText}
              />
              <AkText
                style={{color: colorForAddressType3IconText, marginTop: 5, fontWeight: 'bold'}}>
                {t('flat')}
              </AkText>
            </Col>
          </TouchableOpacity>
        </AkView>
        <AkInputWithFormik
          name="area"
          placeholder={t('select_city_title')}
          label={t('select_city_title')}
          value={values.area ? values.area?.city_name : ''}
          onFocus={() => {
            setShowAreaList(true);
          }}
          caretHidden
          showSoftInputOnFocus={false}
        />
        <AkInputWithFormik
          name="block"
          placeholder={t('block')}
          label={t('block')}
          keyboardType="number-pad"
        />
        <AkInputWithFormik
          name="street"
          placeholder={t('street_title')}
          label={t('street_title')}
        />
        {(values.addressType === 2 || values.addressType === 3) && (
          <AkInputWithFormik
            name="building"
            placeholder={t('building_title')}
            label={t('building_title')}
            keyboardType="number-pad"
          />
        )}
        {(values.addressType === 2 || values.addressType === 3) && (
          <AkInputWithFormik
            name="floorNo"
            placeholder={t('floor_title')}
            label={t('floor_title')}
            keyboardType="number-pad"
          />
        )}
        {values.addressType === 1 && (
          <AkInputWithFormik
            name="houseNo"
            placeholder={t('house')}
            label={t('house')}
            keyboardType="number-pad"
          />
        )}
        {values.addressType === 2 && (
          <AkInputWithFormik
            name="officeNo"
            placeholder={t('office')}
            label={t('office')}
            keyboardType="number-pad"
          />
        )}
        {values.addressType === 3 && (
          <AkInputWithFormik
            name="flatNo"
            placeholder={t('flat')}
            label={t('flat')}
            keyboardType="number-pad"
          />
        )}
        <AkInputWithFormik
          name="specialDirections"
          placeholder={t('special_direction_title')}
          label={t('special_direction_title')}
        />
        <AkButton
          btnText={t('save_address')}
          onClick={handleSubmit}
          containerStyles={{marginVertical: 20}}
        />
      </>
    );
  }

  async function onSubmit(values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) {
    console.log('FORMIK NEW ADDRESS FINAL FORM VALUES', values);
    const result = await newAddress(values);
    if (result?.message) {
      Toast.show({position: 'bottom', text1: result?.message});
    } else {
      return;
    }
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      {/* <Row style={{ backgroundColor: colors.gray_orange, alignItems: 'center', height: 60, paddingHorizontal: 10, }}>
                <TouchableWithoutFeedback onPress={() => props.navigation?.openDrawer()}>
                    <Image source={Navigation} style={{ width: 25, height: 25 }} />
                </TouchableWithoutFeedback>
                <Row style={{ justifyContent: 'center', flex: 0.9 }}>
                    <AkText style={{ fontWeight: 'bold', fontSize: 18 }}>{t('new_address')}</AkText>
                </Row>
            </Row> */}
      <Header title={t('new_address')}/>
      <Col style={{paddingHorizontal:20}}>
      <FormikWrapper
        initialValues={newAddressFormInitialValues}
        validationSchema={newAddressFormValidationSchema}
        onSubmit={onSubmit}
        children={NewAddressForm}
        innerRef={(ref) => (formikRef.current = ref)}
      />
      </Col>
  
      {/* AREA LIST */}
      <Modal visible={showAreaList}>
        <Col
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            paddingHorizontal: 10,
          }}>
          <View
            style={{
              flex: 0.8,
              backgroundColor: colors.white,
              padding: 10,
              marginBottom: 50,
              borderRadius: 6,
            }}>
            <AkText style={{textAlign: 'right'}} onPress={() => setShowAreaList(false)}>
              Close
            </AkText>
            <AkText style={{marginVertical: 10, fontWeight: 'bold'}}>Select Area</AkText>
            <FlatList
              data={statesList}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps={'handled'}
              renderItem={({item, index}) => {
                return (
                  <Col key={item.state_name + index}>
                    <AkText style={{marginVertical: 10, marginHorizontal: 10, fontWeight: 'bold'}}>
                      {item.state_name}
                    </AkText>

                    <FlatList
                      showsVerticalScrollIndicator={false}
                      data={item.city}
                      style={{marginHorizontal: 20}}
                      renderItem={({item, index}) => {
                        return (
                          <TouchableOpacity
                            onPress={() => {
                              // setSelectedArea({
                              //     state_id: item.state_id,
                              //     city_id: item.id,
                              //     city_name: item.city_name,
                              //     delivery_charge: item.delivery_fee,
                              //     min_order: item.min_order,
                              // });
                              if (formikRef?.current) {
                                formikRef.current.setFieldValue('area', {
                                  state_id: item.state_id,
                                  city_id: item.id,
                                  city_name: item.city_name,
                                  delivery_charge: item.delivery_fee,
                                  min_order: item.min_order,
                                });
                              }
                              setShowAreaList(false);
                            }}
                            style={{
                              marginVertical: 10,
                              borderBottomWidth: 0.2,
                              borderBottomColor: colors.gray,
                            }}>
                            <AkView>
                              <AkText key={item.city_name + index}>{item.city_name}</AkText>
                            </AkView>
                          </TouchableOpacity>
                        );
                      }}
                    />
                  </Col>
                );
              }}
            />
          </View>
        </Col>
      </Modal>
    </SafeAreaView>
  );
}
