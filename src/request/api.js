//统一接口管理

/*=============菜单管理================*/

import { get, post } from './index'
// 菜单添加
export const menuadd = (data) => post('menuadd', data)
// 菜单列表获取
export const menulist = (data) => get('menulist', data)
// 菜单删除 删除一条数据
export const menudelete = (data) => post('menudelete', data)
// 菜单获取一条数据 编辑
export const menuinfo = (data) => get('menuinfo', data)
//菜单编辑数据
export const menuedit = (data) => post('menuedit', data)

/*=============角色管理================*/

//角色添加
export const roleadd = (data) => post('roleadd', data)
// 角色列表获取
export const rolelist = (data) => get('rolelist', data)
// 角色删除
export const roledelete = (data) => post('roledelete', data)
//角色获取 获取一条
export const roleinfo = (data) => get('roleinfo', data)
//角色编辑
export const roleedit = (data) => post('roleedit', data)

/*=============管理员================*/

// 管理员添加
export const useradd = (data) => post('useradd', data)
//管理员列表获取
export const userlist = (data) => get('userlist', data)
//管理员删除
export const userdelete = (data) => post('userdelete', data)
//管理员数据获取 获取一条
export const userinfo = (data) => get('userinfo', data)
//管理员编辑
export const useredit = (data) => post('useredit', data)
//管理员总页数
export const usercount = (data) => get('usercount', data)
//管理员登录
export const userlogin = (data) => post('userlogin', data)

/*=============商品分类================*/

// 商品分类添加
export const cateadd = (data, isFile) => post('cateadd', data, true)
// 商品列表
export const catelist = (data) => get('catelist', data)
// 商品分类 获取一条
export const cateinfo = (data) => get('cateinfo', data)
//商品分类修改
export const cateedit = (data) => post('cateedit', data, true)
//商品分类删除
export const catedelete = (data) => post('catedelete', data)


/*=============商品规格管理================*/

// 商品规格添加
export const specsadd = (data) => post('specsadd', data)
//商品列表
export const specslist = (data) => get('specslist', data)
//商品列表 获取一条数据
export const specsinfo = (data) => get('specsinfo', data)
//商品规格修改
export const specsedit = (data) => post('specsedit', data)
//商品删除
export const specsdelete = (data) => post('specsdelete', data)
//商品总条数 用于分页
export const specscount = (data) => get('specscount', data)

/*=============商品管理================*/
// 商品管理列表
export const goodslist = (data) => get('goodslist', data)
//商品管理添加
export const goodsadd = (data) => post('goodsadd', data,true)
//商品管理列表一条
export const goodsinfo = (data)=>get('goodsinfo',data)
//商品管理编辑
export const goodsedit = (data)=>post('goodsedit',data,true)
//商品管理删除
export const goodsdelete = (data)=>post('goodsdelete',data)

/*=============会员管理================*/

// 会员列表
export const memberlist = (data) => get('memberlist', data)
//会员列表 查询一条
export const memberinfo = (data) => get('memberinfo', data)
//会员修改
export const memberedit = (data) => post('memberedit', data)
