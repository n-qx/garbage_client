<!--菜单布局-->
<template>
  <el-container>
    <el-aside width="150px" style="background-color: white">
      <!--<el-menu :default-openeds="['1','3']">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-message"></i>导航栏
          </template>
          <el-menu-item-group>
            <template slot="分组一"></template>
            <el-menu-item index="1-1">用户信息</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>-->
      <!-- <el-menu style="border: none"
               @select="handleSelect"
               :default-active="$route.path"
               class="el-menu-demo"
               mode="horizontal"
               router>
        <el-menu-item
          v-for="menu in menuList"
          v-bind:key="menu.menuId"
          :index="nameMap[menu.menuSort]">{{ menu.menuName }}</el-menu-item>
        <el-submenu
          v-for="menu in menuList2"
          v-bind:key="menu.menuId"
          :index="nameMap[menu.menuSort]">
          <template slot="title">{{ menu.menuName }}</template>
          <el-menu-item
            v-for="subMenu in menu.children"
            v-bind:key="subMenu.menuSort"
            :index="subNameMap[subMenu.menuSort]">{{ subMenu.menuName }}</el-menu-item>
        </el-submenu>
      </el-menu>-->
      <!--<el-menu :default-openeds="['1', '4']">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-message"></i>首页</template>
          &lt;!&ndash;<el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项4-1</el-menu-item>
          </el-submenu>&ndash;&gt;
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-menu"></i>用户信息</template>
          <el-menu-item-group>
           &lt;!&ndash; <template slot="title">分组一</template>&ndash;&gt;
            <el-menu-item index="2-1">用户信息</el-menu-item>
            <el-menu-item index="2-2">用户管理</el-menu-item>
          </el-menu-item-group>
          &lt;!&ndash;<el-menu-item-group title="分组2">
            <el-menu-item index="2-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项4-1</el-menu-item>
          </el-submenu>&ndash;&gt;
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-setting"></i>题目信息</template>
          <el-menu-item-group>
            &lt;!&ndash;<template slot="title">分组一</template>&ndash;&gt;
            <el-menu-item index="3-1">题目管理</el-menu-item>
            <el-menu-item index="3-2">开始答题</el-menu-item>
          </el-menu-item-group>
         &lt;!&ndash; <el-menu-item-group title="分组2">
            <el-menu-item index="3-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="3-4">
            <template slot="title">选项4</template>
            <el-menu-item index="3-4-1">选项4-1</el-menu-item>
          </el-submenu>&ndash;&gt;
        </el-submenu>
        <el-submenu index="4">
          <template slot="title"><i class="el-icon-setting"></i>信息统计</template>
          <el-menu-item-group>
            &lt;!&ndash;<template slot="title">分组一</template>&ndash;&gt;
            <el-menu-item index="4-1">题目统计</el-menu-item>
            <el-menu-item index="4-2">用户统计</el-menu-item>
            <el-menu-item index="4-3">答题统计</el-menu-item>
          </el-menu-item-group>
          &lt;!&ndash; <el-menu-item-group title="分组2">
             <el-menu-item index="3-3">选项3</el-menu-item>
           </el-menu-item-group>
           <el-submenu index="3-4">
             <template slot="title">选项4</template>
             <el-menu-item index="3-4-1">选项4-1</el-menu-item>
           </el-submenu>&ndash;&gt;
        </el-submenu>
      </el-menu>-->
      <el-menu style="border: none"
               @select="handleSelect"
               default-active="$route.path"
               class="el-menu-demo"
               mode="horizontal"
               background-color="white"
               text-color="#000000"
               active-text-color="#ffd04b"
               router>
        <h5>垃圾分类管理系统</h5>
        <el-menu-item
          v-for="menu in menuList"
          v-bind:key="menu.menuId"
          :index="nameMap[menu.menuSort]">{{ menu.menuName }}</el-menu-item>
        <el-divider direction="vertical"></el-divider>
        <el-submenu
          v-for="menu in menuList2"
          v-bind:key="menu.menuId"
          :index="nameMap[menu.menuSort]">
          <template slot="title">{{ menu.menuName }}</template>
          <el-menu-item
            v-for="subMenu in menu.children"
            v-bind:key="subMenu.menuSort"
            :index="subNameMap[subMenu.menuSort]">{{ subMenu.menuName }}</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div class="header">
          <div style="margin-top: 16px;">
            <div class="theme">
              <el-page-header
                @back="goBack" content="Hello">
              </el-page-header>
            </div>
          </div>
         <!-- <div class="menu">
            <el-menu style="border: none"
                     @select="handleSelect"
                     :default-active="$route.path"
                     class="el-menu-demo"
                     mode="horizontal"
                     router>
              <el-menu-item
                v-for="menu in menuList"
                v-bind:key="menu.menuId"
                :index="nameMap[menu.menuSort]">{{ menu.menuName }}</el-menu-item>
              <el-submenu
                v-for="menu in menuList2"
                v-bind:key="menu.menuId"
                :index="nameMap[menu.menuSort]">
                <template slot="title">{{ menu.menuName }}</template>
                <el-menu-item
                  v-for="subMenu in menu.children"
                  v-bind:key="subMenu.menuSort"
                  :index="subNameMap[subMenu.menuSort]">{{ subMenu.menuName }}</el-menu-item>
              </el-submenu>
            </el-menu>
          </div>-->
          <div class="menu_right">
            <el-tag
              type="info"
              size="medium"
              style="font-size: 18px"
              @click="$router.push({name: 'SortTrash'})">小游戏</el-tag>
            <el-tag
              type="danger"
              size="medium"
              style="margin-left: 18px; font-size: 18px"
              @click="logout">退出登录</el-tag>
          </div>
        </div>
      </el-header>
      <el-main>
      <router-view/>
    </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'MenuLayout',
  data () {
    return {
      menuList: [],
      menuList2: [],
      active: '',
      nameMap: { // 父菜单
        1: '/menu/userInfo',
        2: '/menu/userManage',
        3: '/menu/garbageManage',
        4: '/menu/analysis',
        5: '/menu/exam'
      },
      subNameMap: { // 子菜单
        1: '/menu/analysis/garbageAnalysis',
        2: '/menu/analysis/userAnalysis',
        3: '/menu/analysis/examLog'
      }
    }
  },
  created () {
    const list = JSON.parse(localStorage.getItem('roles'))
    this.menuList = []
    this.menuList2 = []
    for (let item of list) {
      if (item.menuCode === 'menu') {
        for (let menu of item.children) {
          if (menu.children.length > 0) { // 如果子菜单的长度大于0
            this.menuList2.push(menu)
          } else {
            this.menuList.push(menu)
          }
        }
      }
    }
  },
  methods: {
    changeActive () {
      let path = this.$route.path
      this.active = path.substr(path.lastIndexOf('/') + 1)
      this.active = this.active.substr(0, 1).toUpperCase() + this.active.substr(1) // 把字符串转换为大写
    },
    handleSelect (key, keyPath) {
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
  width: 315px;
  display: flex;
}

.menu {
  width: 100%;
  margin-left: 30px;
  display: flex;
  flex-direction: row;
  align-content: center;
}

.menu_right {
  margin-top: 15px;
  display: flex;
  justify-content: center;
  margin-left: auto;
  cursor: pointer;
  font-family: 'Hiragino Sans GB', serif;
}
</style>
