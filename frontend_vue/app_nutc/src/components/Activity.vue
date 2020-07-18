<template>
  <div>
    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <form inline>
          <label class="mr-sm-2" for="inline-form-custom-select-pref">活動類型：</label>
          <b-form-select
            style="width:200px"
            v-model="selected"
            :options="options"
            id="inline-form-custom-select-pref"
            class="mb-2 mr-sm-2 mb-sm-0"
            @change="changeItem()"
          ></b-form-select>

          <button type="button" @click="open(modalShow,null)" class="btn btn-primary">新增</button>
        </form>
      </div>
      <div class="card-body">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">標題</th>
              <th scope="col">副標題</th>
              <th scope="col">動作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in newItems" :key="item.id">
              <th scope="row">{{index+1}}</th>
              <td>{{item.title}}</td>
              <td>{{item.subtitle}}</td>
              <td>
                <a @click="open(modalShow,item)" href="javascript:void(0)">編輯</a>|
                <a @click="deleteItem(item.id)" href="javascript:void(0)">刪除</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!--  -->

    <b-modal v-model="modalShow" @ok="handleOk">
      <form>
        <div class="form-group">
          <label for="exampleInputEmail1">活動標題</label>
          <input
            type="text"
            class="form-control"
            v-model="select.title"
            id="title"
            aria-describedby="emailHelp"
            placeholder
          />
        </div>

        <div class="form-group">
          <label for="exampleInputEmail1">活動副標題</label>
          <input
            type="text"
            class="form-control"
            v-model="select.subtitle"
            id="subtitle"
            aria-describedby="emailHelp"
            placeholder
          />
        </div>

        <div class="custom-control custom-switch">
          <input
            type="checkbox"
            v-model="select.isActive"
            class="custom-control-input"
            id="customSwitch1"
          />
          <label class="custom-control-label" for="customSwitch1">上架</label>
        </div>
      </form>
      <p>注意每段落都需要上傳一張圖片，且輸入的順序不能重複！</p>
      <div v-for="(item) in detailItem" :key="item.sequence">
        <hr />
        <button type="button" class="btn btn-danger" v-on:click="deleteCount(item.sequence)">刪除段落</button>
        <div class="form-group">
          <label for="exampleInputEmail1">順序</label>
          <input
            class="form-control"
            v-model="item.sequence"
            type="number"
            id="example-number-input"
          />
        </div>

        <div class="form-group">
          <label for="exampleInputEmail1">敘述</label>
          <textarea class="form-control" v-model="item.description" id="description" rows="3"></textarea>
        </div>

        <div v-if="item.ImageUrl">
          <!-- <button
            class="btn btn-danger"
            style="height:30px;width:30px"
            v-on:click="deleteImage(item.ImageId)"
          >X</button> -->

          <div style="display:grid;grid-template-columns: 1fr 1fr 1fr;">
            <img v-bind:src="'..'+item.ImageUrl" style="width:100%" />
          </div>
        </div>

        <b-form-file
          v-model="item.file"
          accept="image/jpeg, image/png, image/gif"
          class="mt-3"
          plain
        ></b-form-file>
        <div class="mt-3">選擇圖片: {{ item.file ? item.file.name : '' }}</div>
      </div>
      <hr>
      <button type="button" class="btn btn-success" v-on:click="addCount()">新增段落</button>
    </b-modal>

    <!--  -->
  </div>
</template>

<script>
import apiService from '../apiService';
import messageService from '../messageService';
import axios from 'axios';
export default {
  name: 'Activity',
  props: {
    msg: String,
  },
  data() {
    return {
      selected: null,
      options: [],
      newItems: [],

      modalShow: false,
      select: {},
      file: null,
      detailItem: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    deleteImage(id) {
      var target = this.detailItem.find(x => x.ImageId == id);
      target.ImageId = 0;
      target.ImageUrl = '';
    },
    open(show, data) {
      this.modalShow = !show;
      this.detailItem = [];
      if (data) {
        this.select = data;
        this.detailItem = data.newsDetailsSortBySeq;
      } else {
        this.select = {};
      }
    },
    addCount() {
      if (this.detailItem.length > 0) {
        var array = this.detailItem.map(x => x.sequence);
        var maxValue = Math.max(...array);
        this.detailItem.push({
          description: '',
          sequence: maxValue + 1,
          ImageId: 0,
          file: null,
        });
      } else {
        this.detailItem.push({
          description: '',
          sequence: 0,
          ImageId: 0,
          file: null,
        });
      }
    },
    deleteCount(sequence) {
      this.detailItem = this.detailItem.filter(x => x.sequence != sequence);
    },
    deleteItem(id) {
      messageService.confirm('確認要刪除嗎？').then(x => {
        if (x.value) {
          apiService.deleteNews(id).then(y => {
            messageService.success('刪除成功！');
            this.changeItem();
          });
        }
      });
    },
    init() {
      apiService.getallNewsType().then(x => {
        this.options = x.data.map(m => {
          return {
            value: m.id,
            text: m.name,
          };
        });
        if (!this.selected) {
          this.selected = x.data[0].id;
        }
        this.file = null;
        this.select = {};
        this.changeItem();
      });
    },
    changeItem() {
      apiService.getAllBytypeId(this.selected).then(x => {
        this.newItems = x.data;
      });
    },
    async handleOk() {
      var items = [];
      // console.log(this.detailItem);
      for (var i = 0; i < this.detailItem.length; i++) {
        if (this.detailItem[i].file) {
          var form = new FormData();
          form.append('file', this.detailItem[i].file);
          var result = await apiService.uploadfile(form);
          this.detailItem[i].ImageId = result.data[0];
        }
      }
    // console.log(this.detailItem)
      var ds = this.detailItem.map(x=>x.ImageId);
      var check = ds.some(x=>x == 0);
      // console.log(check)
      if(check) {
        // alert("error")
        messageService.error("每個段落都要傳圖片！")
        return;
      }
      this.select.newsDetails = this.detailItem;
      this.select.newsTypeId = this.selected;
      if (this.select.id) {
        apiService
          .updateNews(this.select)
          .then(x => {
            messageService.success('更新成功！');
            this.init();
          })
          .catch(error => {
            alert('標題不能空值！');
          });
      } else {
        apiService
          .createNews(this.select)
          .then(x => {
            messageService.success('建立成功！');
            this.init();
          })
          .catch(error => {
            alert('標題不能空值！');
          });
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
