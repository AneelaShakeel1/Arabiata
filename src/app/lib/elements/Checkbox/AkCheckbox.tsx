import React from 'react';
import { FieldHelperProps, FieldInputProps, FieldMetaProps, useField } from 'formik';
import { Icon } from '@rneui/base';
import styles from './AkCheckbox.styles';
import useAKTheme from '@lib/hooks/useAKTheme';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import AkView from '../AkView/AkView/AkView';
import AkText from '../Text/AkText';
import Row from '../AkView/Row/Row';
import AkError from '../Error/AkError';
interface Props {
  check?: boolean;
  onCheck?:(checked: boolean) => void;
  label?: string;
  formikProps?: FieldMetaProps<any> & FieldInputProps<any> & FieldHelperProps<any>;
  containerStyle?: StyleProp<ViewStyle>
  errorText?: string;
}

const AkCheckbox: React.FC<Props> = ({ onCheck, check, label, formikProps, containerStyle, errorText }) => {
  const {
    colors: { colorPrimary },
  } = useAKTheme();

  const handleToggle = () => {
    const newValue = !(formikProps ? formikProps.value : check);
    if (formikProps) {
      formikProps.setValue(newValue);
    }
    if (onCheck) {
      onCheck(newValue);
    }
  };

  const isChecked = formikProps ? formikProps.value : check;

  return (
    <AkError
      errorMsg={formikProps ? (formikProps.touched ? formikProps.error : null) : errorText ?? ''}>
      <AkView style={[styles.checknboxView, containerStyle]}>
        <Icon
          name={isChecked ? 'checkbox-outline' : 'square-outline'}
          size={22}
          color={colorPrimary}
          type="ionicon"
          onPress={handleToggle}
        />
        {label && (
          <AkText style={{ fontSize: 12, fontFamily: 'Ubuntu Regular', alignSelf: 'center', marginHorizontal: 10 }}>
            {label}
          </AkText>
        )}
      </AkView>
    </AkError>
  );
};

export function AkCheckboxWithFormik(props: { name: string } & Partial<Props>) {
  const [field, meta, helpers] = useField(props.name);

  return <AkCheckbox {...props} formikProps={{ ...field, ...meta, ...helpers }} />;
}

export default AkCheckbox;
