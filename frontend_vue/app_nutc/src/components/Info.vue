<template>
  <div>
    <div class="card shadow mb-4">
      <div class="container">
        <div class="row my-2">
          <div class="col-lg-8 order-lg-2">
            <ul class="nav nav-tabs">
              <li class="nav-item">
                <a href data-target="#edit" data-toggle="tab" class="nav-link active">編輯</a>
              </li>
             
              <!-- <li class="nav-item">
                <a href data-target="#messages" data-toggle="tab" class="nav-link">Messages</a>
              </li> -->
             
            </ul>
            <div class="tab-content py-4">
              <div class="tab-pane" id="messages">
                <div class="alert alert-info alert-dismissable">
                  <a class="panel-close close" data-dismiss="alert">×</a> This is an
                  <strong>.alert</strong>. Use this to show important messages to the user.
                </div>
                <table class="table table-hover table-striped">
                  <tbody>
                    <tr>
                      <td>
                        <span class="float-right font-weight-bold">3 hrs ago</span> Here is your a link to the latest summary report from the..
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span class="float-right font-weight-bold">Yesterday</span> There has been a request on your account since that was..
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span class="float-right font-weight-bold">9/10</span> Porttitor vitae ultrices quis, dapibus id dolor. Morbi venenatis lacinia rhoncus.
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span class="float-right font-weight-bold">9/4</span> Vestibulum tincidunt ullamcorper eros eget luctus.
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span class="float-right font-weight-bold">9/4</span> Maxamillion ais the fix for tibulum tincidunt ullamcorper eros.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="tab-pane active" id="edit">
                <form role="form" v-if="user.id">
                  <div class="form-group row">
                    <label class="col-lg-3 col-form-label form-control-label">帳號</label>
                    <div class="col-lg-9">
                      <input class="form-control" v-model="user.account" type="text" value="Jane" />
                    </div>
                  </div>

                  <div class="form-group row">
                    <label class="col-lg-3 col-form-label form-control-label">電子信箱</label>
                    <div class="col-lg-9">
                      <input
                        class="form-control"
                        v-model="user.userinfo.email"
                        type="email"
                        value="email@gmail.com"
                      />
                    </div>
                  </div>

                  <div class="form-group row">
                    <label class="col-lg-3 col-form-label form-control-label">地址</label>
                    <div class="col-lg-9">
                      <input
                        class="form-control"
                        v-model="user.userinfo.address"
                        type="text"
                        value
                        placeholder="Street"
                      />
                    </div>
                  </div>

                  <div class="form-group row">
                    <label class="col-lg-3 col-form-label form-control-label">姓名</label>
                    <div class="col-lg-9">
                      <input
                        class="form-control"
                        v-model="user.userinfo.name"
                        type="text"
                        value="janeuser"
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="col-lg-3 col-form-label form-control-label">密碼</label>
                    <div class="col-lg-9">
                      <input class="form-control" type="password" value="11111122333" />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="col-lg-3 col-form-label form-control-label">確認密碼</label>
                    <div class="col-lg-9">
                      <input class="form-control" type="password" value="11111122333" />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="col-lg-3 col-form-label form-control-label"></label>
                    <div class="col-lg-9">
                      <input type="button" class="btn btn-primary" value="儲存" />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="col-lg-4 order-lg-1 text-center">
            <img src="//placehold.it/150" class="mx-auto img-fluid img-circle d-block" alt="avatar" />
            <h6 class="mt-2">Upload a different photo</h6>
            <label class="custom-file">
              <input type="file" id="file" class="custom-file-input" />
              <span class="custom-file-control">Choose file</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import apiService from '../apiService'
export default {
  name: 'Info',
  props: {
    msg: String,
  },
  data() {
    return {
      user: {},
    };
  },
  created() {
    // this.change();
    apiService.getUserinfo().then(x => {
      console.log(x.data);
      this.user = x.data;
    });
  },
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
