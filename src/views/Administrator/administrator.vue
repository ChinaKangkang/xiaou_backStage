<template>
    <div>
        <!-- 面包屑 -->
        <vBread></vBread>
        <el-button class="addBtn" @click="addBtn" type="primary" size='small'>添加</el-button>
        <!-- 表格列表 -->
        <v-list @edit="edit"></v-list>
        <!-- 弹窗 -->
        <v-dialog :adminInfo="adminInfo" @cancel="cancel" ref="dialogRef"></v-dialog>
    </div>
</template>
<script>
// 引入组件
import vList from './list.vue'
import vDialog from './dialog.vue'
export default {
    data() {
        return {
            adminInfo: {
                isShow: false,//是否显示模态框
                isAdd: true//是否为添加
            }
        }
    },
    methods: {
        //添加管理员
        addBtn() {
            this.adminInfo.isShow = true
            this.adminInfo.isAdd = true
        },
        //取消弹窗
        cancel(e) {
            this.adminInfo.isShow = e;
            this.adminInfo.isAdd = true
        },
        //用户编辑
        edit(uid) {
            this.adminInfo.isShow = true
            this.adminInfo.isAdd = false
            this.$refs.dialogRef.lookup(uid)
        }
    },
    mounted() { },
    watch: {},
    computed: {},
    filters: {},
    components: {
        vList, vDialog
    }
}
</script>
<style scoped>
.addBtn {
    margin: 10px;
}
</style>