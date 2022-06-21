import { StyleSheet } from 'react-native';
import { scale, moderateScale, verticalScale } from '../../theme/Metrics';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingBottom: verticalScale(8),
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingVertical: verticalScale(15),
    paddingHorizontal: scale(12),
  },
  sendIcon: {
    width: moderateScale(24),
    height: moderateScale(24),
    marginRight: scale(8),
  },
  sendText: {
    color: 'grey',
    paddingRight: scale(16),
  },
  sectionStyle: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: moderateScale(24),
    overflow: 'hidden',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: scale(8),
  },
  ImageStyle: {
    padding: moderateScale(10),
    margin: moderateScale(5),
    height: moderateScale(25),
    width: moderateScale(25),
    resizeMode: 'stretch',
    alignItems: 'center',
  },
});

export default styles;
