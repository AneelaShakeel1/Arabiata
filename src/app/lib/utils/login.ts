import { Alert } from "react-native";
import Route from "~/app/navigation/routes";

export async function checkLogin(loginInfo: any, navigation: any, cb: any) {
    if (loginInfo === null) {
        Alert.alert(
            'Please Login First',
            'You need to be logged in to add items to favourite.',
            [
                {
                    text: 'OK',
                    onPress: () =>
                        navigation.navigate(Route.ROOT_AUTH_SCREEN, {
                            screen: Route.AUTH_LOGIN_SCREEN,
                        }),
                },
            ],
            { cancelable: false },
        );
    } else {
        await cb();
    }
}