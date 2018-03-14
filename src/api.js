import Vue from 'vue'
import axios from 'axios'
import router from '@/router'
let store = null
const cusAxios = axios.create({
  baseURL: process.env.API_ROOT,
  timeout: 90000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Api-Platform': 'admin'
  }
})
cusAxios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// Add a request interceptor
cusAxios.interceptors.request.use(function (config) {
  // Do something before request is sent
  Object.assign(config.headers, tokenHeader())
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
// Add a response interceptor
cusAxios.interceptors.response.use(function (response) {
  Vue.prototype.$loadingBar.finish()
  // Do something with response data
  if (response.data.msg) {
    Vue.prototype.$message({ showClose: true, message: response.data.msg, type: 'success' })
  } else if (response.status === 204) {
    Vue.prototype.$message({ showClose: true, message: 'success', type: 'success' })
  }
  return response
}, function (error) {
  // Do something with response error
  Vue.prototype.$loadingBar.error()
  if (error.response) {
    if (error.response.status === 401) {
      Vue.prototype.$message({ showClose: true, message: error.response.data.message || 'Unauthorized!', type: 'error' })
      store.dispatch('logout')
      router.push('/login')
    } else if (error.response.status === 500) {
      Vue.prototype.$message({ showClose: true, message: 'data error!', type: 'error' })
    } else if (error.response.status === 404) {
      Vue.prototype.$message({ showClose: true, message: '404 Not Found!', type: 'error' })
    } else if (error.response.data && error.response.data.msg) {
      Vue.prototype.$message({ showClose: true, message: error.response.data.msg, type: 'error' })
    }
  } else {
    Vue.prototype.$message({ showClose: true, message: 'network error', type: 'error' })
  }
  return Promise.reject(error)
})

const tokenHeader = () => {
  const authInfo = store.state.user.authInfo
  if (authInfo) {
    return {
      'access-token': authInfo['token'],
      client: authInfo['client'],
      uid: authInfo['uid']
    }
  }
  return {}
}

var api = {
  login: (data) => cusAxios.post('auth_admin/sign_in', data),
  register: (data) => cusAxios.post('auth_admin', data),
  logout: () => cusAxios.delete('/auth_admin/sign_out'),
  // validateToken: () => instance.get('auth2/validate_token'),
  getMeProfile: () => cusAxios.get('/profile'),
  // shop
  getStores: (params) => cusAxios.get('stores', {params}),
  getStore: (id, params) => cusAxios.get(`stores/${id}`, {params}),
  postStore: (data) => cusAxios.post('stores', data, {headers: { 'Content-Type': 'multipart/form-data' }}),
  putStore: (id, data) => cusAxios.put(`stores/${id}`, data, {headers: { 'Content-Type': 'multipart/form-data' }}),
  postStoreComment: (storeId, data) => cusAxios.post(`stores/${storeId}/comments`, data),
  // region
  getRegions: (params) => cusAxios.get('regions/index_roots', {params}),
  getRegion: (id, params) => cusAxios.get(`regions/${id}`, {params}),
  postRegion: (data) => cusAxios.post('regions', data),
  putRegion: (id, data) => cusAxios.put(`regions/${id}`, data),
  // category
  getCategories: (params) => cusAxios.get('categories/index_roots', {params}),
  getCategory: (id, params) => cusAxios.get(`categories/${id}`, {params}),
  postCategory: (data) => cusAxios.post('categories', data),
  putCategory: (id, data) => cusAxios.put(`categories/${id}`, data),
  putIncrementPosition: (id, data) => cusAxios.put(`categories/${id}/increment_position`, data),
  putDecrementPosition: (id, data) => cusAxios.put(`categories/${id}/decrement_position`, data),
  // attachment_image
  postAttachmentImage: (data) => cusAxios.post('attachment_images', data, {headers: { 'Content-Type': 'multipart/form-data' }}),
  // banners
  getBanners: (params) => cusAxios.get('banners', {params}),
  postBanner: (data) => cusAxios.post('banners', data),
  putBanner: (id, data) => cusAxios.put(`banners/${id}`, data),
  getBanner: (id, params) => cusAxios.get(`banners/${id}`, {params})
}
api.install = function (Vue, options) {
  if (options.store) {
    store = options.store
  }
  Vue.prototype.api = api
  Vue.prototype.cusAxios = cusAxios
  Vue.prototype.axios = axios
}
export default api
