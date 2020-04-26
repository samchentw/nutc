<template>
  <div>

 <div class = "container-fluid">
    <div class="row">
        <div class="col-lg-4 col-md-4 col-sm-6 portfolio-item">
        </div>
        <div class="col-lg-4 col-md-4 col-sm-6 portfolio-item">
            <div v-if="type==1">
            <div class="alert alert-success" role="alert">
                會員登入
            </div>
            
            <div class="card">
                <div class="card-body">
                   <form>
                        <div class="form-group">
                            <label for="exampleInputEmail1">帳號</label>
                            <input type="email"  v-model="loginData.account" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">密碼</label>
                            <input type="password"  v-model="loginData.password"  class="form-control" id="exampleInputPassword1">
                        </div>
                        
                        <button type="button" class="btn btn-primary" style="margin-right:10px" v-on:click="login()">登入</button>
                        <button type="submit" class="btn btn-primary" v-on:click="changePage(2)">註冊</button>
                   
                    </form>
                </div>
            </div>
            </div>

            <div v-if="type==2">
             <div class="alert alert-success" role="alert">
                <a href="javascript:void(0)" style="font-size:20px;color:black"  v-on:click="changePage(1)">←</a>
                   會員註冊
            </div>
            <div class="card">
                <div class="card-body">
                    <form>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                            <label for="inputEmail4">Email</label>
                            <input type="email" class="form-control" id="inputEmail4">
                            </div>
                            <div class="form-group col-md-6">
                            <label for="inputPassword4">Password</label>
                            <input type="password" class="form-control" id="inputPassword4">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputAddress">Address</label>
                            <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St">
                        </div>
                        <div class="form-group">
                            <label for="inputAddress2">Address 2</label>
                            <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor">
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                            <label for="inputCity">City</label>
                            <input type="text" class="form-control" id="inputCity">
                            </div>
                            <div class="form-group col-md-4">
                            <label for="inputState">State</label>
                            <select id="inputState" class="form-control">
                                <option selected>Choose...</option>
                                <option>...</option>
                            </select>
                            </div>
                            <div class="form-group col-md-2">
                            <label for="inputZip">Zip</label>
                            <input type="text" class="form-control" id="inputZip">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="gridCheck">
                            <label class="form-check-label" for="gridCheck">
                                Check me out
                            </label>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary">註冊</button>
                        
                        </form>
                </div>
            </div>
            </div>
            
             
           
            
        </div>
        <div class="col-lg-4 col-md-4 col-sm-6 portfolio-item">
        </div>
    </div>
 </div>
  </div>
</template>

<script>

import axios from 'axios';
import Swal from 'sweetalert2'
import apiService from '../apiService'
export default {
  name: 'Login',
  props: {
    msg: String
  }, 
  data() {
     return {
        loginData:{
            account: "",
            password:""
        },
        registerData:{

        },
        type:1
      }
   },
   methods: {
    changePage(type){
        this.type=type;
    },
    login() {      
      if(this.loginData.account == "" || this.loginData.password == ""){        
        Swal.fire("不能有空值")
        return;
      }
      axios
      .post('../api/auth/login',this.loginData)
      .then((x) => {
        // location.href = "http://www.google.com/"
        // Swal.fire("登入成功！");
        Swal.fire({
        title: '系統訊息',
        text: "登入成功！",
        icon: 'success',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: '確定'
        }).then((result) => {
         location.href = "./#/";
        if (result.value) {
            window.location.reload();
            }
        })
        apiService.saveToken(x.data.token);
      
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
