//入口文件
//导入vue
import Vue from 'vue'
//1.1 导入路由的包
import VueRouter from 'vue-router'
//1.2 安装路由
Vue.use(VueRouter)

import moment from 'moment'
//定义全局的过滤器
Vue.filter('dataFormat',function(dataStr,pattern = "YYYY-MM-DD HH:mm:ss"){
  return  moment(dataStr).format(pattern)
})

//1.3导入自己的router.js路由模块
import router from './router.js'

//2.1 导入vue-resource
import VueResource from 'vue-resource'
//2.2 安装vue-resource
Vue.use(VueResource)

//安装图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

//设置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005'
//全局设置post时候表单数据格式的组织形式 application/x-www-form-urlencoded
Vue.http.options.emulataJSON = true;
//按需导入mint-ui中的组件

import {Header,Swipe, SwipeItem,Button,Lazyload } from 'mint-ui'

Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name,Button)
Vue.use(Lazyload);



//导入MUI的样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

//导入App根组件
import app from './App.vue'
var vm = new Vue({
    el: '#app',
    render: c=> c(app),
    router //1.4 挂载路由到vue实例对象上
})