<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-4">
          <div class="card shadow">
            <div class="card-header py-3">
              <h6 class="m-0 font-weight-bold text-primary" style="display:flex">
                產品分類
                <span style="flex:1 1 auto"></span>
                <button type="button" @click="open(modalShow,null)" class="btn btn-primary">新增</button>
              </h6>
            </div>
            <div class="card-body">
              <div class="list-group">
                <div
                  style="cursor:pointer"
                  class="list-group-item list-group-item-action"
                  v-bind:class="{ 'active': selectTypeId==0 }"
                  v-on:click="selectProduct(0)"
                >全部</div>
                <div
                  style="cursor:pointer"
                  v-for="(item) in productTypes"
                  v-bind:class="{ 'active': selectTypeId==item.id }"
                  class="list-group-item list-group-item-action"
                  :key="item.id"
                  v-on:click="selectProduct(item.id)"
                >
                  {{item.name}}
                  <a
                    href="javascript:void(0)"
                    v-on:click="open(modalShow,item)"
                    class="text-right"
                  >編輯</a> |
                  <a
                    href="javascript:void(0)"
                    v-on:click="deleteProductType(item.id)"
                    class="text-right"
                  >刪除</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-8">
          <div class="card shadow">
            <div class="card-header py-3">
              <h6 class="m-0 font-weight-bold text-primary" style="display:flex;">
                產品
                <span style="flex:1 1 auto"></span>
                <button type="button" @click="open1(modalShow1,null)" class="btn btn-primary">新增</button>
              </h6>
            </div>
            <div class="card-body">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">名稱</th>
                    <th scope="col">價格</th>
                    <th scope="col">是否上架</th>
                    <th scope="col">設定</th>
                  </tr>
                </thead>
                <tbody v-if="product.length>0">
                  <tr v-for="(item,index) in product" :key="item.id">
                    <th scope="row">{{index}}</th>
                    <td>{{item.name || '--'}}</td>
                    <td>{{item.price}}</td>
                    <td>
                      <span v-if="item.isSell">上架</span>
                      <span v-if="!item.isSell">下架</span>
                    </td>
                    <td>
                      <a href="javascript:void(0)" @click="open1(modalShow1,item)">編輯</a>|
                      <a href>刪除</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <b-modal v-model="modalShow" @ok="handleOk">
      <form>
        <div class="form-group">
          <label for="exampleInputEmail1">種類名稱</label>
          <input
            type="email"
            class="form-control"
            v-model="select.name"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder
          />
        </div>
      </form>
    </b-modal>

    <b-modal v-model="modalShow1" @ok="handleOk1">
      <form>
        <div class="form-group">
          <label for="exampleInputEmail1">產品名稱</label>
          <input
            type="email"
            class="form-control"
            v-model="selectProductData.name"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder
          />
        </div>

        <div class="form-group">
          <label for="exampleInputEmail1">價格</label>
          <input
            type="email"
            class="form-control"
            v-model="selectProductData.price"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder
          />
        </div>

        <div class="form-group">
          <label for="exampleInputEmail1">敘述</label>
          <textarea
            class="form-control"
            v-model="selectProductData.description"
            id="exampleFormControlTextarea1"
            rows="3"
          ></textarea>
        </div>

        <div class="custom-control custom-switch">
          <input
            type="checkbox"
            v-model="selectProductData.isSell"
            class="custom-control-input"
            id="customSwitch1"
          />
          <label class="custom-control-label" for="customSwitch1">上架</label>
        </div>

        <div v-if="selectProductImage.length > 0">
          <div style="display:grid;grid-template-columns: 1fr 1fr 1fr;">
            <div v-for="(item) in selectProductImage" :key="item" style="width:100%">
              <img v-bind:src="'..'+item" style="width:100%" />
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
  name: 'Product',
  props: {
    msg: String,
  },
  data() {
    return {
      productTypes: [],
      modalShow: false,
      select: {
        name: '',
      },
      product: [],
      selectTypeId: 0,
      modalShow1: false,
      selectProductData: {
        name: '',
        price: 0,
        description: '',
        isDelete: false,
        imageIds: [],
        isSell: false,
        productTypeId: 0,
      },
      selectProductImage: [],
      file: null,
    };
  },
  created() {
    this.getTypes();
    this.selectProduct(0);
  },
  methods: {
    getTypes() {
      apiService
        .getProductType()
        .then(x => {
          // console.log(x.data)
          this.productTypes = x.data;
        })
        .catch(() => {});
    },
    handleOk() {
      if (this.select.id) {
        apiService.updateProudctType(this.select).then(x => {
          Swal.fire('更新成功！');
          this.getTypes();
        });
      } else {
        apiService.createProductType(this.select).then(x => {
          Swal.fire('建立成功！');
          this.getTypes();
        });
      }
    },
    deleteProductType(id) {
      messageService.confirm('確定要刪除嗎？').then(x => {
        if (x.value) {
          apiService.deleteProductType(id).then(x => {
            Swal.fire('刪除成功！');
            this.getTypes();
          });
        }
      });
    },
    async handleOk1() {
      this.selectProductData.productTypeId = this.selectTypeId;
      // console.log(this.file)
      var imageDatas = [];

      if (this.file) {
        var form = new FormData();
        for (var i = 0; i < this.file.length; i++) {
          form.append('file', this.file[i]);
        }
        imageDatas = await apiService.uploadfile(form);
        this.selectProductData.imageIds = imageDatas.data;
      }

      if (this.selectProductData.id) {
        apiService.updateProduct(this.selectProductData).then(x => {
          Swal.fire('更新成功！');
        });
      } else {
        apiService.createProduct(this.selectProductData).then(x => {
          Swal.fire('建立成功！');
          this.file = null;
          this.selectProductData = {
            name: '',
            price: 0,
            description: '',
            isDelete: false,
            imageIds: [],
            isSell: false,
            productTypeId: 0,
          };
        });
      }
    },
    selectProduct(id) {
      apiService.getProducts(0, id, true).then(x => {
        this.selectTypeId = id;
        this.product = x.data.items;
        // console.log(this.product)
      });
    },
    open(show, data) {
      this.modalShow = !show;
      if (data) this.select = data;
      else this.select = {};
    },
    open1(show, data) {
      this.modalShow1 = !show;
      if (data) {
        this.selectProductData = data;

        this.selectProductImage = JSON.parse(data.productImage);
        console.log(this.selectProductImage);
      } else
        this.selectProductData = {
          name: '',
          price: 0,
          description: '',
          isDelete: false,
          imageIds: [],
          isSell: false,
          productTypeId: 0,
        };
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list-group-item.active {
  background-color: #dddddd;
  color: black;
}
</style>
