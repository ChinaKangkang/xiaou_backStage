<template>
    <div>
        <!-- 面包屑 -->
        <vBread></vBread>
        <el-button class="addBtn" @click="addBtn" type="primary" size='small'>添加</el-button>
        <!-- 列表 -->
        <v-list @edit="edit"></v-list>
        <!-- 弹窗 -->
        <v-dialog :goosInfo="goosInfo" @cancel="cancel" ref="dialogRef"></v-dialog>
    </div>
</template>
<script>
import vList from './list.vue'
import vDialog from './dialog.vue'
export default {
    data() {
        return {
            goosInfo: {
                isShow: false,
                isAdd: true
            }
        }
    },
    methods: {
        // 添加
        addBtn() {
            this.goosInfo.isShow = true
            this.goosInfo.isAdd = true
        },
        //取消
        cancel(e) {
            this.goosInfo.isShow = e
            this.goosInfo.isAdd = true
        },
        //编辑
        edit(id) {
            this.goosInfo.isShow = true
            this.goosInfo.isAdd = false
            this.$refs.dialogRef.lookup(id)
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