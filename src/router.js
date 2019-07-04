
import VueRouter from 'vue-router'

//导入对应的路由组件
import HomeContainer from './components/tabbar/homeContainer.vue'
import MemberContainer from './components/tabbar/memberContainer.vue'
import shopCartContainer from './components/tabbar/shopCarContainer.vue'
import SearchContainer from './components/tabbar/searchContainer.vue'
import newsList from './components/news/newsList.vue'
import NewsInfo from './components/news/newsInfo.vue'

//.创建路由对象
var router = new VueRouter({
    routes: [
        { path: '/',redirect: '/home' },
        { path: '/home',component: HomeContainer },
        { path: '/member',component: MemberContainer },
        { path: '/shopcar',component: shopCartContainer },
        { path: '/search',component: SearchContainer },
        { path: '/home/newslist',component: newsList  },
        { path: '/home/newsInfo/:id',component: NewsInfo }
        
    ],
    linkActiveClass: 'mui-active'//覆盖默认的路由高亮的类，默认的类名为:router-link-active
})

export default router