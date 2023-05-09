<template>
    <div>
        <el-dialog :title="bannerInfo.isAdd ? '添加轮播图' : '编辑轮播图'" center :visible.sync="bannerInfo.isShow"
            :before-close="cancel">
            <el-form :model="form" label-width="80px" :rules="rules" ref="bannerRef">
                <el-form-item label="标题" prop="title">
                    <el-input v-model="form.title" autocomplete="off"></el-input>
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
                    <el-dialog>
                        <img width="100%" alt="" :src="imgUrl" />
                    </el-dialog>
                </el-form-item>

                <el-form-item label="状态">
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
import { banneradd, bannerinfo, banneredit } from '../../request/api'
import { mapActions } from "vuex"
export default {
    props: ['bannerInfo'],
    data() {
        return {
            form: {
                id: '',
                title: '',
                img: '',
                status: 1
            },
            //表单验证
            rules: {
                title: [
                    { required: true, message: "请输入轮播图名称", trigger: "blur" },
                    { min: 1, max: 8, message: "长度在 1 到 8 个字符", trigger: "blur" },
                ],
            },
            imgUrl: '',//预览图片路径
            fileList: []//图片回显
        };
    },
    methods: {
        ...mapActions({
            getBannerList: 'banner/getBannerList',////轮播图数据
        }),
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
            this.$emit('cancel', false)
            //重置
            this.reset()
        },
        //reset
        reset() {
            this.form = {
                id: '',
                title: '',
                img: '',
                status: 1
            }
            //清空验证
            this.$refs.bannerRef.resetFields();
            //清空图片回显信息
            this.fileList = [];
        },
        //数据回显示
        lookup(id) {
            bannerinfo({ id }).then(res => {
                if (res.code == 200) {
                    this.form = res.list
                    // 图片回显(如果img有值就把地址给回显的变量，否则就清空)
                    this.fileList = this.form.img ? [{ url: this.form.img }] : [];
                    //编辑需要的id参数
                    this.form.id = id;
                }
            }).catch(err => {
                console.log(err);
            })
        },
        //添加
        add() {
            this.$refs.bannerRef.validate(val => {
                // console.log(val);
                if (val) {
                    if (this.bannerInfo.isAdd) {
                        // 添加
                        console.log(this.form);
                        banneradd(this.form).then(res => {
                            // console.log(res);
                            if (res.code == 200) {
                                //提示
                                this.$message.success(res.msg);
                                //隐藏弹窗
                                this.cancel();
                                //数据更新
                                this.getBannerList()
                            }
                        }).catch(err => {
                            console.log(err);
                        })
                    } else {
                        //编辑
                        banneredit(this.form).then(res => {
                            // console.log(res);
                            if (res.code == 200) {
                                //提示
                                this.$message.success(res.msg);
                                //隐藏弹窗
                                this.cancel();
                                //数据更新
                                this.getBannerList()
                            }
                        }).catch(err => {
                            console.log(err);
                        })
                    }
                }
            })
        }
    },
    mounted() { },
    watch: {},
    computed: {},
    filters: {},
    components: {},
};
</script>
<style scoped></style>