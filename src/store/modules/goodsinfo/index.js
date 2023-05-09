import { goodslist, goodscount } from '../../../request/api'
const state = {
    goodsList: [],//列表数据
    //页面显示的条数
    pageSize: 3,//写死
    // 页码
    pageNum: 1,
    //总条数
    count: 0//接口请求 出来的
}
const mutations = {
    GETGOODSLIST(state, payload) {//列表
        state.goodsList = payload
    },
    GETCOUNT(state, payload) {//总条数
        state.count = payload
    },
    CHANGEPAGE(state, payload) {//修改页码
        state.pageNum = payload
    }
}
const actions = {
    //获取列表
    getgoodsList(context) {
        goodslist({
            size: context.state.pageSize,
            page: context.state.pageNum,
        }).then(res => {
            // console.log(res);
            if (res.code == 200) {
                context.commit('GETGOODSLIST', res.list)
                let list = res.list ? res.list : []
                if (context.state.pageNum != 1 && list.length == 0) {
                    context.dispatch('changePage', context.state.pageNum - 1)
                }
            }
        }).catch(err => {
            console.log(err);
        })
    },
    //获取总条数
    getCount({ commit }) {
        goodscount().then(res => {
            // console.log(res);
            if (res.code == 200) {
                commit('GETCOUNT', res.list[0].total)
            }
        }).catch(err => {
            console.log(err);
        })
    },
    //切换页码
    changePage(context, payload) {
        context.commit('CHANGEPAGE', payload)  //修改页码
        context.dispatch('getgoodsList')       //重新调用列表
    }
}
const getters = {
    getGoodsList(state) {
        return state.goodsList
    },
    //返回总数
    getCount(state) {
        return state.count
    },
    //返回当前显示条数
    getSize(state) {
        return state.pageSize
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