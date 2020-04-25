export default{
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