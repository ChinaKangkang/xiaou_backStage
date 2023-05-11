import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store/index'

//封装一个判断当前模块是否有权限的方法
function hasUrl(url, next) {
  //判断当前地址是否在信息menus数组中，如果在就放行，如果不在就拦截，强制它跳转首页
  let resurt = store.getters.getuserinfo.menus_url.some(item => url === item)
  // console.log(resurt, '仓库');
  if (resurt) {
    next()
  } else {
    next('/home')
  }
}
//将子路由提出来 用来优化地址选项
export const IndexRouter = [
  {
    path: '/menu',
    component: () => import('../views/menu/menu.vue'),
    name: '菜单管理',
    meta: {
      title: '菜单管理'
    },
    beforeEnter: (to, from, next) => {
      hasUrl('/menu', next)
    }
  },
  {
    path: '/role',
    component: () => import('../views/role/role.vue'),
    name: '角色管理',
    meta: {
      title: '角色管理'
    },
    beforeEnter: (to, from, next) => {
      hasUrl('/role', next)
    }
  },
  {
    path: '/administrator',
    component: () => import('../views/Administrator/administrator.vue'),
    name: '管理员管理',
    meta: {
      title: '管理员管理'
    },
    beforeEnter: (to, from, next) => {
      hasUrl('/administrator', next)
    }
  },
  {
    path: '/classifyshop',
    component: () => import('../views/classifyshop/classify.vue'),
    name: '商品分类',
    meta: {
      title: '商品分类'
    }
  },
  {
    path: '/specs',
    component: () => import('../views/specs/specs.vue'),
    name: '商品规格',
    meta: {
      title: '商品规格'
    }
  },
  {
    path: '/goosinfo',
    component: () => import('../views/goosinfo/goosinfo.vue'),
    name: '商品管理',
    meta: {
      title: '商品管理'
    }
  },
  {
    path: '/member',
    component: () => import('../views/member/member.vue'),
    name: '会员列表',
    meta: {
      title: '会员列表'
    }
  },
  {
    path: '/banner',
    component: () => import('../views/banner/banner.vue'),
    name: '轮播图管理',
    meta: {
      title: '轮播图管理'
    }
  },
  {
    path: '/seck',
    component: () => import('../views/seck/seck.vue'),
    name: '秒杀活动',
    meta: {
      title: '活动列表'
    }
  }
]
Vue.use(VueRouter)

const routes = [
  // 一级路由重定向
  {
    path: '*',
    redirect: '/index'
  },
  {
    path: '/index',
    component: () => import('../pages/index.vue'),
    children: [
      ...IndexRouter,
      //二级路由重定向
      {
        path: '',
        redirect: '/home'
      },
      {
        path: '/home',
        component: () => import('../views/home.vue'),
        name: '首页',
        meta: {
          title: '首页'
        },
      }

    ]
  },
  {
    path: '/login',
    component: () => import('../pages/login.vue'),
    name: 'login',
    meta: {
      metaname: '登录'
    }
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
//全局路由导航守卫 如果不是登录页面或者未登录都默认在登录
router.beforeEach((to, from, next) => {
  // console.log(to.path);
  // console.log(store.getters.getuserinfo);
  //判断用户地址是否是登录
  if (to.path == '/login') {
    next()
    return
  } else if (store.getters.getuserinfo) {//判断用户是否登录
    // console.log('登录');
    next()
    return
  } else {//没有登录统一跳转登录
    next('/login')
  }




})
export default router
