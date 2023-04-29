import { userlist, usercount } from '../../../request/api'
const state = {
    //管理员列表
    adminList: [],
    // 页面显示的条数
    pageSize: 3,
    // 页码
    pageNum: 1,
    // 总条数
    count: 0

}
const mutations = {
    //获取管理员列表
    GETADMINLIST(state, payload) {
        state.adminList = payload
    },
    //总条数
    GETUSERCOUNT(state, payload) {
        state.count = payload
    },
    // 同步修改页码
    CHANGEPAGE(state, payload) {
        state.pageNum = payload
    }
}
const actions = {
    // 封装一个管理员列表的行动
    getAdminlist(context) {
        userlist({
            size: context.state.pageSize, //条数 
            page: context.state.pageNum //页码
        }).then(res => {
            console.log(res);
            if (res.code == 200) {

                /* 
                      当我们在删除非第一页且是当前最后一条数据的时候，出现了bug.它依然去获取当前页码，导致当前页码空数据，无法查找到，视图数据列表没有更新
                      如果解决： 只需要把 pageNum -1 就可以了 
                      注意： 哪一个临界条件 -1才是合适的，注意条件的判断
                    */
                //目的是： 后端返回的数据格式并不友好，正常无数据的时候，应该返给前端[]但是它返回了null null没办法判断所以进行转化

                let list = res.list ? res.list : [];
                if (context.state.pageNum != 1 && list.length == 0) {
                    //重新调用列表
                    context.dispatch('changepage', context.state.pageNum - 1)
                }

                context.commit('GETADMINLIST', list)
            }
        }).catch(err => {
            console.log(err);
        })
    },
    //获取总条数
    getUsercount({ commit }) {
        usercount().then(res => {
            console.log(res);
            if (res.code == 200) {
                commit('GETUSERCOUNT', res.list[0].total)
            }
        }).catch(err => {
            console.log(err);
        })
    },
    //获取当前页行动并重新调用列表
    changepage(context, payload) {
        //修改页码
        context.commit('CHANGEPAGE', payload)
        // 重新调用列表行动
        context.dispatch('getAdminlist')
    }
}
const getters = {
    //导出列表
    getAdminList(state) {
        return state.adminList
    },
    //导出页面显示的条数
    getSize(state) {
        return state.pageSize
    },
    //导出总条数
    getCount(state) {
        return state.count
    }
}
export default {
    state, mutations, actions, getters,
    //开启命名空间
    namespaced: true
}