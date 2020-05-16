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
              <input type="text" class="form-control" v-model="title.value"  aria-label="Username" aria-describedby="basic-addon1">
            </div>

            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">關於我們-敘述</span>
              </div>
              <input type="text" class="form-control" v-model="description.value" aria-label="Username" aria-describedby="basic-addon1">
            </div>

            <button type="button" v-on:click="save()" class="btn btn-primary">儲存</button>
            
                </div>
      </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import apiService from '../apiService'
export default {
  name: 'Setting',
  props: {
    msg: String
  },
  data(){
    return {
		title:{},
		description:{}
    }
  },
  created(){
	this.getData();
  },
  methods:{
    getData(){
      var data = {key: ["前台.關於我們.title","前台.關於我們.description"]};
      apiService.getSettingKeys(data).then((x)=>{
        this.title = x.data.find(y=>y.key =="前台.關於我們.title");
        this.description = x.data.find(y=>y.key =="前台.關於我們.description");
      });
    },
    save(){
      apiService.updateSetting(this.title).then();
      apiService.updateSetting(this.description).then(
        ()=>{
          Swal.fire("儲存成功！")
        }
      );
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
