import { goodslist } from '../../../request/api'
const state = {
    goodsList: []
}
const mutations = {
    GETGOODSLIST(state, payload) {
        state.goodsList = payload
    }
}
const actions = {
    //获取列表
    getgoodsList(context) {
        goodslist({
            page: 1,
            size: 10,
        }).then(res => {
            console.log(res);
            if (res.code == 200) {
                context.commit('GETGOODSLIST', res.list)
            }
        }).catch(err => {
            console.log(err);
        })
    }
}
const getters = {
    getGoodsList(state) {
        return state.goodsList
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