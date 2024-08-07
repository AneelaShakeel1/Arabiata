import {Icon} from '@rneui/themed';
import {FormikHelpers, FormikProps, FormikValues} from 'formik';
import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Alert, Image, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {useHSettings} from '~/app/data/hooks/common/useSettings';
import {useHUser} from '~/app/data/hooks/common/useUser';
import {AkButton, AkText, AkView} from '~/app/lib/elements';
import Col from '~/app/lib/elements/AkView/Col/Col';
import Row from '~/app/lib/elements/AkView/Row/Row';
import AkCheckbox from '~/app/lib/elements/Checkbox/AkCheckbox';
import AkInputWithFormik from '~/app/lib/elements/Input/AkInput';
import {editProfileFormInitialValues} from '~/app/lib/global/forms/initialValues';
import {editProfileFormValidationSchema} from '~/app/lib/global/forms/schema';
import useAKThemeImages from '~/app/lib/hooks/useAKImages';
import useAKTheme from '~/app/lib/hooks/useAKTheme';
import FormikWrapper from '~/app/lib/wrappers/formik';
import Header from '~/app/lib/components/Header/Header';
import {useHRedux} from '~/app/data/hooks/common/useRedux';
import {useAppConfig} from '~/app/data/hooks/common/useAppConfig';
import {Avatar} from '@rneui/base';
import {launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditProfile(props: any) {
  const {t} = useTranslation();
  const {colors} = useAKTheme();
  const {
    ArrowBack,
    Navigation,
    EditProfileRed,
    LockRed,
    CoinRed,
    LocationRed,
    UserRed,
    NoteRed,
    InformationRed,
  } = useAKThemeImages();
  const {editProfile} = useHSettings();
  const {loginInfo, setReduxLoginInfo} = useHUser();

  async function onSubmit(values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) {
    console.log('FORMIK EIDT PROFILE FINAL FORM VALUES', values);

    const result = await editProfile(values);
    if (result?.status === 1) {
      setReduxLoginInfo({...result.data});
      await AsyncStorage.setItem('loginInfo', JSON.stringify(result.data));
      Toast.show({
        position: 'bottom',
        text1: 'Updated successfully',
      });
    } else {
      Toast.show({
        position: 'bottom',
        text1: result.error.message,
      });
    }
  }

  function EditProfileForm({handleSubmit, setFieldValue}: FormikProps<FormikValues>) {
    const pickImage = () => {
      const options = {
        mediaType: 'photo',
      };

      launchImageLibrary(options, (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          setFieldValue('profile_image', {
            name: response.assets[0].fileName,
            type: response.assets[0].type,
            uri: response.assets[0].uri,
            size: response.assets[0].fileSize,
          });
        }
      });
    };

    return (
      <>
        {loginInfo ? (
          <Avatar
            onPress={pickImage}
            source={{uri: loginInfo.profile_image}}
            containerStyle={{width: 150, height: 150, alignSelf: 'center', marginVertical: 10}}
          />
        ) : (
          <TouchableOpacity onPress={pickImage} style={{justifyContent: 'center'}}>
            <Col style={{}}>
              <Icon
                name="add-user"
                type="entypo"
                size={50}
                style={{borderRadius: 100, borderWidth: 2, padding: 20}}
              />
              <Col style={{left: 55, bottom: 35}}>
                <Icon
                  name="profile_image"
                  type="antdesign"
                  color={colors.white}
                  size={20}
                  style={{
                    backgroundColor: colors.colorPrimary,
                    width: 35,
                    height: 35,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 100,
                    padding: 4,
                  }}
                />
              </Col>
            </Col>
          </TouchableOpacity>
        )}
        <AkInputWithFormik
          name="name"
          placeholder={loginInfo.name ?? t('full_name')}
          // value={loginInfo.name}
        />
        <AkInputWithFormik
          name="email"
          placeholder={loginInfo.email ?? t('email')}
          keyboardType="email-address"
          // value={loginInfo.email}
          disabled
        />
        <AkInputWithFormik
          name="mobile"
          placeholder={loginInfo.mobile ?? t('mobile')}
          keyboardType="number-pad"
          // value={loginInfo.mobile}
          // disabled
        />

        <AkButton btnText={t('update')} onClick={handleSubmit} containerStyles={{marginTop: 20}} />
      </>
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header title={t('edit_profile')} />
      <Col style={{paddingHorizontal: 20}}>
        <FormikWrapper
          initialValues={{
            profile_image: loginInfo.profile_image,
            name: loginInfo.name,
            email: loginInfo.email,
            mobile: loginInfo.mobile,
          }}
          validationSchema={editProfileFormValidationSchema}
          onSubmit={onSubmit}
          children={EditProfileForm}
        />
      </Col>
    </SafeAreaView>
  );
}
