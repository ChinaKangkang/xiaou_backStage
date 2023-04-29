
import { specslist, specscount } from '../../../request/api'
const state = {
    //商品列表
    specsList: [],
    //页面显示的条数
    pageSize: 3,//写死
    // 页码
    pageNum: 1,
    //总条数
    count: 0//接口请求 出来的
}
const mutations = {
    //列表
    GETSPECSLIST(state, payload) {
        state.specsList = payload
    },
    //条数
    GETCOUNT(state, payload) {
        state.count = payload
    },
    //同步修改页码
    CHANGEPAGE(state, payload) {
        state.pageNum = payload
    }
}
const actions = {
    //获取列表的行动
    getSpecslist(context) {
        specslist({
            size: context.state.pageSize,
            page: context.state.pageNum
        }).then(res => {
            console.log(res);
            if (res.code == 200) {
                // 删除是当前列表为空 请求页码还是当前页，就会显示无数据
                let list = res.list ? res.list : [];
                if (context.state.pageNum != 1 && list.length == 0) {
                    context.dispatch('getchangePage', context.state.pageNum - 1)
                }

                context.commit('GETSPECSLIST', list)
            }
        }).catch(err => {
            console.log(err);
        })
    },
    //获取总条数的行动
    getCount({ commit }, payload) {
        specscount().then(res => {
            console.log(res.list[0].total);
            if (res.code == 200) {
                commit('GETCOUNT', res.list[0].total)
            }
        }).catch(err => {
            console.log(err);
        })
    },
    //获取当前页行动并重新调用列表
    getchangePage(context, payload) {
        // console.log(payload);
        context.commit('CHANGEPAGE', payload)//同步修改页码
        context.dispatch('getSpecslist')//重新调用列表
    }
}
const getters = {
    //列表结果通过仓库返出去
    getSpecsList(state) {
        return state.specsList
    },
    // 返回页面显示的条数和总条数
    getPagesize(state) {
        return state.pageSize
    },
    getCount(state) {
        return state.count
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