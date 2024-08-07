import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Icon} from '@rneui/themed';
import {FormikHelpers, FormikProps, FormikValues} from 'formik';
import {useTranslation} from 'react-i18next';
import {Image, TouchableWithoutFeedback} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {useHSettings} from '~/app/data/hooks/common/useSettings';
import {AkButton, AkText, AkView} from '~/app/lib/elements';
import Col from '~/app/lib/elements/AkView/Col/Col';
import Row from '~/app/lib/elements/AkView/Row/Row';
import AkCheckbox from '~/app/lib/elements/Checkbox/AkCheckbox';
import AkInputWithFormik from '~/app/lib/elements/Input/AkInput';
import {changePasswordFormInitialValues} from '~/app/lib/global/forms/initialValues';
import {changePasswordFormValidationSchema} from '~/app/lib/global/forms/schema';
import useAKThemeImages from '~/app/lib/hooks/useAKImages';
import useAKTheme from '~/app/lib/hooks/useAKTheme';
import FormikWrapper from '~/app/lib/wrappers/formik';
import {DrawerStackParamList} from '~/app/navigation/drawer';
import Route from '~/app/navigation/routes';
import {SettingsStackParamList} from '~/app/navigation/settings';
import Header from '~/app/lib/components/Header/Header';

type Props = NativeStackScreenProps<SettingsStackParamList, Route.SETTINGS_CHANGE_PASSWORD_SCREEN>;

export default function ChangePassword(props: Props) {
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
  } = useAKThemeImages();
  const {changePassword} = useHSettings();

  async function onSubmit(values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) {
    console.log('FORMIK CHANGE PASSWORD FINAL FORM VALUES', values);

    const result = await changePassword(values);
    if (result?.message) {
      Toast.show({
        position: 'bottom',
        text1: result?.message,
      });
      props.navigation.goBack();
    } else {
      return;
    }
  }

  function ChangePasswordForm({handleSubmit}: FormikProps<FormikValues>) {
    return (
      <>
        <AkInputWithFormik name="oldPassword" placeholder={t('old_password')} type="password" />
        <AkInputWithFormik name="newPassword" placeholder={t('new_password')} type="password" />
        <AkInputWithFormik
          name="confirmPassword"
          placeholder={t('confirm_password')}
          type="password"
        />

        <AkButton btnText={t('update')} onClick={handleSubmit} containerStyles={{marginTop: 20}} />
      </>
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      {/* <AkView style={{ backgroundColor: colors.gray_orange, alignItems: 'center', height: 60, paddingHorizontal: 10, }}>
                <TouchableWithoutFeedback onPress={() => props.navigation?.openDrawer()}>
                    <Image source={Navigation} style={{ width: 25, height: 25 }} />
                </TouchableWithoutFeedback>
                <Row style={{ justifyContent: 'center', flex: 0.9 }}>
                    <AkText style={{ fontWeight: 'bold', fontSize: 18 }}>{t('change_password')}</AkText>
                </Row>
            </AkView> */}
      <Header title={t('change_password')} />
      <Col style={{paddingHorizontal: 17}}>
        <FormikWrapper
          initialValues={changePasswordFormInitialValues}
          validationSchema={changePasswordFormValidationSchema}
          onSubmit={onSubmit}
          children={ChangePasswordForm}
        />
      </Col>
    </SafeAreaView>
  );
}
