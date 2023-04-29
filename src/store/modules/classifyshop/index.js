import { catelist } from '../../../request/api'
const state = {
    //商品分类列表
    classifyShoplist: []
}
const mutations = {
    GETCLASSIFYSHOPLIST(state, payload) {
        state.classifyShoplist = payload
    }
}
const actions = {
    //封装请求商品分类的列表
    getclassifyShoplist({ commit }, payload) {
        catelist({ istree: 1 }).then(res => {
            // console.log(res, '请求到的仓库数据');
            commit('GETCLASSIFYSHOPLIST', res.list)
        }).catch(err => {
            console.log(err);
        })
    }
}
const getters = {
    //返回列表
    getclassifyList(state) {
        return state.classifyShoplist
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