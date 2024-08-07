import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  StyleProp,
  ViewStyle,
  NativeSyntheticEvent,
  TextInputContentSizeChangeEventData,
  ImageProps,
  Image,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import AkError from '../Error/AkError';
import { FieldHelperProps, FieldInputProps, FieldMetaProps, useField } from 'formik';
import AkView from '../AkView/AkView/AkView';
import AkText from '../Text/AkText';

import { Icon, IconProps } from '@rneui/base';
import useAKTheme from '@lib/hooks/useAKTheme';
import useAKThemeImages from '@lib/hooks/useAKImages';
import Col from '../AkView/Col/Col';
import Row from '../AkView/Row/Row';
import { useAppConfig } from '~/app/data/hooks/common/useAppConfig';

type TFieldDirection = 'row' | 'column';
type TInput = 'input' | 'textArea';

export type TAkInputProps = {
  // name: string;
  isSecure?: boolean;
  type?: string;
  multiline?: boolean;
  iconName?: string;
  iconType?: string;
  width?: any;
  props?: any;
  marginTop?: any;
  label?: string;
  backgroundColor?: any;
  errorText?: string;
  formikProps?: FieldMetaProps<any> & FieldInputProps<any> & FieldHelperProps<any>;
  fieldContainerType?: TFieldDirection;
  fieldContainerStyle?: StyleProp<Omit<ViewStyle, ''>>;
  inputType?: TInput;
  LeftSVG?: SVGElement;
  RightSVG?: SVGElement;
  leftIconProps?: IconProps;
  rightIconProps?: IconProps;
  leftImageProps?: ImageProps;
  rightImageProps?: ImageProps;
  disabled?: boolean;
  trashItem?: boolean;
  onDelete?: () => void;
};

export function AkInput(props: TAkInputProps & TextInputProps) {
  const {
    type,
    // name,
    iconName,
    iconType,
    width,
    marginTop,
    backgroundColor,
    formikProps,
    errorText,
    fieldContainerType = 'column',
    inputType = 'input',
    fieldContainerStyle,
    LeftSVG = undefined,
    RightSVG = undefined,
    leftIconProps = undefined,
    rightIconProps = undefined,
    leftImageProps = undefined,
    rightImageProps = undefined,
    disabled,
    trashItem,
    onDelete,
  } = props;
  const [isSecure, setSecure] = useState<boolean>(true);
  const [inputHeight, setInputHeight] = useState(40);
  const { language ,themeMode} = useAppConfig();
  const { colors, justifyContentStyles, alignItemsStyles, viewStyles, paddingStyles } = useAKTheme();
  // const {Trash} = useAKThemeImages();

  const fieldRowContainer: StyleProp<ViewStyle> = {
    flexDirection: 'row',
    alignItems: 'flex-start',
  };

  const fieldColumnContainer: StyleProp<ViewStyle> = {
    flexDirection: 'column',
    alignItems: 'flex-start',
  };

  const defaultFieldContainerStyles: StyleProp<ViewStyle> = {
    ...(fieldContainerType === 'row' ? fieldRowContainer : fieldColumnContainer),
    height: props.inputType === 'textArea' ? 120 : undefined,
    opacity: disabled ? 0.5 : undefined,
    marginTop: 10,
    // width: '80%',
    // backgroundColor: 'green',
  };

  function onInputChanged(text: string) {
    props.onChangeText && props.onChangeText(text);
    formikProps && formikProps.setValue(text);
  }

  const isIcon = rightIconProps || rightImageProps || RightSVG;

  return (
    <Col style={[defaultFieldContainerStyles, fieldContainerStyle]}>
      <AkError
        errorMsg={formikProps ? (formikProps.touched ? formikProps.error : null) : errorText ?? ''}>
        {props.label && (
          <AkText
            style={{
              fontSize: 14,
              lineHeight: 16.41,
              fontWeight: '500',
              paddingBottom: 5,
              textAlign: language !== 'en' ? 'right' : undefined,
              alignSelf:language !== 'en' ? 'flex-end' : undefined,
              // color: colors.shades.hundred,
            }}>
            {props.label}
          </AkText>
        )}
        <AkView
          style={[
            inputType === 'textArea' && [styles.textAreaWrapper, { width: width}],
            { flexDirection: 'row', },
            {
              alignItems: inputType === 'textArea' ? 'flex-start' : 'center',
              justifyContent: 'space-between',
              paddingRight: 10,
            },
            {
              backgroundColor:colors.light_gray,
              borderRadius: 4,
              width: '100%',

            },
          ]}>
          {/* {inputType === 'input' && LeftSVG && LeftSVG} */}
          {inputType === 'input' && leftIconProps && <Icon {...leftIconProps} />}
          {inputType === 'input' && leftImageProps && <Image {...leftImageProps} />}
          <TextInput
            {...props}
            value={props?.value ? props.value : formikProps?.value?.toString()}
            // placeholder={formikProps?.value?.toString() ?? ''}
            style={[
              styles.inputWrapper,
              {
                flex: 1,
                height: inputHeight,
                backgroundColor: colors.light_gray,
                textAlign: language === "en" ? 'left' : 'right',
                color:colors.black
                // color: colors.primary.nineHundred,
                // backgroundColor: colors.primary.fifty,

              },
              props.style,
            ]}
            autoCapitalize={'none'}
            editable={!disabled}
            multiline={inputType === 'textArea' ? true : false}
            secureTextEntry={type === 'password' ? isSecure : false}
            onChangeText={onInputChanged}
            placeholderTextColor={colors.medium_gray}
            // placeholderTextColor={props.placeholderTextColor ?? colors.input.placeholder}
            onContentSizeChange={
              inputType === 'textArea'
                ? React.useCallback(
                  (event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => {
                    inputType === 'textArea'
                      ? setInputHeight(event.nativeEvent.contentSize.height)
                      : undefined;
                  },
                  [],
                )
                : undefined
            }
          />
          {inputType === 'input' && type === 'password' && (
            <Icon
              onPress={() => setSecure(!isSecure)}
              name={isSecure ? 'eye-slash' : 'eye'}
              type={'font-awesome'}
              color={'#ABABB2'}
              iconStyle={{
                // backgroundColor: colors.primary.fifty,
              }}
            />
          )}
          {inputType === 'input' && RightSVG && RightSVG}
          {inputType === 'input' && rightIconProps && <Icon {...rightIconProps} />}
          {inputType === 'input' && rightImageProps && <Image {...rightImageProps} />}
          {trashItem == true && (
            <TouchableOpacity
              onPress={onDelete}
              style={[justifyContentStyles.center, alignItemsStyles.center]}>
              {/* <Trash height={16} width={16} style={{marginRight: 10}} /> */}
            </TouchableOpacity>
          )}
        </AkView>
      </AkError>
    </Col>
  );
}

interface IInputWithFormik extends Partial<TAkInputProps & TextInputProps> {
  name: string;
}

export default function AkInputWithFormik(props: IInputWithFormik) {
  const [field, meta, helpers] = useField(props.name);

  return React.useMemo(
    () => <AkInput {...props} formikProps={{ ...field, ...meta, ...helpers }} />,
    [props],
  );
}
