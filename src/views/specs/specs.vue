<template>
    <div>
        <!-- 面包屑 -->
        <vBread></vBread>
        <el-button class="addBtn" @click="add" type="primary" size='small'>添加</el-button>
        <!-- 列表 -->
        <v-list @edit="edit"></v-list>
        <!-- 弹窗 -->
        <v-dialog :specsInfo="specsInfo" @cancel="cancel" ref="dialogRef"></v-dialog>
    </div>
</template>
<script>
import vList from './list.vue'
import vDialog from './dialog.vue'
export default {
    data() {
        return {
            //状态
            specsInfo: {
                isShow: false,//是否显示弹窗
                isAdd: true//是否为添加
            }
        }
    },
    methods: {
        // 点击添加
        add() {
            this.specsInfo.isShow = true
            this.specsInfo.isAdd = true
        },
        //点击取消
        cancel(e) {
            this.specsInfo.isShow = false
            this.specsInfo.isAdd = true
        },
        //编辑
        edit(id) {
            // console.log(id);
            this.specsInfo.isShow = true
            this.specsInfo.isAdd = false
            this.$refs.dialogRef.lookup(id)//操作弹窗组件中的数据回显
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