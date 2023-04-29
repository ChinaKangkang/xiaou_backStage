<template>
    <div>
        <el-dialog title="会员修改" :visible.sync="isShow" :before-close="cancel" center>
            <el-form :model="form" :rules="rules" ref="memberRef">
                <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
                    <el-input v-model="form.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="昵称" :label-width="formLabelWidth" prop="nickname">
                    <el-input v-model="form.nickname" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input placeholder="密码留空则不修改" v-model="form.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="状态" :label-width="formLabelWidth">
                    <el-switch v-model="form.status" active-color="#13ce66" inactive-color="#ff4949" :active-value="1"
                        :inactive-value="2">
                    </el-switch>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="addxiugai">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import { memberinfo, memberedit } from '../../request/api'
export default {
    props: ['isShow'],
    data() {
        return {
            formLabelWidth: '100px',
            form: {
                uid: '',//会员编号，必填项 
                nickname: '',// 昵称 
                phone: '',// 手机号
                password: '',// 密码 
                status: 1 //状态1正常2禁用
            },
            //正则验证的规则
            rules: {
                phone: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { min: 6, max: 11, message: '长度在 6 到 11 个字符', trigger: 'blur' }
                ],
                nickname: [
                    { required: true, message: '请输入昵称', trigger: 'blur' },
                    { min: 1, max: 8, message: '长度在 1 到 8 个字符', trigger: 'blur' }
                ]
            },
        }
    },
    methods: {
        ...mapActions({
            getMemberlist: 'member/getMemberlist'
        }),
        //取消
        cancel() {
            this.$emit('cancel', false)
        },
        //重置表单
        reset() {
            this.form = {
                uid: '',//会员编号，必填项 
                nickname: '',// 昵称 
                phone: '',// 手机号
                password: '',// 密码 
                status: 1 //状态1正常2禁用
            }
            // resetFields	对整个表单进行重置，将所有字段值重置为初始值并移除校验结果 重置表单验证
            this.$refs.memberRef.resetFields()
        },
        // 数据回显
        lookup(uid) {
            memberinfo({ uid }).then(res => {
                console.log(res);
                if (res.code == 200) {
                    this.form = res.list
                    this.form.password = ''
                    // this.form.uid = uid//回显时显示 修改时使用
                }
            }).catch(err => {
                console.log(err);
            })
        },
        //确定 也就是修改 
        addxiugai() {
            console.log(this.form);
            this.$refs.memberRef.validate(val => {
                // console.log(val);
                memberedit(this.form).then(res => {
                    console.log(res);
                    if (res.code == 200) {
                        //弹窗提示
                        this.$message.success(res.msg);
                        //隐藏弹窗
                        this.cancel()
                        //更新视图
                        this.getMemberlist()
                    }
                }).catch(err => {
                    console.log(er);
                })
            })
        }
    },
    mounted() { },
    watch: {},
    computed: {},
    filters: {},
    components: {}
}
</script>
<style scoped></style>