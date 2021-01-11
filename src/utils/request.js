import Vue from 'vue'

function requestPost (url, method, data) { // 发送post请求
  return new Promise((resolve, reject) => {
    Vue.http.post(url, data, {
      // baseURL: 'https://tomb.xuebaeasy.com/',
      method: method,
      headers: {
        'Content-Type': 'application/json;',
        'Access-Token': localStorage.getItem('access-token') // localStorage 用于长久保存整个网站的数据，保存的数据没有过期时间，直到手动去删除。
      },
      timeout: 10000
    }).then((res) => {
      // 这边可以验证请求的token是否有效
      if (res.headers.map.token_status[0] === 'no') { // token无效，登录无效，删除key值，自动跳转到登录界面
        localStorage.removeItem('access-token')
        alert('登录已过期，请重新登录')
        window.location.href = '/'
      } else {
        resolve(res.data)
      }
    }).catch((res) => {
      reject(res)
    })
  })
}

// 'Content-Type': 'multipart/form-data;multipart/form-data;boundary=12341411'
function postFile (url, data) { // post文件
  return new Promise((resolve, reject) => {
    Vue.http.post(url, data, {
      // baseURL: 'http://39.102.95.93:9123/',
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data;multipart/form-data;boundary=12341411',
        'Access-Token': localStorage.getItem('access-token')
      },
      timeout: 10000
    }).then((res) => {
      // 这边可以验证请求的token是否有效
      if (res.headers.map.token_status[0] === 'no') {
        localStorage.removeItem('access-token')
        alert('登录已过期，请重新登录')
        window.location.href = '/'
      } else {
        resolve(res.data)
      }
    }).catch((res) => {
      reject(res)
    })
  })
}

function requestGet (url, method, data, token) { // get方法
  return new Promise((resolve, reject) => {
    Vue.http.get(url, data, {
      method: method,
      headers: {
        'Content-Type': 'application/json;',
        'Access-Token': token
      },
      responseType: 'blob',
      timeout: 10000
    }).then((res) => {
      // 这边可以验证请求的token是否有效
      resolve(res.data)
    }).catch((res) => {
      reject(res)
    })
  })
}

function get (obj) {
  return requestGet(obj.url, 'GET', obj.data)
}

function post (obj) {
  return requestPost(obj.url, 'POST', JSON.stringify(obj.data))
}

// 如果传TableReqDTO,数据不要转为JSON.STRING
function postNoJSON (obj) {
  return requestPost(obj.url, 'POST', obj.data)
}

export default {
  get,
  post,
  postNoJSON,
  postFile
}
