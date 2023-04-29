<template>
    <div class="memberlist">
        <el-table :data="getmember" border style="width: 100%">
            <el-table-column prop="uid" label="用户编号" width="260">
            </el-table-column>
            <el-table-column prop="nickname" label="昵称" width="180">
            </el-table-column>
            <el-table-column prop="phone" label="手机号">
            </el-table-column>
            <el-table-column prop="status" label="状态">
                <template slot-scope="item">
                    <div>
                        <el-button type="success" v-if="item.row.status == 1" size="small">启用</el-button>
                        <el-button type="danger" v-else size="small">禁用</el-button>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="" label="操作">
                <template slot-scope="item">
                    <div>
                        <el-button type="primary" icon="el-icon-edit" size="small"
                            @click="edit(item.row.uid)">编辑</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    data() {
        return {

            tableData: [{
                uid: 1,//会员编号，必填项 
                nickname: '哈哈哈',// 昵称 
                phone: 19191919,// 手机号
                password: 1212,// 密码 
                status: 1 //状态1正常2禁用
            }]
        }
    },
    methods: {
        ...mapActions({
            getMemberlist: 'member/getMemberlist'
        }),
        //edit点击编辑
        edit(uid) {
            this.$emit('edit', uid)
        }

    },
    mounted() {
        //页面加载就调用列表
        this.getMemberlist()
        // console.log(this.$store);
    },
    watch: {},
    computed: {
        ...mapGetters({
            getmember: 'member/getmember'
        })
    },
    filters: {},
    components: {}
}
</script>
<style scoped>
.memberlist {
    margin-top: 10px;
}
</style>