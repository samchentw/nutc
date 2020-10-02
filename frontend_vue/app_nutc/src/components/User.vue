<template>
  <div>
    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">會員資料</h6>
      </div>
      <div class="card-body">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">姓名</th>
              <th scope="col">地址</th>
              <th scope="col">信箱</th>
              <th scope="col">設定</th>
            </tr>
          </thead>
          <tbody v-if="users.length>0">
            <tr v-for="(item,index) in users" :key="item.id">
              <th scope="row">{{index+1}}</th>
              <td>{{item.name}}</td>
              <td>{{item.address}}</td>
              <td>{{item.email}}</td>
              <td>
                <a href="javascript:void(0)" v-if="item.name!='admin'" v-on:click="deleteUser(item.id)">刪除</a>
              </td>
            </tr>
          </tbody>
        </table>
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
  name: 'User',
  props: {
    msg: String,
  },
  data() {
    return {
      users: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    init(){
      apiService
      .getAllUser()
      .then(x => {
        this.users = x.data;
        // console.log(this.users)
      })
      .catch(() => {});
    },
    deleteUser(id) {
      messageService.confirm('確認刪除嗎？').then(result => {
        if (result.value) {
          apiService.deleteUser(id).then(x => {
            messageService.success('刪除成功！');
            this.init();
          });
        }
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
