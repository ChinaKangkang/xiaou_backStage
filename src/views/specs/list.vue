<template>
    <div>
        <el-table :data="getSpecsList" border style="width: 100%">
            <el-table-column prop="id" label="规格编号" width="180">
            </el-table-column>
            <el-table-column prop="specsname" label="规格名称" width="180">
            </el-table-column>
            <el-table-column label="规格属性" width="180">
                <!-- 规格属性的渲染 -->
                <template slot-scope="item">
                    <!-- <el-button v-for="item in item.row.attrs" size="mini"> {{ item }}</el-button> -->
                    <button v-for="item in item.row.attrs" :key="item.id">{{ item }}</button>
                </template>
            </el-table-column>
            <el-table-column label="状态" width="180">
                <template slot-scope="item">
                    <div>
                        <el-button v-if="item.row.status == 1" type="success" size="small">启用</el-button>
                        <el-button v-else type="danger" size="small">禁用</el-button>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="" label="操作" width="180">
                <template slot-scope="item">
                    <div>
                        <el-button type="primary" icon="el-icon-edit" size="small" @click="edit(item.row.id)">编辑</el-button>
                        <el-button type="danger" icon="el-icon-delete" size="small" @click="del(item.row.id)">删除</el-button>
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
        <el-pagination class="page" background layout="prev, pager, next" :page-size="getPagesize" :total="getCounts"
            @current-change="changePage">
        </el-pagination>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { specsdelete } from '../../request/api'
export default {

    data() {
        return {}
    },
    methods: {
        ...mapActions({
            getSpecslist: 'specs/getSpecslist',//获取列表的行动
            getCount: 'specs/getCount',//获取总条数
            getchangePage: 'specs/getchangePage'//切换页码 获取当前页并重新调用列表
        }),
        // 编辑
        edit(id) {
            this.$emit('edit', id)
        },
        //删除
        del(id) {
            // console.log(res);
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                specsdelete({ id }).then(res => {
                    if (res.code == 200) {
                        // 来个提示
                        this.$message.success(res.msg)
                        this.getSpecslist()//响应列表
                        this.getCount()//总条数

                    } else {
                        this.$message.error(res.msg)//参数错误等提示
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
        // 切换页码
        changePage(e) {
            // console.log(e);//页码
            this.getchangePage(e)
        }
    },
    mounted() {
        //页面一加载就执行获取列表
        this.getSpecslist()
        //总条数
        this.getCount()
        //切换页码 否则切换页面会停留在第二页   默认切换第一页
        this.getchangePage(1)
        // console.log(this.$store);
    },
    watch: {},
    computed: {

        ...mapGetters({
            getSpecsList: 'specs/getSpecsList',//列表
            getPagesize: 'specs/getPagesize',//页面显示的条数
            getCounts: 'specs/getCount'//总条数
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

button {
    margin: 0 3px;
}
</style>