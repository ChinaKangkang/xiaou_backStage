<template>
    <div>
        <el-dialog :title="adminInfo.isAdd ? '添加管理员' : '编辑管理员'" center :visible.sync="adminInfo.isShow"
            :before-close="cancel">
            <el-form :model="form" label-width="80px" :rules="rules" ref="adminRef">
                <el-form-item label="所属角色" prop="roleid">
                    <el-select v-model="form.roleid" placeholder="请选择">
                        <!-- <el-option label="哈哈哈" :value="0"></el-option> -->
                        <el-option v-for="item in getRole" :key="item.id" :label="item.rolename" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="用户名称" prop="username">
                    <el-input v-model="form.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.password" autocomplete="off" placeholder="密码为空不修改"></el-input>
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
// 引入接口
import { useradd, userinfo, useredit } from '.././../request/api'
// 引入辅助函数
import { mapGetters, mapActions } from 'vuex'
export default {
    props: ['adminInfo'],
    data() {
        return {
            dialogFormVisible: true,
            form: {
                roleid: '', //角色编号 | number |
                username: '',//管理员名称 | string |
                password: '',//密码 | string |
                status: 2//状态  1正常2禁用 | number |
            },
            //表单验证
            rules: {
                roleid: [{ required: true, message: "请选择所属角色", trigger: "change" }],
                username: [
                    { required: true, message: '请输入用户名称', trigger: 'blur' },
                    { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
                ],
            }
        }
    },
    methods: {
        //辅助函数 行动
        ...mapActions({
            //组件一加载就调取行动
            getRolelist: 'role/getRolelist',
            getAdminlist: 'admin/getAdminlist',
            getCount: 'admin/getUsercount'
        }),
        //封装一个取消方法
        cancel() {
            this.$emit('cancel', false)//取消弹窗
            this.reset()
        },
        //封装一个清空数据的方法
        reset() {
            this.form = {
                roleid: '', //角色编号 | number |
                username: '',//管理员名称 | string |
                password: '',//密码 | string |
                status: 1//状态  1正常2禁用 | number |
            }
            // resetFields	对整个表单进行重置，将所有字段值重置为初始值并移除校验结果 重置表单验证
            this.$refs.adminRef.resetFields()
        },
        // 添加
        add() {
            //验证必填项
            this.$refs.adminRef.validate(val => {
                if (val) {
                    // 添加管理员
                    if (this.adminInfo.isAdd) {
                        console.log(this.form);
                        useradd(this.form).then(res => {
                            console.log(res);
                            if (res.code == 200) {
                                // 添加成功
                                // 隐藏模态框
                                this.cancel()
                                //更新列表以及总条数
                                // this.$store.dispatch('admin/getAdminlist')
                                this.getAdminlist()//视图
                                this.getCount()//页码
                                this.$message.success(res.msg)
                            }
                        }).catch(err => {
                            console.log(err);
                        })
                    } else {
                        // 编辑管理员
                        // console.log('编辑');
                        // console.log(this.form);
                        useredit(this.form).then(res => {
                            if (res.code == 200) {
                                // 编辑成功
                                // 隐藏模态框
                                this.cancel()
                                //提示
                                this.$message.success(res.msg)
                                //更新列表以及总条数
                                // this.$store.dispatch('admin/getAdminlist')
                                this.getAdminlist()//视图
                                this.getCount()//页码
                            }
                        })
                    }
                }
            })
        },
        //数据回显  uid由列表组件传过来
        async lookup(uid) {
            let res = await userinfo({ uid });
            if (res.code == 200) {
                this.form = res.list
                //密码为空则不修改
                this.form.password = ''
            }
        }
    },
    mounted() {
        //调取菜单行动 因为在刷新时数据丢失  判断菜单列表是否存在
        if (this.getRole.length == 0) {
            // this.$store.dispatch('role/getRolelist',)
            this.getRolelist()
        }
    },
    watch: {},
    computed: {
        ...mapGetters({
            //获取角色列表
            getRole: 'role/getRolelist'
        })
    },
    filters: {},
    components: {}
}
</script>
<style scoped></style>