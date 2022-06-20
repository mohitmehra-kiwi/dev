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
    marginTop: scaleHeight(146),
    borderTopLeftRadius: scaleHeight(16),
    borderTopRightRadius: scaleHeight(16),
  },
  signUpText: {
    fontSize: normalizeFont(30),
    fontFamily: FONTS.MontserratBold,
    color: COLORS.black,
    marginTop: scaleHeight(20),
  },
  createAccount: {
    marginTop: scaleHeight(9),
    fontSize: normalizeFont(15),
    fontFamily: FONTS.WorkSansRegular,
    color: COLORS.black,
  },
  floatingInputStyle: {
    color: COLORS.floatingInputColor,
    paddingLeft: 6,
    fontSize: normalizeFont(14),
    fontFamily: FONTS.WorkSansRegular,
  },
  floatingInputContainer: {
    backgroundColor: COLORS.floatingBackground,
    height: scaleHeight(64),
    paddingHorizontal: scaleWidth(20),
    borderRadius: 10,
  },
  floatingLabelColor: {
    colorFocused: COLORS.floatingLabelColor,
    fontSizeFocused: normalizeFont(12),
    color: COLORS.floatingLabelColor,
    fontSize: normalizeFont(14),
    fontFamily: FONTS.WorkSansMedium,
  },
  halfWidth: {
    width: '48%',
  },
  TNCView: {
    marginTop: scaleHeight(20),
  },
  termOfServiceDesc: {
    fontFamily: FONTS.PoppinsRegular,
    fontSize: normalizeFont(13.5),
    textAlign: 'center',
    lineHeight: scaleHeight(21),
    color: COLORS.black,
  },
  termOfServicePrivacyPolicy: {
    textDecorationLine: 'underline',
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
    marginTop: scaleHeight(40),
    marginBottom: scaleHeight(51),
    textDecorationLine: 'underline',
    fontFamily: FONTS.PoppinsRegular,
    fontSize: normalizeFont(16),
    textAlign: 'center',
    color: COLORS.black,
  },
});

export default style;
