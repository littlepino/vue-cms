//入口文件
//导入vue
import Vue from 'vue'

//按需导入mint-ui中的组件
import {Header} from 'mint-ui'
Vue.component(Header.name,Header)

//导入MUI的样式
import './lib/mui/css/mui.min.css'

//导入App根组件
import app from './App.vue'
var vm = new Vue({
    el: '#app',
    render: c=> c(app)
})