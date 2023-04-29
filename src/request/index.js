import router from '@/router'
import axios from 'axios'
import qs from 'querystring'
// import router from '../router'
//设置基准路径
axios.defaults.baseURL = '/api'
//响应拦截器
// 请求拦截
axios.interceptors.request.use(req => {
    //只要不是登录 其他接口就是登录成功 就必须要用token
    if (req.url != 'userlogin') {
        req.headers.authorization = sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')).token : null
    }
    // console.log(JSON.parse(sessionStorage.getItem('userInfo')));
    return req//必须return返回
})

// 响应拦截
axios.interceptors.response.use(res => {
    // console.log(res.data.msg);
    if (res.data.msg == '请设置请求头,并携带验证字符串') {
        alert(res.data.msg)
        // 跳转登录
        router.push('/login')
    } else if (res.data.msg == '登录已过期或访问权限受限') {
        alert(res.data.msg)
        // 跳转登录
        router.push('/login')
    } else {
        return res.data//必须return返回

    }
})
// axios
// 封装get
export const get = (url, params) => {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params
        })
            .then(res => { resolve(res) })
            .catch(err => { reject(err) })
    })
}
// 封装post
export const post = (url, params, isFile = false) => {
    //处理参数 判断是否传的文件
    let data = {}
    if (isFile) {
        data = new FormData()
        for (let k in params) {
            data.append(k, params[k])
        }
    } else {
        data = qs.stringify(params)
    }
    return new Promise((resolve, reject) => {
        axios.post(url, data)
            .then(res => { resolve(res) })
            .catch(err => { reject(err) })
    })
}