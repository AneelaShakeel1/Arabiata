import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useEffect} from 'react';
import {Alert, Image} from 'react-native';
import {useHUser} from '~/app/data/hooks/common/useUser';
import {AkText, AkView} from '~/app/lib/elements';
import Col from '~/app/lib/elements/AkView/Col/Col';
import useAKThemeImages from '~/app/lib/hooks/useAKImages';
import useAKTheme from '~/app/lib/hooks/useAKTheme';
import {getAppVersion} from '~/app/lib/utils/device';
import {RootStackParamList} from '~/app/navigation/app';
import Route from '~/app/navigation/routes';

type Props = NativeStackScreenProps<RootStackParamList, Route.ROOT_SPLASH_SCREEN>;

export default function Splash(props: Props) {
  const {colors} = useAKTheme();
  const {AppIconHorizontal} = useAKThemeImages();
  const {setReduxLoginInfo} = useHUser();

  async function checkUserLoginPersist() {
    const loginInfo = await AsyncStorage.getItem('loginInfo');
    setReduxLoginInfo(loginInfo ? JSON.parse(loginInfo) : loginInfo);
    if (loginInfo) {
      // set login info in redux
      // Alert.alert('Logged In User');
      props.navigation.reset({
        index: 0,
        routes: [{name: Route.ROOT_HOME_SCREEN}],
      });
    } else {
      // Alert.alert('Guest User');
      // set userType guest and take to dashboard
      props.navigation.reset({
        index: 0,
        routes: [{name: Route.ROOT_HOME_SCREEN}],
      });
    }
  }

  useEffect(() => {
    setTimeout(() => {
      checkUserLoginPersist();
    }, 1000);
  }, []);

  return (
    <>
      <Col
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: colors.bgSplash,
          alignItems: 'center',
          paddingHorizontal: 30,
        }}>
        <Image source={AppIconHorizontal} style={{width: '100%', height: 100}} />
        <AkText style={{color: colors.white, marginVertical: 30, fontSize: 20}}>
          Arabiata Kuwait v{getAppVersion()}
        </AkText>
      </Col>
    </>
  );
}
