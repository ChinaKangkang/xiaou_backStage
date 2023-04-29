<template>
    <div>
        <!-- 表格 
            菜单列表展示转成树形列表的展示
            tree-props   渲染嵌套数据的配置选项
            支持树类型的数据的显示。当 row 中包含 children 字段时，被视为树形数据。渲染树形数据时，必须要指定 row-key。支持子节点数据异步加载。设置 Table 的 lazy 属性为 true 与加载函数 load 。通过指定 row 中的 hasChildren 字段来指定哪些行是包含子节点。children 与 hasChildren 都可以通过 tree-props 配置。
            default-expand-all 是否展开所有行
        -->
        <el-table default-expand-all :data="menuList" border style="width: 100%" row-key="id" :tree-props="{ children: 'children' }">
            <el-table-column prop="id" label="菜单编号" width="80">
            </el-table-column>
            <el-table-column prop="title" label="菜单名称" width="170">
            </el-table-column>
            <el-table-column prop="pid" label="上级菜单" width="100">
            </el-table-column>
            <el-table-column label="菜单图标" width="100">
                <template slot-scope='item'>
                    <div>
                        <i :class="item.row.icon"></i>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="url" label="菜单地址" width="260">
            </el-table-column>
            <el-table-column label="状态" width="100">
                <!-- 此代码相当于prop  作用域槽口-->
                <template slot-scope="item">
                    <div>
                        <!-- item是组件的数据 row是当前的这一行 -->
                        <el-button type="success" size="small" v-if="item.row.status == 1 ">启用</el-button>
                        <el-button type="danger" size="small" v-else>禁用</el-button>
                    </div>
                </template>

            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="item">
                    <div>
                        <el-button type="primary" icon="el-icon-edit" size="small" @click="edit(item.row.id)">编辑</el-button>
                        <el-button type="danger" icon="el-icon-delete" size="small" @click="del(item.row.id)">删除</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
// 引入删除接口
import { menudelete } from '../../request/api'
export default {
    data() {
        return {

        }
    },
    methods: {
        //请求menu中的数据
        ...mapActions({
            getMenulist: 'menu/getMenulist'
        }),
        //删除数据
        del(id) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                //调用删除接口
                menudelete({ id }).then(res => {
                    // console.log(res);
                    if (res.code == 200) {
                        this.$message.success(res.msg);
                        //更新视图
                        this.getMenulist()
                    } else {
                        this.$message.error(res.msg);
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
        //点击编辑按钮 显示弹窗
        edit(id) {
            this.$emit('edit', id)
            console.log(id);
        }
    },
    mounted() {
        //初始化/更新menulist列表
        this.getMenulist()
        // console.log(this.menuList);
    },
    watch: {},
    computed: {
        //获取仓库中的menu数据
        ...mapGetters({
            menuList: 'menu/getMenu'
        })
    },
    filters: {},
    components: {}
}
</script>
<style scoped></style>