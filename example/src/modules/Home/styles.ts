import { StyleSheet } from 'react-native';
import { verticalScale, moderateScale, Colors } from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: moderateScale(10),
    paddingTop: verticalScale(20)
  },
  button: {
    borderRadius: 10,
    backgroundColor: Colors.blue,
    width: '100%',
    padding: moderateScale(10),
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(40)
  },
  text: {
    alignSelf: 'center',
    color: Colors.white,
    fontWeight: 'bold'
  }
});

export default styles;
