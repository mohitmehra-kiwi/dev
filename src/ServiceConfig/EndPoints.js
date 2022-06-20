export const MULTIPARTS =
  'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW';

export const API_URLS = {
  SIGN_UP: {
    name: '/accounts/sign-up/',
    type: 'POST',
  },
  SIGN_IN: {
    name: '/accounts/login/',
    type: 'POST',
  },
  FORGOT_OTP: {
    name: '/accounts/forget-otp/',
    type: 'POST',
  },
  FORGOT_OTP_VERIFY: {
    name: '/accounts/forget-otp-verify/',
    type: 'POST',
  },
};
