<template>
  <div>
    <!-- 角色管理的表格列表 -->
    <el-table :data="getseckList" border style="width: 100%">
      <el-table-column prop="title" label="活动名称" width="180">
      </el-table-column>
      <el-table-column label="状态">
        <!-- 插槽显示状态 -->
        <template slot-scope="item">
          <div>
            <el-button type="success" size="small" v-if="item.row.status == 1">启用</el-button>
            <el-button type="danger" size="small" v-else>禁用</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="item">
          <div>
            <el-button type="primary" icon="el-icon-edit" size="small" @click="edit(item.row.id)">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="small" @click="del(item.row.id)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { seckdelete } from '../../request/api'
export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      getsecklist: 'seck/getsecklist'////活动列表
    }),
    //编辑
    edit(id) {
      this.$emit('edit', id)
    },
    del(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //调用删除接口
        seckdelete({ id }).then(res => {
          // console.log(res);
          if (res.code == 200) {
            this.$message.success(res.msg);
            //更新视图
            this.getsecklist()
          } else {
            this.$message.error(res.msg);
          }
        }).catch(err => {
          console.log(err);
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  },
  mounted() {
    this.getsecklist()
  },
  watch: {},
  computed: {
    ...mapGetters({
      getseckList: 'seck/getseckList'
    })
  },
  filters: {},
  components: {},
};
</script>
<style scoped></style>