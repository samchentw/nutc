<template>
  
  <div id="wrapper">

    <!-- Sidebar -->
    <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

      <!-- Sidebar - Brand -->
      <a class="sidebar-brand d-flex align-items-center justify-content-center" href="javascript:void(0)">
        <div class="sidebar-brand-icon rotate-n-15">
          <i class="fas fa-laugh-wink"></i>
        </div>
        <div class="sidebar-brand-text mx-3">後台系統</div>
      </a>

      <!-- Divider -->
      <hr class="sidebar-divider my-0">

      <!-- Nav Item - Dashboard -->
      <li class="nav-item">
        <a class="nav-link" href="./#/system/dashboard">
          <i class="fas fa-fw fa-tachometer-alt"></i>
          <span>資訊版</span></a>
      </li>

      <li class="nav-item">
        <a class="nav-link" href="./#/system/user">
          <i class="fas fa-fw fa-user"></i>
          <span>會員資料</span></a>
      </li>

      <li class="nav-item">
        <a class="nav-link" href="./#/system/contact">
          <i class="fas fa-fw fa-file"></i>
          <span>聯絡資訊</span></a>
      </li>

       <hr class="sidebar-divider">

      <!-- Heading -->
      <div class="sidebar-heading">
        活動管理
      </div>


      <li class="nav-item">
        <a class="nav-link" href="./#/system/activity">
          <i class="fas fa-fw fa-camera-retro"></i>
          <span>活動設定</span></a>
      </li>


    
      <hr class="sidebar-divider">

      <!-- Heading -->
      <div class="sidebar-heading">
        商家設定
      </div>


      <li class="nav-item">
        <a class="nav-link" href="./#/system/shop">
          <i class="fas fa-fw fa-store"></i>
          <span>商家資料</span></a>
      </li>

       <li class="nav-item">
        <a class="nav-link" href="./#/system/product">
          <i class="fas fa-fw fa-book"></i>
          <span>產品管理</span></a>
      </li>

      <!-- Divider -->
      <hr class="sidebar-divider">

      <!-- Heading -->
      <div class="sidebar-heading">
        系統設定
      </div>

      <li class="nav-item">
        <a class="nav-link" href="./#/system/setting">
          <i class="fas fa-fw fa-cog"></i>
          <span>設定</span></a>
      </li>

     

      <!-- Divider -->
      <hr class="sidebar-divider d-none d-md-block">

      <!-- Sidebar Toggler (Sidebar) -->
     

    </ul>
    <!-- End of Sidebar -->

    <!-- Content Wrapper -->
    <div id="content-wrapper" class="d-flex flex-column">

      <!-- Main Content -->
      <div id="content">

        <!-- Topbar -->
        <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

          <!-- Sidebar Toggle (Topbar) -->
          <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
            <i class="fa fa-bars"></i>
          </button>

          <!-- Topbar Search -->
          <!-- <form class="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
            <div class="input-group">
              <input type="text" class="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2">
              <div class="input-group-append">
                <button class="btn btn-primary" type="button">
                  <i class="fas fa-search fa-sm"></i>
                </button>
              </div>
            </div>
          </form> -->

          <!-- Topbar Navbar -->
          <ul class="navbar-nav ml-auto">

            <!-- Nav Item - Search Dropdown (Visible Only XS) -->
            <li class="nav-item dropdown no-arrow d-sm-none">
              <a class="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-search fa-fw"></i>
              </a>
              <!-- Dropdown - Messages -->
              <div class="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
                <form class="form-inline mr-auto w-100 navbar-search">
                  <div class="input-group">
                    <input type="text" class="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2">
                    <div class="input-group-append">
                      <button class="btn btn-primary" type="button">
                        <i class="fas fa-search fa-sm"></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </li>

           

            <div class="topbar-divider d-none d-sm-block"></div>

            <!-- Nav Item - User Information -->
            <li class="nav-item dropdown no-arrow">
              <a v-if = "userInfo.account" class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span class="mr-2 d-none d-lg-inline text-gray-600 small">{{userInfo.userinfo.name}}</span>
                <img class="img-profile rounded-circle" src="user.png">
              </a>
              <!-- Dropdown - User Information -->
              <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                <a class="dropdown-item" href="./#/system/info">
                  <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                  個人資料
                </a>
                <a class="dropdown-item" href="./#/system/setting">
                  <i class="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                  設定
                </a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="javascript:void(0)" v-on:click="logout()" data-toggle="modal" data-target="#logoutModal">
                  <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                  登出
                </a>
              </div>
            </li>

          </ul>

        </nav>
        <!-- End of Topbar -->

        <!-- Begin Page Content -->
        <div class="container-fluid">

          <!-- Page Heading -->
          <router-view></router-view>

        </div>
        <!-- /.container-fluid -->

      </div>
      <!-- End of Main Content -->

      <!-- Footer -->
      <footer class="sticky-footer bg-white">
        <div class="container my-auto">
          <div class="copyright text-center my-auto">
            <span>鹿港文化藝術復興 2020</span>
          </div>
        </div>
      </footer>
      <!-- End of Footer -->

    </div>
    <!-- End of Content Wrapper -->

  </div>
  <!-- End of Page Wrapper -->

 
  
</template>



<script>
import axios from 'axios';
import Swal from 'sweetalert2'
import apiService from '../../apiService'
import messageService from '../../messageService'

export default {
  name: 'AdminLayout',
  props: {
  },
  data() {
    return {
      userInfo:{}
    }
  },
  created() {
    apiService.permissionApi()
      .then((x) => {
        this.getInfo()
      }) 
      .catch(() => {
          Swal.fire("沒有權限！");
           location.href = "./#/";
      });
    
  },
   methods: {
    logout() {
       apiService.clearToken();
         location.href = "./#/";
         Swal.fire("已登出！")
    },
    getInfo(){
       apiService.getInfo()
      .then((x) => {
        this.userInfo = x.data ;
      }) 
      .catch(() => {
          Swal.fire("登入失敗！");
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>