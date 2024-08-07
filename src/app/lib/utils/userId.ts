import AsyncStorage from "@react-native-async-storage/async-storage"
import DeviceInfo from 'react-native-device-info';

export async function getUserId() {
    let userId;
    // Get the unique device ID
    const deviceId = await DeviceInfo.getUniqueId();
    userId = deviceId
    const loginInfo: any = await AsyncStorage.getItem("loginInfo");
    if (loginInfo) {
        userId = JSON.parse(loginInfo).id
    }
    return userId;
}