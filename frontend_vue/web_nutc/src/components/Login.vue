<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-3 col-md-4 col-sm-6 portfolio-item"></div>
        <div class="col-lg-6 col-md-4 col-sm-6 portfolio-item">
          <div v-if="type==1">
            <div class="alert alert-success" role="alert">會員登入</div>

            <div class="card">
              <div class="card-body">
                <form>
                  <div class="form-group">
                    <label for="exampleInputEmail1">帳號</label>
                    <input
                      type="email"
                      v-model="loginData.username"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div class="form-group">
                    <label for="exampleInputPassword1">密碼</label>
                    <input
                      type="password"
                      v-model="loginData.password"
                      class="form-control"
                      id="exampleInputPassword1"
                    />
                  </div>

                  <button
                    type="button"
                    class="btn btn-primary"
                    style="margin-right:10px"
                    v-on:click="login()"
                  >登入</button>
                  <button type="submit" class="btn btn-primary" v-on:click="changePage(2)">註冊</button>
                </form>
              </div>
            </div>
          </div>

          <div v-if="type==2">
            <div class="alert alert-success" role="alert">
              <a
                href="javascript:void(0)"
                style="font-size:20px;color:black"
                v-on:click="changePage(1)"
              >
                <svg
                  class="bi bi-arrow-bar-left"
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.854 4.646a.5.5 0 0 0-.708 0l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L3.207 8l2.647-2.646a.5.5 0 0 0 0-.708z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M10 8a.5.5 0 0 0-.5-.5H3a.5.5 0 0 0 0 1h6.5A.5.5 0 0 0 10 8zm2.5 6a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 1 0v11a.5.5 0 0 1-.5.5z"
                  />
                </svg>
              </a>
              會員註冊
            </div>
            <div class="card">
              <div class="card-body">
                <form>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="inputEmail4">帳號</label>
                      <input
                        type="text"
                        v-model="registerData.account"
                        class="form-control"
                        id="inputEmail4"
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="inputPassword4">密碼</label>
                      <input
                        type="password"
                        v-model="registerData.password"
                        class="form-control"
                        id="inputPassword4"
                      />
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="inputAddress2">姓名</label>
                    <input
                      type="text"
                      v-model="registerData.name"
                      class="form-control"
                      id="inputAddress2"
                    />
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
                    <b-form-datepicker v-model="registerData.birthday" locale="cn"></b-form-datepicker>
                  </div>

                  <div class="form-group">
                    <label for="inputAddress">地址</label>
                    <input
                      type="text"
                      v-model="registerData.address"
                      class="form-control"
                      id="inputAddress"
                    />
                  </div>
                  <div class="form-group">
                    <label for="inputAddress2">電子信箱</label>
                    <input
                      type="text"
                      v-model="registerData.email"
                      class="form-control"
                      id="inputAddress2"
                    />
                  </div>

                  <button type="button" v-on:click="register()" class="btn btn-primary">註冊</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-4 col-sm-6 portfolio-item"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import apiService from '../apiService';
import messageService from '../messageService';

export default {
  name: 'Login',
  props: {
    msg: String,
  },
  data() {
    return {
      loginData: {
        username: '',
        password: '',
      },
      registerData: {
        account: '',
        password: '',
        name: '',
        gender: 0,
        birthday: new Date(),
        address: '',
        email: '',
      },
      type: 1,
      options: [
        { text: '男性', value: 0 },
        { text: '女性', value: 1 },
      ],
      // value: new Date()
    };
  },
  methods: {
    changePage(type) {
      this.type = type;
    },
    login() {
      if (this.loginData.username == '' || this.loginData.password == '') {
        Swal.fire('不能有空值');
        return;
      }
      apiService
        .loginApi(this.loginData)
        .then(x => {
          location.href = './#/';
          messageService.success('登入成功！').then(result => {
            apiService.saveToken(x.data.access_token);
            window.location.reload();
          });
        })
        .catch(() => {
          Swal.fire('登入失敗！');
        });
    },
    register() {
      if (this.registerData.account == '' || this.registerData.password == '') {
        Swal.fire('不能有空值');
        return;
      }
      apiService
        .registerApi(this.registerData)
        .then(x => {
          messageService.success('註冊成功！').then(result => {
            window.location.reload();
          });
        })
        .catch(() => {
          Swal.fire('註冊失敗！');
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn {
  background-color: #ffad60;
  border-color: #ffad60;
}
</style>
