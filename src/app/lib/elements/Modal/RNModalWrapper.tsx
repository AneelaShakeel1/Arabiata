// import React from 'react';
// import {
//   Modal,
//   Platform,
//   Pressable,
//   StyleProp,
//   StyleSheet,
//   View,
//   ViewStyle,
//   useWindowDimensions,
// } from 'react-native';
// // import {Gesture, GestureDetector} from 'react-native-gesture-handler';
// import {
//   KeyboardAwareScrollView,
//   KeyboardAwareScrollViewProps,
// } from 'react-native-keyboard-aware-scroll-view';
// import {useKeyboard} from '@react-native-community/hooks';

// interface IPropsRNModal {
//   visible: boolean;
//   statusBarTranslucent?: boolean;
//   transparent?: boolean;
//   onShowModal?: () => void;
//   onDismissModal?: () => void; // **** only works for IOS. for android ondismiss should be considered to execute manually****
//   shouldBeScrollAwared?: boolean;
//   scrollAwareConfig?: KeyboardAwareScrollViewProps;
//   withBackDrop?: boolean;
//   onHardwareBackPress?: () => void; // *** hardware back button handler ****
//   onBackDropPress?: () => void; // *** only avaialble if withBackDrop is true ****
//   children: React.ReactNode;
//   overlayStyle?: StyleProp<ViewStyle>;
// }

// export default function RNModal({
//   visible = false,
//   statusBarTranslucent = true,
//   transparent = true,
//   onShowModal,
//   onDismissModal,
//   shouldBeScrollAwared = false,
//   scrollAwareConfig,
//   withBackDrop = false,
//   onHardwareBackPress,
//   onBackDropPress,
//   children,
//   overlayStyle,
// }: IPropsRNModal) {
//   // const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
//   const {keyboardShown, keyboardHeight} = useKeyboard();
//   // const SCREEN_WIDTH = useWindowDimensions();

//   // const gesture = React.useMemo(
//   //   () =>
//   //     Gesture.Pan()
//   //       .onStart((event) => {
//   //         const animatedProps = useAnimatedProps(() => {
//   //           return {
//   //             r: event.translationX < SCREEN_WIDTH.width / 2,
//   //           };
//   //         });
//   //         if (Platform.OS === 'ios' && onHardwareBackPress !== undefined && animatedProps.r) {
//   //           onHardwareBackPress();
//   //         } else {
//   //           return;
//   //         }
//   //       })
//   //       .runOnJS(true),
//   //   [],
//   // );

//   const RenderBackDrop = (props: any) => {
//     // let propsCopy = {...props};
//     // let extractedStylesFromProps = propsCopy.style;
//     // delete propsCopy.style;

//     switch (Platform.OS) {
//       case 'ios':
//         return withBackDrop === undefined || withBackDrop === false ? (
//           <View {...props}>{children}</View>
//         ) : (
//           <Pressable {...props}>{children}</Pressable>
//         );

//       case 'android':
//         return withBackDrop === undefined || withBackDrop === false ? (
//           <View {...props}>{children}</View>
//         ) : (
//           <Pressable {...props}>{children}</Pressable>
//         );

//       default:
//         return <></>;
//     }
//   };

//   const renderModalWithGestureCapture = () => {
//     return (
//       <Modal
//         visible={visible}
//         // animationType="slide"
//         // presentationStyle={'overFullScreen'}
//         supportedOrientations={['portrait', 'landscape']}
//         statusBarTranslucent={statusBarTranslucent}
//         transparent={transparent}
//         onShow={onShowModal}
//         onDismiss={Platform.OS === 'ios' ? onDismissModal : undefined}
//         onRequestClose={Platform.OS === 'ios' ? undefined : onHardwareBackPress}>
//         {/* <GestureDetector gesture={gesture}> */}
//           {shouldBeScrollAwared ? (
//             <KeyboardAwareScrollView
//               {...scrollAwareConfig}
//               automaticallyAdjustKeyboardInsets={true}
//               keyboardShouldPersistTaps={'always'}>
//               {RenderBackDrop({
//                 style: [styles.overlay, overlayStyle],
//                 activeOpacity: 1,
//                 disabled: withBackDrop === undefined || withBackDrop === false,
//                 onPress:
//                   withBackDrop === undefined || withBackDrop === false
//                     ? undefined
//                     : onBackDropPress,
//               })}
//             </KeyboardAwareScrollView>
//           ) : (
//             RenderBackDrop({
//               style: [styles.overlay, overlayStyle],
//               activeOpacity: 1,
//               disabled: withBackDrop === undefined || withBackDrop === false,
//               onPress:
//                 withBackDrop === undefined || withBackDrop === false ? undefined : onBackDropPress,
//             })
//           )}
//         {/* </GestureDetector> */}
//       </Modal>
//     );
//   };

