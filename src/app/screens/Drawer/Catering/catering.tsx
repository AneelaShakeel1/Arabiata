import {useTranslation} from 'react-i18next';
import {Image, TouchableWithoutFeedback} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AkButton, AkText, AkView} from '~/app/lib/elements';
import Col from '~/app/lib/elements/AkView/Col/Col';
import Calendar from '~/app/lib/elements/Calendar/Calendar';
import AkDatePicker from '~/app/lib/elements/DateTimePicker/AkDatePicker';
import AkInputWithFormik from '~/app/lib/elements/Input/AkInput';
import useAKThemeImages from '~/app/lib/hooks/useAKImages';
import useAKTheme from '~/app/lib/hooks/useAKTheme';
import FormikWrapper from '~/app/lib/wrappers/formik';
import Header from '~/app/lib/components/Header/Header';

export default function Catering(props: any) {
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

  // Catering Api

  function JobForm() {
    return (
      <>
        <AkInputWithFormik name={'name'} label={t('full_name')} placeholder={t('full_name')} />
        <AkInputWithFormik
          name={'phone'}
          label={t('mobileno')}
          placeholder={t('mobileno')}
          maxLength={8}
          keyboardType="number-pad"
        />
        {/* <AkInputWithFormik name={'email'} label={t('mobileno')} placeholder={t('mobileno')}  /> */}
        {/* <Calendar
          label={t('number_of_guests')}
          name="number_of_guests"
          placeholder={t('number_of_guests')}
        /> */}
        <AkInputWithFormik
          label={t('number_of_guests')}
          name={'number_of_guests'}
          inputType="input"
          placeholder={t('number_of_guests')}
          fieldContainerStyle={{marginVertical: 10}}
          keyboardType={'number-pad'}
        />
        <AkDatePicker
          label={t('date_of_event')}
          placeholder={t('date_of_event')}
          name="date"
          mode={'date'}
        />
        <AkDatePicker
          label={t('time_of_event')}
          placeholder={t('time_of_event')}
          name="time"
          mode={'time'}
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
          inputType="textArea"
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
        {/* <AkView style={{ backgroundColor: colors.gray_orange, alignItems: 'center', height: 60, paddingHorizontal: 10, }}>
                    <TouchableWithoutFeedback onPress={() => props.navigation?.openDrawer()}>
                        <Image source={Navigation} style={{ width: 25, height: 25 }} />
                    </TouchableWithoutFeedback>
                    <AkView style={{ justifyContent: 'center', flex: 0.9 }}>
                        <AkText style={{ fontWeight: 'bold', fontSize: 18 }}>{t('catering')}</AkText>
                    </AkView>
                </AkView> */}
        <Header title={t('catering')} />
        <Col style={{paddingHorizontal: 20}}>
          <FormikWrapper initialValues={{}} onSubmit={() => {}} children={JobForm} />
        </Col>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
