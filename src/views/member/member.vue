<template>
    <div>
        <!-- 面包屑 -->
        <vBread></vBread>
        <!-- <el-button class="addBtn" @click="" type="primary" size='small'>添加</el-button> -->
        <!-- 列表 -->
        <v-list @edit="edit"></v-list>
        <!-- 弹窗 -->
        <v-dialog :isShow="isShow" @cancel="cancel" ref="dialogRef"></v-dialog>
    </div>
</template>
<script>
import vList from './list.vue'
import vDialog from './dialog.vue'
export default {
    data() {
        return {
            isShow: false//是否显示弹窗
        }
    },
    methods: {
        //编辑
        edit(uid) {
            this.isShow = true;
            this.$refs.dialogRef.lookup(uid)
        },
        //取消
        cancel(e) {
            this.isShow = e
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
/* .addBtn {
    margin: 10px;
} */
</style>