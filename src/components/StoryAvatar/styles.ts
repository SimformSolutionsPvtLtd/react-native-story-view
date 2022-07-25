import { StyleSheet } from 'react-native';
import { Colors, moderateScale } from '../../theme';

const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
  },
  imageContainer: {
    height: moderateScale(70),
    width: moderateScale(70),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(35),
    borderColor: Colors.pink,
    borderWidth: 2,
    padding: 1,
    marginRight: 10,
  },
});

export default styles;
