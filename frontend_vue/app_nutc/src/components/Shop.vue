<template>
  <div>
    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">
          商家資料
          <button type="button" @click="open(modalShow,null)" class="btn btn-primary">新增</button>
        </h6>
      </div>
      <div class="card-body">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">商家名稱</th>
              <th scope="col">商家種類</th>
              <th scope="col">電話</th>
              <th scope="col">地址</th>
              <th scope="col">設定</th>
            </tr>
          </thead>
          <tbody v-if="shop.length>0">
            <tr v-for="(item,index) in shop" :key="item.id">
              <th scope="row">{{(index+1)+(pageIndex*10)}}</th>
              <td>{{item.name}}</td>
              <td>
                <span v-if="item.shopType == 0">一般商店</span>
                <span v-if="item.shopType == 1">美食商店</span>
              </td>
              <td>{{item.phone}}</td>
              <td>{{item.address}}</td>
              <td>
                <a href="javascript:void(0)" @click="open(modalShow,item)">編輯</a>
                &nbsp;
                <a
                  href="javascript:void(0)"
                  v-on:click="deleteItem(item.id)"
                >刪除</a>
              </td>
            </tr>
          </tbody>
        </table>

        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center">
            <li class="page-item" v-for="page in pages" :key="page">
              <a class="page-link" href="javascript:void(0)" v-on:click="next(page-1)">{{page}}</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <b-modal v-model="modalShow" @ok="handleOk">
      <form>
        <div class="form-group">
          <label for="exampleInputEmail1">店家種類</label>
          <b-form-select v-model="select.shopType" :options="options"></b-form-select>
        </div>

        <div class="form-group">
          <label for="exampleInputEmail1">店家名稱</label>
          <input
            type="email"
            class="form-control"
            v-model="select.name"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder
          />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">電話</label>
          <input
            type="email"
            class="form-control"
            v-model="select.phone"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder
          />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">地址</label>
          <input
            type="email"
            class="form-control"
            v-model="select.address"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder
          />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">敘述</label>

           <textarea
            class="form-control"
            v-model="select.description"
            id="exampleFormControlTextarea1"
            rows="3"
          ></textarea>
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">備註</label>
          <textarea
            class="form-control"
            v-model="select.remark"
            id="exampleFormControlTextarea1"
            rows="3"
          ></textarea>
        </div>

        <div v-if="selectImage.length > 0">
          <div style="display:grid;grid-template-columns: 1fr 1fr 1fr;">
            <div v-for="(item) in selectImage" :key="item.id" style="width:100%">
              <button class="btn btn-danger" v-on:click="deleteImage(item.id)">X</button>
              <img v-bind:src="'..'+item.url" style="width:100%" />
              <!-- {{item.id}} -->
            </div>
          </div>
        </div>

        <b-form-file
          v-model="file"
          multiple
          accept="image/jpeg, image/png, image/gif"
          class="mt-3"
          plain
        ></b-form-file>
        <div class="mt-3">選擇圖片: {{ file ? file.name : '' }}</div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import apiService from '../apiService';
import messageService from '../messageService';

export default {
  name: 'Shop',
  props: {
    msg: String,
  },
  data() {
    return {
      shop: [],
      pages: 0,
      pageIndex: 0,
      modalShow: false,
      select: {},
      selectImage: [],
      file: null,
      options: [
        { value: 0, text: '一般商店' },
        { value: 1, text: '美食商店' }
      ],
    };
  },
  created() {
    this.change();
  },
  methods: {
    deleteImage(id){
      this.selectImage = this.selectImage.filter(x=>{
        return x.id != id;
      });
    },
    async uploadFile() {
      var imageDatas = [];

      if (this.file) {
        var form = new FormData();
        for (var i = 0; i < this.file.length; i++) {
          form.append('file', this.file[i]);
        }
        imageDatas = await apiService.uploadfile(form);
        this.select.imageIds = imageDatas.data;
      } else {
        this.select.imageIds = [];
      }

      this.select.imageIds = this.select.imageIds.concat(
        this.selectImage.map(x => x.id),
      );
      return this.select.imageIds;
    },
    async handleOk() {
      this.select.imageIds = await this.uploadFile();
      if (this.select.id) {
        apiService
          .updateShopApi(this.select.id, this.select)
          .then(x => {
            this.change();
            Swal.fire('系統訊息', '已更新.', 'success');
          })
          .catch(() => {});
      } else {
        apiService
          .createShopApi(this.select)
          .then(x => {
            this.change();
            Swal.fire('系統訊息', '已建立.', 'success');
          })
          .catch(() => {
            Swal.fire('輸入資料格式錯誤！');
          });
      }
    },
    open(show, data) {
      this.modalShow = !show;
      if (data) {
        this.select = data;
        this.selectImage = JSON.parse(data.shopImage);
      } else {
        this.select = {};
      }
    },
    next(x) {
      this.pageIndex = x;
      this.change();
    },
    change() {
      apiService
        .getShopPage(10 * this.pageIndex)
        .then(x => {
          this.pages = Math.ceil(x.data.count / 10);
          this.shop = x.data.items;
          this.file = null;
          this.selectImage = [];
        })
        .catch(() => {});
    },
    deleteItem(id) {
      messageService.confirm('確認要刪除嗎?').then(result => {
        if (result.value) {
          apiService
            .deleteShopById(id)
            .then(x => {
              this.change();
              Swal.fire('系統訊息', '已刪除.', 'success');
            })
            .catch(() => {});
        }
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
