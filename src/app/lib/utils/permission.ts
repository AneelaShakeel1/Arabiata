import {Permission, PermissionsAndroid, PermissionsAndroidStatic, Rationale} from 'react-native';

export async function requestPermission(permissionName: Permission, dialogConfig?: Rationale) {
  try {
    const granted = await PermissionsAndroid.request(permissionName, {
      title: dialogConfig?.title ?? 'Cool Photo App Camera Permission',
      message:
        dialogConfig?.message ??
        'Cool Photo App needs access to your camera ' + 'so you can take awesome pictures.',
      buttonNeutral: dialogConfig?.buttonNeutral ?? 'Ask Me Later',
      buttonNegative: dialogConfig?.buttonNegative ?? 'Cancel',
      buttonPositive: dialogConfig?.buttonPositive ?? 'OK',
    });
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
}