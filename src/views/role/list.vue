<template>
    <div>
        <!-- 角色管理的表格列表 -->
        <el-table :data="$store.getters['role/getRolelist']" border style="width: 100%">
            <el-table-column prop="id" label="角色编号" width="180">
            </el-table-column>
            <el-table-column prop="rolename" label="角色名称" width="180">
            </el-table-column>
            <el-table-column label="状态">
                <!-- 插槽显示状态 -->
                <template slot-scope="item">
                    <div>
                        <el-button type="success" size="small" v-if="item.row.status == 1">启用</el-button>
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
// 引入接口
import { roledelete } from '../../request/api'
export default {
    data() {
        return {

        }
    },
    methods: {
        //封装一个获取数据列表行动
        getRolelist() {
            this.$store.dispatch('role/getRolelist')
        },
        // 删除一条数据
        del(id) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                console.log(id);
                roledelete({ id }).then(res => {
                    // console.log(res);
                    if (res.code == 200) {
                        this.$message({
                            type: 'success',
                            message: res.msg
                        });
                        //更新视图
                        this.$store.dispatch('role/getRolelist')
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.msg
                        });
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
        //编辑
        edit(id) {
            // console.log(id);
            this.$emit('edit', id)
        }
    },
    mounted() {
        this.getRolelist()
        console.log(this.$store);
    },
    watch: {},
    computed: {
        // ...mapGetters({
        //     getRolelist: 'role/getRolelist'
        // })
    },
    filters: {},
    components: {}
}
</script>
<style scoped></style>