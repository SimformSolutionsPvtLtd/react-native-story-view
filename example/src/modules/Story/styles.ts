import { StyleSheet } from 'react-native';
import { Colors, moderateScale, verticalScale } from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  storyWrapper: {
    flex: 1,
    marginTop: verticalScale(40),
    marginHorizontal: moderateScale(10)
  },
  albumText: {
    fontSize: moderateScale(30),
    marginHorizontal: moderateScale(10),
    color: Colors.white,
    fontWeight: 'bold',
    marginBottom: verticalScale(20)
  },
  separator: {
    marginHorizontal: moderateScale(6)
  }
});

export default styles;
