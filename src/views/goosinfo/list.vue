<template>
    <div>
        <el-table :data="getGoodsList" border style="width: 100%">
            <el-table-column prop="id" label="商品编号" width="160">
            </el-table-column>
            <el-table-column prop="goodsname" label="商品名称" width="160">
            </el-table-column>
            <el-table-column prop="price" label="商品价格" width="160">
            </el-table-column>
            <el-table-column prop="market_price" label="市场价格" width="160">
            </el-table-column>
            <el-table-column label="图片" width="160">
                <template slot-scope="item">
                    <div>
                        <img v-if="item.row.img" class="images" :src="item.row.img" alt="">
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="是否新品" width="100">
                <template slot-scope="item">
                    <div>
                        <el-tag v-if="item.row.isnew == 1" type="success">是</el-tag>
                        <el-tag v-else type="danger">否</el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="是否热卖" width="100">
                <template slot-scope="item">
                    <div>
                        <el-tag v-if="item.row.ishot == 1" type="success">是</el-tag>
                        <el-tag v-else type="danger">否</el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="状态" width="100">
                <template slot-scope="item">
                    <div>
                        <!-- item是组件的数据 row是当前的这一行 -->
                        <el-button v-if="item.row.status == 1" type="success" size="small">启用</el-button>
                        <el-button v-else type="danger" size="small">禁用</el-button>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180">
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
        <el-pagination class="page" background layout="prev, pager, next" :page-size="3" :total="3">
        </el-pagination>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { goodsdelete } from '../../request/api'
export default {
    data() {
        return {}
    },
    methods: {
        ...mapActions({
            getgoodsList: 'goodsinfo/getgoodsList'//获取商品列表
        }),
        //编辑
        edit(id) {
            this.$emit('edit', id)
        },
        //删除
        del(id) {
            this.$confirm("你确定要删除这条数据吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    //调取删除接口
                    goodsdelete({ id }).then(res => {
                        if (res.code == 200) {
                            //响应视图
                            this.getgoodsList();
                            //提示
                            this.$message.success(res.msg);
                        }
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        }
    },
    mounted() {
        //页面初始化调用列表行动
        this.getgoodsList()
        console.log(this.getGoodsList);
        // console.log(this.$store);
    },
    watch: {},
    computed: {
        ...mapGetters({
            getGoodsList: 'goodsinfo/getGoodsList'//获取列表数据
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

.images {
    width: 90px;
    height: 90px;
}
</style>