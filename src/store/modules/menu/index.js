
// import axios from 'axios'
import { menulist } from '../../../request/api'
const state = {
    menuList: []
}
//唯一合法修改state中的值
const mutations = {
    //更新menuList中的数据
    GETMENULIST(state, payload) {
        state.menuList = payload
    }
}
//异步修改mutations
const actions = {
    // 封装一个获取列表的行动 请求menlist数据
    getMenulist({ commit }, payload) {
        menulist({ istree: 1 }).then(res => {
            // console.log(res);
            if (res.code == 200) {
                commit('GETMENULIST', res.list)
            }
        }).catch(err => {
            console.log(err);
        })
    }
}
//类似于计算属性
const getters = {
    //将menu返出去 方便获取
    getMenu() {
        return state.menuList
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