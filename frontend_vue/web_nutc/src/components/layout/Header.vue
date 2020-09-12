<template>
  <div>
    <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-light top-nav fixed-top">
      <div class="container">
        <a class="navbar-brand" href="index.html">
          <img src="images/logo.png" alt="logo" />
        </a>
        <button
          class="navbar-toggler navbar-toggler-right"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="fas fa-bars"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a class="nav-link" v-bind:class="{ 'active': route=='/' }" href="./#/">首頁</a>
            </li>

            <li class="nav-item">
              <a
                class="nav-link"
                v-bind:class="{ 'active': route=='/aboutus' }"
                href="./#/aboutus"
              >關於我們</a>
            </li>

            <li class="nav-item">
              <a
                class="nav-link"
                v-bind:class="{ 'active': route=='/activity' }"
                href="./#/activity"
              >活動</a>
            </li>

            <li class="nav-item">
              <a
                class="nav-link"
                v-bind:class="{ 'active': route=='/shop/1' }"
                href="./#/shop/1"
              >美食介紹</a>
            </li>

            <li class="nav-item">
              <a
                class="nav-link"
                v-bind:class="{ 'active': route=='/shop/0' }"
                href="./#/shop/0"
              >商家介紹</a>
            </li>

            <li class="nav-item">
              <a
                class="nav-link"
                v-bind:class="{ 'active': route=='/product' }"
                href="./#/product"
              >產品</a>
            </li>

            <li class="nav-item">
              <a
                class="nav-link"
                v-bind:class="{ 'active': route=='/contact' }"
                href="./#/contact"
              >聯絡我們</a>
            </li>

            <li class="nav-item dropdown" v-if="token">
              <a
                class="nav-link dropdown-toggle"
                href="javascript:void(0)"
                v-bind:class="{ 'active': (route=='/user' || route == '/shoppingCart')  }"
                id="navbarDropdownBlog"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >會員中心</a>
              <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownBlog">
                <a class="dropdown-item" href="./#/user">個人資料</a>
                <a class="dropdown-item" href="./#/shoppingCart">購物車</a>
                <!-- <a class="dropdown-item" href="pricing.html">我的記錄</a> -->
              </div>
            </li>
            <li class="nav-item" v-if="!token">
              <a class="nav-link" v-bind:class="{ 'active': route=='/login' }" href="./#/login">登入</a>
            </li>
            <li class="nav-item" v-if="token">
              <a class="nav-link" v-on:click="logout()" href="javascript:void(0)">登出</a>
            </li>
          </ul>

          <span  v-if="user" class="badge badge-success">帳號：{{user.account}},你好！{{user.userinfo.name}}</span>
          <!-- <span v-if="user">你好：{{user.userinfo.name}}</span> -->
        </div>
      </div>
    </nav>
    <div>
      <div class="ff" style="margin-bottom:80px;height:220px;">
        <img v-if="type==1" src="cover/S__40017923.jpg" style="width:100%;height:450;" alt srcset />
        <img v-if="type==2" src="cover/S__40017927.jpg" style="width:100%;height:450;" alt srcset />
        <img v-if="type==3" src="cover/S__40027080.jpg" style="width:100%;height:450;" alt srcset />
        <img v-if="type==4" src="cover/S__40027082.jpg" style="width:100%;height:450;" alt srcset />
      </div>

      <div
        id="carouselExampleControls"
        class="carousel slide gg"
        data-ride="carousel"
        style="height:450px"
      >
        <div class="carousel-inner">
          <div class="carousel-item active" style="height:550px">
            <img
              class="d-block w-100"
              style="padding-bottom:150px"
              src="cover/S__40017923.jpg"
              height="100%"
              alt="First slide"
            />
          </div>
          <div class="carousel-item" style="height:550px">
            <img
              class="d-block w-100"
              style="padding-bottom:150px"
              src="cover/S__40017927.jpg"
              height="100%"
              alt="Second slide"
            />
          </div>

          <div class="carousel-item" style="height:550px">
            <img
              class="d-block w-100"
              style="padding-bottom:150px"
              src="cover/S__40027080.jpg"
              height="100%"
              alt="thire slide"
            />
          </div>
          <div class="carousel-item" style="height:550px">
            <img
              class="d-block w-100"
              style="padding-bottom:150px"
              src="cover/S__40027082.jpg"
              height="100%"
              alt="four slide"
            />
          </div>
        </div>
        <a
          class="carousel-control-prev"
          href="#carouselExampleControls"
          role="button"
          data-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a
          class="carousel-control-next"
          href="#carouselExampleControls"
          role="button"
          data-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import apiService from '../../apiService';
// import TestStore from '../store/test.store'
import axios from 'axios';
import Swal from 'sweetalert2';
export default {
  name: 'Header',
  props: {
    // msg: String
  },
  data() {
    return {
      token: '',
      route: '/',
      slide: 0,
      sliding: null,
      type: 1,
      user:null
    };
  },
  watch: {
    $route(to, from) {
      this.route = to.path;
      console.log(this.route);
    },
  },
  created() {

    var token = apiService.getToken()
    if(token){
      apiService.getUserinfo().then(x=>{
        this.user =x.data;
        console.log(x.data)
      });
    }

    setInterval(() => {
      this.type += 1;
      if (this.type == 5) this.type = 1;
    }, 5000);
    // console.log(this.$route.path)
    this.route = this.$route.path;
    this.token = apiService.getToken();
  },
  methods: {
    logout() {
      apiService.clearToken();
      location.href = './#/';
      // this.token =  apiService.getToken();
      Swal.fire('已登出！');
      window.location.reload();
    },
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  font-family: arial, 'Microsoft JhengHei', '微軟正黑體', sans-serif !important;
  /* font-weight:bold; */
}

.navbar {
  background-color: #fff3e0 !important;
}

.navbar-dark .navbar-nav .show > .nav-link,
.navbar-dark .navbar-nav .active > .nav-link,
.navbar-dark .navbar-nav .nav-link.show,
.navbar-dark .navbar-nav .nav-link.active {
  color: black;
}

.navbar-dark .navbar-toggler {
  color: #4e3914;
}

@media only screen and (max-width: 500px) {
  .gg {
    /* visibility: hidden !important; */
    display: none;
  }
}

@media screen and (min-width: 500px) {
  .ff {
    /* visibility: hidden !important; */
    display: none;
  }
}
</style>
