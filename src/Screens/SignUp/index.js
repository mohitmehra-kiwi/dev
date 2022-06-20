/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from 'react';
import {Text, View, Keyboard, Alert} from 'react-native';

import {ConstantText} from '../../Constants/ConstantText';
import {BaseStyle} from '../../Constants/BaseStyle';
import SignInBanner from '../../Components/ViewContainer/signInBanner';
import styles from './style';
import KeyboardAvoidView from '../../Components/ViewContainer/keyboardAvoidView';
import NormalButton from '../../Components/Button/NormalButton';
import {goBack, reset} from '../../Navigation/NavigationService';
import {
  emailValidation,
  MobileValidation,
  nameValidation,
  passwordValidate,
  UserNameValidation,
} from '../../Constants/Validation';
import {useDispatch, useSelector} from 'react-redux';
import {onSignUp} from '../../redux/actions/auth.action';
import {SIGN_UP} from '../../Constants/ActionsConst';
import {ROUTE_NAME} from '../../Constants/RouteName';
import {AsyncStorageConstant} from '../../Constants/AsyncStoreConst';
import {STATE_OF_APP} from '../../Constants/AppConst';
import Loader from '../../Components/ViewContainer/Loader';
import {StoreDataLocally} from '../../Helper/DataStorage';
import CustomFloatingInput, {
  Input_Type,
} from '../../Components/FloatInput/CustomFloatingInput';

