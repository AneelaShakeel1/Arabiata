import React from 'react';
import {Text, TextProps, TextStyle} from 'react-native';
import {StyleProps} from 'react-native-reanimated';
import useAKTheme from '@lib/hooks/useAKTheme';
import {useAppConfig} from '~/app/data/hooks/common/useAppConfig';

export default function AkText(props: TextProps) {
  const {language} = useAppConfig();
  const {colors} = useAKTheme();

  const textColor =
    props.style && (props.style as TextStyle).color
      ? (props.style as TextStyle).color
      : colors.textPrimary;
  const textAlign =
    props.style && (props.style as TextStyle).textAlign
      ? (props.style as TextStyle).textAlign
      : language === 'en'
      ? 'left'
      : 'right';

  let defaultTextStyles: StyleProps = [
    props.style,
    {
      fontFamily:
        language === 'en'
          ? props.style?.fontWeight === 'bold'
            ? 'Poppins-Bold'
            : 'Poppins-Regular'
          : props.style?.fontWeight === 'bold'
          ? 'Cairo-Bold'
          : 'Cairo-Regular',
      textAlign: textAlign,
      color: textColor,
    },
  ];

  delete props.style?.fontWeight;

  return <Text {...props} style={[defaultTextStyles]} />;
}
