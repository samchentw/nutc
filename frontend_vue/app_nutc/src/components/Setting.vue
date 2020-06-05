<template>
  <div>
    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">設定</h6>
      </div>
      <div class="card-body">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">關於我們-標題</span>
          </div>
          <input
            type="text"
            class="form-control"
            v-model="title.value"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>

        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">關於我們-敘述</span>
          </div>
          <!-- <input type="text" class="form-control" v-model="description.value" aria-label="Username" aria-describedby="basic-addon1"> -->
          <textarea
            class="form-control"
            v-model="description.value"
            id="exampleFormControlTextarea1"
            rows="3"
          ></textarea>
        </div>

        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">首頁-欄位一-標題</span>
          </div>
          <input
            type="text"
            class="form-control"
            v-model="one.value"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>

        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">首頁-欄位一-敘述</span>
          </div>
          <!-- <input type="text" class="form-control" v-model="description.value" aria-label="Username" aria-describedby="basic-addon1"> -->
          <textarea
            class="form-control"
            v-model="one.description"
            id="exampleFormControlTextarea1"
            rows="3"
          ></textarea>
        </div>

        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">首頁-欄位二-標題</span>
          </div>
          <input
            type="text"
            class="form-control"
            v-model="two.value"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>

        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">首頁-欄位二-敘述</span>
          </div>
          <!-- <input type="text" class="form-control" v-model="description.value" aria-label="Username" aria-describedby="basic-addon1"> -->
          <textarea
            class="form-control"
            v-model="two.description"
            id="exampleFormControlTextarea1"
            rows="3"
          ></textarea>
        </div>

        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">首頁-欄位三-標題</span>
          </div>
          <input
            type="text"
            class="form-control"
            v-model="three.value"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>

        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">首頁-欄位三-敘述</span>
          </div>
          <textarea
            class="form-control"
            v-model="three.description"
            id="exampleFormControlTextarea1"
            rows="3"
          ></textarea>
        </div>

        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">活動-欄位一-標題</span>
          </div>
          <input
            type="text"
            class="form-control"
            v-model="activity.one.value"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>

        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">活動-欄位一-敘述</span>
          </div>
          <textarea
            class="form-control"
            v-model="activity.one.description"
            id="exampleFormControlTextarea1"
            rows="3"
          ></textarea>
        </div>

        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">活動-欄位二-標題</span>
          </div>
          <input
            type="text"
            class="form-control"
            v-model="activity.two.value"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>

        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">活動-欄位二-敘述</span>
          </div>
          <textarea
            class="form-control"
            v-model="activity.two.description"
            id="exampleFormControlTextarea1"
            rows="3"
          ></textarea>
        </div>

        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">活動-欄位三-標題</span>
          </div>
          <input
            type="text"
            class="form-control"
            v-model="activity.three.value"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>

        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">活動-欄位三-敘述</span>
          </div>
          <textarea
            class="form-control"
            v-model="activity.three.description"
            id="exampleFormControlTextarea1"
            rows="3"
          ></textarea>
        </div>

        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">活動-欄位四-標題</span>
          </div>
          <input
            type="text"
            class="form-control"
            v-model="activity.four.value"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>

        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">活動-欄位四-敘述</span>
          </div>
          <textarea
            class="form-control"
            v-model="activity.four.description"
            id="exampleFormControlTextarea1"
            rows="3"
          ></textarea>
        </div>

        <button type="button" v-on:click="save()" class="btn btn-primary">儲存</button>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import apiService from '../apiService';
export default {
  name: 'Setting',
  props: {
    msg: String,
  },
  data() {
    return {
      title: {},
      description: {},
      one: {},
      two: {},
      three: {},

      activity: {
        one: {},
        two: {},
        three: {},
        four: {},
      },
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      var data = {
        key: [
          '前台.關於我們.title',
          '前台.關於我們.description',
          '前台.首頁.欄位一',
          '前台.首頁.欄位二',
          '前台.首頁.欄位三',

          '前台.活動.欄位一',
          '前台.活動.欄位二',
          '前台.活動.欄位三',
          '前台.活動.欄位四',
        ],
      };
      apiService.getSettingKeys(data).then(x => {
        this.title = x.data.find(y => y.key == '前台.關於我們.title');
        this.description = x.data.find(
          y => y.key == '前台.關於我們.description',
        );
        this.one = x.data.find(y => y.key == '前台.首頁.欄位一');
        this.two = x.data.find(y => y.key == '前台.首頁.欄位二');
        this.three = x.data.find(y => y.key == '前台.首頁.欄位三');

        this.activity.one = x.data.find(y => y.key == '前台.活動.欄位一');
        this.activity.two = x.data.find(y => y.key == '前台.活動.欄位二');
        this.activity.three = x.data.find(y => y.key == '前台.活動.欄位三');
        this.activity.four = x.data.find(y => y.key == '前台.活動.欄位四');
      });
    },
    save() {
      var input = [
        this.one,
        this.two,
        this.three,
        this.title,
        this.description,
        this.activity.one,
        this.activity.two,
        this.activity.three,
        this.activity.four,
        
      ];

      apiService.updateSettings(input).then(() => {
        Swal.fire('儲存成功！');
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