const SignUp = () => {
  const {signUpData} = useSelector(store => store.authReducer);
  const dispatch = useDispatch();
  const [fields, setFields] = useState({
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    referralCode: '',
    zipCode: '',
  });
  const [errors, setErrors] = React.useState({});

  const handleError = (input, error) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  const handleOnChange = (input, text) => {
    setFields(prevState => ({...prevState, [input]: text?.trim()}));
  };

  const updateAppState = async () => {
    await StoreDataLocally(
      AsyncStorageConstant.STATE_OF_APP,
      STATE_OF_APP.SELECT_TEAM,
    );
  };

  const onPressSignUp = async () => {
    Keyboard.dismiss();
    let isValid = true;
    const UsernameValidateValue = UserNameValidation(fields.userName);
    const emailValidationValue = emailValidation(fields.email);
    const pwdValidationValue = passwordValidate(fields.password);
    const firstNameValidationValue = nameValidation(
      fields.firstName,
      'firstName',
    );
    const lastNameValidationValue = nameValidation(fields.lastName, 'lastName');
    const mobileValidationValue = MobileValidation(fields.phoneNumber);
    if (!emailValidationValue.Status) {
      isValid = false;
      handleError('email', emailValidationValue.errorMsg);
    }
    if (!pwdValidationValue.Status) {
      isValid = false;
      handleError('password', pwdValidationValue.errorMsg);
    }
    if (!UsernameValidateValue.Status) {
      isValid = false;
      handleError('userName', UsernameValidateValue.errorMsg);
    }
    if (!firstNameValidationValue.Status) {
      isValid = false;
      handleError('firstName', firstNameValidationValue.errorMsg);
    }
    if (!lastNameValidationValue.Status) {
      isValid = false;
      handleError('lastName', lastNameValidationValue.errorMsg);
    }
    if (!mobileValidationValue.Status) {
      isValid = false;
      handleError('phoneNumber', mobileValidationValue.errorMsg);
    }
    if (isValid) {
      const params = {
        username: fields.userName,
        first_name: fields.firstName,
        last_name: fields.lastName,
        email: fields.email,
        password: fields.password,
        phone_number: fields.phoneNumber,
        zipcode: fields.zipCode,
        referral_code: fields.referralCode,
      };
      dispatch(onSignUp(params));
    }
  };

  React.useEffect(() => {
    switch (signUpData.status) {
      case SIGN_UP.SUCCESS:
        updateAppState();
        reset({
          index: 0,
          routes: [{name: ROUTE_NAME.SELECT_TEAM}],
        });
        break;

      case SIGN_UP.FAIL:
        Alert.alert(signUpData.failed);
        break;

      default:
        break;
    }
  }, [signUpData.status]);

  return (
    <View style={BaseStyle.flex1}>
      {signUpData.loading && <Loader />}
      <KeyboardAvoidView>
        <SignInBanner />
        <View style={styles.mainContainer}>
          <Text style={styles.signUpText}>{ConstantText.SIGN_UP}</Text>
          <Text style={styles.createAccount}>
            {ConstantText.CREATE_ACCOUNT_DESC}
          </Text>
          <CustomFloatingInput
            label={ConstantText.USER_NAME}
            value={fields.userName}
            onChangeText={value => handleOnChange(Input_Type.userName, value)}
            onFocus={() => handleError(Input_Type.userName, null)}
            error={errors.userName}
            inputType={Input_Type.userName}
          />
          <View style={[BaseStyle.inRow, BaseStyle.spaceBetween]}>
            <View style={styles.halfWidth}>
              <CustomFloatingInput
                label={ConstantText.FIRST_NAME}
                value={fields.firstName}
                onChangeText={value =>
                  handleOnChange(Input_Type.firstName, value)
                }
                onFocus={() => handleError(Input_Type.firstName, null)}
                error={errors.firstName}
                inputType={Input_Type.firstName}
              />
            </View>
            <View style={styles.halfWidth}>
              <CustomFloatingInput
                label={ConstantText.LAST_NAME}
                value={fields.lastName}
                onChangeText={value =>
                  handleOnChange(Input_Type.lastName, value)
                }
                error={errors.lastName}
                inputType={Input_Type.lastName}
                onFocus={() => handleError(Input_Type.lastName, null)}
              />
            </View>
          </View>
          <CustomFloatingInput
            label={ConstantText.EMAIL}
            value={fields.email}
            onChangeText={value => handleOnChange(Input_Type.email, value)}
            error={errors.email}
            inputType={Input_Type.email}
            onFocus={() => handleError(Input_Type.email, null)}
          />
          <CustomFloatingInput
            label={ConstantText.MOBILE}
            value={fields.phoneNumber}
            onChangeText={value =>
              handleOnChange(Input_Type.phoneNumber, value)
            }
            error={errors.phoneNumber}
            inputType={Input_Type.phoneNumber}
            onFocus={() => handleError(Input_Type.phoneNumber, null)}
          />
          <CustomFloatingInput
            label={ConstantText.PASSWORD}
            value={fields.password}
            onChangeText={value => handleOnChange(Input_Type.password, value)}
            error={errors.password}
            inputType={Input_Type.password}
            onFocus={() => handleError(Input_Type.password, null)}
            secureTextEntry
          />
          <CustomFloatingInput
            label={ConstantText.REFERAL_CODE}
            value={fields.referralCode}
            onChangeText={value =>
              handleOnChange(Input_Type.referralCode, value)
            }
            maxLength={10}
            error={errors.referralCode}
            inputType={Input_Type.referralCode}
            onFocus={() => handleError(Input_Type.referralCode, null)}
          />
          <CustomFloatingInput
            label={ConstantText.ZIP_CODE}
            value={fields.zipCode}
            onChangeText={value => handleOnChange(Input_Type.zipCode, value)}
            error={errors.zipCode}
            inputType={Input_Type.zipCode}
            maxLength={5}
            onFocus={() => handleError(Input_Type.zipCode, null)}
          />
          <View style={styles.TNCView}>
            <Text style={styles.termOfServiceDesc}>
              {ConstantText.TERMOFSERVICE_DESC}
            </Text>
            <Text style={styles.termOfServiceDesc}>
              <Text style={styles.termOfServicePrivacyPolicy}>
                {ConstantText.TERMOFSERVICE}
              </Text>
              <Text style={styles.andOperator}> & </Text>
              <Text style={styles.termOfServicePrivacyPolicy}>
                {ConstantText.PRIVACY_POLICY}
              </Text>
            </Text>
          </View>
          <NormalButton
            title={ConstantText.SIGN_UP}
            CustomButtonStyle={styles.CustomButtonStyle}
            onPress={onPressSignUp}
          />
          <NormalButton
            title={ConstantText.SIGN_IN}
            CustomButtonStyle={styles.joinNowStyle}
            customTextStyle={styles.joinNowText}
            onPress={() => goBack()}
          />
          <Text style={styles.exploreAsGuest}>
            {ConstantText.EXPLORE_AS_GUEST}
          </Text>
        </View>
      </KeyboardAvoidView>
    </View>
  );
};

export default SignUp;
