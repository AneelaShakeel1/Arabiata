import React from 'react';
import {ActivityIndicator, ActivityIndicatorProps, Image, View} from 'react-native';
import styles from './AkLoader.styles';
import useAKThemeImages from '@lib/hooks/useAKImages';
import RNModal from '../Modal/RNModalWrapper';

interface Props extends ActivityIndicatorProps {
  loading: any;
}

const AkLoader: React.FC<Props> = ({loading, size, color}) => {
  const {Logo} = useAKThemeImages();
  if (!loading) return;
  return (
    <RNModal visible={loading}>
      <Image source={Logo} style={{width: 30, height: 30, borderRadius: 100}} />
      <ActivityIndicator color={color} size={size} style={{position: 'absolute'}} />
    </RNModal>
  );
};
export default AkLoader;
