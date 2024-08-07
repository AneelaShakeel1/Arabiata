import {useIsFocused} from '@react-navigation/native';
import {Icon} from '@rneui/themed';
import {useLayoutEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, Image, TouchableWithoutFeedback, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {useHSettings} from '~/app/data/hooks/common/useSettings';
import {AkText, AkView} from '~/app/lib/elements';
import Col from '~/app/lib/elements/AkView/Col/Col';
import Row from '~/app/lib/elements/AkView/Row/Row';
import AkCheckbox from '~/app/lib/elements/Checkbox/AkCheckbox';
import useAKThemeImages from '~/app/lib/hooks/useAKImages';
import useAKTheme from '~/app/lib/hooks/useAKTheme';
import Route from '~/app/navigation/routes';

export default function ManageAddress(props: any) {
  const [addressList, setAddressList] = useState<null | any[]>(null);
  const {t} = useTranslation();
  const isFocused = useIsFocused();
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
  } = useAKThemeImages();
  const {getAdressList, deleteAddress, setReduxAddressInfo} = useHSettings();

  useLayoutEffect(() => {
    callGetAddressListAPI();
  }, [isFocused]);

  async function callGetAddressListAPI() {
    const result = await getAdressList();
    if (result?.data) {
      setAddressList(result.data);
    }
    // console.log(result.state[0], "AREA LIST STATE");
    // console.log(result.branch[0], "AREA LIST BRANCH");
  }

  async function handleDeleteAddress(addressId: number) {
    const result = await deleteAddress(addressId);
    if (result?.message) {
      Toast.show({position: 'bottom', text1: result?.message});
      await callGetAddressListAPI();
    }
    // console.log(result.state[0], "AREA LIST STATE");
    // console.log(result.branch[0], "AREA LIST BRANCH");
  }

  function handleEditAddress(address: any) {
    setReduxAddressInfo(address);
    props.navigation.navigate(Route.SETTINGS_EDIT_ADDRESS_SCREEN);
  }

  function handleSelectAddress(address: any) {
    props.navigation.navigate(Route.CART_CHECKOUT_SCREEN, {selectedAddress: address});
  }

  // const addressItems = [
  //     {
  //         addressType: 'Flat',
  //         area: 'Salwa',
  //         block: 10,
  //         street: '10',
  //         building: 11,
  //         floor: 1,
  //         flatNo: 3,
  //         specialDirections: '',
  //     },
  //     {
  //         addressType: 'House',
  //         area: 'Salmiya',
  //         block: 5,
  //         street: 'Salem-al-Mubarak',
  //         houseNo: 5,
  //         specialDirections: '',
  //     },

  // ];

  return (
    <SafeAreaView style={{flex: 1}}>
      <AkView
        style={{
          backgroundColor: colors.gray_orange,
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 60,
          paddingHorizontal: 10,
        }}>
        <TouchableWithoutFeedback onPress={() => props.navigation?.goBack()}>
          <Image source={ArrowBack} style={{width: 25, height: 25}} />
        </TouchableWithoutFeedback>
        <Row>
          <AkText style={{fontWeight: 'bold', fontSize: 18}}>{t('my_address')}</AkText>
        </Row>
        <Row>
          <Icon
            name={'plus'}
            type="entypo"
            size={25}
            color={colors.white}
            style={{
              borderRadius: 6,
              alignSelf: 'flex-end',
              backgroundColor: colors.colorPrimary,
              padding: 6,
            }}
            onPress={() => {
              props.navigation.navigate(Route.SETTINGS_NEW_ADDRESS_SCREEN);
            }}
          />
        </Row>
      </AkView>
      <ScrollView>
        {addressList && addressList !== null && addressList.length > 0 ? (
          <Col style={{paddingHorizontal: 10}}>
            <FlatList
              data={addressList}
              renderItem={({item, index}) => {
                return (
                  <TouchableWithoutFeedback onPress={() => handleSelectAddress(item)}>
                    <Col
                      style={{
                        backgroundColor: colors.white,
                        padding: 8,
                        marginVertical: 8,
                        borderRadius: 6,
                      }}>
                      <AkView
                        key={index}
                        style={{alignItems: 'center', justifyContent: 'space-between'}}>
                        {/* {item?.icon && <Image source={item.icon} style={{ width: 25, height: 25, marginRight:10 }} />} */}
                        <AkView style={{alignItems: 'center'}}>
                          <Icon
                            name={item.addressType === 'Flat' ? 'building-o' : 'home'}
                            type={item.addressType === 'Flat' ? 'font-awesome' : 'antdesign'}
                          />
                          <AkText style={{fontWeight: 'bold', marginHorizontal: 5}}>
                            {t(item.addressType)}
                          </AkText>
                        </AkView>

                        <AkView style={{alignItems: 'center'}}>
                          <Icon
                            name="edit"
                            size={20}
                            type="feather"
                            onPress={() => handleEditAddress(item)}
                          />
                          <Icon
                            name="trash"
                            size={30}
                            type="evilicon"
                            color={colors.red}
                            onPress={() => handleDeleteAddress(item.id)}
                          />
                        </AkView>
                      </AkView>

                      <Col style={{marginTop: 5}}>
                        <AkView>
                          <AkText style={{marginTop: 5}}>
                            {t('select_city_title') + ': ' + item.city_name}
                          </AkText>
                        </AkView>
                        <AkView>
                          <AkText style={{marginTop: 5}}>
                            {t('block_title') + ': ' + item.block}
                          </AkText>
                        </AkView>
                        <AkView>
                          <AkText style={{marginTop: 5}}>
                            {t('street_title') + ': ' + item.address}
                          </AkText>
                        </AkView>
                        {item.address_type === 1 && (
                          <AkView>
                            <AkText style={{marginTop: 5}}>
                              {t('house_number_') + ' ' + item.house_no}
                            </AkText>
                          </AkView>
                        )}
                        {item.address_type === 2 && (
                          <AkView>
                            <AkText style={{marginTop: 5}}>
                              {t('office_number') + ' ' + item.house_no}
                            </AkText>
                          </AkView>
                        )}
                        {item.address_type === 3 && (
                          <AkView>
                            <AkText style={{marginTop: 5}}>
                              {t('flat_number_') + ' ' + item.house_no}
                            </AkText>
                          </AkView>
                        )}
                        {(item.address_type === 2 || item.address_type === 3) && (
                          <AkView>
                            <AkText style={{marginTop: 5}}>
                              {t('building_title') + ': ' + item.building}
                            </AkText>
                          </AkView>
                        )}
                      </Col>
                    </Col>
                  </TouchableWithoutFeedback>
                );
              }}
            />
          </Col>
        ) : (
          <AkView
            style={{
              paddingTop: 300,
              // alignItems: 'center',
              justifyContent: 'center',
              // backgroundColor: 'red',
            }}>
            <AkText style={{fontSize: 20, color: colors.black}}>
              No {t('address_')} Available
            </AkText>
          </AkView>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
