import { moderateScale } from './Metrics';

const type = {
  avenirBold: 'AvenirNext-Bold',
  avenirMedium: 'Avenir-Medium',
};

const size = {
  large: moderateScale(20),
  regular: moderateScale(17),
  header: moderateScale(17),
  medium: moderateScale(16),
  light: moderateScale(14),
  mdLight: moderateScale(13),
  small: moderateScale(12),
  smaller: moderateScale(11),
  tiny: moderateScale(8.5),
  label: moderateScale(16),
};

export default {
  type,
  size,
};
