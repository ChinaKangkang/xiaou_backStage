<template>
    <div>
        <!-- 面包蟹 -->
        <vBread></vBread>
        <el-button class="addBtn" @click="addBtn" type="primary" size='small'>添加</el-button>
        <!-- 表格 -->
        <v-list @edit="edit"></v-list>
        <!-- 弹窗 -->
        <v-dialog :roleInfo="roleInfo" @cancel="cancel" ref="dialogRef"></v-dialog>
    </div>
</template>
<script>
//引入组件
import vList from './list.vue'
import vDialog from './dialog.vue'

export default {
    data() {
        return {
            roleInfo: {
                //是否显示弹窗
                isShow: false,
                // 是否为添加
                isAdd: true
            }
        }
    },
    methods: {
        //点击添加
        addBtn() {
            // 显示弹窗
            this.roleInfo.isShow = true;
            //添加
            this.roleInfo.isAdd = true
        },
        //子组件自定义事件 取消
        cancel() {
            this.roleInfo.isShow = false
        },
        //编辑
        edit(id) {
            //id 点击编辑传过来
            // 显示弹窗
            this.roleInfo.isShow = true;
            //添加
            this.roleInfo.isAdd = false;
            //数据回显
            this.$refs.dialogRef.lookup(id)
        }
    },
    mounted() { },
    watch: {},
    computed: {

    },
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