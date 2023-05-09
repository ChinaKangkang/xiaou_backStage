<template>
  <div>
    <el-dialog :title="goosInfo.isAdd ? '商品添加' : '商品编辑'" :visible.sync="goosInfo.isShow" center :before-close="cancel"
      @opened="createEdit">
      <el-form :model="form" label-width="80px" :rules="rules" ref="goodsRef">
        <el-form-item label="一级分类" prop="first_cateid">
          <el-select @change="changeCate(false)" v-model="form.first_cateid" placeholder="请选择">
            <el-option v-for="item in getclassifyList" :key="item.id" :label="item.catename" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" prop="second_cateid" ref="erRef">
          <el-select v-model="form.second_cateid" placeholder="请选择">
            <el-option v-for="item in cateArr" :label="item.catename" :value="item.id" :key="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称" prop="goodsname">
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" prop="market_price">
          <el-input v-model="form.market_price" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 图片上传 
                    
                    el-upload
                    on-preview	点击文件列表中已上传的文件时的钩子	
                    action	必选参数，上传的地址
                    list-type	文件列表的类型
                    auto-upload	是否在选取文件后立即进行上传
                    on-change	文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
                    file-list	上传的文件列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]	array
                    limit	最大允许上传个数
                    注意： 
                    图片上传一般有两种方式
                    1、直接把图片上传到服务器 以流文件的形式
                    2、通过一个接口（上传接口）
                -->
        <!-- 顶级分类不需要添加图片 所以是顶级分类时 图片上传就隐藏 -->
        <el-form-item label="图片" limit="1" :auto-upload="false">
          <el-upload action="#" list-type="picture-card" :auto-upload="false" :limit="1" :on-preview="onPreview"
            :on-change="onChange" :file-list="fileList">
            <i class="el-icon-plus"></i>
          </el-upload>
          <!-- 图片预览 -->
          <el-dialog :visible.sync="visibleisShow">
            <img width="100%" alt="" :src="imgUrl" />
          </el-dialog>
        </el-form-item>
        <el-form-item label="商品规格" prop="specsid">
          <el-select @change="changeSpecs(false)" v-model="form.specsid" placeholder="请选择">
            <el-option v-for="item in specslist" :key="item.id" :label="item.specsname" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品属性" prop="specsattr">
          <el-select multiple v-model="form.specsattr" placeholder="请选择">
            <el-option v-for="item in specsArr" :label="item" :value="item" :key="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否新品">
          <el-radio-group v-model="form.isnew">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="2">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否热卖">
          <el-radio-group v-model="form.ishot">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="2">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="form.status" active-color="#13ce66" inactive-color="#ff4949" :active-value="1"
            :inactive-value="2">
          </el-switch>
        </el-form-item>
        <el-form-item label="商品描述">
          <!-- 富文本编辑器放置到什么位置 -->
          <div id="edit"></div>
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
/* 
    我们在这个商品管理中使用一个简单的富文本编辑器 ，叫 wangeditor
    官网：https://www.wangeditor.com/
    下载命令 ： npm  install wangeditor
    + wangeditor@4.7.15
    基本使用：
    1、引入
    import E from 'wangeditor'
    2、使用，创建界面
    new E('DOM节点')
    new E('DOM节点').create()
    初始化
    new E('DOM节点').txt.html('要赋值的内容')
    取值
    new E('DOM节点').txt.html()
    销毁富文本
    new E('DOM节点').destroy()
*/
import E from "wangeditor";
import { mapActions, mapGetters } from "vuex";
import { specslist, goodsadd, goodsinfo, goodsedit } from "../../request/api";
export default {
  props: ["goosInfo"],
  data() {
    return {
      form: {
        first_cateid: "", //一级分类编号
        second_cateid: "", //二级分类编号
        goodsname: "", //商品名称
        price: "", //价格
        market_price: "", //市场价格
        img: "", //图片
        specsid: "", //商品规格
        specsattr: "", //商品属性
        isnew: 1, //是否新品
        ishot: 1, //是否热卖
        status: 1, //状态
        description: "", //商品描述
      },
      cateArr: [], //二级分类数据
      specslist: [], //商品规格列表数据
      specsArr: [], //商品属性
      edit: null, //编辑器

      visibleisShow: false, //预览图片弹窗是否显示
      imgUrl: "", //预览图片路径
      fileList: [], //图片回显
      //表单验证
      rules: {
        first_cateid: [
          { required: true, message: "请选择一级分类名称", trigger: "change" },
        ],
        second_cateid: [
          { required: true, message: "请选择二级分类名称", trigger: "blur" },
        ],
        goodsname: [
          { required: true, message: "请输入商品分类名称", trigger: "blur" },
          { min: 1, max: 8, message: "长度在 1 到 8 个字符", trigger: "blur" },
        ],
        price: [
          { required: true, message: "请输入价格", trigger: "blur" },
          { min: 1, max: 8, message: "长度在 1 到 8 个字符", trigger: "blur" },
        ],
        market_price: [
          { required: true, message: "请输入市场价格", trigger: "blur" },
          { min: 1, max: 8, message: "长度在 1 到 8 个字符", trigger: "blur" },
        ],
        specsid: [
          { required: true, message: "请选择商品规格", trigger: "change" },
        ],
        specsattr: [
          { required: true, message: "请选择商品属性 ", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    ...mapActions({
      getclassify: "classify/getclassifyShoplist", //一级分类列表()
      getgoodsList: "goodsinfo/getgoodsList", //获取商品列表
      getCount: "goodsinfo/getCount", //获取总条数
    }),
    // 图片预览触发
    onPreview(file) {
      console.log(file);
      this.imgUrl = file.url; //把得到的地址给预览时标签的地址
      this.visibleisShow = true; //显示图片预览框
    },
    //文件发生改变触发的函数
    onChange(file) {
      //   console.log(file);
      this.form.img = file.raw; //把新的图片地址赋值给图片地址
    },
    //取消
    cancel() {
      this.$emit("cancel", false);
      this.reset(); //重置
    },
    //重置
    reset() {
      this.form = {
        first_cateid: "", //一级分类编号
        second_cateid: "", //二级分类编号
        goodsname: "", //商品名称
        price: "", //价格
        market_price: "", //市场价格
        img: "", //图片
        specsid: "", //商品规格
        specsattr: "", //商品属性
        isnew: 1, //是否新品
        ishot: 1, //是否热卖
        status: 1, //状态
        description: "", //商品描述
      };
      //清空验证
      this.$refs.goodsRef.resetFields();
      //清空图片回显信息
      this.fileList = [];
      //销毁富文本编辑器
      this.edit.destroy();
    },
    //富文本封装
    createEdit() {
      //组件一加载就创建富文本
      this.edit = new E("#edit");
      //创建
      this.edit.create();
      //初始化
      this.edit.txt.html(this.form.description);
      console.log(this.edit, "富文本");
    },
    //封装一个二级分类数据
    changeCate(e) {
      // 首先筛选出对应的二级分类，对比一级列表中的id和数据双向绑定的first_cateid做比较,如果相等,就将数组中符合那一项的下标找出来，然后通过该下标就能找到下面的children
      let index = this.getclassifyList.findIndex((item) => {
        // console.log(item.id);
        return item.id === this.form.first_cateid;
      });
      // 将该数组下的二级列表给cateArr
      this.cateArr = this.getclassifyList[index].children;
      //每次选一级列表清空二级列表数据
      if (!e) {
        this.form.second_cateid = "";
      }
      // console.log(this.getclassifyList[index].children);
      // console.log(e, index, this.form.first_cateid);
    },
    //商品规格
    changeSpecs(e) {
      // console.log(e);
      // console.log(this.form.specsid);
      let index = this.specslist.findIndex((item) => {
        return item.id == this.form.specsid;
      });
      this.specsArr = this.specslist[index].attrs;
      if (!e) {
        this.form.specsattr = "";
      }

      // console.log(index);
    },
    //获取商品规格(全部) 因为之前接口有分页，所以必须单独调用
    getSpecslist() {
      specslist()
        .then((res) => {
          console.log(res);
          if (res.code == 200) {
            this.specslist = res.list;
          }
          // console.log(this.specslist);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //数据回显
    lookup(id) {
      goodsinfo({ id })
        .then((res) => {
          console.log(res);
          if (res.code == 200) {
            this.form = res.list;
            // 图片回显(如果img有值就把地址给回显的变量，否则就清空)
            this.fileList = this.form.img ? [{ url: this.form.img }] : [];
            // 由于属性返回字符串，UI库仅支持数组格式
            this.form.specsattr = this.form.specsattr.split(",");
            // 重新触发change事件目的实现二级联动
            this.changeCate(true);
            this.changeSpecs(true);
            //编辑需要的id参数
            this.form.id = id;
            //为了严谨可以把数据重新赋值到富文本编辑器
            this.edit.txt.html(this.form.description);
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //提交确定
    add() {
      console.log(this.form);
      this.$refs.goodsRef.validate((val) => {
        // console.log(this.form);
        // console.log(1);
        // return
        if (val) {
          console.log(2);
          //获取富文本编辑器的内容 赋值给双向数据绑定
          this.form.description = this.edit.txt.html();
          // console.log(this.form);
          if (this.goosInfo.isAdd) {
            //添加
            // console.log(this.form);
            // return;
            goodsadd(this.form)
              .then((res) => {
                // console.log(res);
                if (res.code == 200) {
                  //提示
                  this.$message.success(res.msg);
                  //隐藏弹窗
                  this.cancel();
                  //更新总条数
                  this.getCount();
                  //更新视图
                  this.getgoodsList();
                }
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            //编辑
            console.log(this.form);
            // return;
            goodsedit(this.form)
              .then((res) => {
                console.log(res);
                //提示
                this.$message.success(res.msg);
                //隐藏弹窗
                this.cancel();
                //更新总条数
                this.getCount();
                //更新视图
                this.getgoodsList();
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
      });
    },
  },
  mounted() {
    this.getCount(); //总页数
    this.getSpecslist(); //列表
    //页面加载获取一级二级分类列表
    if (this.getclassifyList.length == 0) {
      this.getclassify();
    }
    // console.log(this.getclassifyList);
  },
  watch: {},
  computed: {
    ...mapGetters({
      getclassifyList: "classify/getclassifyList", //一级分类列表
    }),
  },
  filters: {},
  components: {},
};
</script>
<style scoped></style>