import { memberlist } from '../../../request/api'
const state = {
    memberList: []
};
const mutations = {
    MEMBERLIST(state, playload) {
        state.memberList = playload
    }
};
const actions = {
    getMemberlist({ commit }) {
  
        memberlist().then(res => {
            console.log(res);
            if (res.code == 200) {
                commit('MEMBERLIST', res.list)
            }
        })
    }
};
const getters = {
    getmember(state){
        return state.memberList
    }
};
export default {
    state, mutations, actions, getters,
    //开启命名空间
    namespaced: true
}