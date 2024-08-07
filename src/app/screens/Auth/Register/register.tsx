import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FormikHelpers, FormikProps, FormikValues} from 'formik';
import {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, ImageBackground} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {useHAuth} from '~/app/data/hooks/auth/useAuth';
import {useHUser} from '~/app/data/hooks/common/useUser';
import OtpModal from '~/app/lib/components/Modal/OtpModal';
import {AkButton, AkText, AkView} from '~/app/lib/elements';
import Col from '~/app/lib/elements/AkView/Col/Col';
import AkCheckbox, {AkCheckboxWithFormik} from '~/app/lib/elements/Checkbox/AkCheckbox';
import AkInputWithFormik from '~/app/lib/elements/Input/AkInput';
import {registerFormInitialValues} from '~/app/lib/global/forms/initialValues';
import {registerFormValidationSchema} from '~/app/lib/global/forms/schema';
import useAKThemeImages from '~/app/lib/hooks/useAKImages';
import useAKTheme from '~/app/lib/hooks/useAKTheme';
import FormikWrapper from '~/app/lib/wrappers/formik';
import {RootStackParamList} from '~/app/navigation/app';
import {AuthStackParamList} from '~/app/navigation/auth';
import Route from '~/app/navigation/routes';

type Props = NativeStackScreenProps<
  RootStackParamList & AuthStackParamList,
  Route.AUTH_REGISTER_SCREEN
>;

export default function Register(props: Props) {
  const {t} = useTranslation();
  const [showOtpModal, setShowOtpModal] = useState(false);
  const {colors} = useAKTheme();
  const {setReduxLoginInfo} = useHUser();
  const {AppIconHorizontal, AppBackground, Logo} = useAKThemeImages();
  const {register} = useHAuth();
  const formikRef = useRef<FormikProps<FormikValues> | any>();

  async function onSubmit(values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) {
    console.log('FORMIK REGISTER FINAL FORM VALUES', values);

    const result = await register(values);
    if (result.error) {
      Toast.show({position: 'bottom', text1: result.error.message});
    } else {
      setShowOtpModal(true);
    }
  }

  async function onOtpVerified(userData: any) {
    setShowOtpModal(false);
    await AsyncStorage.setItem('loginInfo', JSON.stringify(userData));
    setReduxLoginInfo(userData);
    props.navigation.reset({
      index: 0,
      routes: [{name: Route.ROOT_HOME_SCREEN}],
    });
  }

  function RegisterForm({handleSubmit, values}: FormikProps<FormikValues>) {
    return (
      <>
        <AkInputWithFormik name={'name'} placeholder={t('full_name')} />
        <AkInputWithFormik name={'email'} placeholder={t('email')} />
        <AkInputWithFormik
          name={'phone'}
          placeholder={t('phone_number')}
          maxLength={8}
          keyboardType="phone-pad"
        />
        <AkInputWithFormik name={'referralCode'} placeholder={t('referral_code_optional')} />
        <AkInputWithFormik name={'password'} placeholder={t('password')} type="password" />
        <AkCheckboxWithFormik
          name="termsAccepted"
          containerStyle={{marginTop: 5}}
          label={t('i_accept_the_terms_amp_conditions')}
        />
        <AkButton
          btnText={t('signup')}
          onClick={handleSubmit}
          containerStyles={{marginVertical: 10}}
        />
        <AkText
          style={{
            color: colors.colorPrimaryDark,
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: 10,
          }}
          onPress={onSkipLinkPressed}>
          {t('skip_amp_continue')}
        </AkText>

        {showOtpModal && (
          <OtpModal
            email={values.email}
            onDone={onOtpVerified}
            cancelMessage="You need to verify email before proceeding"
          />
        )}
      </>
    );
  }

  function onLoginLinkPressed() {
    formikRef.current?.resetForm();
    props.navigation.navigate(Route.AUTH_LOGIN_SCREEN);
  }

  function onSkipLinkPressed() {
    props.navigation.navigate(Route.ROOT_HOME_SCREEN, {screen: Route.HOME_DASHBOARD_SCREEN});
    //TODO: reset navigation here
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground source={AppBackground} style={{flex: 1, paddingHorizontal: 20}}>
        <Col style={{flex: 1, paddingTop: 40}}>
          <Col style={{alignItems: 'center'}}>
            <Image source={Logo} style={{width: 100, height: 100}} />
            <AkText
              style={{
                color: colors.colorPrimaryDark,
                fontWeight: 'bold',
                fontSize: 20,
                marginTop: 5,
              }}>
              {t('signup')}
            </AkText>
          </Col>
          <FormikWrapper
            innerRef={formikRef}
            initialValues={registerFormInitialValues}
            validationSchema={registerFormValidationSchema}
            onSubmit={onSubmit}
            children={RegisterForm}
          />
        </Col>
        <Col>
          <AkText style={{fontWeight: 'bold', textAlign: 'center', marginBottom: 20}}>
            {t('already_have_an_account')}
          </AkText>
          <AkText
            style={{
              color: colors.colorPrimaryDark,
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: 20,
            }}
            onPress={onLoginLinkPressed}>
            {t('login')}
          </AkText>
        </Col>
      </ImageBackground>
    </SafeAreaView>
  );
}
