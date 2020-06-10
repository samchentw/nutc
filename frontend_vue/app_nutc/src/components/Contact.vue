<template>
  <div>
    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">聯絡資訊</h6>
      </div>
      <div class="card-body">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">姓名</th>
              <th scope="col">電話</th>
              <th scope="col">信箱</th>
              <th scope="col">詳細資料</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data) in items" :key="data.id">
              <th scope="row">1</th>
              <td>{{data.name}}</td>
              <td>{{data.phone}}</td>
              <td>{{data.mail}}</td>
              <td>
                <a href>詳細資料</a> |<a href>刪除</a>
              </td>
            </tr>
          </tbody>
        </table>

        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center">
            <li class="page-item">
              <a class="page-link" href="#">1</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">2</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">3</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import apiService from '../apiService';
import messageService from '../messageService';
export default {
  name: 'Contact',
  props: {
    msg: String,
  },
  data() {
    return {
      items: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      apiService.GetAllContact().then(x => {
        this.items = x.data;
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
