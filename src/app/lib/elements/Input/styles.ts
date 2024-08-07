import {StyleSheet} from 'react-native';


const epFormStyles = StyleSheet.create({
  searchInput: {
    borderColor: '#DEE4F4',
    // borderWidth: wp(0.1),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 3,
    borderRadius: 5,
  },

  inputWrapper: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 16.41,
    minHeight: 40,
    maxHeight: 100,
  },

  textAreaWrapper: {
    borderWidth: 1,
    borderColor: '#C9CDD4',
    padding: 8,
    height: 120,
  },
});

export default epFormStyles;
