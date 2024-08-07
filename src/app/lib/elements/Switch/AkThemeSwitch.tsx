import {Image} from 'react-native';

import AkSwitch from './AkSwitch';
import useAKThemeImages from '@lib/hooks/useAKImages';
import useAKTheme from '@lib/hooks/useAKTheme';
import { useAppConfig } from '~/app/data/hooks/common/useAppConfig';
import AkView from '../AkView/AkView/AkView';


export default function AkThemeSwitch() {
  // const {SunIcon, MoonIcon} = useAKThemeImages();
  const {themeMode, setReduxThemeMode} = useAppConfig();

  function toggleTheme() {
    setReduxThemeMode(themeMode === 'dark' ? 'light' : 'dark');
  }

  return (
    <AkView
      style={{
        backgroundColor: 'grey',
        width: 80,
        height: 30,
        paddingHorizontal: 5,
        borderRadius: 100,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      {/* {themeMode === 'dark' && <Image source={SunIcon} style={{width: 20, height: 20}} />} */}
      <AkSwitch
        isEnabled={themeMode === 'dark'}
        toggleSwitch={toggleTheme}
        color={themeMode === 'dark' ? 'black' : 'white'}
      />
      {/* {themeMode === 'light' && <Image source={MoonIcon} style={{width: 20, height: 20}} />} */}
    </AkView>
  );
}
