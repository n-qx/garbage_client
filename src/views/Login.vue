<template>  <!-- template标签，HTML5提供的新标签，更加规范和语义化 ；可以把列表项放入template标签中，然后进行批量渲染 -->
  <div id="app">
    <div class="login-container">
        <div class="login-top">
          <img src="../img/login-icon.jpg" class="login-icon" alt="欢迎登陆">
          <div class="login-icon-tip">欢迎登陆垃圾分类小系统</div>
        </div>
        <div class="login-content">
            <div class="login-content-wrap">

              <div class="image">
                 <img src="../img/timg.jpg" class="login-content-photo">
              </div>
              <div class="login-warp">
                 <form method="post" name="loginForm">
                    <!--class类选择器-->
                   <div class="loginTable">
                        <div style="width: 100%;">
                            <div style="width: 100%; display: flex;flex-direction: row">
                                <h2>用户登录
                                <a @click="$router.push({name: 'Register'})"
                                   target="_self">   <!-- _self表示在本窗口开新的界面,blank表示在新窗口开新的界面 -->
                                   用户注册
                                </a></h2>

                                <h2 style="margin-left: auto; cursor: pointer"
                                    @click="$router.push({name: 'SortTrash'})"><!-- @:绑定事件的简写形式   v-bind简写为: 给html标签的属性设置变量的值 -->
                                    垃圾分类小游戏                                <!-- v-model : 取用JSON对象的value值，可以仅取用，也可以赋值 -->
                                </h2>
                            </div>

                            <hr style="width: 100%; height: 1px; color:silver">  <!-- silver -->
                        </div>
                        <div class="tableRow">

                  <div class="label">
                    <span class="registerMessage">用户名：</span>
                  </div>
                  <label>
                    <input class="loginText" v-model="formData.userName" type="text"
                           onfocus="this.placeholder=''" onblur="this.placeholder='请输入用户名'"
                           placeholder="请输入用户名">
                  </label>

                </div>
                        <div class="tableRow">
                  <div class="label">
                    <span class="registerMessage">密码：</span>
                  </div>
                  <label>
                    <input class="loginText" v-model="formData.userPwd" type="password"
                           onfocus="this.placeholder=''" onblur="this.placeholder='请输入密码'"
                           placeholder="请输入密码">
                  </label><!--placeholder该提示会在输入字段为空时显示，并会在字段获得焦点时消失。-->
                </div>
                        <div class="align_left">
                  <div>
                    <input id="rememberMe" v-model="formData.rememberMe" type="checkbox">
                    <label id="loginCheck" for="rememberMe">两周内自动登录</label>
                  </div>
                </div>
                        <div class="tableRow">
                  <div class="label">
                    <span class="registerMessage">验证码：</span>
                  </div>
                  <label>
                    <input class="loginText" style="width: 120px;"
                           v-model="formData.userCode"
                           placeholder="请输入验证码">
                  </label>
                  <div class="codeContainer">
                    <img class="codeImage" :src="imgInfo.src" alt="" id="codeImage" ref="codeImage"
                         @click="changeCode(this)">
                  </div>
                </div>
                        <div class="buttons">
                  <input class="loginButton"
                         id="loginSys"
                         name="loginSys"
                         type="button"
                         :disabled="!clickType"
                         @click="handleSubmit" value="登    录">  <!-- :disabled:控件禁用 -->
                  <!-- localStorage用于持久化的本地存储，除非主动删除数据，否则数据是永远不会过期的 -->
                  <!-- localStorage.getItem(key):获取指定key本地存储的值 -->
                  <!-- localStorage.setItem(key,value)：将value存储到key字段 -->
                  <!-- localStorage.removeItem(key):删除指定key本地存储的值 -->
                  <input class="loginButton" id="resetForm" name="resetForm" type="reset"
                         value="重    置">
                </div>
                  </div>
                 </form>
          </div>

        </div>
      </div>
        <div class="login-footer">
          <span>版权所有 © 浙大宁波理工学院数据分院</span>
        </div>
      </div>
    </div>
</template>

<script>
import md5 from 'md5'
import request from '../utils/request'

