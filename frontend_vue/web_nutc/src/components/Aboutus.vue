<template>
  <div>
    <div class="container">
      <!-- About Content -->
      <div class="about-main">
        <div class="row">
          <!-- <div class="col-lg-6">
            <img class="img-fluid rounded mb-4" src="images/about-img.jpg" alt />
          </div> -->
          <div class="col-lg-12">
            <h2>{{title}}</h2>
            <p>{{description}}</p>
          </div>
        </div>
        <!-- /.row -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import apiService from '../apiService';
export default {
  name: 'Aboutus',
  data() {
    return {
      title: '',
      description: '',
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      var data = { key: ['前台.關於我們.title', '前台.關於我們.description'] };
      apiService.getSettingKeys(data).then(x => {
        this.title = x.data.find(y => y.key == '前台.關於我們.title').value;
        this.description = x.data.find(
          y => y.key == '前台.關於我們.description',
        ).value;
        console.log(this.title);
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
