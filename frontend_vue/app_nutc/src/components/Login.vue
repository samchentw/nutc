<template>
 <div class="container">

    <!-- Outer Row -->
    <div class="row justify-content-center">

      <div class="col-xl-10 col-lg-12 col-md-9">

        <div class="card o-hidden border-0 shadow-lg my-5">
          <div class="card-body p-0">
            <!-- Nested Row within Card Body -->
            <div class="row">
              <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
              <div class="col-lg-6">
                <div class="p-5">
                  <div class="text-center">
                    <h1 class="h4 text-gray-900 mb-4">後台系統</h1>
                  </div>
                  <form class="user">
                    <div class="form-group">
                      <input type="email" v-model="loginData.account" class="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="帳號">
                    </div>
                    <div class="form-group">
                      <input type="password"  v-model="loginData.password" class="form-control form-control-user" id="exampleInputPassword" placeholder="密碼">
                    </div>
                    <a href="javascript:void(0)" v-on:click="login()" class="btn btn-primary btn-user btn-block">
                      登入
                    </a>
                    <hr>
        
                  </form>
                  <hr>
                
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>

  </div>
</template>



<script>
import axios from 'axios';
import Swal from 'sweetalert2'
export default {
  name: 'Login',
  props: {
  }, 
  data() {
     return {
        loginData:{
            account: "",
            password:""
        }
      }
   },
   methods: {
    login() {      
      if(this.loginData.account == "" || this.loginData.password == ""){        
        Swal.fire("不能有空值")
        return;
      }
      axios
      .post('../api/auth/login',this.loginData)
      .then((x) => {
        // console.log(x)
        Swal.fire("登入成功！");
        window.localStorage.setItem("nutc", x.data.token);
         location.href = "./#/system/dashboard";
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