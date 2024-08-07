import {useTranslation} from 'react-i18next';
import {Image, TouchableWithoutFeedback, Share, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AkButton, AkText, AkView} from '~/app/lib/elements';
import Row from '~/app/lib/elements/AkView/Row/Row';
import AkInputWithFormik from '~/app/lib/elements/Input/AkInput';
import useAKThemeImages from '~/app/lib/hooks/useAKImages';
import useAKTheme from '~/app/lib/hooks/useAKTheme';
import FormikWrapper from '~/app/lib/wrappers/formik';
import Header from '~/app/lib/components/Header/Header';
import {useHUser} from '~/app/data/hooks/common/useUser';
import Toast from 'react-native-toast-message';

export default function Refer(props: any) {
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
    Refer,
  } = useAKThemeImages();
  const {loginInfo} = useHUser();

  function ReferForm() {
    const shareMessage = `Use this code ${loginInfo?.referral_code} to register with Arabiata Kuwait & get bonus amount 50.000 د.ك`;

    const shareCode = async () => {
      try {
        const result = await Share.share({
          message: shareMessage,
        });

        if (result.action === Share.dismissedAction) {
          return;
        }
      } catch (error: any) {
        Toast.show({
          position: 'bottom',
          text1: 'An error occurred while sharing the code: ' + error.message,
        });
      }
    };

    return (
      <>
        <AkView style={{justifyContent: 'center', marginVertical: 10, gap: 7}}>
          <AkInputWithFormik
            name="referralCode"
            placeholder={loginInfo?.referral_code ?? t('email')}
            // value={loginInfo?.email ?? ''}
            fieldContainerStyle={{flex: 0.8, marginTop: 0}}
            disabled
          />
          <AkButton
            btnText={t('share')}
            onClick={shareCode}
            containerStyles={{flex: 0.2, marginTop: 0, marginBottom: 0}}
          />
        </AkView>
      </>
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header title={t('refer_amp_earn')} />
      <Image source={Refer} style={{width: 'auto', height: 200}} />

      <AkText
        style={{textAlign: 'center', fontSize: 18, fontWeight: 'bold', paddingHorizontal: 20}}>
        {t('refer_amp_earn')}
      </AkText>

      <AkText
        style={{textAlign: 'center', fontSize: 14, marginVertical: 10, paddingHorizontal: 20}}>
        {t('share_this_code_with')}
      </AkText>

      <Row style={{paddingHorizontal: 20}}>
        <FormikWrapper initialValues={{}} onSubmit={() => {}} children={ReferForm} />
      </Row>
    </SafeAreaView>
  );
}
