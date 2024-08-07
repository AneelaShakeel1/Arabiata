import {useTranslation} from 'react-i18next';
import {Image, TouchableWithoutFeedback} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AkButton, AkText, AkView} from '~/app/lib/elements';
import Col from '~/app/lib/elements/AkView/Col/Col';
import AkInputWithFormik from '~/app/lib/elements/Input/AkInput';
import useAKThemeImages from '~/app/lib/hooks/useAKImages';
import useAKTheme from '~/app/lib/hooks/useAKTheme';
import FormikWrapper from '~/app/lib/wrappers/formik';
import Header from '~/app/lib/components/Header/Header';
import Row from '~/app/lib/elements/AkView/Row/Row';

export default function Job(props: any) {
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

  // Job Api

  function JobForm() {
    return (
      <>
        <AkInputWithFormik name={'name'} label={t('full_name')} placeholder={t('full_name')} />
        <AkInputWithFormik name={'phone'} label={t('mobileno')} placeholder={t('mobileno')} />
        <AkInputWithFormik
          name={'age'}
          label={t('age')}
          placeholder={t('age')}
          keyboardType="number-pad"
        />
        <AkInputWithFormik
          name={'expirience'}
          label={t('years_of_experience')}
          placeholder={t('years_of_experience')}
          keyboardType="number-pad"
        />
        <AkInputWithFormik
          name={'desiredPosition'}
          label={t('desired_position')}
          placeholder={t('desired_position')}
        />
        <AkInputWithFormik
          name={'address'}
          label={t('address_')}
          inputType="textArea"
          placeholder={t('address_')}
          fieldContainerStyle={{marginVertical: 10}}
          style={{height: 100}}
        />
        <AkInputWithFormik
          name={'notes'}
          label={t('notes')}
          inputType={'textArea'}
          placeholder={t('notes')}
          fieldContainerStyle={{paddingVertical: 10}}
          style={{height: 100}}
        />
        <AkButton
          btnText={t('update')}
          onClick={() => {}}
          containerStyles={{marginVertical: 20, marginTop: 50}}
        />
      </>
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAwareScrollView nestedScrollEnabled>
        <Header title={t('job')} />
        <Col style={{paddingHorizontal: 20}}>
          <FormikWrapper initialValues={{}} onSubmit={() => {}} children={JobForm} />
        </Col>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
