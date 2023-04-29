<template>
    <div>
        <!-- 
            tree-props  树形结构
            row-key     key 唯一性
            default-expand-all  展开全部
         -->
        <el-table :data="getclassifyList" border style="width: 100%" :tree-props="{ children: 'children' }" row-key="id"
            default-expand-all>
            <el-table-column prop="id" label="用户编号" width="180">
            </el-table-column>
            <el-table-column prop="catename" label="用户名称" width="180">
            </el-table-column>
            <el-table-column label="图片">
                <template slot-scope="item">
                    <div>
                        <img v-if="item.row.img" width="100px" class="imgUrl" :src="item.row.img">
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
                        <el-button type="primary" icon="el-icon-edit" size="small" @click="edit(item.row.id)">编辑</el-button>
                        <el-button type="danger" icon="el-icon-delete" size="small" @click="del(item.row.id)">删除</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex"
import { catedelete } from "../../request/api"
export default {
    data() {
        return {

        }
    },
    methods: {
        ...mapActions({
            getclassify: "classify/getclassifyShoplist"//请求数据列表
        }),
        //编辑事件
        edit(id) {
            this.$emit('edit', id)
        },
        // 删除数据
        del(id) {
            // 删除数据
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                //调用删除接口
                catedelete({ id }).then(res => {
                    console.log(res);
                    if (res.code == 200) {
                        //提示删除成功 res.msg提示操作成功
                        this.$message.success('删除成功');
                        //更新列表
                        this.getclassify()//更新视图
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
        }
    },
    mounted() {
        //页面加载触发获取数据
        this.getclassify()

    },
    watch: {},
    computed: {
        ...mapGetters({
            getclassifyList: 'classify/getclassifyList',//数据列表
        })
    },
    filters: {},
    components: {}
}
</script>
<style scoped>
.imgUrl {
    width: 90px;
    height: 90px;
}
</style>