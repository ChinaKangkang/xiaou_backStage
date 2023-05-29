<template>
    <div>
        <el-table :data="getAdminlist" border style="width: 100%">
            <el-table-column prop="uid" label="用户编号" width="180">
            </el-table-column>
            <el-table-column prop="username" label="用户名称" width="180">
            </el-table-column>
            <el-table-column label="所属角色">
                <template slot-scope="item">
                    <div>
                        {{ item.row.rolename }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="状态">
                <!-- 此代码相当于prop  作用域槽口-->
                <template slot-scope="item">
                    <div>
                        <!-- item是组件的数据 row是当前的这一行 -->
                        <el-button type="success" size="small" v-if="item.row.status == 1">启用</el-button>
                        <el-button type="danger" size="small" v-else>禁用</el-button>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="item">
                    <div>
                        <el-button type="primary" icon="el-icon-edit" size="small"
                            @click="edit(item.row.uid)">编辑</el-button>
                        <el-button type="danger" icon="el-icon-delete" size="small"
                            @click="del(item.row.uid)">删除</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页组件
            el-pagination 
            background 是否为分页按钮添加背景色
            layout 组件布局，子组件名用逗号分隔
            total	总条目数
            page-size	每页显示条目个数，支持 .sync 修饰符	number	—	10
            current-change	currentPage 改变时会触发
        -->
        <el-pagination class="page" :page-size="pageSize" background layout="prev, pager, next" :total="count"
            @current-change="changePage">
        </el-pagination>
    </div>
</template>
<script>
// 引入vuex
import { mapGetters, mapActions } from 'vuex'
//引入api
import { userdelete } from '../../request/api'
export default {
    data() {
        return {
            // gridData: [{
            //     uid: '2016-05-02',
            //     username: '王小虎',
            //     roleid: '上海市普陀区金沙江路 1518 弄'
            // }],
        }
    },
    methods: {
        //封装一个获取列表的行动
        ...mapActions({
            getAdminList: 'admin/getAdminlist',
            getCount: 'admin/getUsercount',//获取总条数行动
            changepage: "admin/changepage"//获取当前页行动  并重新调用列表
        }),
        del(uid) {
            // console.log(uid)
            if (uid == 'eaebed20-e35c-11ed-af82-012661df8010') {
                this.$message({
                    type: 'warning',
                    message: '超管账户禁止删除',
                });
                return
            }
            // 删除数据
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                //调用删除接口  uid用户编号
                userdelete({ uid }).then(res => {
                    // console.log(res);
                    if (res.code == 200) {
                        //提示删除成功
                        this.$message({
                            type: 'info',
                            message: res.msg
                        });
                        //更新列表以及总条数
                        // this.$store.dispatch('admin/getAdminlist')
                        this.getAdminList()//视图
                        this.getCount()//页码
                    }
                }).catch(err => {
                    console.log(err);
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        // 编辑
        edit(uid) {
            this.$emit('edit', uid);
        },
        //切换页码
        changePage(e) {
            console.log(e);
            this.changepage(e)//获取当前页行动  并重新调用列表
        }
    },
    mounted() {
        //页面加载就执行获取列表
        this.getAdminList()
        //页面加载执行获取总条数
        this.getCount()
        //更新页码 不然切换页面会停留在第二页  默认切换第一页
        this.changepage(1)
    },
    watch: {},
    computed: {
        //获取仓库中的列表
        ...mapGetters({
            getAdminlist: 'admin/getAdminList',
            pageSize: 'admin/getSize',
            count: 'admin/getCount'
        })


    },
    filters: {},
    components: {}
}
</script>
<style scoped>
.page {
    float: right;
    margin: 10px;
}
</style>