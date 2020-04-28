<template>
  <div>
  
  </div>
</template>

<script>

import axios from 'axios';
import Swal from 'sweetalert2'
import apiService from '../apiService'
export default {
  name: 'User',
  props: {
   
  },
  data(){
    return {
      users:[]
    }
  },
  created(){
    axios
      .get('../api/users/admin/getAllUser',{headers:{
           Authorization: 'Bearer ' + apiService.getToken()
      }})
      .then((x) => {
        this.users = x.data ;
        console.log(this.users)
      }) 
      .catch(() => {
          // Swal.fire("登入失敗！");
      });
  },
  methods:{

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
