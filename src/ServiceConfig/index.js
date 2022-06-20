import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import {Messages} from '../Constants/Messages';
import {getBaseUrl} from '../Constants/AppConst';
import {API_URLS, MULTIPARTS} from './EndPoints';

const getAxiosObj = async (apiInfo, data, userInfo) => {
  const {access_token} = userInfo?.token ?? {};
  let contType = 'application/json;charset=utf-8';
  let obj = {};
  if (apiInfo.contType) {
    contType = apiInfo.contType;
  }
  const object = {
    method: apiInfo.type,
    baseURL: getBaseUrl(),
    url: apiInfo.name,
    headers: {
      'Content-Type': contType,
    },
  };

  if (apiInfo.type !== 'get') {
    obj = {...object, data};
  } else {
    obj = {...object};
  }

  if (access_token) {
    obj.headers.Authorization = 'Bearer ' + access_token;
  }
  return obj;
};

const apiCall = async (apiInfo, data, params, userInfo) => {
  return new Promise(async (resolve, reject) => {
    const axiosObj = await getAxiosObj(apiInfo, data, userInfo);
    if (params) {
      let queryStringArr = [];
      for (let key of Object.keys(params)) {
        queryStringArr.push(key + '=' + params[key]);
      }
      axiosObj.url = `${axiosObj.url}?${queryStringArr.join('&')}`;
    }
    const {isConnected} = await NetInfo.fetch();
    console.log(JSON.stringify(axiosObj), 'axiosObj===>');
    if (isConnected) {
      axios(axiosObj)
        .then(res => {
          resolve(res.data);
        })
        .catch(error => {
          console.log(JSON.stringify(error), 'error====>');
          if (error?.response) {
            reject(error?.response?.data?.detail);
          } else if (error?.request) {
            reject(error?.request);
          } else {
            reject(error?.message);
          }
        });
    } else {
      reject({message: Messages.NO_INTERNET_CONNECTION});
    }
  });
};

export const signUp = data => {
  return apiCall(API_URLS.SIGN_UP, data, null);
};

export const signIn = data => {
  return apiCall(API_URLS.SIGN_IN, data, null);
};

export const forgotOtp = data => {
  return apiCall(API_URLS.FORGOT_OTP, data, null);
};

export const forgotOtpVerify = data => {
  return apiCall(API_URLS.FORGOT_OTP_VERIFY, data, null);
};
