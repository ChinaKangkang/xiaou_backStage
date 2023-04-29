
import { rolelist } from '../../../request/api'
const state = {
    roleList: []
};
const mutations = {
    GETROLELIST(state, payload) {
        state.roleList = payload
    }
};
const actions = {
    // 封装一个获取role列表的行动
    async getRolelist({ commit }) {
        let res = await rolelist();
        // console.log(res);
        if (res.code == 200) {
            commit('GETROLELIST', res.list)
        }
    }
};
//相当于计算属性
const getters = {
    getRolelist(state) {
        return state.roleList
    }
}
export default {
    state, mutations, actions, getters,
    //开启命名空间
    namespaced: true
}