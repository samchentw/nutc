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
          <tbody v-if="users.length > 0">
            <tr v-for="(item, index) in users" :key="item.id">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ item.userinfo.name }}</td>
              <td>{{ item.userinfo.address }}</td>
              <td>{{ item.userinfo.email }}</td>
              <td>
                <div v-if="item.userinfo.name != 'admin'">
                  <a
                    href="javascript:void(0)"
                    v-on:click="open(modalShow, item.id)"
                    >查看行程</a
                  >
                  |<a href="javascript:void(0)" v-on:click="deleteUser(item.id)"
                    >刪除</a
                  >
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <b-modal v-model="modalShow" @ok="handleOk">
      <div v-if="keys.length == 0">此使用者尚未選擇行程</div>
      <div v-for="(key) in keys" :key="key">
        <h3>{{key}}</h3>
        <div v-for="(item) in data[key]" :key="item.newsDetailId">
         時間：{{item.time}},行程：{{item.displayName}}
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import apiService from '../apiService';
import messageService from '../messageService';
import { async } from 'rxjs/internal/scheduler/async';
export default {
  name: 'User',
  props: {
    msg: String,
  },
  data() {
    return {
      users: [],
      modalShow: false,
      data: null,
      keys: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    open(show, userId) {
      this.modalShow = !show;
      // console.log(userId);
      apiService.getConsumerByAdmin(userId).then(async x => {
        this.data = await x.data;
        this.keys = Object.keys(this.data);
        // console.log(this.keys);
      });
    },
    handleOk() {},
    init() {
      apiService
        .getAllUser()
        .then(x => {
          this.users = x.data;
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
