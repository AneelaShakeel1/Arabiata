import {useIsFocused} from '@react-navigation/native';
import {Icon} from '@rneui/themed';
import {FormikHelpers, FormikProps, FormikValues} from 'formik';
import {useLayoutEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, Image, Modal, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import StarRating from 'react-native-star-rating-widget';
import Toast from 'react-native-toast-message';
import {useAppConfig} from '~/app/data/hooks/common/useAppConfig';
import {useHDrawer} from '~/app/data/hooks/common/useDrawer';
import {AkButton, AkText, AkView} from '~/app/lib/elements';
import Col from '~/app/lib/elements/AkView/Col/Col';
import AkInputWithFormik from '~/app/lib/elements/Input/AkInput';
import {ratingAndReviewFormInitialValues} from '~/app/lib/global/forms/initialValues';
import {ratingAndReviewFormValidationSchema} from '~/app/lib/global/forms/schema';
import useAKThemeImages from '~/app/lib/hooks/useAKImages';
import useAKTheme from '~/app/lib/hooks/useAKTheme';
import FormikWrapper from '~/app/lib/wrappers/formik';

export default function Rating(props: any) {
  const [collectRatingAndReview, setCollectRatingAndReview] = useState(false);
  const [ratingAndReviewList, setRatingAndReviewList] = useState<null | any[]>(null);
  const {t} = useTranslation();
  const isFocused = useIsFocused();
  const {colors} = useAKTheme();
  const {ArrowBack, Navigation, Logo} = useAKThemeImages();
  const {newRating, ratingList} = useHDrawer();
  const {language} = useAppConfig();

  useLayoutEffect(() => {
    callGetRatingAndReviewListAPI();
  }, [isFocused]);

  async function callGetRatingAndReviewListAPI() {
    const result = await ratingList();
    if (result?.data) {
      setRatingAndReviewList(result.data);
    }
    // console.log(result.state[0], "AREA LIST STATE");
    // console.log(result.branch[0], "AREA LIST BRANCH");
  }

  function RatingAndReviewForm({
    handleSubmit,
    values,
    setFieldValue,
    handleChange,
  }: FormikProps<FormikValues>) {
    return (
      <>
        <StarRating
          rating={values.rating}
          onChange={(rating) => {
            setFieldValue('rating', rating);
          }}
          color={colors.colorPrimary}
          style={{alignSelf: language === 'en' ? 'flex-start' : 'flex-end'}}
        />
        <AkInputWithFormik name="review" placeholder={t('type_your_description')} />
        <AkButton
          btnText={t('submit')}
          onClick={handleSubmit}
          containerStyles={{marginVertical: 20}}
        />
      </>
    );
  }

  async function onSubmit(values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) {
    console.log('FORMIK RATING AND REVIEW FINAL FORM VALUES', values);
    const result = await newRating(values);
    console.log(result);
    setCollectRatingAndReview(false);
    if (result?.message && result.status === 1) {
      Toast.show({position: 'bottom', text1: result?.message});
    } else {
      Toast.show({
        position: 'bottom',
        text1: 'You have already submitted your review',
        type: 'error',
      });
    }
  }

  return (
    <SafeAreaView style={{flex: 1, width: '100%'}}>
      <AkView
        style={{
          backgroundColor: colors.gray_orange,
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 60,
          paddingHorizontal: 10,
        }}>
        <TouchableWithoutFeedback onPress={() => props.navigation?.openDrawer()}>
          <Image source={Navigation} style={{width: 25, height: 25}} />
        </TouchableWithoutFeedback>
        <AkView>
          <AkText style={{fontWeight: 'bold', fontSize: 18}}>{t('ratting_amp_review')}</AkText>
        </AkView>
        <AkView>
          <Icon
            name={'plus'}
            type="entypo"
            size={25}
            color={colors.white}
            style={{
              borderRadius: 6,
              alignSelf: 'flex-end',
              backgroundColor: colors.colorPrimary,
              padding: 6,
            }}
            onPress={() => setCollectRatingAndReview(true)}
          />
        </AkView>
      </AkView>
      {ratingAndReviewList && ratingAndReviewList !== null && ratingAndReviewList.length > 0 ? (
        <FlatList
          data={ratingAndReviewList}
          renderItem={({item, index}) => {
            return (
              <Col
                style={{padding: 10, margin: 10, backgroundColor: colors.white, borderRadius: 6}}>
                <AkText>{item.name}</AkText>
                <AkText style={{fontWeight: 'bold', marginLeft: 10, marginVertical: 10}}>
                  {item.comment}
                </AkText>
                <AkView>
                  <StarRating
                    rating={item.ratting}
                    onChange={() => {}}
                    color={colors.colorPrimary}
                  />
                </AkView>
              </Col>
            );
          }}
        />
      ) : (
        <AkView style={{height: '90%', alignItems: 'center', justifyContent: 'center'}}>
          <AkText style={{fontSize: 20, color: colors.black}}>No {t('ratting')} Available</AkText>
        </AkView>
      )}

      {/* AREA LIST */}
      <Modal visible={collectRatingAndReview}>
        <Col
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            paddingHorizontal: 10,
          }}>
          <Col
            style={{
              flex: 0.3,
              backgroundColor: colors.white,
              padding: 10,
              marginBottom: 50,
              borderRadius: 6,
            }}>
            <TouchableOpacity
              onPress={() => setCollectRatingAndReview(false)}
              style={{alignSelf: language === 'en' ? 'flex-start' : 'flex-end'}}>
              <Icon name="close" size={24} color={colors.black} />
            </TouchableOpacity>
            {/* <AkText style={{textAlign: 'right'}} onPress={() => setCollectRatingAndReview(false)}>
              Close
            </AkText> */}
            <AkText style={{marginVertical: 10, fontWeight: 'bold'}}>
              {t('ratting_amp_review')}
            </AkText>
            <FormikWrapper
              initialValues={ratingAndReviewFormInitialValues}
              validationSchema={ratingAndReviewFormValidationSchema}
              onSubmit={onSubmit}
              children={RatingAndReviewForm}
            />
          </Col>
        </Col>
      </Modal>
    </SafeAreaView>
  );
}
