<template>
  <div>
    <!-- 面包屑 -->
    <vBread></vBread>
    <el-button class="addBtn" @click="addBtn" type="primary" size='small'>添加</el-button>
    <!-- 列表 -->
    <v-list @edit="edit"></v-list>
    <!-- 弹窗 -->
    <v-dialog :seckInfo="seckInfo" @cancel="cancel" ref="dialogRef"></v-dialog>
  </div>
</template>
<script>
import vList from './list.vue'
import vDialog from './dialog.vue'
export default {
  data() {
    return {
      seckInfo: {
        isShow: false,
        isAdd: true,
      }
    };
  },
  methods: {
    //添加
    addBtn() {
      this.seckInfo.isShow = true
      this.seckInfo.isAdd = true
    },
    // 取消
    cancel() {
      this.seckInfo.isShow = false
      this.seckInfo.isAdd = true
    },
    //编辑
    edit(id) {
      this.seckInfo.isShow = true
      this.seckInfo.isAdd = false
      this.$refs.dialogRef.lookup(id)
    }
  },
  mounted() { },
  watch: {},
  computed: {},
  filters: {},
  components: {
    vList, vDialog
  },
};
</script>
<style scoped>
.addBtn {
  margin: 10px;
}
</style>