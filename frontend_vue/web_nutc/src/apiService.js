import axios from 'axios';
// import apiService from './apiService'
export default {
  // 登入api
  loginApi(loginData) {
    return axios.post('../api/auth/login', loginData);
  },
  getUserinfo() {
    return axios.get('../api/users/info', {
      headers: {
        Authorization: 'Bearer ' + this.getToken()
      }
    });
  },
  updateUserData(data) {
    return axios.put('../api/users/info', data, {
      headers: {
        Authorization: 'Bearer ' + this.getToken()
      }
    });
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


  // 消費者api

  addorUpdateNews(data) {
    return axios.post('../api/consumer/addOrUpdateNews', data, {
      headers: {
        Authorization: 'Bearer ' + this.getToken()
      }
    });
  },

  deleteConsumerNews(newId) {
    return axios.delete('../api/consumer/news/' + newId, {
      headers: {
        Authorization: 'Bearer ' + this.getToken()
      }
    });
  },

  getConsumerNews() {
    return axios.get('../api/consumer/newsByUser', {
      headers: {
        Authorization: 'Bearer ' + this.getToken()
      }
    });
  },
  oneNewsByUser(newId) {
    return axios.get('../api/consumer/oneNewsByUser/' + newId, {
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

  getAllUser() {
    return axios.get('../api/users/admin/getAllUser', {
      headers: {
        Authorization: 'Bearer ' + this.getToken()
      }
    });
  },


  //settings

  getSettingKeys(data) {
    return axios.post('../api/setting/getKeys', data);
  },

  updateSetting(data) {
    return axios.put('../api/setting/setByKey', data, {
      headers: {
        Authorization: 'Bearer ' + this.getToken()
      }
    });
  },



  //活動類型R
  getallNewsType() {
    return axios.get('../api/newsType/getAll');
  },

  //活動crud
  getAllBytypeId(id) {
    return axios.get('../api/news/newsType/' + id);
  },

  createNews(data) {
    return axios.post('../api/news', data, {
      headers: {
        Authorization: 'Bearer ' + this.getToken()
      }
    })
  },
  updateNews(data) {
    return axios.put('../api/news/' + data.id, data, {
      headers: {
        Authorization: 'Bearer ' + this.getToken()
      }
    })
  },
  deleteNews(id) {
    return axios.delete('../api/news/' + id, {
      headers: {
        Authorization: 'Bearer ' + this.getToken()
      }
    })
  },

  getNewsById(id) {
    return axios.get('../api/news/' + id)
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

  getshop(id) {
    return axios.get('../api/shop/get/' + id);
  },

  getShopPage(skip) {
    return axios.get('../api/shop/page?take=999&skip=' + 0);
  },

  getShopByType(type) {
    return axios.get('../api/shop/getShopByType/' + type);
  },

  deleteShopById(id) {
    return axios.delete('../api/shop/' + id, {
      headers: {
        Authorization: 'Bearer ' + this.getToken()
      }
    });
  },
  //產品CRUD
  getProducts(skip, productTypeId, showIsSell) {
    return axios.get('../api/product/page?take=999&skip=' + skip + "&productTypeId=" + productTypeId + "&showIsSell=" + showIsSell);
  },
  createProduct(data) {
    return axios.post('../api/product/create', data, {
      headers: {
        Authorization: 'Bearer ' + this.getToken()
      }
    })
  },
  updateProduct(data) {
    return axios.put('../api/product/' + data.id, data, {
      headers: {
        Authorization: 'Bearer ' + this.getToken()
      }
    })
  },

  uploadfile(data) {
    return axios.post('../api/file/upload', data, {
      headers: {
        Authorization: 'Bearer ' + this.getToken()
      }
    })
  },

  // 產品種類CRUD
  getProductType() {
    return axios.get('../api/productType/getAll');
  },

  createProductType(data) {
    return axios.post('../api/productType/create', data, {
      headers: {
        Authorization: 'Bearer ' + this.getToken()
      }
    })
  },

  updateProudctType(data) {
    return axios.put('../api/productType/' + data.id, data, {
      headers: {
        Authorization: 'Bearer ' + this.getToken()
      }
    })
  },

  deleteProductType(id) {
    return axios.delete('../api/productType/' + id, {
      headers: {
        Authorization: 'Bearer ' + this.getToken()
      }
    });
  },

  //order
  createOrder(data) {
    return axios.post('../api/order/create', data, {
      headers: {
        Authorization: 'Bearer ' + this.getToken()
      }
    })
  },

  getOrdersByUser() {
    return axios.get('../api/order/user', {
      headers: {
        Authorization: 'Bearer ' + this.getToken()
      }
    })
  },

  // contact
  createContact(data) {
    return axios.post('../api/contact', data);
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
  },

  getUserProduct() {
    var item = window.localStorage.getItem("userProduct");
    return JSON.parse(item);
  },
  saveUserProduct(value) {
    window.localStorage.setItem("userProduct", JSON.stringify(value));
  }
}