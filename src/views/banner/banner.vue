<template>
    <div>
        <!-- 面包屑 -->
        <vBread></vBread>
        <el-button class="addBtn" @click="addBtn" type="primary" size="small">添加</el-button>
        <!-- 列表 -->
        <v-list @edit="edit"></v-list>
        <!-- 弹窗 -->
        <v-dialog :bannerInfo="bannerInfo" @cancel="cancel" ref="dialogRef"></v-dialog>
    </div>
</template>
<script>
import vList from "./list.vue";
import vDialog from "./dialog.vue";
export default {
    data() {
        return {
            bannerInfo: {
                isShow: false,
                isAdd: true
            }
        };
    },
    methods: {
        //添加
        addBtn() {
            this.bannerInfo.isShow = true
            this.bannerInfo.isAdd = true
        },
        //取消
        cancel() {
            this.bannerInfo.isShow = false
            this.bannerInfo.isAdd = true
        },
        //编辑
        edit(id) {
            this.bannerInfo.isShow = true
            this.bannerInfo.isAdd = false
            this.$refs.dialogRef.lookup(id)
        }
    },
    mounted() { },
    watch: {},
    computed: {},
    filters: {},
    components: {
        vList,
        vDialog,
    },
};
</script>
<style scoped>
.addBtn {
    margin: 10px;
}
</style>