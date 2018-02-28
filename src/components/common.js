/* eslint-disable */
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import LoadingBar from './Shared/LoadingBar'
LoadingBar.config({color: '#5cb85c', failedColor: '#ff4949'})
Vue.prototype.$loadingBar = LoadingBar

import STable from './Shared/Table/STable'
Vue.component(STable.name, STable)

import SearchBar from './Shared/SearchBar'
Vue.component(SearchBar.name, SearchBar)

import Pagination from './Shared/Pagination'
Vue.component(Pagination.name, Pagination)

