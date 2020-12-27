<template>
  <el-container>
    <el-header>
      <div class="header">
        <div style="margin-top: 16px;">
          <div class="theme">
            <el-page-header
              @back="goBack" content="垃圾分类小游戏管理系统">
            </el-page-header>
          </div>
        </div>
        <div class="menu">
          <el-menu style="border: none"
                   @select="handleSelect"
                   :default-active="$route.path.substr($route.path.lastIndexOf('/') + 1)"
                   class="el-menu-demo"
                   mode="horizontal"
                   router>
            <el-menu-item
              v-for="menu in menuList"
              v-bind:key="menu.id"
              :index="menu.index">{{ menu.name }}</el-menu-item>
          </el-menu>
        </div>
        <div class="menu_right">
          <el-tag
            type="info"
            size="medium"
            style="font-size: 16px"
            @click="$router.push({name: 'SortTrash'})">开始练习</el-tag>
          <el-tag
            type="danger"
            size="medium"
            style="margin-left: 16px; font-size: 16px"
            @click="logout">退出登录</el-tag>
        </div>
      </div>
    </el-header>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'MenuLayout',
  data () {
    return {
      menuList: [],
      active: ''
    }
  },
  created () {
    const list = JSON.parse(localStorage.getItem('roles'))
    this.menuList = []
    for (let item of list) {
      if (item.menuCode.length > 4 && item.menuCode.indexOf('menu') !== -1) {
        let menu = {
          id: item.menuId,
          index: item.menuCode.substr(5),
          name: item.menuName
        }
        this.menuList.push(menu)
      }
    }
  },
  methods: {
    changeActive () {
      let path = this.$route.path
      this.active = path.substr(path.lastIndexOf('/') + 1)
      this.active = this.active.substr(0, 1).toUpperCase() + this.active.substr(1)
    },
    handleSelect (key, keyPath) {
      // console.log(key, keyPath)
      // if (key !== this.active) {
      //   const that = this
      //   this.$router.push({name: key}).then(
      //     that.active = key
      //   )
      // }
    },
    goBack () {
      this.$router.back()
      this.changeActive()
    },
    logout () {
      this.$confirm('确定要退出登录吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        localStorage.removeItem('access-token')
        window.location.href = '/'
      }).catch(() => {
      })
    }
  }
}
</script>

<style scoped>
.header {
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  align-content: center;
  border-bottom: 1px solid lightgrey;
}

.theme {
  width: 310px;
  display: flex;
}

.menu {
  width: 100%;
  margin-left: 32px;
  display: flex;
  flex-direction: row;
  align-content: center;
}

.menu_right {
  margin-top: 16px;
  display: flex;
  justify-content: center;
  margin-left: auto;
  cursor: pointer;
  font-family: 'Hiragino Sans GB', serif;
}
</style>
