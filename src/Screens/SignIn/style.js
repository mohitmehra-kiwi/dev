import {StyleSheet} from 'react-native';
import {COLORS} from '../../Constants/Colors';
import {FONTS} from '../../Constants/Fonts';
import {
  normalizeFont,
  scaleHeight,
  scaleWidth,
} from '../../Constants/DynamicSize';
import {BaseStyle} from '../../Constants/BaseStyle';

const style = StyleSheet.create({
  mainContainer: {
    ...BaseStyle.flex1,
    backgroundColor: COLORS.white,
    paddingHorizontal: scaleWidth(20),
    paddingTop: scaleWidth(20),
    marginTop: scaleHeight(146),
    borderTopLeftRadius: scaleHeight(16),
    borderTopRightRadius: scaleHeight(16),
  },
  CustomStyle: {
    backgroundColor: COLORS.white,
  },
  signInText: {
    fontSize: normalizeFont(30),
    fontFamily: FONTS.MontserratBold,
    lineHeight: scaleHeight(38),
    color: COLORS.black,
  },
  enterCrdentialDesc: {
    marginTop: scaleHeight(9),
    fontSize: normalizeFont(14),
    fontFamily: FONTS.WorkSansRegular,
    lineHeight: scaleHeight(22),
    color: COLORS.black,
  },
  forgotPassword: {
    marginTop: scaleHeight(14),
    textDecorationLine: 'underline',
    fontFamily: FONTS.WorkSansRegular,
    lineHeight: scaleHeight(24),
    color: COLORS.black,
  },
  signInWithFaceId: {
    textDecorationLine: 'underline',
    fontFamily: FONTS.WorkSansMedium,
    fontSize: normalizeFont(15),
    lineHeight: scaleHeight(24),
    textAlign: 'center',
    marginTop: scaleHeight(30),
    color: COLORS.black,
  },
  CustomButtonStyle: {
    marginTop: scaleHeight(19),
  },
  joinNowStyle: {
    marginTop: scaleHeight(25),
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.black,
  },
  joinNowText: {
    color: COLORS.black,
  },
  exploreAsGuest: {
    textDecorationLine: 'underline',
    fontFamily: FONTS.PoppinsRegular,
    fontSize: normalizeFont(16),
    lineHeight: scaleHeight(22),
    marginTop: scaleHeight(40),
    textAlign: 'center',
    color: COLORS.black,
  },
});

export default style;
