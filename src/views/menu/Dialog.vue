<template>
    <div>
        <!-- 添加弹窗 
        visible   显示隐藏
        center    居中
        before-close  关闭前的回调，会暂停 Dialog 的关闭  触发取消的
        model	表单数据对象
        -->
        <el-dialog :title="isAdd ? '添加菜单' : '编辑菜单'" :visible.sync="isShow" center :before-close="cancel">
            <el-form ref="menuRef" label-width="80px" :rules="rules" :model="form">
                <!-- 菜单名称 -->
                <el-form-item label="菜单名称" prop="title">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>

                <!-- 上级菜单 -->
                <el-form-item label="上级菜单" prop="pid">
                    <el-select @change="changePid" v-model="form.pid" placeholder="请选择上级菜单">
                        <el-option label="顶级菜单" :value="0"></el-option>
                        <el-option v-for="item in $store.getters['menu/getMenu']" :key="item.id" :label="item.title"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <!-- 菜单类型 -->
                <el-form-item label="菜单类型">
                    <el-radio disabled v-model="form.type" :label="1">目录</el-radio>
                    <el-radio disabled v-model="form.type" :label="2">菜单</el-radio>
                </el-form-item>

                <!-- icon -->
                <el-form-item label="菜单图标" v-if="form.type == 1">
                    <!-- <el-input v-model="form.icon"></el-input> -->
                    <el-select v-model="form.icon" placeholder="请选择上级菜单">
                        <el-option v-for="item in iconlist" :key="item" :label="item" :value="item">
                            <i :class="item"></i>
                        </el-option>
                    </el-select>
                </el-form-item>

                <!-- 菜单地址 -->
                <el-form-item label="菜单地址" v-else>

                    <el-select v-model="form.url" placeholder="请选择地址">
                        <el-option v-for="item in IndexRouter" :key="item.path" :label="item.meta.title" :value="item.path">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!-- <el-form-item v-else label="菜单地址" prop="url">
                    <el-select v-model="form.url" placeholder="请选择">
                        <el-option v-for="item in IndexRouter" :key="item.path" :value="item.path" :label="item.title">
                        </el-option>
                    </el-select>
                </el-form-item> -->
                <!-- <el-form-item v-else label="菜单地址" >
                    <el-select v-model="form.url" placeholder="请选择">
                        <el-option v-for="item in IndexRouter" :key="item.path" :label="item.meta.title" :value="item.path">
                        </el-option>
                    </el-select>
                </el-form-item> -->
                <!-- 状态 -->
                <el-form-item label="状态">
                    <!-- 选中返回1，不选中返回2 -->
                    <el-switch v-model="form.status" active-color="#13ce66" inactive-color="#ff4949" :active-value="1"
                        :inactive-value="2"></el-switch>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click='add'>确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
// import { mapActions } from 'vuex'
import { menuadd, menuinfo, menuedit } from '../../request/api'
//引入菜单地址 和路由地址保持一致
// import { IndexRouter } from '../../router/index'
import { IndexRouter } from "../../router";
export default {
    //父组件传子组件参数
    props: ['isShow', 'isAdd'],
    data() {
        return {
            //表单数据
            form: {
                pid: 0,//上级分类编号 num
                title: '',//菜单名称 str
                icon: '',//icon图标 str
                type: 1,//目录1 菜单2 num
                url: '',//菜单地址 str
                status: 1,//1正常  2禁用  num
            },
            //表单验证
            rules: {
                title: [
                    { required: true, message: '请输入名称', trigger: 'blur' },
                    { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
                ],
                pid: [{ required: true, message: "请选择上级菜单", trigger: "change" }],
            },
            // 自定义icon图标
            iconlist: [
                "el-icon-s-tools",
                "el-icon-setting",
                "el-icon-s-goods",
                "el-icon-goods",
            ],
            IndexRouter:IndexRouter
        }
    },
    methods: {
        //修改菜单类型的值
        // 如果是目录=>必须是图标如果是菜单=>必须是地址
        changePid() {
            //如果pid类型是顶级菜单  就选中目录，否则选中菜单
            this.form.type = this.form.pid == 0 ? 1 : 2
        },
        // ...mapActions({
        //     getMenulist: 'menu/getMenulist'
        // }),
        // 点击取消  隐藏模态框  重置表单
        cancel() {
            this.$emit('cancel', false)
            this.reset()
        },
        // 封装一个清空数据双向绑定的方法
        reset() {
            this.form = {
                pid: 0,//上级分类编号 num
                title: '',//菜单名称 str
                icon: '',//icon图标 str
                type: 1,//目录1 菜单2 num
                url: '',//菜单地址 str
                status: 1,//1正常  2禁用  num
            }
            // resetFields	对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
            this.$refs.menuRef.resetFields()
        },
        //点击确定 添加菜单
        add() {
            //验证必填项
            console.log(this.$store.state);
            // return
            this.$refs.menuRef.validate(val => {
                // console.log(val);
                if (val) {
                    //添加
                    if (this.isAdd) {
                        console.log(this.form);
                        menuadd(this.form)
                            .then(res => {
                                console.log(res)
                                //添加成功 隐藏模态框
                                if (res.code == 200) {
                                    this.cancel()
                                    //重新调用列表
                                    this.$store.dispatch('menu/getMenulist')
                                    this.$message.success(res.msg)
                                } else {
                                    this.$message.error(res.msg)
                                }
                            })
                            .catch(err => { console.log(err) });
                    } else {
                        // 编辑
                        menuedit(this.form).then(res => {
                            console.log(res);
                            if (res.code == 200) {
                                this.cancel()
                                //重新调用列表
                                this.$store.dispatch('menu/getMenulist')
                                this.$message.success(res.msg)
                            } else {
                                this.$message.error(res.msg)
                            }
                        }).catch(err => {
                            console.log(err);
                        })
                    }
                }
            })
        },
        //数据回显
        lookup(id) {
            // console.log(id);
            menuinfo({ id }).then(res => {
                console.log(res);
                if (res.code == 200) {
                    this.form = res.list
                    this.form.id = id
                }
            }).catch(err => {
                console.log(err);
            })
        }
    },
    mounted() {
        // console.log(this.getMenulist);
        // console.log(this.$store.state);
        // console.log(IndexRouter);
    },
    watch: {},
    computed: {},
    filters: {},
    components: {}
}
</script>
<style scoped></style>