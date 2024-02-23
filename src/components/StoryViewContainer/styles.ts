import { StyleSheet } from 'react-native';
import { Colors, Metrics, moderateScale } from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: moderateScale(40),
    backgroundColor: Colors.black,
  },
  itemContainer: {
    flex: 1,
    width: Metrics.screenWidth,
  },
  touchContainer: {
    flex: 1,
  },
  list: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  loaderStyle: {
    flex: 1,
    alignSelf: 'center',
  },
});

export default styles;
