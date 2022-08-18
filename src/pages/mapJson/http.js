import axios from 'axios'
import Setting from '@/setting/index'
// import Vue from 'vue'
import Cookies from 'js-cookie'


const http = axios.create({
  baseURL: Setting.api.dashboard,
  timeout: 50000,
  withCredentials: true
})

// 取消请求
const globalCancelHttpGroup = []

// http请求拦截
http.interceptors.request.use(function (config) {
  // 所有的接口都会默认开启
  if (config.globalCancelHttp !== false) {
    config.httpUUID = +new Date()
    // 开启全局取消请求配置
    config.cancelToken = new axios.CancelToken(function (c) {
      globalCancelHttpGroup.push({
        uuid: config.httpUUID,
        url: config.url,
        method: config.method,
        cancel: c
      })
    })
  }
  if(Setting.api.token){
    config.headers.Authorization = Setting.api.token
  }
  if (Cookies.get('token')) {
    config.headers.Authorization = Cookies.get('token')
  }
  return config
}, function (error) {
  // 请求失败的处理
  console.log(error, '1')
  return Promise.reject(error)
})

// http响应拦截
http.interceptors.response.use(function (res) {
  // 移除对应取消请求的实例
  res.config && removeGlobalCancelHttpGroup(res.config.httpUUID)
  return res
}, function (error) {
  // 移除对应取消请求的实例
  error.config && removeGlobalCancelHttpGroup(error.config.httpUUID)
  // Do something with response error
    if (error.response) {
    switch (error.response.status) {
      case 401:
        break
      case 403:
        break
      default:
        return Promise.reject(error)
    }
  } else {
    return Promise.reject(error)
  }
})

function removeGlobalCancelHttpGroup (uuid) {
  for (let i = 0; i < globalCancelHttpGroup.length; i++) {
    if (globalCancelHttpGroup[i].uuid === uuid) {
      globalCancelHttpGroup.splice(i, 1)
      break
    }
  }
}

function executeCancelHttp () {
  for (let i = 0; i < globalCancelHttpGroup.length; i++) {
    globalCancelHttpGroup[i].cancel(`取消请求：[${globalCancelHttpGroup[i].method}]${globalCancelHttpGroup[i].url}`)
    globalCancelHttpGroup.splice(i, 1)
    --i
  }
}

export default http
export { executeCancelHttp }
