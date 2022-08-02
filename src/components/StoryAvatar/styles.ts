import { StyleSheet } from 'react-native';
import { Colors, moderateScale } from '../../theme';

const styles = StyleSheet.create({
  image: {
    height: '95%',
    width: '95%',
    borderRadius: moderateScale(35),
  },
  imageContainer: {
    height: moderateScale(70),
    width: moderateScale(70),
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(35),
    borderColor: Colors.pink,
    borderWidth: 2,
    marginRight: 10,
  },
});

export default styles;
