import {StyleSheet} from 'react-native';


const styles = StyleSheet.create({
  conntainer: {
    flex: 1,
  },
  headerProfile: {
    flexDirection: 'row',
    alignSelf: 'center',
    padding: 30,
    // backgroundColor: 'black',
    alignItems: 'center',
  },
  avatarStyle: {alignSelf: 'center'},
  username: {marginTop: 4, fontSize: 15, textAlign: 'center'},
  email: {marginTop: 1, fontSize: 12, opacity: 0.5, textAlign: 'center'},
  logoutContainer: {
    alignSelf: 'center',
    backgroundColor: 'red',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  drawerContentStyle: {
    // backgroundColor: 'white',
  },
  button: {
    borderWidth: 0.5,
    borderRadius: 100,
    padding: 0.7,
    width: 28,
    alignSelf: 'center',
  },
});

export default styles;
