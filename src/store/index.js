import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// 引入模块
import menu from './modules/menu/index.js'//系统管理
import role from './modules/role/index.js'//角色管理
import admin from './modules/admin/index.js'//管理员管理
import classify from './modules/classifyshop/index.js'//商品分类
import specs from './modules/specs/index.js'//商品规格
import goodsinfo from './modules/goodsinfo/index.js'//商品管理
import member from './modules/member/index.js'//会员管理
import banner from './modules/banner/index.js'//轮播图管理
import seck from './modules/seck/index.js'//秒杀活动
export default new Vuex.Store({
  state: {
    //登录信息
    userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : null
  },

  mutations: {
    CHANGEUSERINFO(state, payload) {
      //有登录信息存登录信息到缓存
      if (payload) {
        state.userInfo = payload;
        sessionStorage.setItem('userInfo', JSON.stringify(payload))
      } else {
        state.userInfo = null;
        sessionStorage.removeItem('userInfo')
      }
    }
  },
  actions: {
    //存入登录信息的行动
    changeuserInfo({ commit }, payload) {
      commit('CHANGEUSERINFO', payload)
    }
  },
  getters: {
    //返回登录信息
    getuserinfo(state) {
      return state.userInfo
    }
  },
  modules: {
    //模块
    menu, role, admin, classify, specs, goodsinfo,
    member, banner, seck
  }
})
