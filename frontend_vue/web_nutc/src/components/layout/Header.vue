<template>
  <div>
    <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-light top-nav fixed-top">
        <div class="container">
            <a class="navbar-brand" href="index.html">
            <img src="images/logo.png" alt="logo" />
            </a>
            <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
				<span class="fas fa-bars"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
               <ul class="navbar-nav ml-auto">
                  <li class="nav-item">
                     <a class="nav-link" v-bind:class="{ 'active': route=='/' }"  href="./#/">首頁</a>
                  </li>

                  <li class="nav-item">
                     <a class="nav-link" v-bind:class="{ 'active': route=='/aboutus' }"  href="./#/aboutus">關於我們</a>
                  </li>

                  <li class="nav-item">
                     <a class="nav-link" v-bind:class="{ 'active': route=='/activity' }"  href="./#/activity">活動</a>
                  </li>


                  <li class="nav-item">
                     <a class="nav-link" v-bind:class="{ 'active': route=='/shop/1' }"  href="./#/shop/1">美食介紹</a>
                  </li>

                  <li class="nav-item">
                     <a class="nav-link" v-bind:class="{ 'active': route=='/shop/0' }"  href="./#/shop/0">商家介紹</a>
                  </li>

                  <li class="nav-item">
                     <a class="nav-link" v-bind:class="{ 'active': route=='/product' }"  href="./#/product">產品</a>
                  </li>

                  <li class="nav-item">
                     <a class="nav-link" v-bind:class="{ 'active': route=='/contact' }"  href="./#/contact">聯絡我們</a>
                  </li>
                 
         
                  <li class="nav-item dropdown" v-if="token">
                     <a class="nav-link dropdown-toggle"  href="javascript:void(0)"  v-bind:class="{ 'active': (route=='/user' || route == '/shoppingCart')  }" id="navbarDropdownBlog" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                     會員中心
                     </a>
                     <div class="dropdown-menu dropdown-menu-right"  aria-labelledby="navbarDropdownBlog">
                        <a class="dropdown-item"   href="./#/user">個人資料</a>
                        <a class="dropdown-item" href="./#/shoppingCart">購物車</a>
                        <a class="dropdown-item" href="pricing.html">我的記錄</a>
                     </div>
                  </li>
                  <li class="nav-item" v-if="!token" >
                     <a class="nav-link"  v-bind:class="{ 'active': route=='/login' }"   href="./#/login">登入</a>
                  </li>
                  <li class="nav-item" v-if="token">
                     <a class="nav-link" v-on:click="logout()" href="javascript:void(0)">登出</a>
                  </li>
               </ul>
            </div>
        </div>
    </nav>
<div class="full-title"  style="margin-bottom:20px">
		<div class="container">
			<!--
         <h1 class="mt-4 mb-3">About
				<small>Subheading</small>
			</h1>
          -->
			
		</div>
	</div>
    
  </div>
</template>

<script>
import apiService from '../../apiService'
// import TestStore from '../store/test.store'
import axios from 'axios';
import Swal from 'sweetalert2'
export default {
  name: 'Header',
  props: {
    // msg: String
  },
   data() {
    return {
      token:"",
      route:"/"
    }
  },
  watch: {
  '$route' (to, from) {
     this.route=to.path;
      // console.log(this.route)
  }
},
   created() {
     this.token =  apiService.getToken();
  },
  methods: {
    logout() {
       apiService.clearToken();
         location.href = "./#/";
         // this.token =  apiService.getToken();
         Swal.fire("已登出！")
          window.location.reload();
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar{
   background-color:#FFF3E0!important
}

.navbar-dark .navbar-nav .show > .nav-link, .navbar-dark .navbar-nav .active > .nav-link, .navbar-dark .navbar-nav .nav-link.show, .navbar-dark .navbar-nav .nav-link.active{
   color:black;
}

.navbar-dark .navbar-toggler{
   color:#4e3914;
}
</style>
