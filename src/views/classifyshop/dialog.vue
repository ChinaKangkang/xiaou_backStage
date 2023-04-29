<template>
    <div>
        <el-dialog :title="classInfo.isAdd ? '添加分类' : '编辑分类'" center :visible.sync="classInfo.isShow"
            :before-close="cancel">
            <el-form :model="form" label-width="80px" :rules="rules" ref="classifyRef">
                <el-form-item label="上级分类" prop="pid">
                    <el-select v-model="form.pid" placeholder="请选择">
                        <el-option label="顶级分类" :value="0"></el-option>
                        <el-option v-for="item in getclassifyList" :key="item.id" :label="item.catename" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="分类名称" prop="catename">
                    <el-input v-model="form.catename" autocomplete="off"></el-input>
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
                <el-form-item v-if="form.pid != 0" label="图片" prop="img" limit="1" :auto-upload="false">
                    <el-upload action="#" list-type="picture-card" :auto-upload="false" :on-preview="onPreview"
                        :on-change="onChange" :file-list="fileList"  :limit="1">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <!-- 图片预览 -->
                    <el-dialog :visible.sync="isDialog">
                        <img width="100%" alt="" :src="urlImage">
                    </el-dialog>
                </el-form-item>
                <!-- 状态 -->
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
import { cateadd, cateinfo, cateedit } from "../../request/api"
import { mapActions, mapGetters } from 'vuex'
export default {
    props: ['classInfo'],
    data() {
        return {
            //表格数据
            form: {
                pid: 0,//上级分类编号
                catename: '',//商品分类名称
                img: '',//图片(文件，一般用于二级分类)
                status: 1//状态  1正常 2禁用
            },
            //表单验证
            rules: {
                pid: [{ required: true, message: "请选择上级分类名称", trigger: "change" }],
                catename: [
                    { required: true, message: '请输入分类名称', trigger: 'blur' },
                    { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
                ],
            },
            urlImage: '',//预览图的地址
            //控制显示预览图片的显示
            isDialog: false,
            //上传的文件列表 用于清空图片展示
            fileList: []
        }
    },
    methods: {
        //上传图片成功触发 赋值给图片列表
        onChange(file) {
            console.log(1, file);
            this.form.img = file.raw//不明白为什么赋值raw
        },
        //文件预览
        onPreview(file) {
            console.log(123, file);
            this.isDialog = true;//显示预览图
            this.urlImage = file.url//给预览图图片赋值地址
        },
        ...mapActions({
            getclassify: "classify/getclassifyShoplist"//请求数据列表

        }),
        //取消事件
        cancel() {
            this.$emit('cancel', false)//关闭弹窗
            this.reset()
        },
        // 重置表单
        reset() {
            this.form = {
                pid: '',//上级分类编号
                catename: '',//商品分类名称
                img: '',//图片(文件，一般用于二级分类)
                status: 1//状态  1正常 2禁用
            }

            // resetFields	对整个表单进行重置，将所有字段值重置为初始值并移除校验结果 重置表单验证
            this.$refs.classifyRef.resetFields()
            //清空上传文件
            this.fileList = []
        },
        //添加
        add() {
            //验证必填项
            this.$refs.classifyRef.validate(val => {
                console.log(val);
                console.log(this.form);
                if (val) {
                    if (this.classInfo.isAdd) {//是否为添加
                        cateadd(this.form).then(res => {
                            // console.log(res);
                            if (res.code == 200) {
                                //提示
                                this.$message.success(res.msg)
                                // 隐藏模态框
                                this.cancel()
                                //更新视图
                                this.getclassify()
                            }
                        }).catch(err => {
                            console.log(err);
                        })
                    } else {
                        //编辑
                        cateedit(this.form).then(res => {
                            if (res.code == 200) {
                                // 提示
                                this.$message.success(res.msg)
                                // 隐藏模态框
                                this.cancel()
                                //更新视图
                                this.getclassify()
                            }
                        }).catch(err => {
                            console.log(err);
                        })
                    }
                }
            })
        },
        //数据回显
        async lookup(id) {
            let res = await cateinfo({ id })
            console.log(res, id);
            if (res.code == 200) {
                this.form = res.list
                this.form.id = id
                // 图片回显
                this.fileList = this.form.img ? [{ url: this.form.img }] : []
            }

        }
        // handleRemove(file, fileList) {
        //     console.log(file, fileList);
        // },
        // handlePictureCardPreview(file) {
        //     this.dialogImageUrl = file.url;
        //     this.dialogVisible = true;
        // }
    },
    mounted() {

    },
    watch: {},
    computed: {

        ...mapGetters({
            getclassifyList: 'classify/getclassifyList'//获取商品分类列表
        })
    },
    filters: {},
    components: {}
}
</script>
<style scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>