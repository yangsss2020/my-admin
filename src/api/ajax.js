/*
ajax请求函数模块
返回值: promise对象(异步返回的数据是: response.data)
 */
import axios from 'axios'
import { Message } from 'element-ui'
import router from '../router/router'
// axios配置
// axios 配置
axios.defaults.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
//
// // // POST传参序列化
// axios.interceptors.request.use((config) => {
//   // 单个网站的admin用户
//   config.headers.common['Gw-Admin-Access-Token'] = store.getters.adminAccessToken
//   // 整个网点user
//   config.headers.common['Gw-User-Access-Token'] = store.getters.userAccessToken
//   return config
// }, (err) => {
//   Message.error('参数错误')
//   return Promise.reject(err)
// })
// //
// // 返回状态判断
axios.interceptors.response.use((res) => {
  const response = res.data
  const url = res.config.url
  if (response.code === 14006 && url !== '/manage/sms/admin/current') {
    window.location.href = '/login'
    // Message.success(response.msg)
  }
  return res
}, (err) => {
  console.log(err)
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        Message.error(err.response.data.msg)
        break
      case 401:
        Message.error(err.response.data.msg)
        // window.location.href = '/login'
        break
      case 403:
        Message.error(err.response.data.msg)
        router.back()
        // window.lo
        break
      case 402:
        Message.error(err.response.data.msg)
        break
      case 404:
        console.log(err.response)
        Message.error('接口请求异常: ' + err.response.config.url + ', 请重试')
        break
      default:
        Message.error('Oops, 未知错误!')
    }
  }
  return Promise.reject(err)
})
//请求

export default function ajax (url, data = {}, type = 'GET') {
  return new Promise(function (resolve, reject) {
    // 执行异步ajax请求
    let promise
    if (type === 'GET') {
      // 准备url query参数数据
      let dataStr = '' // 数据拼接字符串
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
      // 发送get请求
      promise = axios.get(url)
    } else if (type === 'post') {
      // 发送post请求
      promise = axios.post(url, data)
    } else if (type === 'put') {
      // 发送post请求
      promise = axios.put(url, data)
    } else if (type === 'delete') {
      // 发送post请求
      let dataStr = '' // 数据拼接字符串
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
      promise = axios.delete(url)
    }
    promise.then(function (response) {
      // 成功了调用resolve()
      resolve(response.data)
    }).catch(function (error) {
      // 失败了调用reject()
      reject(error)
    })
  })
}

/*
const response = await ajax()
const result = response.data

const resule = await ajax()
 */
