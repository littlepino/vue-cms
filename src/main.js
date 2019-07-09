//入口文件
//导入vue
import Vue from 'vue'
//1.1 导入路由的包
import VueRouter from 'vue-router'
//1.2 安装路由
Vue.use(VueRouter)



//注册 vuex
import Vuex from 'vuex'
Vue.use(Vuex)
 
//每次刚进入网站，肯定会调用 main.js,在刚调用的时候，先从本地存储中把购物车的数据读出来，放到store中
var car = JSON.parse(localStorage.getItem('car') || '[]')

var store = new Vuex.Store({
  state: {
    
      // this.$store.state.***
      car: car // 将 购物车中商品的数据，用一个数组存储起来，在car数组中，存储一些商品的对象，可以暂时将这个商品对象，设计成
      // {id:商品ID,count: 购买数量, price: 商品单价,selected: true/false}
    
  },
  mutations: { // this.$store.commit('方法的名称', '按需传递唯一的参数')
    addToCar(state, goodsinfo){
      //点击加入购物车，把商品信息，保存到 store 中的 caar 上
      //分析：
      //1.如果购物车中，之前已经存在这个对应的商品，那么，只需要更新数量
      //2.如果没有，则直接把商品数据，push到car 中

      //假设 在购物车中，没有找到对应的商品
      var flag = false

      state.car.some(item=> {
        if(item.id == goodsinfo.id){
          item.count += parseInt(goodsinfo.count);
          flag = true
          return true
        }
      })
      
      //如果最终，循环完毕，得到的flag还是false,则把商品的数据直接push到购物车中
      if(!flag){
        state.car.push(goodsinfo)
      }

      //当 跟新 car之后，把 car 数组，存储到本地的 localStorage 中
      localStorage.setItem('car',JSON.stringify(state.car));
    },
    updateGoodsInfo(state,goodsinfo){
      // 修改购物车中商品的数量值
      //分析： 
      state.car.some(item => {
        if(item.id == goodsinfo.id){
          item.count = parseInt(goodsinfo.count)
          return true
        }
      })
      //当修改完商品的数量，把最新的购物车数据保存到本地存储中
      localStorage.setItem('car',JSON.stringify(state.car));

    },
    removeFormCar(state,id){
      //根据id,从store 中的购物车删除对应的那条商品数据
      state.car.some((item,i) => {
        if(item.id == id){
          state.car.splice(i ,1)
          return true
        }
      })
      //将删除完毕后，最新的购物车数据，同步到本地存储中
      localStorage.setItem('car',JSON.stringify(state.car));
    },
    updateGoodsSelected(state,info){
      state.car.some(item => {
        if(item.id == info.id){
          item.selected = info.selected
        }
      })
      //把最新的所有购物车的状态保存到store中去
      localStorage.setItem('car',JSON.stringify(state.car));
    }
  },
  getters: { //this.$store.getters.*** 
    //相当于计算属性，也相当于filters
    getAllCount(state){
      var c = 0;
      state.car.forEach(item => {
        c += item.count
      })
      return c
    },
    getGoodsCount(state){
      var o = {}
      state.car.forEach(item => {
        o[item.id] = item.count
      })
      return o;
    },
    getGoodsSelected(state){
      var o = {}
      state.car.forEach(item => {
        o[item.id] = item.selected
      })
      return o
    },
    getGoodsCountAndAmount(state){
      var o = {
        count: 0,//勾选的数量
        amount: 0//勾选的总价
      }
      state.car.forEach(item => {
        if(item.selected){
          o.count += item.count
          o.amount += item.price * item.count
        }
      })
      return o
    }
  }
})


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

import {Header,Swipe, SwipeItem,Button,Lazyload,Switch } from 'mint-ui'

Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name,Button)
Vue.component(Switch.name, Switch);
Vue.use(Lazyload);



//导入MUI的样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

//导入App根组件
import app from './App.vue'
var vm = new Vue({
    el: '#app',
    render: c=> c(app),
    router, //1.4 挂载路由到vue实例对象上
    store,//挂载store状态管理对象
})