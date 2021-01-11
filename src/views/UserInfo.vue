<template>
  <div class="body">
    <div class="center">
      <div class="center-row"></div>
      <el-form :inline="true"  style="margin-top: 40px">
        <div class="center-row">
          <el-form-item label="用户姓名" style="display:inline-block;">
            <el-input style="margin-left: 16px;" v-model="userInfo.userName" disabled></el-input>
          </el-form-item>
          <el-form-item label="用户权限" style="display:inline-block;margin-left: 50px">
            <el-input style="margin-left: 16px" v-model="userInfo.roleName" disabled></el-input>
          </el-form-item>
        </div>
        <div class="center-row">
          <el-form-item label="手机号码" style="display:inline-block;">
            <el-input style="margin-left: 16px" v-model="userInfo.phone" disabled></el-input>
          </el-form-item>
          <el-form-item label="身份证号" style="display:inline-block;margin-left: 50px">
            <el-input style="margin-left: 16px" v-model="userInfo.idNumber" disabled></el-input>
          </el-form-item>
        </div>
        <div class="center-row">
          <el-form-item label="正确概率" style="display:inline-block;">
            <el-input style="margin-left: 16px" v-model="userInfo.accuracy" disabled></el-input>
          </el-form-item>
          <el-form-item label="答题总数" style="display:inline-block;margin-left: 50px">
            <el-input style="margin-left: 16px" v-model="userInfo.total" disabled></el-input>
          </el-form-item>
        </div>
        <div class="center-row">
          <el-form-item label="答对题数" style="display:inline-block;">
            <el-input style="margin-left: 16px" v-model="userInfo.right" disabled></el-input>
          </el-form-item>
          <el-form-item label="答错题数" style="display:inline-block;margin-left: 50px">
            <el-input style="margin-left: 16px" v-model="userInfo.wrong" disabled></el-input>
          </el-form-item>
        </div>
        <div class="center-row">
          <el-form-item label="未答题数" style="display:inline-block;">
            <el-input style="margin-left: 16px" v-model="userInfo.noAnswer" disabled></el-input>
          </el-form-item>
        </div>
        <!--<el-form-item label="用户姓名" style="display: flex; flex-direction: row">
          <el-input style="margin-left: 16px" v-model="userInfo.userName" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户权限" style="display: flex; flex-direction: row">
          <el-input style="margin-left: 16px" v-model="userInfo.roleName" disabled></el-input>
        </el-form-item>-->
        <!--<el-form-item label="手机号码" style="display: flex; flex-direction: row">
          <el-input style="margin-left: 16px" v-model="userInfo.phone" disabled></el-input>
        </el-form-item>
        <el-form-item label="身份证号" style="display: flex; flex-direction: row">
          <el-input style="margin-left: 16px" v-model="userInfo.idNumber" disabled></el-input>
        </el-form-item>-->
        <!--<el-form-item label="正确率" style="display: flex; flex-direction: row">
          <el-input style="margin-left: 16px" v-model="userInfo.accuracy" disabled></el-input>
        </el-form-item>
        <el-form-item label="答题总数" style="display: flex; flex-direction: row">
          <el-input style="margin-left: 16px" v-model="userInfo.total" disabled></el-input>
        </el-form-item>-->
       <!-- <el-form-item label="答对题数" style="display: flex; flex-direction: row">
          <el-input style="margin-left: 16px" v-model="userInfo.right" disabled></el-input>
        </el-form-item>
        <el-form-item label="答错题数" style="display: flex; flex-direction: row">
          <el-input style="margin-left: 16px" v-model="userInfo.wrong" disabled></el-input>
        </el-form-item>-->
        <!--<el-form-item label="未答题数" style="display: flex; flex-direction: row">
          <el-input style="margin-left: 16px" v-model="userInfo.noAnswer" disabled></el-input>
        </el-form-item>-->
      </el-form>
    </div>
  </div>
</template>

<script>
import request from '../utils/request'

export default {
  name: 'UserInfo',
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    const that = this
    request.postNoJSON({url: '/api/user/userInfo'}).then(res => {
      // console.log(res)
      if (res.message === 'error') {
        that.$notify.error({
          title: '错误',
          message: res.result
        })
      } else {
        that.userInfo = res.result
        that.userInfo.noAnswer = res.result.total - res.result.right - res.result.wrong
        that.userInfo.accuracy = (res.result.total === 0 ? 0 : res.result.right / res.result.total * 100) + '%'
        if (res.result.roleId === 1) {
          that.userInfo.roleName = '管理员'
        } else {
          that.userInfo.roleName = '普通用户'
        }
      }
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    goto (val) {
      this.$router.push({name: val})
    },
    goBack () {
      this.$router.back()
    }
  }
}
</script>

<style scoped>

.body {
  width: 100%;
  height: 100%;
}

.center {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: -100px;
}
  .center-row{
    width: 100%;
    height: 50px;
    margin-bottom: 20px;
  }
</style>
