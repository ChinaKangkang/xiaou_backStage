import { bannerlist } from '../../../request/api'
const state = {
    bannerList: []
}
const mutations = {
    //轮播图数据
    GETBANNERLIST(state, playload) {
        state.bannerList = playload
    }
}
const actions = {
    //获取轮播图数据
    getBannerList({ commit }) {
        bannerlist().then(res => {
            console.log(res);
            if (res.code == 200) {
                commit('GETBANNERLIST', res.list)
            }
        }).catch(err => {
            console.log(err);
        })
    }
}
const getters = {
    getBanner(state) {
        return state.bannerList
    }
}
export default {
    state,
    mutations,
    actions,
    getters,
    //开启命名空间
    namespaced: true
}