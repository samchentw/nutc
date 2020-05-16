import axios from 'axios';
// import apiService from './apiService'
export default {
  // 登入api
  loginApi(loginData) {
    return axios.post('../api/auth/login', loginData);
  },

  // 註冊
  registerApi(data) {
    return axios.post('../api/consumer/register', data);
  },

  // 取得個人資料
  getInfo() {
    return axios.get('../api/users/info', {
      headers: {
        Authorization: 'Bearer ' + this.getToken()
      }
    });
  },

  // 權限確認
  permissionApi() {
    return axios
      .get('../api/auth/admin/permission', {
        headers: {
          Authorization: 'Bearer ' + this.getToken()
        }
      })
  },

  getAllUser(){
    return axios.get('../api/users/admin/getAllUser',{headers:{
      Authorization: 'Bearer ' + this.getToken()
    }});
  },

  
  //settings

  getSettingKeys(data) {
    return axios.post('../api/setting/getKeys', data);
  },

  updateSetting(data){
    return axios.put('../api/setting/setByKey',data,{headers:{
      Authorization: 'Bearer ' + this.getToken()
    }});
  },



  // 店家CRUD
  createShopApi(data) {
    return axios.post('../api/shop/create', data, {
      headers: {
        Authorization: 'Bearer ' + this.getToken()
      }
    });
  },

  updateShopApi(id, data) {
    return axios.put('../api/shop/' + id, data, {
      headers: {
        Authorization: 'Bearer ' + this.getToken()
      }
    })
  },

  getShopPage(skip) {
    return axios.get('../api/shop/page?take=10&skip=' + skip);
  },

  deleteShopById(id){
    return  axios.delete('../api/shop/'+id,{
      headers:{
         Authorization: 'Bearer ' + this.getToken()
      }
    });
  },

  // 產品種類CRUD
  getProductType(){
    return  axios.get('../api/productType/getAll');
  },

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