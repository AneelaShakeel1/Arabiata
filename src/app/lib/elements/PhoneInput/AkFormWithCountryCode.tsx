import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageProps,
  Image,
  TouchableOpacity,
  StyleProp,
  TextStyle,
} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {useField} from 'formik';

import useAKTheme from '@lib/hooks/useAKTheme';
import {IconProps} from '@rneui/base';
import {useTranslation} from 'react-i18next';
import useAKThemeImages from '@lib/hooks/useAKImages';
import AkError from '../Error/AkError';
import AkView from '../AkView/AkView/AkView';
import AkText from '../Text/AkText';


interface Props {
  label?: string;
  iconName?: string;
  defaultCode?: any;
  onChangeTxt?: (value: string, countryCode?: string) => void;
  value?: string | undefined;
  errorMsg?: string | undefined;
  name: string;
  rightIconProps?: IconProps;
  rightImageProps?: ImageProps;
  RightSVG?: SVGElement;
  disabled?: boolean;
  verify?: boolean;
  trashItem?: boolean;
  onDelete?: () => void;
}

const AkFormWithCountryCode: React.FC<Props> = ({
  label,
  iconName,
  defaultCode,
  onChangeTxt,
  value,
  errorMsg,
  name,
  rightIconProps,
  rightImageProps,
  RightSVG,
  disabled,
  verify,
  trashItem,
  onDelete,
}) => {
  const phoneInput = useRef<PhoneInput>(null);
  const {t} = useTranslation();
  const {
    colors,
    paddingStyles,
    marginStyles,
    inputStyles,
    viewStyles,
    justifyContentStyles,
    alignItemsStyles,
  } = useAKTheme();
  const [verifyPhone, setVerifyPhone] = useState<boolean>(false);

  // const {SuccessTick, Trash} = useAKThemeImages();
  const [field, meta, helpers] = useField(name);

  const onInputChanged = (input: any) => {
    helpers.setValue(input);
    onChangeTxt && onChangeTxt(input, phoneInput.current?.getCallingCode());
  };
  const verifyText: StyleProp<TextStyle> = [
    inputStyles.text10,
    marginStyles.right10,
    // {color: colors.primary.nineHundred},
  ];

  return (
    <AkView style={{opacity: disabled ? 0.5 : undefined, marginTop: 5}}>
      {label && (
        <AkText
          style={{
            fontSize: 14,
            lineHeight: 16.41,
            fontWeight: '500',
            paddingBottom: 0.5,
            // color: colors.shades.hundred,
          }}>
          {label}
        </AkText>
      )}
      <AkError errorMsg={meta.touched ? meta.error : null}>
        <AkView
          // style={[
          //   (rightIconProps || rightImageProps || RightSVG || verify) && {
          //     flexDirection: 'row',
          //     alignItems: 'center',
          //     justifyContent: 'space-between',
          //     backgroundColor: colors.primary.fifty,
          //     borderRadius: 4,
          //     marginTop: 10,
          //   },
          // ]}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            // backgroundColor: colors.primary.fifty,
            borderRadius: 4,
            marginTop: 10,
            height: 6,
          }}>
          <AkView style={viewStyles.flex1}>
            <PhoneInput
              containerStyle={[
                styles.phoneInputContainer,
                {
                  // backgroundColor: colors.primary.fifty,
                  borderTopLeftRadius: 4,
                  borderBottomLeftRadius: 4,
                },
              ]}
              flagButtonStyle={{
                borderTopLeftRadius: 4,
                borderBottomLeftRadius: 4,
                width: 60,
                // backgroundColor: colors.primary.fifty,
              }}
              textContainerStyle={{
                paddingVertical: 10,
                paddingHorizontal: 0,
                // backgroundColor: colors.primary.fifty,
              }}
              // codeTextStyle={[styles.codeTextStyle, {color: colors.primary.nineHundred}]}
              textInputStyle={[
                styles.textInput,
                {
                  // color: colors.primary.nineHundred,
                  // backgroundColor: colors.primary.fifty,
                  fontFamily: 'Ubuntu Regular',
                },
              ]}
              disabled={disabled}
              ref={phoneInput}
              placeholder="Phone Number"
              defaultCode={defaultCode ?? 'PK'}
              layout="first"
              // textInputProps={{placeholderTextColor: colors.input.placeholder, value: field.value}}
              onChangeText={onInputChanged}
            />
          </AkView>
          <AkView
            style={[viewStyles.rowContainer, justifyContentStyles.center, alignItemsStyles.center]}>
            {verify == true &&
              (verifyPhone ? (
                // <SuccessTick width={20} height={20} style={{right: 5}} /> 
                <></>
              ) : (
                <TouchableOpacity onPress={() => setVerifyPhone(!verifyPhone)}>
                  <AkText style={verifyText}>{t('Verify')}</AkText>
                </TouchableOpacity>
              ))}

            {!rightImageProps && !RightSVG && rightIconProps && <Icon {...rightIconProps} />}
            {!rightIconProps && !RightSVG && rightImageProps && <Image {...rightImageProps} />}
            {!rightIconProps && !rightImageProps && RightSVG && RightSVG}
            {trashItem == true && (
              <TouchableOpacity onPress={onDelete}>
                {/* <Trash height={16} width={16} style={{marginRight: 10}} /> */}
                <></>
              </TouchableOpacity>
            )}
          </AkView>
        </AkView>
      </AkError>
    </AkView>
  );
};

const styles = StyleSheet.create({
  phoneInputContainer: {height: 40},
  codeTextStyle: {
    fontSize: 14,
    lineHeight: 16.41,
    fontFamily: 'Ubuntu Regular',
    fontWeight: '400',
    marginRight: 0,
  },
  textInput: {
    fontSize: 14,
    lineHeight: 16.41,
    fontFamily: 'Ubuntu Regular',
    fontWeight: '400',
    height: 40,
  },
});

export default AkFormWithCountryCode;
