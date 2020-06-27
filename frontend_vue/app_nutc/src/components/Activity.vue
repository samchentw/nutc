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

        <div class="form-group">
          <label for="exampleInputEmail1">敘述</label>
          <textarea class="form-control" v-model="select.description" id="description" rows="3"></textarea>
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

    <!--  -->
  </div>
</template>

<script>
import apiService from '../apiService';
import messageService from '../messageService';
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
      selectImage: [],
      file: null,
    };
  },
  created() {
    this.init();
  },
  methods: {
    open(show, data) {
      this.modalShow = !show;
      if (data) {
        this.select = data;
        this.selectImage = JSON.parse(data.Images);
      } else {
        this.select = {};
      }
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
        this.selectImage = [];
        this.select = {};
        this.changeItem();
      });
    },
    changeItem() {
      apiService.getAllBytypeId(this.selected).then(x => {
        console.log(x.data);
        this.newItems = x.data;
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
            // messageService.error('標題不能空值！');
            // throw new Error(error)
          });
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
