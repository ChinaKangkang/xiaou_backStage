<template>
    <div>
        <!-- 添加角色的模态框 
            before-close  关闭前的回调，会暂停 Dialog 的关闭  触发取消的
        -->
        <el-dialog :title="roleInfo.isAdd ? '角色添加' : '角色编辑'" :visible.sync="roleInfo.isShow" center :before-close="cancel">
            <el-form label-width="100px" :rules="rules" ref="roleRef" :model="form">
                <!-- 角色名称 -->
                <el-form-item label="角色名称" prop='rolename'>
                    <el-input v-model="form.rolename"></el-input>
                </el-form-item>
                <!-- 角色权限 -->
                <!-- 
                    el-tree
                    data	展示数据
                    show-checkbox	节点是否可被选择
                    node-key	每个树节点用来作为唯一标识的属性，整棵树应该是唯一的
                    props	配置选项，具体看下表
                    children	指定子树为节点对象的某个属性值
                    abel	指定节点标签为节点对象的某个属性值
                    default-expand-all	是否默认展开所有节点
                    check-strictly	在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false
                 -->
                <el-form-item label="角色权限">
                    <el-tree :data="$store.getters['menu/getMenu']" show-checkbox default-expand-all node-key="id"
                        ref="tree" :props="{
                                children: 'children',
                                label: 'title',
                            }" highlight-current :check-strictly="true">
                    </el-tree>
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
//引入接口
import { roleadd, roleinfo, roleedit } from '../../request/api'
export default {
    props: ['roleInfo'],
    data() {
        return {
            // dialogFormVisible: true,
            form: {
                title: '',
                status: 1//状态1正常2禁用number
            },
            //表单验证
            rules: {
                rolename: [
                    { required: true, message: '请输入名称', trigger: 'blur' },
                    { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
                ]
            },
        }
    },
    methods: {
        //点击取消 点击确认都会调用此方法
        cancel() {
            //通知父组件关闭弹窗
            this.$emit('cancel', false)
            this.reset()
        },
        //重置表单
        reset() {
            this.form = {
                rolename: '',
                status: 1
            }
            // resetFields	对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
            this.$refs.roleRef.resetFields()
            //清空树节点的选中状态
            this.$refs.tree.setCheckedKeys([]);
        },
        //封装数据回显
        async lookup(id) {
            //请求一条数据
            let res = await roleinfo({ id });
            // console.log(res);
            if (res.code == 200) {
                this.form = res.list;
                this.form.id = id//方便编辑时需要id参数
                // 回显树形数据结构  如果获取到值就转化为数组，否则空
                this.$refs.tree.setCheckedKeys(this.form.menus ? this.form.menus.split(',') : []);
            }
        },
        //添加角色
        add() {
            //验证必填项
            this.$refs.roleRef.validate(val => {
                // console.log(val);
                if (val) {
                    //添加
                    // console.log(this.$refs.tree.getCheckedKeys());// [32, 34, 33, 35, 36]
                    this.form.menus = this.$refs.tree.getCheckedKeys().join(",");
                    if (this.roleInfo.isAdd) {
                        roleadd(this.form).then(res => {
                            // console.log(res);
                            if (res.code == 200) {
                                this.$message.success(res.msg);
                                //关闭弹窗
                                this.cancel()
                                //更新数据
                                this.$store.dispatch('role/getRolelist')
                            }
                        }).catch(err => {
                            console.log(err);
                        })
                    } else {
                        // 编辑
                        roleedit(this.form).then(res => {
                            console.log(res);
                            if (res.code == 200) {
                                this.$message.success(res.msg)
                                //关闭弹窗
                                this.cancel();
                                //更新数据
                                this.$store.dispatch('role/getRolelist')
                            }
                        }).catch(err => {
                            console.log(err);
                        })
                    }
                }
            })
        }

    },
    mounted() {
        //调取菜单行动 因为在刷新时数据丢失  判断菜单列表是否存在
        if (this.$store.getters['menu/getMenu'].length == 0) {
            this.$store.dispatch('menu/getMenulist')
        }
    },
    watch: {},
    computed: {},
    filters: {},
    components: {}
}
</script>
<style scoped></style>