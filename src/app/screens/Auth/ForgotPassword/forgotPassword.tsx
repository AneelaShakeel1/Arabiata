import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FormikHelpers, FormikProps, FormikValues} from 'formik';
import {useEffect, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {Alert, Image, ImageBackground, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {useHAuth} from '~/app/data/hooks/auth/useAuth';
import {AkButton, AkText, AkView} from '~/app/lib/elements';
import Col from '~/app/lib/elements/AkView/Col/Col';
import Row from '~/app/lib/elements/AkView/Row/Row';
import AkInputWithFormik from '~/app/lib/elements/Input/AkInput';
import {forgotPasswordFormInitialValues} from '~/app/lib/global/forms/initialValues';
import {forgotPasswordFormValidationSchema} from '~/app/lib/global/forms/schema';
import useAKThemeImages from '~/app/lib/hooks/useAKImages';
import useAKTheme from '~/app/lib/hooks/useAKTheme';
import FormikWrapper from '~/app/lib/wrappers/formik';
import {RootStackParamList} from '~/app/navigation/app';
import {AuthStackParamList} from '~/app/navigation/auth';
import Route from '~/app/navigation/routes';

type Props = NativeStackScreenProps<
  RootStackParamList & AuthStackParamList,
  Route.AUTH_FORGOT_SCREEN
>;

export default function ForgotPassword(props: Props) {
  const {t} = useTranslation();
  const {colors} = useAKTheme();
  const {AppIconHorizontal, AppBackground, Logo, ArrowBack} = useAKThemeImages();
  const {forgotPassword} = useHAuth();
  const formikRef = useRef<FormikProps<FormikValues> | any>();

  function onBackArrowPressed() {
    props.navigation.goBack();
  }

  async function onSubmit(values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) {
    console.log('FORMIK REGISTER FINAL FORM VALUES', values);

    const result = await forgotPassword(values);
    if (result?.message) {
      formikRef.current?.resetForm();
      Toast.show({position: 'bottom', text1: result?.message});
      props.navigation.navigate(Route.AUTH_LOGIN_SCREEN);
    } else {
      return;
    }
  }

  function ForgotPasswordForm({handleSubmit}: FormikProps<FormikValues>) {
    return (
      <>
        <AkInputWithFormik name={'email'} placeholder={t('email')} keyboardType="email-address" />
        <AkButton
          btnText={t('submit')}
          onClick={handleSubmit}
          containerStyles={{marginVertical: 10}}
        />
      </>
    );
  }

  function onRegisterLinkPressed() {
    formikRef.current?.resetForm();
    props.navigation.navigate(Route.AUTH_REGISTER_SCREEN);
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground source={AppBackground} style={{flex: 1, paddingHorizontal: 20}}>
        <TouchableOpacity onPress={onBackArrowPressed}>
          <Row style={{marginTop: 10}}>
            <Image source={ArrowBack} style={{width: 25, height: 25}} />
          </Row>
        </TouchableOpacity>
        <Col style={{flex: 1, paddingTop: 40, justifyContent: 'center'}}>
          <Col style={{alignItems: 'center'}}>
            <Image source={Logo} style={{width: 100, height: 100}} />
            <AkText
              style={{
                color: colors.colorPrimaryDark,
                fontWeight: 'bold',
                fontSize: 20,
                marginTop: 5,
              }}>
              {t('forgot_password')}
            </AkText>
            <AkText style={{fontSize: 15, marginTop: 5}}>{t('enter_your_registered_email')}</AkText>
          </Col>
          <FormikWrapper
            innerRef={formikRef}
            initialValues={forgotPasswordFormInitialValues}
            validationSchema={forgotPasswordFormValidationSchema}
            onSubmit={onSubmit}
            children={ForgotPasswordForm}
          />
        </Col>
        <Col>
          <AkText style={{fontWeight: 'bold', textAlign: 'center', marginBottom: 20}}>
            {t('dont_have_an_account')}
          </AkText>
          <AkText
            style={{
              color: colors.colorPrimaryDark,
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: 20,
            }}
            onPress={onRegisterLinkPressed}>
            {t('signup')}
          </AkText>
        </Col>
      </ImageBackground>
    </SafeAreaView>
  );
}
