import {Formik, FormikConfig, FormikProps, FormikValues} from 'formik';
// import {AkLoader, AkText} from '../elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

function FormikChildrenRender({formik, Render}: {formik: FormikProps<FormikValues>; Render: any}) {
  const {top, bottom} = useSafeAreaInsets();

  // if (formik.isSubmitting) return <AkLoader loading={formik.isSubmitting} />;
  return (
    // <Render {...formik} />
    <KeyboardAwareScrollView
      // keyboardShouldPersistTaps={'handled'}
      enableResetScrollToCoords
      enableOnAndroid
      style={{paddingBottom: bottom}}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      <Render {...formik} />
    </KeyboardAwareScrollView>
  );
}

const FormikWrapper = (props: FormikConfig<FormikValues>) => {
  return (
    <Formik
      {...props}
      children={(formik) => <FormikChildrenRender formik={formik} Render={props.children} />}
    />
  );
};

export default FormikWrapper;














