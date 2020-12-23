<template>
  <el-container>
    <el-header>
      <div class="menu">
        <el-menu style="margin-left: 16px;width: 100%; display: flex;flex-direction: row"
                 @select="handleSelect"
                 :default-active="active"
                 class="el-menu-demo" mode="horizontal">
          <div @click=";">
            <el-page-header
              style="margin-right: 32px;margin-top: 16px;border: none;"
              @back="goBack" content="垃圾分类小游戏管理系统">
            </el-page-header>
          </div>
          <el-menu-item index="UserInfo">用户信息</el-menu-item>
          <el-menu-item index="SortTrash">开始游戏</el-menu-item>
          <el-menu-item index="GarbageManage">题库管理</el-menu-item>
          <el-menu-item index="Analysis">数据统计</el-menu-item>
        </el-menu>
        <div class="line"></div>
      </div>
    </el-header>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'MenuLayout',
  data () {
    return {
      active: ''
    }
  },
  created () {
    let path = this.$route.path
    this.active = path.substr(path.lastIndexOf('/') + 1)
    this.active = this.active.substr(0, 1).toUpperCase() + this.active.substr(1)
  },
  methods: {
    handleSelect (key, keyPath) {
      if (key !== this.active) {
        const that = this
        this.$router.push({name: key}).then(
          that.active = key
        )
      }
    },
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
.menu {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-content: center;
}
</style>
