<template>
    <div>
        <el-table :data="getBanner" border style="width: 100%">
            <el-table-column prop="id" label="编号" width="100"> </el-table-column>
            <el-table-column prop="title" label="轮播图标题" width="180">
            </el-table-column>
            <el-table-column label="图片" width="160">
                <template slot-scope="item">
                    <div>
                        <img v-if="item.row.img" class="images" :src="item.row.img" alt="" />
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
import { mapGetters, mapActions } from 'vuex'
import { bannerdelete } from '../../request/api'
export default {
    data() {
        return {};
    },
    methods: {
        ...mapActions({
            getBannerList: 'banner/getBannerList',////轮播图数据
        }),
        //编辑
        edit(id) {
            this.$emit('edit', id)
        },
        del(id) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                //调用删除接
                bannerdelete({ id }).then(res => {
                    // console.log(res);
                    if (res.code == 200) {
                        //提示删除成功
                        this.$message({
                            type: 'info',
                            message: res.msg
                        });
                        this.getBannerList()//视图
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
        this.getBannerList()//轮播图数据
    },
    watch: {},
    computed: {
        ...mapGetters({
            getBanner: 'banner/getBanner'
        })
    },
    filters: {},
    components: {},
};
</script>
<style scoped>
.images {
    width: 90px;
}
</style>