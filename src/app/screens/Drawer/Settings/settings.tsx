import {Icon} from '@rneui/themed';
import {useTranslation} from 'react-i18next';
import {Image, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AkText, AkView} from '~/app/lib/elements';
import Col from '~/app/lib/elements/AkView/Col/Col';
import Row from '~/app/lib/elements/AkView/Row/Row';
import AkCheckbox from '~/app/lib/elements/Checkbox/AkCheckbox';
import useAKThemeImages from '~/app/lib/hooks/useAKImages';
import useAKTheme from '~/app/lib/hooks/useAKTheme';
import Route from '~/app/navigation/routes';
import {WebView} from 'react-native-webview';
import {useState} from 'react';
import RNModal from '~/app/lib/elements/Modal/RNModalWrapper';
import {useAppConfig} from '~/app/data/hooks/common/useAppConfig';
import {changeLanguage} from 'i18next';
import {useHUser} from '~/app/data/hooks/common/useUser';
import Header from '~/app/lib/components/Header/Header';

export default function Settings(props: any) {
  const [showWebview, setShowWebview] = useState(false);
  const [webviewUrl, setWebviewUrl] = useState('');
  const {t} = useTranslation();
  const {colors} = useAKTheme();
  const {setReduxLanguage, language} = useAppConfig();
  const {loginInfo} = useHUser();
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

  function handleChangeLanguage(value: string) {
    setReduxLanguage(value);
    changeLanguage(value);
  }

  const settingItems = [
    {
      name: t('edit_profile'),
      icon: EditProfileRed,
      show: loginInfo ? true : false,
      onPress: () => {
        props.navigation.navigate(Route.SETTINGS_EDIT_PROFILE_SCREEN);
      },
    },
    {
      name: t('change_password'),
      icon: LockRed,
      show: loginInfo ? true : false,
      onPress: () => {
        props.navigation.navigate(Route.SETTINGS_CHANGE_PASSWORD_SCREEN);
      },
    },
    {
      name: t('refer_amp_earn'),
      icon: CoinRed,
      show: loginInfo ? true : false,
      onPress: () => {
        props.navigation.navigate(Route.SETTINGS_REFER_SCREEN);
      },
    },
    {
      name: t('manage_addresses'),
      icon: LocationRed,
      show: loginInfo ? true : false,
      onPress: () => {
        props.navigation.navigate(Route.SETTINGS_MANAGE_ADDRESS_SCREEN);
      },
    },
    {
      name: t('select_layout'),
      show: true,
      render: (
        <Row>
          <AkCheckbox
            label={t('english')}
            check={language === 'en'}
            onCheck={() => handleChangeLanguage('en')}
          />
          <AkCheckbox
            label={t('arabic')}
            check={language === 'ar'}
            onCheck={() => handleChangeLanguage('ar')}
          />
        </Row>
      ),
    },
    {
      name: t('help_amp_contact_us'),
      icon: UserRed,
      onPress: () => {
        props.navigation.navigate(Route.SETTINGS_CONTACT_US_SCREEN);
      },
    },
    {
      name: t('privacy_policy'),
      icon: NoteRed,
      show: true,
      onPress: () => {
        setShowWebview(true);
        setWebviewUrl('https://arabiatakw.com/privacy');
      },
    },
    {
      name: t('about_us'),
      icon: InformationRed,
      show: true,
      onPress: () => {
        setShowWebview(true);
        setWebviewUrl('https://arabiatakw.com/privacy');
      },
    },
  ];

  return (
    <SafeAreaView style={{flex: 1}}>
      {!showWebview && (
        <Header title={t('setting')} />
        // <AkView
        //   style={{
        //     backgroundColor: colors.gray_orange,
        //     alignItems: 'center',
        //     height: 60,
        //     paddingHorizontal: 10,
        //   }}>
        //   <TouchableWithoutFeedback onPress={() => props.navigation?.openDrawer()}>
        //     <Image source={Navigation} style={{width: 25, height: 25}} />
        //   </TouchableWithoutFeedback>
        //   <Row style={{justifyContent: 'center', flex: 0.9}}>
        //     <AkText style={{fontWeight: 'bold', fontSize: 18}}>{t('setting')}</AkText>
        //   </Row>
        // </AkView>
      )}

      {!showWebview && (
        <Col style={{paddingHorizontal: 10}}>
          {settingItems.map((item, index) => {
            return item.show ? (
              <TouchableOpacity onPress={item?.onPress}>
                <Col
                  style={{
                    backgroundColor: colors.white,
                    padding: 8,
                    marginVertical: 8,
                    borderRadius: 6,
                  }}>
                  <AkView key={index} style={{alignItems: 'center'}}>
                    {item?.icon && (
                      <Image
                        source={item.icon}
                        style={{width: 25, height: 25, marginHorizontal: 10}}
                      />
                    )}
                    <AkText style={{fontWeight: 'bold'}}>{item.name}</AkText>
                  </AkView>

                  <AkView style={{marginTop: 10}}>{item?.render && item.render}</AkView>
                </Col>
              </TouchableOpacity>
            ) : (
              <></>
            );
          })}
        </Col>
      )}

      {showWebview && webviewUrl && (
        <RNModal visible={showWebview && webviewUrl !== ''}>
          <Col style={{flex: 1, width: '100%', alignSelf: 'flex-start'}}>
            <Icon
              name="closecircle"
              type="antdesign"
              size={40}
              color={colors.white}
              style={{marginTop: 50, marginBottom: 10}}
              pressableProps={{android_ripple: {color: 'transparent'}}}
              onPress={() => {
                setShowWebview(false);
                setWebviewUrl('');
              }}
            />
            <WebView source={{uri: webviewUrl}} style={{flex: 1}} />
          </Col>
        </RNModal>
      )}
    </SafeAreaView>
  );
}
