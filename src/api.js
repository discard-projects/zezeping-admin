import axios from 'axios'
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
  // Do something with response data
  return response
}, function (error) {
  // Do something with response error
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
  login: (data) => cusAxios.post('auth/sign_in', data),
  register: (data) => cusAxios.post('auth', data),
  logout: () => cusAxios.delete('/auth/sign_out'),
  loginFromGithub: (data) => cusAxios.get('auth/github', data),
  // validateToken: () => instance.get('auth/validate_token'),
  getMeProfile: () => cusAxios.get('/profile'),
  // shop
  getStores: (params) => cusAxios.get('stores', {params}),
  getStore: (id, params) => cusAxios.get(`stores/${id}`, {params}),
  postStore: (data) => cusAxios.post('stores', data, {headers: { 'Content-Type': 'multipart/form-data' }}),
  putStore: (id, data) => cusAxios.put(`stores/${id}`, data, {headers: { 'Content-Type': 'multipart/form-data' }}),
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
  // attachment_image
  postAttachmentImage: (data) => cusAxios.post('attachment_images', data, {headers: { 'Content-Type': 'multipart/form-data' }})
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
