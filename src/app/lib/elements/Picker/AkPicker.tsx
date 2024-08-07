import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, StyleProp, ViewStyle, TextStyle} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import styles from './AkPicker.styles';
import {FieldHelperProps, FieldInputProps, FieldMetaProps, useField} from 'formik';
import useAKTheme from '@lib/hooks/useAKTheme';
import {DropdownProps} from 'react-native-element-dropdown/lib/typescript/components/Dropdown/model';
import AkView from '../AkView/AkView/AkView';
import AkText from '../Text/AkText';
import AkError from '../Error/AkError';
interface Props extends Partial<DropdownProps<any>> {
  placeholder?: string;
  label?: string;
  value?: string;
  onChange?: (item: any) => void;
  data?: Array<{label: any; value: any}>;
  type?: boolean;
  width?: any;
  dropDownStyles?: any;
  formikProps?: FieldMetaProps<any> & FieldInputProps<any> & FieldHelperProps<any>;
  errorText?: string;
  iconOnly?: boolean;
  size?: 'lg' | 'md' | 'sm';
}

const AkPicker: React.FC<Props> = (props) => {
  const {
    label,
    placeholder,
    data,
    onChange,
    value,
    type,
    width,
    dropDownStyles,
    formikProps,
    errorText,
    iconOnly,
    size = 'lg',
    labelField = 'label',
    valueField = 'value',
  } = props;
  const [focused, setIsFcoused] = useState(false);
  const {colors,} = useAKTheme();
  const pickerRef = useRef<any>();

  function onInputChanged(item: any) {
    console.log(item, 'SELECTED DROP DOWN ITEM');
    formikProps && formikProps.setValue(item.value);
    onChange && onChange(item.value);
  }

  const largeDropDownStyles = {
    width: 30,
    height: 36,
    paddingVertical: 20,
    paddingHorizontal: 6, //large
  };

  const mediumDropDownStyles = {
    height: 28,
    paddingVertical: 16,
    paddingHorizontal: 6, // medium
  };

  const smallDropDownStyles = {
    height: 24,
    paddingVertical: 12,
    paddingHorizontal: 6, // small
  };

  const defaultDropDownFocusStyles = {
    // backgroundColor: '#161CB8', // hover
    // backgroundColor: colors.lightWhite, // focused
  };

  const defaultDropDownDisabledStyles = {
    backgroundColor: '#F7F8FA', // disabled
  };

  const defaultDropDownStyles: StyleProp<ViewStyle> = {
    // backgroundColor: colors.lightWhite, //default
    borderRadius: 4,
    width: 80,

    ...(size === 'lg' && largeDropDownStyles),
    ...(size === 'md' && mediumDropDownStyles),
    ...(size === 'sm' && smallDropDownStyles),
    ...(focused === true && defaultDropDownFocusStyles),
    ...(props.disable && defaultDropDownDisabledStyles),
  };

  const defaultItemTextStyles: StyleProp<TextStyle> = {
    color: props.disable ? '#6B7280' : '#111827',
    fontWeight: '400',
    fontSize: 11,
    lineHeight: 16.41,
  };

  const placeHolderDefaultStyle = {
    // color: '#000',
    fontSize: 12,
    // color: colors.neutral.fourHundred,
  };

  const defaultIconDropDownStyles: StyleProp<ViewStyle> = {
    width: 30,
  };
  const defaultIconDropDownContainerStyles: StyleProp<ViewStyle> = {
    width: 70,
  };

  const pickerContainer: StyleProp<ViewStyle> = {
    // marginTop: 20,
    paddingVertical: 5,
  };

  function onFocus() {
    setIsFcoused(true);
    props.onFocus && props.onFocus();
  }

  function onBlur() {
    setIsFcoused(false);
    props.onBlur && props.onBlur();
  }

  useEffect(() => {
    pickerRef.current = {
      focus: false,
      blur: false,
    };
  }, []);

  return (
    <AkView style={[pickerContainer, {opacity: props.disable ? 0.5 : undefined}]}>
      {label && <AkText style={[styles.lableTxt, {color: colors.colorPrimary}]}>{label}</AkText>}
      <AkError
        errorMsg={formikProps ? (formikProps.touched ? formikProps.error : null) : errorText ?? ''}>
        <Dropdown
          ref={pickerRef}
          // style={[
          //   styles.dropdown,
          //   {
          //     borderColor: primary.nineHundred,
          //     backgroundColor: dropDownStyles?.backgroundColor ?? '#f4f4ff',
          //     width: width ? width : wp(87),
          //   },
          //   dropDownStyles,
          // ]}
          // placeholderStyle={[styles.placeholderStyle, {color: '#000'}]}
          // itemTextStyle={{fontSize: 12, color: '#000'}}
          selectedTextStyle={{fontSize: 10}}
          // iconStyle={styles.iconStyle}
          // dropdownPosition={'auto'}
          labelField={labelField}
          valueField={valueField}
          {...props}
          // iconColor='red'
          // search={true}
          maxHeight={200}
          placeholder={placeholder}
          data={data || []}
          value={value}
          onChange={onInputChanged}
          activeColor={props.disable ? '#FFFFFF' : '#F7F8FA'}
          placeholderStyle={[
            placeHolderDefaultStyle,
            iconOnly === true && {display: 'none'},
            props.placeholderStyle,
          ]}
          style={[
            defaultDropDownStyles,
            iconOnly && defaultIconDropDownStyles,
            dropDownStyles,
            {height: 40, width: 90},
          ]}
          containerStyle={defaultIconDropDownContainerStyles}
          itemTextStyle={[defaultItemTextStyles]}
          selectedTextProps={{style: {color: colors.colorPrimary}}}
          iconColor="#4E5969"
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </AkError>
    </AkView>
  );
};

interface IPickerWithFormik extends Partial<Props> {
  name: string;
  data?: Array<{label: any; value: any}>;
  placeholder?: string;
  label?: string;
  width?: any;
  value?: string;
}
export const AkPickerWithFormik = (props: IPickerWithFormik) => {
  const [field, meta, helpers] = useField(props.name);

  return <AkPicker {...props} formikProps={{...field, ...meta, ...helpers}} />;
};

export default AkPicker;
