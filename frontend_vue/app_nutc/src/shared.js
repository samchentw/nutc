var key = "nutc"

//存token
function saveToken(value) {
  window.localStorage.setItem(key, value);
}

//取token
function getToken() {
    return window.localStorage.getItem(key);
  }
  
  // //清token
  function clearToken() {
    window.localStorage.removeItem(key);
  }
  
  