import Vue from 'vue'

function requestPost (url, method, data, token) {
  return new Promise((resolve, reject) => {
    Vue.http.post(url, data, {
      // baseURL: 'https://tomb.xuebaeasy.com/',
      method: method,
      headers: {
        'Content-Type': 'application/json;',
        'Access-Token': token
      },
      timeout: 10000
    }).then((res) => {
      // 这边可以验证请求的token是否有效
      if (res.headers.token_status === 'no') {
        alert('获取用户信息失败，请重新登录')
      } else {
        resolve(res.data)
      }
    }).catch((res) => {
      reject(res)
    })
  })
}

function requestGet (url, method, data, token) {
  return new Promise((resolve, reject) => {
    Vue.http.get(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json;',
        'Access-Token': token,
        'data': data
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
  return requestGet(obj.url, 'GET', obj.data, null)
}

function post (obj) {
  return requestPost(obj.url, 'POST', JSON.stringify(obj.data), null)
}

function postNoToken (obj) {
  return requestPost(obj.url, 'POST', JSON.stringify(obj.data), null)
}

// 如果传TableReqDTO,数据不要转为JSON.STRING
function postNoJSON (obj) {
  return requestPost(obj.url, 'POST', obj.data, null)
}

export default {
  get,
  post,
  postNoJSON,
  postNoToken
}
