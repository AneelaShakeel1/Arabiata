import { Dimensions, StyleSheet } from 'react-native';
import { ToastConfigParams } from 'react-native-toast-message';


const RenderCustomToast = (render: JSX.Element) => {
  return render;
};

export const toastConfig = {
  customToast: ({ props }: ToastConfigParams<any>) => {
    // stayTurnedToast: ({ text1, props }: { text1: string; props: { themeCode: string } }) => {
    return RenderCustomToast(props.render);
  },
};
