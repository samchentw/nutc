import axios from 'axios';

export default {
  // 登入api
  loginApi(loginData) {
    return axios.post('../api/auth/login',loginData);
  },

  // 註冊
  registerApi(data){
    return axios.post('../api/consumer/register',data);
  },

  // 



  //存token
  saveToken(value) {
    window.localStorage.setItem("nutc", value);
  },

  //取token
  getToken() {
    return window.localStorage.getItem("nutc");
  },

  // //清token
  clearToken() {
    window.localStorage.removeItem("nutc");
  }
}