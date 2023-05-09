import { secklist } from '../../../request/api'
const state = {
    seckList: []
}
const mutations = {
    GETSECKLIST(state, playload) {
        state.seckList = playload
    }
}
const actions = {
    //获取列表
    getsecklist({ commit }) {
        secklist().then(res => {
            commit('GETSECKLIST', res.list)
        }).catch(err => {
            console.log(err);
        })
    }
}
const getters = {
    getseckList(state) {
        return state.seckList
    }
}
export default {
    state, mutations,
    actions, getters,
    //开启命名空间
    namespaced: true
}