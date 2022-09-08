import { StyleSheet } from 'react-native';
import { Colors, moderateScale, verticalScale } from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grey,
  },
  storyAvatarContainer: {
    marginTop: verticalScale(40),
    alignSelf: 'center',
  },
  storyContainer: {
    paddingTop: moderateScale(40),
    backgroundColor: 'black',
    flex: 1,
  },
});

export default styles;
