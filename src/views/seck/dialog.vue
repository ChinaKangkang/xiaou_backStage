<template>
  <div>
    <el-dialog :title="seckInfo.isAdd ? '活动添加' : '活动编辑'" :visible.sync="seckInfo.isShow" center :before-close="cancel">
      <el-form label-width="100px" :rules="rules" ref="seckRef" :model="form">
        <!-- 活动名称 -->
        <el-form-item label="活动名称" prop='title'>
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="活动期限">
          <!-- <el-date-picker v-model="form.begintime" type="daterange" range-separator="至" start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker> -->
          <el-date-picker v-model="timeArr" @change="changeDate" type="datetimerange" range-separator="至"
            start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>

          <!-- <el-col :span="11">
            <el-date-picker type="date" placeholder="开始日期" v-model="form.begintime" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker type="date" placeholder="结束日期" v-model="form.endtime" style="width: 100%;"></el-date-picker>
          </el-col> -->
        </el-form-item>

        <el-form-item label="一级分类">
          <el-select @change="changeCate(false)" default-value v-model="form.first_cateid" placeholder="请选择分类">
            <el-option v-for="item in getclassifyList" :key="item.id" :label="item.catename
              " :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select @change="changeShop(false)" v-model="form.second_cateid" placeholder="请选择分类">
            <el-option v-for="item in cateArr" :key="item.id" :label="item.catename
              " :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品">
          <el-select v-model="form.goodsid" placeholder="请选择商品">
            <el-option v-for="item in shopArr" :key="item.id" :label="item.goodsname" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 状态 -->
        <el-form-item label='状态'>
          <el-switch v-model="form.status" active-color="#13ce66" inactive-color="#ff4949" :active-value="1"
            :inactive-value="2">
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { seckadd, seckinfo, seckedit } from '../../request/api'
export default {
  props: ['seckInfo'],
  data() {
    return {
      form: {
        title: '',//活动名称
        begintime: '',//开始时间
        endtime: '',//结束时间
        first_cateid: '',//一级编号
        second_cateid: "",//二级编号
        goodsid: "",//商品编号
        status: 2,//状态
      },
      //表单验证
      rules: {
        title: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
        ],
      },
      timeArr: [],//时间参数
      cateArr: [],//二级分类列表
      shopArr: [],//二级分类列表
    };
  },
  methods: {
    ...mapActions({
      getclassifyShoplist: 'classify/getclassifyShoplist',//一二级分类
      getgoodsList: 'goodsinfo/getgoodsList',//商品
      getsecklist: 'seck/getsecklist'//活动列表
    }),
    //取消
    cancel() {
      this.$emit('cancel', false)
      this.reset()
    },
    //重置表单
    reset() {
      this.form = {
        title: '',//活动名称
        begintime: '',//开始时间
        endtime: '',//结束时间
        first_cateid: '',//一级编号
        second_cateid: "",//二级编号
        goodsid: "",//商品编号
        status: 2,//状态
      }
      // resetFields	对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
      this.$refs.seckRef.resetFields()
      this.timeArr = []
    },
    //数据回显
    lookup(id) {
      // console.log(this.form);
      // return
      seckinfo({ id }).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.form = res.list
          this.form.id = id
          this.form.begintime = new Date(Number(res.list.begintime))
          this.form.endtime = new Date(Number(res.list.endtime))
          // console.log(this.form);
          this.timeArr = [this.form.begintime, this.form.endtime]
          // 重新触发change事件目的实现二级联动
          this.changeCate(true);
          this.changeShop(true);
        }
      }).catch(err => {
        console.log(err);
      })
    },
    // 点击日期确定触发的事件
    changeDate(e) {
      // console.log(e);
      // console.log(new Date(e[0]).getTime());
      if (e) {
        this.form.begintime = new Date(e[0]).getTime()
        this.form.endtime = new Date(e[1]).getTime()
      } else {
        this.form.begintime = ''
        this.form.endtime = ''
      }

      // console.log(this.form);
    },
    //确定
    add() {
      // console.log(this.form);
      // return
      this.$refs.seckRef.validate(val => {
        if (val) {
          //添加需要的是时间戳 编辑需要的也是时间戳
          this.form.begintime = new Date(this.form.begintime).getTime()
          this.form.endtime = new Date(this.form.endtime).getTime()
          if (this.seckInfo.isAdd) {
            seckadd(this.form).then(res => {
              // console.log(res);
              if (res.code == 200) {
                //提示
                this.$message.success(res.msg);
                //隐藏弹窗
                this.cancel();
                //更新视图
                this.getsecklist();
              }
            }).catch(err => {
              console.log(err);
            })
          } else {
            // 编辑
            // this.form.begintime = new Date(this.form.begintime).getTime()
            // this.form.endtime = new Date(this.form.endtime).getTime()
            // console.log(this.form);

            // return
            seckedit(this.form).then(res => {
              // console.log(res);
              if (res.code == 200) {
                //提示
                this.$message.success(res.msg);
                //隐藏弹窗
                this.cancel();
                //更新视图
                this.getsecklist();
              }
            }).catch(err => {
              console.log(err);
            })
          }
        }
      })
    },
    //二级分类
    changeCate(e) {
      console.log(e);
      let index = this.getclassifyList.findIndex(item => {
        return item.id == this.form.first_cateid
      })
      this.cateArr = this.getclassifyList[index].children
      // console.log(this.cateArr);
      //每次选一级列表清空二级列表数据
      if (!e) {
        this.form.second_cateid = "";
        this.form.goodsid = ''
      }
    },
    //商品
    changeShop(e) {
      console.log(e);
      this.shopArr = this.getGoodsList.filter(item => {
        return item.second_cateid == this.form.second_cateid
      })
      // console.log(index);
      // this.shopArr = index
      // console.log(index);
      //每次选一级列表清空二级列表数据
      if (!e) {
        this.form.goodsid = "";
      }
    }
  },
  mounted() {
    this.getclassifyShoplist()
    this.getgoodsList()
    console.log(this.getclassifyList);
    console.log(this.getGoodsList);
  },
  watch: {},
  computed: {
    ...mapGetters({
      getclassifyList: 'classify/getclassifyList',//一二级分类
      getGoodsList: 'goodsinfo/getGoodsList'//商品
    })
  },
  filters: {},
  components: {},
};
</script>
<style scoped></style>