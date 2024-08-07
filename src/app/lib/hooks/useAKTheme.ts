// import {commonStyles} from '~/assets';
import {StyleSheet} from 'react-native';
import {Theme, theme} from '@assets/theme';
import { useAppConfig } from '~/app/data/hooks/common/useAppConfig';


export default function useAKTheme() {
  const {themeMode} = useAppConfig();

  // console.log(themeMode, "themeMode");
  
  let appTheme = {
    ...theme.common, 
    ...(themeMode === 'dark' ? theme.dark : theme.light),  
  };

  const viewStyles = StyleSheet.create({
    safeContainer: {
      flex: 1,
      backgroundColor: 'black',
    },
    fullContainer: {
      width: '100%',
      height: '100%',
      // opacity: 0.1,
    },
    flexShrink: {
      flexShrink: 1,
    },
    flex1: {
      flex: 1,
    },
    flex2: {
      flex: 2,
    },
    flex3: {
      flex: 3,
    },
    rowContainer: {
      flexDirection: 'row',
    },
    flexWrap: {
      flexWrap: 'wrap',
    },
    columnContainer: {
      flexDirection: 'column',
    },
    indicator: {
      width: 5,
      borderRadius: 2.5,
      marginRight: 6,
    },
    line1: {
      width: '100%',
      height: 1,
      borderTopWidth: 1,
      // borderColor: appTheme?.colors.bc01,
    },
    line2: {
      width: '100%',
      height: 2,
      borderTopWidth: 2,
      // borderColor: appTheme?.colors.bc01,
    },
    line3: {
      width: '100%',
      height: 1,
      borderTopWidth: 1,
      // borderColor: appTheme?.colors.bc01,
    },
    searchDim: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      backgroundColor: 'black',
      opacity: 0.7,
    },
    border: {
      borderRadius: 8,
      borderWidth: 1,
      borderStyle: 'solid',
      // borderColor: appTheme?.colors.bc01,
    },
    borRad8: {
      borderRadius: 8,
    },
    flex1Center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    flex1End: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    },
    flex2Center: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    flex1_justifyContentEnd: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
  });

  const heightStyles = StyleSheet.create({
    s1: {
      height: 1,
    },
    s2: {
      height: 2,
    },
    s3: {
      height: 3,
    },
    s5: {
      height: 5,
    },
    s6: {
      height: 6,
    },
    s7: {
      height: 7,
    },
    s8: {
      height: 8,
    },
    s10: {
      height: 10,
    },
    s12: {
      height: 12,
    },
    s15: {
      height: 15,
    },
    s16: {
      height: 16,
    },
    s18: {
      height: 18,
    },
    s19: {
      height: 19,
    },
    s20: {
      height: 20,
    },
    s23: {
      height: 23,
    },
    s24: {
      height: 24,
    },
    s26: {
      height: 26,
    },
    s30: {
      height: 30,
    },
    s32: {
      height: 32,
    },
    s36: {
      height: 36,
    },
    s40: {
      height: 40,
    },
    s44: {
      height: 44,
    },
    s45: {
      height: 45,
    },
    s50: {
      height: 50,
    },
    s60: {
      height: 60,
    },
    s80: {
      height: 80,
    },
    s84: {
      height: 84,
    },
    s100: {
      height: 100,
    },
    s260: {
      height: 260,
    },
    s300: {
      height: 300,
    },
  });

  const widthStyles = StyleSheet.create({
    s2: {
      width: 2,
    },
    s3: {
      width: 3,
    },
    s5: {
      width: 5,
    },
    s7: {
      width: 7,
    },
    s8: {
      width: 8,
    },
    s10: {
      width: 10,
    },
    s14: {
      width: 14,
    },
    s15: {
      width: 15,
    },
    s16: {
      width: 16,
    },
    s20: {
      width: 20,
    },
    s24: {
      width: 24,
    },
    s30: {
      width: 30,
    },
    s45: {
      width: 45,
    },
    s50: {
      width: 50,
    },
    s60: {
      width: 60,
    },
    s84: {
      width: 84,
    },
    s280: {
      width: 280,
    },
    s300: {
      width: 300,
    },
  });

  const paddingStyles = StyleSheet.create({
    top10: {
      paddingTop: 10,
    },
    top20: {
      paddingTop: 20,
    },
    top30: {
      paddingTop: 30,
    },
    top40: {
      paddingTop: 40,
    },
    top50: {
      paddingTop: 50,
    },
    top60: {
      paddingTop: 60,
    },

    bottom10: {
      paddingBottom: 10,
    },
    bottom40: {
      paddingBottom: 40,
    },
    bottom60: {
      paddingBottom: 60,
    },
    bottom80: {
      paddingBottom: 80,
    },
    vertical20: {
      paddingVertical: 20,
    },
    vertical30: {
      paddingTop: 30,
      paddingBottom: 30,
    },
    horizontal16: {
      paddingHorizontal: 16,
    },
    horizontal20: {
      paddingHorizontal: 20,
    },
    horizontal40: {
      paddingHorizontal: 40,
    },
    horizontal10: {
      paddingHorizontal: 10,
    },
    h25: {paddingHorizontal: 25},
    vertical10: {
      paddingVertical: 10,
    },
    vertical15: {
      paddingVertical: 15,
    },
    p20: {
      padding: 20,
    },
    p10: {
      padding: 10,
    },
  });

  const marginStyles = StyleSheet.create({
    left10: {
      marginLeft: 10,
    },
    left16: {
      marginLeft: 16,
    },
    left14: {
      marginLeft: 14,
    },
    left20: {
      marginLeft: 20,
    },
    left7: {
      marginLeft: 7,
    },
    left30: {
      marginLeft: 30,
    },
    right10: {
      marginRight: 10,
    },
    right16: {
      marginRight: 16,
    },
    right14: {
      marginRight: 14,
    },
    right30: {
      marginRight: 30,
    },
    bottom10: {
      marginBottom: 10,
    },
    bottom16: {
      marginBottom: 16,
    },
    horizontal10: {
      marginLeft: 10,
      marginRight: 10,
    },
    horizontal16: {
      marginHorizontal: 16,
    },
    horizontal14: {
      marginHorizontal: 14,
    },
    horizontal20: {
      marginHorizontal: 20,
    },
    horizontal30: {
      marginHorizontal: 30,
    },
    horizontal35: {
      marginHorizontal: 35,
    },
    verticle10: {
      marginVertical: 10,
    },
    verticle15: {
      marginTop: 15,
      marginBottom: 15,
    },
    verticle25: {
      marginTop: 25,
      marginBottom: 25,
    },
    scrollbar30: {
      marginLeft: 30,
      marginRight: 19,
    },
    margin10: {
      margin: 10,
    },
    top30: {
      marginTop: 30,
    },
    top10: {
      marginTop: 10,
    },
    top15: {
      marginTop: 15,
    },
    top50: {
      marginTop: 50,
    },
  });

  const alignItemsStyles = StyleSheet.create({
    center: {
      alignItems: 'center',
    },
    flexStart: {
      alignItems: 'flex-start',
    },
    flexEnd: {
      alignItems: 'flex-end',
    },
  });

  const justifyContentStyles = StyleSheet.create({
    center: {
      justifyContent: 'center',
    },
    flexStart: {
      justifyContent: 'flex-start',
    },
    flexEnd: {
      justifyContent: 'flex-end',
    },
    spaceBetween: {
      justifyContent: 'space-between',
    },
  });

  const alignStyles = StyleSheet.create({
    middleCenter: {
      ...alignItemsStyles.center,
      ...justifyContentStyles.center,
    },
  });

  const rectStyles = StyleSheet.create({
    s20: {
      width: 20,
      height: 20,
    },
    s24: {
      width: 24,
      height: 24,
    },
    s56: {
      width: 56,
      height: 56,
    },
    s36: {
      width: 36,
      height: 36,
    },
  });

  const inputStyles = StyleSheet.create({
    text: {
      // fontFamily: 'Poppins-Light',
      fontSize: 14,
      lineHeight: 19.6,
      paddingVertical: 0,
    },
    text10: {
      // fontFamily: 'Poppins-Light',
      fontSize: 10,
      // lineHeight: 19.6,
      // paddingVertical: 0,
    },
    text12: {
      fontSize: 12,
    },
    text14: {
      fontSize: 14,
    },
    text16: {
      fontSize: 16,
    },
    text18: {
      fontSize: 18,
    },
    text20: {
      fontSize: 20,
      lineHeight: 19.6,
      paddingVertical: 0,
    },
    text24: {
      fontSize: 24,
    },
    boldText: {
      fontSize: 30,
      paddingVertical: 0,
      fontWeight: 'bold',
    },
    logoText: {
      fontSize: 20,
      paddingVertical: 0,
      color: appTheme?.colors.white,
    },
    centerAligntext: {
      fontSize: 17,
      textAlign: 'center',
      color: appTheme?.colors.white,
      backgroundColor: 'transparent',
    },
  });

  const profileStyles = StyleSheet.create({
    profileImage45: {
      width: 45,
      height: 45,
      borderRadius: 25,
      borderWidth: 1,
      // borderColor: appTheme?.colors.imageBorderColor,
      alignItems: 'center',
      justifyContent: 'center',
    },
    profile36: {
      width: 40,
      height: 40,
      borderRadius: 20,
      borderWidth: 1,
      // borderColor: appTheme?.colors.imageBorderColor,
      alignItems: 'center',
      justifyContent: 'center',
    },
    profileImage36: {
      width: 38,
      height: 38,
      borderRadius: 19,
    },
    profile24: {
      width: 24,
      height: 24,
      borderRadius: 24,
      borderWidth: 1,
      // borderColor: appTheme?.colors.bc14,
      alignItems: 'center',
      justifyContent: 'center',
    },

    profile28: {
      width: 28,
      height: 28,
      borderRadius: 24,
      borderWidth: 1,
      // borderColor: appTheme?.colors.bc14,
      alignItems: 'center',
      justifyContent: 'center',
    },

    profileImage24: {
      width: 24,
      height: 24,
      borderRadius: 24,
      borderWidth: 2,
      // borderColor: appTheme?.colors.bc14,
    },
    profile18: {
      width: 18,
      height: 18,
      borderRadius: 18,
      borderWidth: 1,
      // borderColor: appTheme?.colors.bc14,
      alignItems: 'center',
      justifyContent: 'center',
    },
    profileImage18: {
      width: 17,
      height: 17,
      borderRadius: 17,
    },
  });

  const leftStyles = StyleSheet.create({
    l10: {
      left: 10,
    },
  });

  const textAlignStyles = StyleSheet.create({
    center: {
      textAlign: 'center',
    },
    justify: {
      textAlign: 'center',
    },
    auto: {
      textAlign: 'auto',
    },
    left: {
      textAlign: 'left',
    },
    right: {
      textAlign: 'right',
    },
  });

  return {
    ...appTheme,
    // commonStyles,
    viewStyles,
    heightStyles,
    widthStyles,
    paddingStyles,
    marginStyles,
    alignItemsStyles,
    justifyContentStyles,
    alignStyles,
    rectStyles,
    inputStyles,
    profileStyles,
    leftStyles,
    textAlignStyles,
  };
}