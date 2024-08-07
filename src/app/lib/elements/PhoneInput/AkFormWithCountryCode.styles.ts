import {StyleSheet} from 'react-native';

const epFormWithCountryCodeStyles = StyleSheet.create({
  formView: {},
  lableTxt: {
    fontSize: 12,
    paddingVertical: 2,
    fontFamily : "Ubuntu Regular"
  },
  rowView: {
    flexDirection: 'row',
    // borderBottomWidth: 0.5,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },

  formText: {
    fontSize: 16,
  },
});

export default epFormWithCountryCodeStyles;
