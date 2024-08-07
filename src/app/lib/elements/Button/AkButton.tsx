import React from 'react';

import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Image,
  StyleProp,
  ViewStyle,
  ImageProps,
  ImageSourcePropType,
  TextProps,
  TextStyle,
  ImageStyle,
  TouchableOpacityProps,
} from 'react-native';
const windowWidth = Dimensions.get('screen').width;
import styles from './AkButton.styles';
import useAKTheme from '@lib/hooks/useAKTheme';

import useAKThemeImages from '@lib/hooks/useAKImages';

import {Icon, IconProps} from '@rneui/base';

interface ButtonProps {
  btnText?: string;
  onClick: any;
  width?: any;
  disabled?: boolean;
  loading?: boolean;
  containerStyles?: StyleProp<ViewStyle>;
  textStyles?: StyleProp<TextStyle>;
  imageProps?: ImageProps;
  iconProps?: IconProps;
  isLink?: boolean;
  LeftSVG?: SVGElement;
}
const AkButton: React.FC<ButtonProps> = ({
  btnText,
  onClick,
  width,
  disabled = false,
  loading = false,
  containerStyles,
  textStyles,
  imageProps,
  iconProps,
  isLink = false,
  LeftSVG = undefined,
}) => {
  const {colors} = useAKTheme();
  const {Logo} = useAKThemeImages();

  const defaultButtonStyles: StyleProp<ViewStyle> = {
    ...styles.container,
    // width: width ? width : wp(100),
    backgroundColor: colors.colorPrimary,
    opacity: disabled ? 0.5 : 1,
    padding: 10,
    borderRadius: 4,
    height: 40,
  };

  const defaultIconStyles: StyleProp<ImageStyle> = {
    width: 20,
    height: 20,
    borderRadius: 100,
  };

  const defaultLinkStyles: ButtonProps['textStyles'] = {
    color: '#3E43D0',
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0.5,
    textAlign: 'center',
  };

  const defaultButtonTextStyles: StyleProp<TextStyle> = {
    color: colors.white,
    fontWeight: 'bold',
    ...styles.btnText,
  };

  return (
    <TouchableOpacity
      style={[defaultButtonStyles, containerStyles]}
      onPress={onClick}
      disabled={disabled}>
      {!loading ? (
        <>
          {LeftSVG && LeftSVG}
          {imageProps === undefined && iconProps && <Icon {...iconProps} />}
          {iconProps === undefined && imageProps && (
            <Image {...imageProps} style={[defaultIconStyles, imageProps.style]} />
          )}
          <Text style={[defaultButtonTextStyles, isLink ? defaultLinkStyles : textStyles]}>
            {btnText}
          </Text>
        </>
      ) : (
        <>
          <Image source={Logo} style={{width: 30, height: 30, borderRadius: 100}} />
          <ActivityIndicator color={'black'} size={'small'} style={{position: 'absolute'}} />
        </>
      )}
    </TouchableOpacity>
  );
};

export default AkButton;
