import API, {BASE_URL} from './API';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-simple-toast';
import {getToken} from '../utils/LocalStorage';

export const checkInternetConnection = () => {
  NetInfo.fetch().then(state => {
    if (state.isConnected === false) {
      Toast.showWithGravity(
        'No internet connection',
        Toast.SHORT,
        Toast.BOTTOM,
      );
    }
  });
};

export const userLogin = async (email, password, firebase_token) => {
  const body = {
    email: email,
    password: password,
    firebase_token: firebase_token,
  };
  return await API({
    method: 'POST',
    url: 'api/v1/login',
    data: body,
  }).then(res => {
    return res;
  });
};
export const userRegister = async (name,email, password, firebase_token) => {
  const body = {
    name: name,
    email: email,
    password: password,
    firebase_token: firebase_token,
  };
  return await API({
    method: 'POST',
    url: 'api/v1/register',
    data: body,
  }).then(res => {
    return res;
  });
};

export const otpVerification = async (email, otp) => {
  const body = {
    email: email,
    otp: otp,
  };
  return await API({
    method: 'POST',
    url: 'api/v1/verify_otp',
    data: body,
  }).then(res => {
    return res;
  });
};

export const resendOTP = async (email) => {
  const body = {
    email: email
    };
  return await API({
    method: 'POST',
    url: 'api/v1/resend_otp',
    data: body,
  }).then(res => {
    return res;
  });
};

export const getCategories = async (token) => {
  const body = {
    token: token
    };
  return await API({
    method: 'POST',
    url: 'api/v1/categories',
    data: body,
  }).then(res => {
    return res;
  });
};

export const getHomePage = async (token) => {
  const body = {
    token: token
    };
  return await API({
    method: 'POST',
    url: 'api/v1/homepage',
    data: body,
  }).then(res => {
    return res;
  });
};
export const getNewProduct = async (token) => {
  const body = {
    token: token
    };
  return await API({
    method: 'POST',
    url: 'api/v1/newProducts',
    data: body,
  }).then(res => {
    return res;
  });
};

export const getAllBanners = async () => {
  return await API({
    method: 'GET',
    url: 'api/v1/banners',
  }).then(res => {
    return res;
  });
};


export const searchProduct = async text => {
  return await API({
    method: 'GET',
    url: `api/v1/product/search?s=${text}`,
  }).then(res => {
    return res;
  });
};
