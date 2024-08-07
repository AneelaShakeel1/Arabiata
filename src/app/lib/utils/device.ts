import {getVersion} from 'react-native-device-info';

function getAppVersion() {
  return getVersion();
}

export {getAppVersion};