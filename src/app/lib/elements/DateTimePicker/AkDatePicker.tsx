import { Icon } from '@rneui/base';
import React, { useState } from 'react';
import { Text, TextInputProps, TouchableOpacity } from 'react-native';


import styles from './AkDatePicker.styles';

import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useField } from 'formik';
import useAKTheme from '../../hooks/useAKTheme';
import Col from '../AkView/Col/Col';
import AkError from '../Error/AkError';
import AkText from '../Text/AkText';
import Row from '../AkView/Row/Row';
import AkView from '../AkView/AkView/AkView';


type Props = {
  name?: string | undefined;
  isSecure?: boolean;
  type?: string;
  iconName?: string;
  iconType?: string;
  width?: any;
  props?: any;
  marginTop?: any;
  label?: string;
  backgroundColor?: any;
  placeholder?: string;
  mode: any;
  onConfirm?: (value: Date) => void;
  onCancel?: () => void;
  maximumDate?: Date;
  minimumDate?: Date;
};

const AkDatePicker = (props: Props & TextInputProps) => {
  const { type, name, iconName, iconType, width, marginTop, backgroundColor, placeholder, mode, onConfirm, onCancel, maximumDate, minimumDate } = props;
  const [isSecure, setSecure] = useState<boolean>(false);

  // const [field, meta, helpers] = useField(name && name?.length > 0 ? name : '');
  const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(false);
  const [selectDate, setSelectDate] = useState<any>('');
  const [selectTime, setSelectTime] = useState<any>('');
  const { colors } = useAKTheme();

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (value: any) => {
    console.log(value, "SELECTED FROM DATE TIME PICKER");

    if (mode == 'date') {
      let selectedDate = moment(value).utc().format('YYYY-MM-DD');
      setSelectDate(selectedDate);
    } else {
      let selectedTime = moment(value).format('hh:mm A');
      console.log(selectedTime, "FORMATTED BY MOMENT");
      setSelectTime(selectedTime);
    }

    hideDatePicker();
  };
  const [field, meta, helpers] = useField(name && name?.length > 0 ? name : '');

  const onInputChanged = (input: any) => {
    helpers.setValue(input);
  };

  return (
    <Col>
      <AkError errorMsg={meta.touched ? meta.error : null}>
        <Col
          style={[
            {
              marginTop: marginTop ? marginTop : 4,
            },
          ]}>

          {props.label && (
            <AkText
              style={{
                fontSize: 12,
                paddingBottom: 4,
              }}>
              {props.label}
            </AkText>
          )}
          <TouchableOpacity
            onPress={showDatePicker}
          >

            <AkView style={{ backgroundColor: colors.light_gray, height: 40, alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10 }}>

              <AkText>{selectDate == '' && selectTime == '' ? placeholder : mode == 'date' ? selectDate : selectTime}</AkText>


              <Icon name={mode == 'date' ? 'calendar' : 'clockcircleo'} type={'ant-design'} size={20} color={colors.colorPrimary} />
            </AkView>
          </TouchableOpacity>

        </Col>
      </AkError>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode={mode}
        onConfirm={(value) => {
          console.log('====================================');
          console.log(value);
          console.log('====================================');
          onInputChanged(value);
          onConfirm && onConfirm(value);
          handleConfirm(value);
        }}
        onCancel={() => {
          onCancel && onCancel();
          hideDatePicker();
        }}
        minimumDate={minimumDate}
        maximumDate={maximumDate}
      />
    </Col>
  );
};

export default AkDatePicker;
