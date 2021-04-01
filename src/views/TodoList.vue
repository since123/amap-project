<template>
  <el-row class="content">
    <el-col :xs="{ span: 20, offset: 2 }" :sm="{ span: 8, offset: 8 }">
      <span> 欢迎：{{ name }}！你的待办事项是： </span>
      <el-input
        placeholder="请输入待办事项"
        v-model="todos"
        @keyup.enter="addTodos"
      ></el-input>
      <el-tabs v-model="activeName">
        <el-tab-pane label="待办事项" name="first">
          <el-col :xs="24">
            <!--v-if和v-for不能同时在一个元素内使用，因为Vue总会先执行v-for-->
            <div v-for="(item, index) in list2" class="todo-list" :key="index">
              <span class="item"> {{ index + 1 }}. {{ item.content }} </span>
              <span class="pull-right">
                <el-button size="small" type="primary" @click="finished(item)"
                  >完成</el-button
                >
                <el-button
                  size="small"
                  :plain="true"
                  type="danger"
                  @click="remove(item)"
                  >删除</el-button
                >
              </span>
            </div>

            <!-- <div>
              暂无待办事项
            </div> -->
          </el-col>
        </el-tab-pane>
        <el-tab-pane label="已完成事项" name="second">
          <div class="todo-list" v-for="(item, index) in list1" :key="index">
            <span class="item finished">
              {{ index + 1 }}. {{ item.content }}
            </span>
            <span class="pull-right">
              <el-button size="small" type="primary" @click="restore(item)"
                >还原</el-button
              >
            </span>
          </div>
          <!-- <div>
            暂无已完成事项
          </div> -->
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script>
import jwt from "jsonwebtoken";
import api from "../request/api/index";

export default {
  data() {
    return {
      name: "",
      id: "", // 新增用户id属性，用于区别用户
      todos: "",
      activeName: "first",
      list: [],
      list1: [],
      list2: [],
      // count: 0,
    };
  },
  computed: {
    // 计算属性用于计算是否已经完成了所有任务
    // Done() {
    //   let count = 0;
    //   let length = this.list.length;
    //   for (let i in this.list) {
    //     this.list[i].status == true ? (count += 1) : "";
    //   }
    //   if (count == length || length == 0) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // },
  },

  methods: {
    addTodos() {
      if (this.todos == "") return;
      let obj = {
        id: this.id,
        status: 0,
        content: this.todos,
      };
      // this.list.push(obj); //使用下面接口代替
      api.todolist.createdTodolist(obj).then((res) => {
        if (res.status == 200) {
          this.$message({
            type: "info",
            message: "新增成功！",
          });
          this.getTodoList();
        }
      });
      this.todos = "";
    },
    getTodoList() {
      let obj = {
        userId: this.id,
      };
      api.todolist.queryTodoList(obj).then((res) => {
        if (res.status == 200) {
          this.list1 = [];
          this.list2 = [];
          this.list = JSON.parse(JSON.stringify(res.data));
          for (let n in this.list) {
            if (this.list[n].status == 1) {
              this.list[n].status = true;
              this.list1.push(this.list[n]);
            } else {
              this.list[n].status = false;
              this.list2.push(this.list[n]);
            }
          }
          console.log("list1，list2", this.list1, this.list2);
        }
      });
    },
    finished(item) {
      // console.log("this", this);
      // this.$set(this.list[index], "status", true); // 通过set的方法让数组的变动能够让Vue检测到
      // this.list[index].status = true;
      // this.count++;
      let obj = {
        id: item.id,
        userId: this.id,
        status: 1,
      };
      console.log("obj", obj);
      api.todolist.updateTodolist(obj).then((res) => {
        console.log("up", res);
        if (res.status == 200) {
          this.$message({
            type: "success",
            message: "任务完成",
          });
          this.getTodoList();
        }
      });
    },
    remove(item) {
      // this.list.splice(index, 1);
      let obj = {
        id: item.id,
        userId: this.id,
      };
      api.todolist.deleteTodolist(obj).then((res) => {
        console.log("deleteTodolist", res);
        if (res.status == 200) {
          this.$message({
            type: "info",
            message: "任务删除",
          });
          this.getTodoList();
        }
      });
    },
    restore(item) {
      // this.$set(this.list[index], "status", false);
      // this.list[index].status = false;
      let obj = {
        id: item.id,
        userId: this.id,
        status: 0,
      };
      api.todolist.updateTodolist(obj).then((res) => {
        console.log("up", res);
        if (res.status == 200) {
          this.$message({
            type: "info",
            message: "任务还原",
          });
          this.getTodoList();
        }
      });
    },
    getUserInfo() {
      const token = sessionStorage.getItem("demo-token");
      if (token != null && token != "null") {
        let decode = jwt.decode(token); // 解析token
        return decode;
      } else {
        return null;
      }
    },
  },
  created() {
    const userInfo = this.getUserInfo();
    if (userInfo != null) {
      this.id = userInfo.id;
      this.name = userInfo.name;
    } else {
      this.id = "";
      this.name = "";
    }
    this.getTodoList();
  },
};
</script>

<style lang="stylus" scoped>
.el-input
  margin 20px auto
.todo-list
  width 100%
  margin-top 8px
  padding-bottom 8px
  border-bottom 1px solid #eee
  overflow hidden
  text-align left
  .item
    font-size 20px
    &.finished
      text-decoration line-through
      color #ddd
.pull-right
  float right
</style>