//   const renderModalWithoutGestureCapture = () => {
//     return (
//       <Modal
//         visible={visible}
//         animationType="slide"
//         supportedOrientations={['portrait', 'landscape']}
//         presentationStyle={'overFullScreen'}
//         statusBarTranslucent={statusBarTranslucent}
//         transparent={transparent}
//         onShow={onShowModal}
//         onDismiss={Platform.OS === 'ios' ? onDismissModal : undefined}
//         onRequestClose={Platform.OS === 'ios' ? undefined : onHardwareBackPress}>
//         {shouldBeScrollAwared ? (
//           <KeyboardAwareScrollView
//             {...scrollAwareConfig}
//             automaticallyAdjustKeyboardInsets={true}
//             keyboardShouldPersistTaps={'always'}>
//             {RenderBackDrop({
//               style: [styles.overlay, overlayStyle],
//               activeOpacity: 1,
//               disabled: withBackDrop === undefined || withBackDrop === false,
//               onPress:
//                 withBackDrop === undefined || withBackDrop === false ? undefined : onBackDropPress,
//             })}
//             {keyboardShown && <View style={{height: keyboardHeight, width: '100%'}} />}
//           </KeyboardAwareScrollView>
//         ) : (
//           RenderBackDrop({
//             style: [styles.overlay, overlayStyle],
//             activeOpacity: 1,
//             disabled: withBackDrop === undefined || withBackDrop === false,
//             onPress:
//               withBackDrop === undefined || withBackDrop === false ? undefined : onBackDropPress,
//           })
//         )}
//       </Modal>
//     );
//   };

//   return Platform.OS === 'ios'
//     ? renderModalWithGestureCapture()
//     : renderModalWithoutGestureCapture();
// }

// const styles = StyleSheet.create({
//   overlay: {
//     width: '100%',
//     height: '100%',
//     flex: 1,
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.6)', // change this to use theme color
//   },

//   scrollContentContainer: {
//     flex: 1,
//   },
// });

import React from 'react';
import {
  Modal,
  Platform,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
  useWindowDimensions,
} from 'react-native';
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from 'react-native-keyboard-aware-scroll-view';
import {useKeyboard} from '@react-native-community/hooks';

interface IPropsRNModal {
  visible: boolean;
  statusBarTranslucent?: boolean;
  transparent?: boolean;
  onShowModal?: () => void;
  onDismissModal?: () => void; // only works for iOS. for android ondismiss should be considered to execute manually
  shouldBeScrollAwared?: boolean;
  scrollAwareConfig?: KeyboardAwareScrollViewProps;
  withBackDrop?: boolean;
  onHardwareBackPress?: () => void; // hardware back button handler
  onBackDropPress?: () => void; // only available if withBackDrop is true
  children: React.ReactNode;
  overlayStyle?: StyleProp<ViewStyle>;
}

const RNModal: React.FC<IPropsRNModal> = ({
  visible = false,
  statusBarTranslucent = true,
  transparent = true,
  onShowModal,
  onDismissModal,
  shouldBeScrollAwared = false,
  scrollAwareConfig,
  withBackDrop = false,
  onHardwareBackPress,
  onBackDropPress,
  children,
  overlayStyle,
}) => {
  const {keyboardShown, keyboardHeight} = useKeyboard();

  const RenderBackDrop = (props: any) => {
    return withBackDrop ? (
      <Pressable {...props}>{children}</Pressable>
    ) : (
      <View {...props}>{children}</View>
    );
  };

  const renderModal = (gestureCapture: boolean) => {
    return (
      <Modal
        visible={visible}
        animationType="slide"
        supportedOrientations={['portrait', 'landscape']}
        statusBarTranslucent={statusBarTranslucent}
        transparent={transparent}
        onShow={onShowModal}
        onDismiss={Platform.OS === 'ios' ? onDismissModal : undefined}
        onRequestClose={Platform.OS === 'ios' ? undefined : onHardwareBackPress}
        presentationStyle="overFullScreen">
        {shouldBeScrollAwared ? (
          <KeyboardAwareScrollView
            {...scrollAwareConfig}
            automaticallyAdjustKeyboardInsets
            keyboardShouldPersistTaps="always">
            {RenderBackDrop({
              style: [styles.overlay, overlayStyle],
              activeOpacity: 1,
              disabled: !withBackDrop,
              onPress: withBackDrop ? onBackDropPress : undefined,
            })}
            {keyboardShown && <View style={{height: keyboardHeight, width: '100%'}} />}
          </KeyboardAwareScrollView>
        ) : (
          RenderBackDrop({
            style: [styles.overlay, overlayStyle],
            activeOpacity: 1,
            disabled: !withBackDrop,
            onPress: withBackDrop ? onBackDropPress : undefined,
          })
        )}
      </Modal>
    );
  };

  return renderModal(Platform.OS === 'ios');
};

const styles = StyleSheet.create({
  overlay: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // change this to use theme color
  },
});

export default RNModal;
