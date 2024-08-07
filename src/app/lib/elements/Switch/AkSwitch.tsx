import React, {useState} from 'react';
import {Switch, SwitchProps} from '@rneui/themed';
import {View, Text, StyleSheet, StyleProp} from 'react-native';
import useAKTheme from '../../hooks/useAKTheme';

type AkSwitchProps = {
  toggleSwitch: () => void;
  isEnabled: Boolean;
  style?: SwitchProps['style'];
  color?: SwitchProps['color'];
};

const AkSwitch: React.FunctionComponent<AkSwitchProps> = ({
  toggleSwitch,
  isEnabled,
  style,
  color,
}: any) => {
  const {colors} = useAKTheme();
  return (
    <Switch
      value={isEnabled}
      onValueChange={(value) => toggleSwitch()}
      style={style ?? {}}
      thumbColor={color}
      trackColor={{true: colors.colorPrimary, false: colors.medium_gray}}
    />
  );
};

const styles = StyleSheet.create({});

export default AkSwitch;
