import {useEffect, useState} from 'react';
import {useHAuth} from '~/app/data/hooks/auth/useAuth';
import RNModal from '../../elements/Modal/RNModalWrapper';
import {Alert, TextInput, View} from 'react-native';
import {AkButton, AkText} from '../../elements';
import {useAppConfig} from '~/app/data/hooks/common/useAppConfig';
import {useTranslation} from 'react-i18next';
import useAKTheme from '../../hooks/useAKTheme';

interface IOtpModalProps {
  email?: string;
  cancelMessage?: string;
  onDone: (userData: any) => void;
}

export default function OtpModal(props: IOtpModalProps) {
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [showOtpModal, setShowOtpModal] = useState(true);
  const {t} = useTranslation();
  const {verfiyOtp} = useHAuth();
  const {colors} = useAKTheme();

  useEffect(() => {
    if (props?.email) {
      setEmail(props.email);
    }
  }, []);

  function onChangeOtp(e: any) {
    const otpEntered = e.nativeEvent.text;
    console.log('====================================');
    console.log(otpEntered);
    console.log('====================================');
    setOtp(otpEntered);
  }
  async function onVerifyOtp() {
    // Hit API to verify if otp is correct
    const isOtpValid: any = await verfiyOtp({
      email,
      otp,
      token: '1|iLzmTm1YQRyNHFCEvWhkCLkXZ1ieu4Ub8vg2thHh',
    });

    if (isOtpValid.error) {
      Alert.alert(isOtpValid.error.message);
    } else {
      setShowOtpModal(false);
      props.onDone(isOtpValid.data);
    }
  }
  async function onCancelOtp() {
    const handleProceed = () => {
      console.log('User chose to proceed.');
      setShowOtpModal(false);
    };

    const handleCancel = () => {
      console.log('User chose to cancel.');
    };
    // Close Otp modal
    Alert.alert(
      'Confirmation',
      props.cancelMessage ?? 'Do you want to proceed?',
      [
        {
          text: 'Ok',
          onPress: handleCancel,
          style: 'cancel',
        },
        // {text: 'Proceed', onPress: handleProceed},
      ],
      {cancelable: false},
    );
  }

  return (
    <RNModal visible={showOtpModal}>
      <View
        style={{
          width: 360,
          backgroundColor: 'white',
          padding: 15,
          borderRadius: 10,
        }}>
        <AkText style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>
          {t('otp_verification')}
        </AkText>
        <TextInput
          style={{backgroundColor: colors.light_gray, borderColor: 'black', marginVertical: 20}}
          placeholder={t('enter_otp')}
          onChange={onChangeOtp}
          keyboardType="number-pad"
        />
        <AkButton btnText="Submit" onClick={onVerifyOtp} />
        <AkButton btnText="Cancel" onClick={onCancelOtp} containerStyles={{marginTop: 10}} />
      </View>
    </RNModal>
  );
}