export default {
  name: 'Login',
  data () {
    return {
      clickType: true,
      formData: {
        userName: '',
        userPwd: '',
        rememberMe: false,
        userCode: ''
      },
      imgInfo: {
        src: '',
        imgCodeKey: ''
      }
    }
  },
  created () {
    let token = localStorage.getItem('access-token')
    if (token && token.length > 0) {
      // token验证通过，替换页面
      this.$router.replace({name: 'UserInfo'})
    }
    this.changeCode()
  },
  mounted () {
    // 绑定事件,回车登录
    window.addEventListener('keydown', this.keyDown)
  },
  destroyed () {
    window.removeEventListener('keydown', this.keyDown, false)
  },
  methods: {
    keyDown (e) {
      // 如果是回车则执行登录方法
      if (e.keyCode === 13) {
        this.handleSubmit()
      }
    },
    // 更改验证码
    changeCode () {
      const that = this
      // .then((res)=>{ })里的res是指接口成功返回的数据,包含请求头,请求体,等信息;
      request.get({url: 'api/code/getImgCode'}).then(res => {
        that.imgInfo.src = res.data
        that.imgInfo.imgCodeKey = res.imgCodeKey
      }).catch(err => {
        console.log(err)
      })
    },

    handleSubmit () {
      if (!this.formData.userCode || this.formData.userCode.length === 0) {
        this.$message({
          type: 'error',
          showClose: true,
          message: '验证码为空'})
        return
      }
      let formData = {
        loginName: this.formData.userName,
        // 密码加密
        loginPwd: md5(this.formData.userPwd),
        rememberMe: this.formData.rememberMe
      }
      let imgData = {
        imgCodeKey: this.imgInfo.imgCodeKey, // 给 key赋value
        // userCode就是用户输入的验证码
        imgCode: this.formData.userCode
      }
      const that = this
      this.clickType = false
      request.post({url: '/api/code/checkImgCode', data: imgData}).then(res => {
        if (res.message === 'yes') {
          request.post({url: '/api/user/login', data: formData}).then(res => {
            that.clickType = true
            if (res.message === 'success') {
              localStorage.setItem('access-token', res.result.token)
              localStorage.setItem('roles', JSON.stringify(res.result.roles))
              this.$message({
                type: 'success',
                showClose: true,
                message: '登录成功'})
              that.$router.push({name: 'Exam'})
            } else {
              this.$message({
                type: 'error',
                showClose: true,
                message: res.result || '登录失败'})
            }
          }).catch(err => {
            that.clickType = true
            console.log(err)
          })
        } else {
          that.formData.userCode = ''
          that.clickType = true
          this.$message({
            type: 'error',
            showClose: true,
            message: res.result || '登录失败'})
          that.changeCode()
        }
      }).catch(err => {
        that.clickType = true
        console.log(err)
      })
    }
  }
}
</script>

<style>
  .login-container{
    width: 100%;
    height: 100%;
    flex-direction: column;
  }
  .login-top {
    width: 300px;
    height: 120px;
    margin: 0 auto;
    position: relative;
  }

  .login-icon {
    height: 100px;
    width: 250px;
  }

  .login-icon-tip {
    display: block;
    width: 350px;
    height: 40px;
    position: absolute;
    left: 270px;
    top: 50px;
    right: 0;
    bottom: 0;
    font: 30px 黑体;
  }
  .login-content {
    flex: 1;
    display: flex;
  }
  .login-content-photo{
    height: 400px;
    width: 600px;
    align: center;
  }
  .login-warp{
    position: relative;
    bottom: 0;
    left: 0;
    width: 550px;
    height: 400px;
    background: white;
  }

  .login-content-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 440px;
    width: 100%;
    margin-top: 20px;
    background: powderblue;
  }
  .login-footer {
    text-align: center;
    margin-top: 20px;
    font: 20px "微软雅黑 Light";
    color: silver;
  }

  h2 {
    color: #3d3d3d;
    font-family: "微软雅黑", serif;
    font-size: 20px;
    font-weight: bold;
  }

  .label {
    margin-left: 12px;
    width: 80px;
  }

  .tableRow {
    height: 55px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .registerMessage {
    color: #3d3d3d;
    font: bold 16px 微软雅黑;
  }

  a {
    font-size: 13px;
    cursor: pointer;
  }

  /*html选择器*/
  a:link {
    color: #3d3d3d;
    text-decoration: none;
    font-family: "微软雅黑", serif;
    font-size: 13px;
    font-weight: bold;
  }

  /*html选择器*/
  a:visited {
    background: #ebccff;
    text-decoration: none;
    font-family: "微软雅黑 Light", serif;
    font-size: 13px;
    font-weight: bold;
  }

  /*html选择器*/
  a:hover {
    background: #ebccff;
    text-decoration: underline;
    font-family: "微软雅黑 Light", serif;
    font-size: 13px;
    font-weight: bold;
  }

  /*html选择器*/
  a:active {
    background: lightskyblue;
    text-decoration: underline;
    font-family: "微软雅黑 Light", serif;
    font-size: 13px;
    font-weight: bold;
  }

  /*class类选择器*/
  .loginTable {
    width: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .align_left {
    align-self: flex-start;
  }

  /*class类选择器*/
  .loginTable td {
    width: 100%;
    height: 50px;
    border: none;
  }

  /*class类选择器*/
  .loginText {
    margin-top: 12px;
    color: #000000;
    width: 300px;
    font-family: "微软雅黑 Light", serif;
    font-weight: bold;
    font-size: 14px;
    padding: 8px 10px;
    cursor: hand;
  }

  .buttons {
    margin-left: 92px;
    margin-top: 12px;
    width: 330px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  /*class类选择器*/
  .loginButton {
    color: white;
    width: 155px;
    height: 35px;
    font: bold 16px 微软雅黑 Light;
    padding: 1px 20px 0 20px;
    border: #ebccff 1px solid;
    background: lightskyblue;
    cursor: pointer;
  }

  /*id选择器*/
  #rememberMe {
    margin-top: 12px;
    margin-left: 135px;
  }

  /*id选择器*/
  #loginCheck {
    color: #3d3d3d;
    font: bold 14px 微软雅黑 Light;
  }

  ::-webkit-input-placeholder {
    font-family: "微软雅黑 Light", serif;
    font-weight: bold;
    font-size: 14px;
    color: silver;
  }

  .codeContainer {
    background: #FFFFFF;
    width: 160px;
    height: 40px;
    margin-left: 20px;
    margin-top: 12px;
  }

  .codeImage {
    width: 100%;
    height: 100%;
  }
</style>
