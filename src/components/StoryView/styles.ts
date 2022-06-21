import { StyleSheet } from 'react-native';
import { Metrics, moderateScale, scale, verticalScale } from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  divStory: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  imgStyle: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  imageOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    resizeMode: 'contain',
  },
  progressiveImageContainer: {
    backgroundColor: 'transparent',
  },
  parentView: {
    flexDirection: 'row',
  },
  customView: {
    position: 'absolute',
    flexDirection: 'column',
    width: Metrics.screenWidth,
  },
  topView: {
    position: 'absolute',
    flexDirection: 'column',
    width: Metrics.screenWidth,
    zIndex: 99,
  },
  bottomView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'baseline',
    textAlignVertical: 'bottom',
    paddingTop: '3%',
    paddingBottom: '2%',
  },
  progressView: {
    flex: 1,
    width: '100%',
    position: 'absolute',
    flexDirection: 'row',
  },
  contentVideoView: {
    height: Metrics.screenHeight,
    width: Metrics.screenWidth,
    backgroundColor: 'transparent',
  },
  progressBarArray: {
    flexDirection: 'row',
    position: 'absolute',
    top: verticalScale(10),
    width: '98%',
    height: verticalScale(10),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressBarContainer: {
    flex: 1,
    margin: moderateScale(2),
    borderRadius: verticalScale(10),
  },
  currentBarContainer: {
    position: 'absolute',
    top: 0,
    margin: 0,
  },
  //UserHeaderView
  userContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  barUsername: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(50),
    marginLeft: scale(8),
  },
  verifyIcon: {
    width: moderateScale(20),
    height: moderateScale(20),
    marginLeft: scale(5),
  },
  closeIcon: {
    width: moderateScale(25),
    height: moderateScale(25),
    marginRight: scale(8),
  },
  userView: {
    flexDirection: 'row',
    position: 'absolute',
    top: verticalScale(30),
    width: '98%',
    alignItems: 'center',
  },
  name: {
    fontSize: moderateScale(18),
    fontWeight: '500',
    marginLeft: 12,
    color: 'white',
  },
  time: {
    fontSize: moderateScale(12),
    fontWeight: '400',
    marginTop: verticalScale(3),
    marginLeft: scale(12),
    color: 'white',
  },
  loader: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderView: {
    flex: 1,
    position: 'absolute',
    top: '50%',
    left: '45%',
  },
});

export default styles;
