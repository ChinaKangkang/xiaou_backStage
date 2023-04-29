<template>
    <div>
        <!-- 面包屑 -->
        <vBread></vBread>
        <el-button class="addBtn" @click="addBtn" type="primary" size='small'>添加</el-button>
        <!-- 表格 -->
        <v-list @edit="edit"></v-list>
        <!-- 添加弹窗 -->
        <v-dialog ref="diaref" :isShow="isShow" :isAdd="isAdd" @cancel="cancel"></v-dialog>
    </div>
</template>
<script>
//引入请求接口
// import { menulist } from '../../request/api'
//引入组件
import vList from './list.vue'// 表格组件
import vDialog from './Dialog.vue'//弹窗组件(不知道引入文件D为什么必须大写)
export default {
    data() {
        return {
            //控制弹窗显示隐藏(父传子不用触发)
            isShow: false,
            //判断是添加还是编辑
            isAdd: true,
        }
    },
    methods: {
        //点击添加显示模态框
        addBtn() {
            this.isShow = true
            this.isAdd = true//添加
        },
        //取消按钮的事件
        cancel(e) {
            // console.log(e);
            this.isShow = e
        },
        // 编辑按钮的事件
        edit(id) {
            this.isShow = true
            this.isAdd = false//编辑
            this.$refs.diaref.lookup(id)
            // console.log(this.$refs.diaref.lookup());
        }
    },
    mounted() {
        console.log(this.$store);
    },
    watch: {},
    computed: {},
    filters: {},
    components: {
        vList,
        vDialog
    }
}
</script>
<style scoped lang="less">
.addBtn {
    margin: 10px;
    // border: 1px solid #8bbef5;
    // border-radius: 3px;
    // background-color: #bfd9f6;
    // color: #409EFF;
}
</style>