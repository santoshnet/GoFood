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

export const getProductByCategory = async (token,category_id) => {
  const body = {
    token: token,
    category_id:category_id
    };
  return await API({
    method: 'POST',
    url: 'api/v1/products',
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
export const getAllOffers = async () => {
  return await API({
    method: 'GET',
    url: 'api/v1/offers',
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

export const getUserCart = async (token) => {
  const body = {
    token: token
      };
  return await API({
    method: 'POST',
    url: 'api/v1/userCart',
    data: body,
  }).then(res => {
    return res;
  });
};

export const getCartDetails = async (token) => {
  const body = {
    token: token
      };
  return await API({
    method: 'POST',
    url: 'api/v1/cartDetails',
    data: body,
  }).then(res => {
    return res;
  });
};


export const addCart = async (token,productId,quantity) => {
  const body = {
    "token":token,
    "product_id":productId,
    "quantity":quantity
 };
  return await API({
    method: 'POST',
    url: 'api/v1/addCart',
    data: body,
  }).then(res => {
    return res;
  });
};

export const updateCart = async (token,productId,quantity) => {
  const body = {
    "token":token,
    "product_id":productId,
    "quantity":quantity
 };
  return await API({
    method: 'POST',
    url: 'api/v1/updateCart',
    data: body,
  }).then(res => {
    return res;
  });
};

export const updateUserData = async (token,mobile,address,state,city,zip) => {
  const body = {
    "mobile": mobile,
    "token":token,
    "address":address,
    "state":state,
    "city":city,
    "zip":zip
 };
  return await API({
    method: 'POST',
    url: 'api/v1/update_user',
    data: body,
  }).then(res => {
    return res;
  });
};

export const placeOrder = async (token,orderItems) => {
  const body = {
    "token":token,
    "orderItems":orderItems,
  
 };
  return await API({
    method: 'POST',
    url: 'api/v1/placeOrder',
    data: body,
  }).then(res => {
    return res;
  });
};

export const orderDetails = async (token) => {
  const body = {
    "token":token  
 };
  return await API({
    method: 'POST',
    url: 'api/v1/orderDetails',
    data: body,
  }).then(res => {
    return res;
  });
};

