import {useTranslation} from 'react-i18next';

import RNModal from './RNModalWrapper';
// import AkOTPTextinput from '@epcore/elements/AkOTPTextinput/AkOTPTextinput';
import useAKTheme from '@lib/hooks/useAKTheme';
import {Image, ScrollView, StyleProp, ViewStyle} from 'react-native';
import useAKThemeImages from '@lib/hooks/useAKImages';
import AkView from '../AkView/AkView/AkView';
import AkText from '../Text/AkText';

interface IPropsAkOtpModal {
  visible: boolean;
  data: any;
  onOtpSuccess: (user?: any) => void;
  prefillData?: string[];
  shouldBeScrollAwared?: boolean;
  withBackDrop?: boolean;
  onBackDropPress?: () => void;
  showCancelButton?: boolean;
  onCancel?: () => void;
  verifyLater?: () => void;
  hardwareBackPress?: any;
  forgot?: boolean;
}

export default function AkOtpModal({
  visible,
  data,
  onOtpSuccess,
  prefillData,
  shouldBeScrollAwared = false,
  withBackDrop,
  onBackDropPress,
  showCancelButton = false,
  onCancel = undefined,
  verifyLater,
  hardwareBackPress,
  forgot,
}: IPropsAkOtpModal) {
  const {
    colors,
    viewStyles,
    justifyContentStyles,
    alignItemsStyles,
    paddingStyles,
    marginStyles,
    heightStyles,
    inputStyles,
    widthStyles,
    textAlignStyles,
  } = useAKTheme();
  const modalContainer: StyleProp<ViewStyle> = [
    // viewStyles.flex1Center,
    // viewStyles.fullContainer,
    paddingStyles.top50,
    paddingStyles.horizontal10,
  ];
  const {t} = useTranslation();
  const {Logo} = useAKThemeImages();

  return (
    <RNModal
      visible={visible}
      shouldBeScrollAwared={shouldBeScrollAwared}
      withBackDrop={withBackDrop}
      overlayStyle={{backgroundColor: colors.white}}
      onBackDropPress={onBackDropPress}
      scrollAwareConfig={{style: {backgroundColor: colors.white}}}
      // onHardwareBackPress={() => {
      //   console.log(onCancel, 'setShowOtpInput(false);');

      //   showCancelButton && onCancel !== undefined && onCancel();
      // }}
    >
      <AkView style={modalContainer}>
        <ScrollView>
          <AkView style={[viewStyles.flex2Center]}>
            <Image source={Logo} style={[heightStyles.s50, widthStyles.s50]} />
            <AkText style={[inputStyles.text20, paddingStyles.vertical10]}>{t('ePacken')}</AkText>
          </AkView>

          <AkView style={[viewStyles.flex1Center, paddingStyles.bottom40]}>
            <AkText style={[paddingStyles.vertical20, inputStyles.text18]}>
              {t('Almost there')}
            </AkText>
            <AkText style={[paddingStyles.vertical10, inputStyles.text14, textAlignStyles.justify]}>
              {t('Enter the One Time Password you received at ')}
              <AkText style={[inputStyles.text14, {fontWeight: '600'}]}>{data?.receiver}</AkText>
              {t(' to continue')}
            </AkText>
          </AkView>

          <AkView>
            {/* <AkOTPTextinput
              data={data}
              prefillData={prefillData}
              onOtpSuccess={onOtpSuccess}
              showCancelButton={showCancelButton}
              onCancel={onCancel}
              forgot={forgot}
            /> */}
          </AkView>

          {verifyLater && (
            <AkView>
              <AkText
                style={{
                  color: '#3E43D0',
                  textAlign: 'center',
                  fontWeight: '400',
                  fontSize: 14,
                  lineHeight: 16,
                }}
                onPress={verifyLater}>
                Verify Later
              </AkText>
            </AkView>
          )}
        </ScrollView>
      </AkView>
    </RNModal>
  );
}
