import {Icon} from '@rneui/themed';
import {FormikHelpers, FormikProps, FormikValues} from 'formik';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, Linking, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import WebView from 'react-native-webview';
import {useHSettings} from '~/app/data/hooks/common/useSettings';
import {useHUser} from '~/app/data/hooks/common/useUser';
import {AkButton, AkText, AkView} from '~/app/lib/elements';
import Col from '~/app/lib/elements/AkView/Col/Col';
import Row from '~/app/lib/elements/AkView/Row/Row';
import AkCheckbox from '~/app/lib/elements/Checkbox/AkCheckbox';
import AkInputWithFormik from '~/app/lib/elements/Input/AkInput';
// import { contactUsFormInitialValues } from "~/app/lib/global/forms/initialValues";
import {contactUsFormValidationSchema} from '~/app/lib/global/forms/schema';
import useAKThemeImages from '~/app/lib/hooks/useAKImages';
import useAKTheme from '~/app/lib/hooks/useAKTheme';
import FormikWrapper from '~/app/lib/wrappers/formik';
import Header from '~/app/lib/components/Header/Header';

export default function ContactUs(props: any) {
  const [showWebview, setShowWebview] = useState(false);
  const [webviewUrl, setWebviewUrl] = useState('');
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
    Google,
    Facebook,
    Instagram,
    Youtube,
  } = useAKThemeImages();
  const {loginInfo} = useHUser();
  const {contactUs} = useHSettings();
  const facebookLink = 'https://www.facebook.com/ArabiataKuwait/';
  const youtubeLink = 'https://www.youtube.com/channel/UCt7JN-yvy31bA2uMLVPZqDg';
  const instagramLink = 'https://www.instagram.com/arabiata_kw/';

  const contactusItems = [
    {
      icon: {
        name: 'phone',
        iconType: 'feather',
      },
      value: '22250020',
    },
    {
      icon: {
        name: 'mail',
        iconType: 'feather',
      },
      value: 'info@arabiatakw.com',
    },
    {
      icon: {
        name: 'home',
        iconType: 'antdesign',
      },
      value: 'السالمية/الفروانية/حولي',
    },
  ];

  let contactUsFormInitialValues = {
    firstName: '',
    lastName: '',
    email: loginInfo.email,
    message: '',
  };

  function InquiryForm({handleSubmit}: FormikProps<FormikValues>) {
    return (
      <>
        <AkText style={{fontWeight: 'bold', fontSize: 18, marginTop: 10}}>
          {' '}
          {t('inquiry_form')}{' '}
        </AkText>
        <AkView style={{backgroundColor: colors.gray_orange}}>
          <AkInputWithFormik
            name="firstName"
            placeholder={t('first_name')}
            fieldContainerStyle={{flex: 0.5}}
          />
          <AkInputWithFormik
            name="lastName"
            placeholder={t('last_name')}
            fieldContainerStyle={{flex: 0.5, marginHorizontal: 5}}
          />
        </AkView>
        <AkInputWithFormik name="email" placeholder={t('email')} disabled />
        <AkInputWithFormik name="message" placeholder={t('message_text')} />
        <AkButton btnText="Submit" onClick={handleSubmit} containerStyles={{marginTop: 20}} />
      </>
    );
  }

  function handleClick(url: string) {
    Linking.openURL(url).catch((error) => {
      console.log("Don't know how to open URI: " + url);
    });
  }

  async function onSubmit(values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) {
    console.log('FORMIK EDIT ADDRESS FINAL FORM VALUES', values);
    const result = await contactUs(values);
    if (result?.message) {
      Toast.show({position: 'bottom', text1: result?.message});
      formikHelpers.resetForm();
    } else {
      return;
    }
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header title={t('help_amp_contact_us')} />
      <Col style={{paddingHorizontal: 20}}>
        <AkText style={{fontWeight: 'bold', fontSize: 18}}> {t('contact_us')} </AkText>
        {contactusItems.map((item, index) => {
          return (
            <Col
              style={{
                backgroundColor: colors.white,
                padding: 8,
                marginVertical: 8,
                borderRadius: 6,
              }}>
              <AkView key={index} style={{alignItems: 'center'}}>
                {item?.icon && <Icon {...item.icon} size={20} color={colors.colorPrimary} />}
                <AkText style={{fontWeight: 'bold', marginHorizontal: 5}}>{item.value}</AkText>
              </AkView>

              {/* <Row style={{marginTop:10}}>
                            {item?.render && item.render}
                            </Row> */}
            </Col>
          );
        })}
      </Col>
      <Col style={{paddingHorizontal:20}}>
        <FormikWrapper
          initialValues={contactUsFormInitialValues}
          validationSchema={contactUsFormValidationSchema}
          onSubmit={onSubmit}
          children={InquiryForm}
        />
      </Col>
      <AkView style={{backgroundColor: 'transparent', justifyContent: 'center',paddingHorizontal:20}}>
        <TouchableOpacity
          onPress={() => {
            // setShowWebview(true);
            // setWebviewUrl(facebookLink);
            handleClick(facebookLink);
          }}>
          <Image source={Facebook} style={{width: 30, height: 30}} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            // setShowWebview(true);
            // setWebviewUrl(instagramLink);
            handleClick(instagramLink);
          }}>
          <Image source={Instagram} style={{width: 30, height: 30, marginHorizontal: 10}} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            // setShowWebview(true);
            // setWebviewUrl(youtubeLink);
            handleClick(youtubeLink);
          }}>
          <Image source={Youtube} style={{width: 30, height: 30}} />
        </TouchableOpacity>
      </AkView>

      {/* {showWebview && webviewUrl && <WebView source={{ uri: webviewUrl }} style={{ flex: 1 }} />} */}
    </SafeAreaView>
  );
}
