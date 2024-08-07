import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FormikHelpers, FormikProps, FormikValues} from 'formik';
import {useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {Alert, Image, ImageBackground} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {useHAuth} from '~/app/data/hooks/auth/useAuth';
import {useHUser} from '~/app/data/hooks/common/useUser';
import {AkButton, AkText} from '~/app/lib/elements';
import Col from '~/app/lib/elements/AkView/Col/Col';
import AkInputWithFormik from '~/app/lib/elements/Input/AkInput';
import {loginFormInitialValues} from '~/app/lib/global/forms/initialValues';
import {loginFormValidationSchema} from '~/app/lib/global/forms/schema';
import useAKThemeImages from '~/app/lib/hooks/useAKImages';
import useAKTheme from '~/app/lib/hooks/useAKTheme';
import FormikWrapper from '~/app/lib/wrappers/formik';
import {RootStackParamList} from '~/app/navigation/app';
import {AuthStackParamList} from '~/app/navigation/auth';
import Route from '~/app/navigation/routes';

type Props = NativeStackScreenProps<
  RootStackParamList & AuthStackParamList,
  Route.AUTH_LOGIN_SCREEN
>;

export default function Login(props: Props) {
  const {t} = useTranslation();
  const formikRef = useRef<FormikProps<FormikValues> | any>();
  const {colors} = useAKTheme();
  const {setReduxLoginInfo} = useHUser();
  const {AppIconHorizontal, AppBackground, Logo} = useAKThemeImages();
  const {login} = useHAuth();

  function onForgotPasswordLinkPressed() {
    props.navigation.navigate(Route.AUTH_FORGOT_SCREEN);
  }

  async function onSubmit(values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) {
    console.log('FORMIK LOGIN FINAL FORM VALUES', values);

    const result = await login(values);
    if (result.error) {
      Toast.show({position: 'bottom', text1: result.error.message});
    } else {
      setReduxLoginInfo(result.data);
      await AsyncStorage.setItem('loginInfo', JSON.stringify(result.data));
      return props.navigation.reset({
        index: 0,
        routes: [{name: Route.ROOT_HOME_SCREEN}],
      });
    }
  }

  function LoginForm({handleSubmit}: FormikProps<FormikValues>) {
    return (
      <>
        <AkInputWithFormik name={'email'} placeholder={t('email')} keyboardType="email-address" />
        <AkInputWithFormik name={'password'} placeholder={t('password')} type="password" />
        <AkText
          style={{fontWeight: 'bold', fontSize: 14, textAlign: 'right', marginVertical: 10}}
          onPress={onForgotPasswordLinkPressed}>
          {t('forgot_password_login')}
        </AkText>
        <AkButton
          btnText={t('login')}
          onClick={handleSubmit}
          containerStyles={{marginVertical: 20}}
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
      </>
    );
  }

  function onRegisterLinkPressed() {
    formikRef.current?.resetForm();
    props.navigation.navigate(Route.AUTH_REGISTER_SCREEN);
  }

  function onSkipLinkPressed() {
    props.navigation.navigate(Route.ROOT_HOME_SCREEN);
    props.navigation.reset({
      index: 0,
      routes: [{name: Route.ROOT_HOME_SCREEN}],
    });
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
              {t('login')}
            </AkText>
          </Col>
          <FormikWrapper
            innerRef={formikRef}
            initialValues={loginFormInitialValues}
            validationSchema={loginFormValidationSchema}
            onSubmit={onSubmit}
            children={LoginForm}
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
