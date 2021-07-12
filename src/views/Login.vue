<template>
  <div>
    <div class="login-con">
      <el-form
        :model="loginForm"
        :label-position="labelPosition"
        label-width="80px"
        class="login-form"
      >
        <el-form-item label="账号：">
          <el-input v-model="loginForm.account"></el-input>
        </el-form-item>
        <el-form-item label="密码：">
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" @click="cancel()">取消</el-button>
          <el-button class="login-btn" @click="login()">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import api from "../request/api/index";
export default {
  data() {
    return {
      loginForm: {
        account: "",
        password: "",
      },
      labelPosition: "right",
    };
  },
  methods: {
    login() {
      // this.$router.push({
      //   path: "./TodoList",
      // });
      let obj = {
        name: this.loginForm.account,
        password: this.loginForm.password,
      };
      console.log("this", api);
      api.loginPage.login(obj).then(
        (res) => {
          if (res.data.success) {
            sessionStorage.setItem("demo-token", res.data.token);
            this.$message({
              type: "success",
              message: "登录成功",
            });
            this.$router.push("/todolist");
          } else {
            this.$message.error(res.data.info);
            sessionStorage.setItem("demo-token", null);
          }
        },
        () => {
          this.$message.error("请求错误！");
          sessionStorage.setItem("demo-token", null);
        }
      ); //将信息发送给后端
    },
  },
};
</script>
<style scoped>
.login-con {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  position: fixed;
  background: url("../assets/images/th.jpeg") no-repeat;
  background-size: cover;
  text-align: center;
}
.login-form {
  width: 500px;
}
.login-form >>> .el-form-item__label {
  color: aliceblue;
}
.login-btn {
  margin: 10px 40px;
}
</style>
