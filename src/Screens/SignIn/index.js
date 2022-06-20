/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from 'react';
import {Text, View, Keyboard, Alert} from 'react-native';
import TouchID from 'react-native-touch-id';
import {useDispatch, useSelector} from 'react-redux';

import {ConstantText} from '../../Constants/ConstantText';
import {
  EmailUserNameValidate,
  passwordValidate,
} from '../../Constants/Validation';
import {ROUTE_NAME} from '../../Constants/RouteName';
import {navigation, reset} from '../../Navigation/NavigationService';
import SignInBanner from '../../Components/ViewContainer/signInBanner';
import KeyboardAvoidView from '../../Components/ViewContainer/keyboardAvoidView';
import {BaseStyle} from '../../Constants/BaseStyle';
import styles from './style';
import NormalButton from '../../Components/Button/NormalButton';
import {onSignIn} from '../../redux/actions/auth.action';
import {SIGN_IN} from '../../Constants/ActionsConst';
import {AsyncStorageConstant} from '../../Constants/AsyncStoreConst';
import {STATE_OF_APP} from '../../Constants/AppConst';
import Loader from '../../Components/ViewContainer/Loader';
import {StoreDataLocally} from '../../Helper/DataStorage';
import CustomFloatingInput, {
  Input_Type,
} from '../../Components/FloatInput/CustomFloatingInput';

const SignIn = () => {
  const {signInData} = useSelector(store => store.authReducer);
  const [fields, setFields] = useState({
    userName: '',
    password: '',
  });
  const [errors, setErrors] = React.useState({});
  const dispatch = useDispatch();

  const authanticateFaceId = () => {
    TouchID.authenticate('to demo this react-native component')
      .then(success => console.log('Login SuccessFully', success))
      .catch(error => console.log('Login Failed', error));
  };

  const handleOnChange = (input, text) => {
    setFields(prevState => ({...prevState, [input]: text?.trim()}));
  };

  const handleError = (input, error) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  const onPressSignIn = async () => {
    Keyboard.dismiss();
    let isValid = true;
    const emailValidationValue = EmailUserNameValidate(fields.userName);
    const pwdValidationValue = passwordValidate(fields.password);
    if (!emailValidationValue.Status) {
      isValid = false;
      handleError('userName', emailValidationValue.errorMsg);
    }
    if (!pwdValidationValue.Status) {
      isValid = false;
      handleError('password', pwdValidationValue.errorMsg);
    }
    if (isValid) {
      const params = {
        password: fields.password,
      };
      if (fields.userName.includes('@')) params.email = fields.userName;
      else params.username = fields.userName;
      dispatch(onSignIn(params));
    }
  };

  const updateAppState = async () => {
    await StoreDataLocally(
      AsyncStorageConstant.STATE_OF_APP,
      STATE_OF_APP.BOTTOM_TAB,
    );
    reset({
      index: 0,
      routes: [{name: ROUTE_NAME.BOTTOM_TAB}],
    });
  };

  React.useEffect(() => {
    switch (signInData.status) {
      case SIGN_IN.SUCCESS:
        updateAppState();
        break;

      case SIGN_IN.FAIL:
        Alert.alert(signInData.failed);
        break;

      default:
        break;
    }
  }, [signInData.status]);

  return (
    <View style={BaseStyle.flex1}>
      <KeyboardAvoidView CustomStyle={styles.CustomStyle}>
        {signInData.loading && <Loader />}
        <SignInBanner />
        <View style={styles.mainContainer}>
          <Text style={styles.signInText}>{ConstantText.SIGN_IN}</Text>
          <Text style={styles.enterCrdentialDesc}>
            {ConstantText.ENTER_CRDENTIAL_DESC}
          </Text>
          <CustomFloatingInput
            label={ConstantText.EMAIL_MOBILE_USERNAME}
            value={fields.userName}
            onChangeText={value => handleOnChange(Input_Type.userName, value)}
            error={errors.userName}
            onFocus={() => handleError(Input_Type.userName, null)}
          />
          <CustomFloatingInput
            label={ConstantText.PASSWORD}
            value={fields.password}
            onChangeText={value => handleOnChange(Input_Type.password, value)}
            onFocus={() => handleError(Input_Type.password, null)}
            error={errors.password}
            secureTextEntry
          />
          <View style={{width: '40%'}}>
            <Text
              style={styles.forgotPassword}
              onPress={() => navigation(ROUTE_NAME.FORGOT_PASSWORD)}>
              {ConstantText.FORGOT_PASSWORD}?
            </Text>
          </View>
          <Text onPress={authanticateFaceId} style={styles.signInWithFaceId}>
            {ConstantText.SIGNIN_WITHFACEID}
          </Text>
          <NormalButton
            title={ConstantText.SIGN_IN}
            CustomButtonStyle={styles.CustomButtonStyle}
            onPress={onPressSignIn}
          />
          <NormalButton
            title={ConstantText.NEW_USER}
            CustomButtonStyle={styles.joinNowStyle}
            customTextStyle={styles.joinNowText}
            onPress={() => navigation(ROUTE_NAME.SIGN_UP)}
          />
          <Text
            // onPress={() => navigation(ROUTE_NAME.BOTTOM_TAB)}
            style={styles.exploreAsGuest}>
            {ConstantText.EXPLORE_AS_GUEST}
          </Text>
        </View>
      </KeyboardAvoidView>
    </View>
  );
};

export default SignIn;
