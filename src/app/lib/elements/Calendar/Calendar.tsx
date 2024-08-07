import { useState } from 'react';
import { Calendar as RNCalendar, CalendarProps } from 'react-native-calendars';
import { Theme } from 'react-native-calendars/src/types';
import useAKTheme from '../../hooks/useAKTheme';
import AkError from '../Error/AkError';
import { useField } from 'formik';
import Col from '../AkView/Col/Col';
import { TouchableOpacity } from 'react-native';
import AkText from '../Text/AkText';
import { Icon } from '@rneui/base';
import Row from '../AkView/Row/Row';
import AkView from '../AkView/AkView/AkView';


interface IEpCalendarProps extends Partial<CalendarProps> {
  selectedDate?: string;
  label?: string;
  name?: string;
  placeholder?: string;
}

export default function Calendar(props: IEpCalendarProps) {
  const { colors } = useAKTheme();
  const [selectedDate, setSelectedDate] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const calendarTheme: Theme = {
    // selectedDayTextColor: 'red',
    // selectedDayBackgroundColor: 'red',
    todayTextColor: colors.colorPrimary,
    textDayStyle: {
      fontSize: 12,
    },
    textMonthFontSize: 12,
    arrowColor: colors.colorPrimary,
    contentStyle: {
      width: 10,
      height: 10,
      borderRadius: 4,
    },
  };

  const [field, meta, helpers] = useField(props?.name && props.name?.length > 0 ? props.name : '');

  const onInputChanged = (day: any) => {
    helpers.setValue(day);
    console.log('====================================');
    console.log('ON DAY PRESS', day);
    console.log('====================================');
    setSelectedDate(day.dateString);
    props.onDayPress && props.onDayPress(day);
    hideDatePicker();
  };

  return (
    <Col>
      <AkError errorMsg={meta.touched ? meta.error : null}>
        <Col
          style={[
            {
              marginTop: 4,
              // width: width ? width : 87,
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
              <AkText style={{color:colors.black}}>{!selectedDate ? props.placeholder ?? '' : selectedDate}</AkText>
              <Icon name={'calendar'} type={'ant-design'} size={20} color={colors.colorPrimary} />
            </AkView>
          </TouchableOpacity>

        </Col>
      </AkError>
      {isDatePickerVisible && <RNCalendar
        {...props}
        theme={props?.theme ?? calendarTheme}
        markingType={props.markingType ?? 'custom'}
        markedDates={
          props.markedDates
            ? props.markedDates
            : {
              [props.selectedDate ?? selectedDate]: {
                selected: true,
                customStyles: {
                  container: {
                    backgroundColor: colors.colorPrimary,
                    borderRadius: 4,
                  },
                },
              },
            }
        }
        onDayPress={onInputChanged}
      />}
    </Col>
  );
}
