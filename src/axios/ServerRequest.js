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

export const userLogin = async (phone, password, fcm_id) => {
  const body = {
    phone: phone,
    password: password,
    fcm_id: fcm_id,
  };
  return await API({
    method: 'POST',
    url: 'api/users/login/',
    data: body,
  }).then(res => {
    return res;
  });
};
export const getAllBanners = async () => {
  return await API({
    method: 'GET',
    url: 'api/config/images/',
  }).then(res => {
    return res;
  });
};
