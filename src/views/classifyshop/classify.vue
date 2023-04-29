<template>
    <div>
        <!-- 面包屑 -->
        <vBread></vBread>
        <el-button class="addBtn" @click="addBtn" type="primary" size='small'>添加</el-button>
        <!-- 表格列表 -->
        <v-list @edit="edit"></v-list>
        <!-- dialog弹窗 -->
        <v-dialog :classInfo="classInfo" @cancel="cancel" ref="dialogRef"></v-dialog>
    </div>
</template>
<script>
import vList from './list.vue'
import vDialog from './dialog.vue'

export default {
    data() {
        return {
            classInfo: {
                isShow: false,//显示弹窗
                isAdd: true//是否添加
            }
        }
    },
    methods: {
 
        // 添加
        addBtn() {
            this.classInfo.isShow = true
            this.classInfo.isAdd = true
        },
        //取消事件
        cancel(e) {
            this.classInfo.isShow = e
            this.classInfo.isAdd = true
        },
        //点击编辑
        edit(id) {
            this.classInfo.isShow = true
            this.classInfo.isAdd = false
            //调用弹窗中的数据回显
            this.$refs.dialogRef.lookup(id)
        }
    },
    mounted() {
    },
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