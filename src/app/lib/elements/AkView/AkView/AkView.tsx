import {StyleProp, View, ViewProps, ViewStyle} from 'react-native';
import {useAppConfig} from '~/app/data/hooks/common/useAppConfig';
import useAKTheme from '~/app/lib/hooks/useAKTheme';

export default function AkView(props: ViewProps) {
  const {colors} = useAKTheme();
  const {language} = useAppConfig();

  const isLTR = language === 'en';

  const defaultViewStyles: StyleProp<ViewStyle> = [
    props.style,
    {
      flexDirection: isLTR ? 'row' : 'row-reverse',
      // backgroundColor: colors.bgPrimary
    },
  ];

  return <View {...props} style={[defaultViewStyles]} />;
}
