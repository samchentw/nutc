<template>
  <div>

 <div class = "container-fluid">
    <div class="row">
        <div class="col-lg-3 col-md-4 col-sm-6 portfolio-item">
        </div>
        <div class="col-lg-6 col-md-4 col-sm-6 portfolio-item">
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
                            <label for="inputEmail4">帳號</label>
                            <input type="text" v-model="registerData.account" class="form-control" id="inputEmail4">
                            </div>
                            <div class="form-group col-md-6">
                            <label for="inputPassword4">密碼</label>
                            <input type="password" v-model="registerData.password" class="form-control" id="inputPassword4">
                            </div>
                        </div>


                         <div class="form-group">
                            <label for="inputAddress2">姓名</label>
                            <input type="text" v-model="registerData.name" class="form-control" id="inputAddress2">
                        </div>

                         <div class="form-group">
                          <b-form-group label="性別">
                            <b-form-radio-group
                                id="radio-group-1"
                                v-model="registerData.gender"
                                :options="options"
                                name="radio-options"
                            ></b-form-radio-group>
                          </b-form-group>
                         
                         </div>

                         <div class="form-group">
                            <label for="inputAddress2">生日</label>
                            <b-form-datepicker v-model="registerData.birthday"  locale="cn"></b-form-datepicker>
                        </div>

                        <div class="form-group">
                            <label for="inputAddress">地址</label>
                            <input type="text" v-model="registerData.address" class="form-control" id="inputAddress" >
                        </div>
                        <div class="form-group">
                            <label for="inputAddress2">電子信箱</label>
                            <input type="text" v-model="registerData.email" class="form-control" id="inputAddress2">
                        </div>




                        
                        <button type="button" v-on:click="register()" class="btn btn-primary">註冊</button>
                        
                        </form>
                </div>
            </div>
            </div>
            
             
           
            
        </div>
        <div class="col-lg-3 col-md-4 col-sm-6 portfolio-item">
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
            "account": "",
            "password": "",
            "name": "",
            "gender": 0,
            "birthday": new Date(),
            "address": "",
            "email": ""
        },
        type:1,
         options: [
          { text: '男性', value: 0 },
          { text: '女性', value: 1 },
         ]
        // value: new Date()
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
         location.href = "./#/";
        Swal.fire({
        title: '系統訊息',
        text: "登入成功！",
        icon: 'success',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: '確定'
        }).then((result) => {
          apiService.saveToken(x.data.token);
          window.location.reload();
        })
        
      
      }) 
      .catch(() => {
          Swal.fire("登入失敗！");
      });
    },  
    register() {      
      if(this.registerData.account == "" || this.registerData.password == ""){        
        Swal.fire("不能有空值")
        return;
      }
      axios
      .post('../api/consumer/register',this.registerData)
      .then((x) => {
        Swal.fire({
        title: '系統訊息',
        text: "註冊成功！",
        icon: 'success',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: '確定'
        }).then((result) => {
        //   apiService.saveToken(x.data.token);
          window.location.reload();
        })
        
      }) 
      .catch(() => {
          Swal.fire("註冊失敗！");
      });
    }
   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
