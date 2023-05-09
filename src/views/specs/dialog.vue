<template>
    <div>
        <el-dialog :title="specsInfo.isAdd ? '添加商品规格' : '编辑商品规格'" :visible.sync="specsInfo.isShow" center
            :before-close="cancel">
            <el-form :model="form" label-width="80px" :rules="rules" ref="dialogRef">
                <el-form-item label="规格名称" prop="specsname">
                    <el-input v-model="form.specsname" autocomplete="off"></el-input>
                </el-form-item>
                <!-- 商品属性 -->
                <el-form-item label="规格属性" v-for="(item, index) in attrArr" :key="item.id">
                    <el-input v-model="item.value" autocomplete="off" class="elfrom_btn" placeholder="属性不能为空"></el-input>
                    <el-button type="primary" v-if="index == 0" @click="addPush(index)">新增规格属性</el-button>
                    <el-button v-else @click="del(index)">删除</el-button>
                </el-form-item>

                <!-- <el-form-item label="规格属性">
                    <el-input v-model="form.attrs" autocomplete="off" class="elfrom_btn"></el-input>
                    <el-button type="primary">新增规格属性</el-button>
                    <el-button>删除</el-button>
                </el-form-item> -->
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
import { specsadd, specsinfo, specsedit } from '../../request/api'
import { mapActions } from 'vuex'
export default {
    props: ['specsInfo'],
    data() {
        return {
            form: {
                specsname: '',
                attrs: '',
                status: ''
            },
            //表单验证
            rules: {
                specsname: [
                    { required: true, message: '请输入名称', trigger: 'blur' },
                    { min: 1, max: 8, message: '长度在 1 到 8 个字符', trigger: 'blur' }
                ]
            },
            //定义商品属性列表 用于属性列表的数据双向数据绑定
            attrArr: [
                {
                    value: ''
                }
            ]

        }
    },
    methods: {
        ...mapActions({
            getSpecslist: 'specs/getSpecslist',//获取列表的行动
            getCount: 'specs/getCount'//获取总条数
        }),
        //新增商品属性 静态添加
        addPush(index) {
            if (this.attrArr.length > 6) {
                this.$message.warning('最多添加6条')
                return
            }
            if (this.attrArr[index].value == '') {
                this.$message.warning('必须填一个规格属性')
                return
            }
            this.attrArr.push({
                value: ''
            })
        },
        //删除属性
        del(index) {
            this.attrArr.splice(index, 1)
        },
        //点击取消
        cancel() {
            this.$emit('cancel', false)
            this.reset()
        },
        //重置表单
        reset() {
            this.form = {
                specsname: '',
                attrs: '',
                status: ''
            }
            // resetFields	对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
            this.$refs.dialogRef.resetFields()
            //清空规格属性数组 绑定第一个规格属性的双向数据
            this.attrArr = [
                {
                    value: ''
                }
            ]
        },
        //数据回显
        lookup(id) {
            //获取一条数据
            specsinfo({ id }).then(res => {
                console.log(res.list);
                if (res.code == 200) {
                    this.form = res.list[0]
                    this.form.id = res.list[0].id//编辑需要的参数
                    // 规格属性回显需要判断第一个，第一个为初始数据双向绑定
                    this.form.attrs.map((item, index) => {
                        if (index == 0) {
                            this.attrArr[0].value = item
                        } else {
                            this.attrArr.push({
                                value: item
                            })
                        }

                    })
                }
            }).catch(err => {
                console.log(err);
            })
        },
        //验证必填项
        add() {
            this.$refs.dialogRef.validate(val => {
                console.log(val);
                if (val) {
                    //将数组结构的数据转换成后端需要的字符串 (不管添加修改都需要)
                    this.form.attrs = this.attrArr.map(item => {
                        return item.value
                    }).join()
                    //商品属性不能为空
                    let tag = this.attrArr.every(item => {
                        return item.value != ''
                    })
                    if (!tag) {
                        this.$message.warning('规格属性不能填空')
                        return
                    }
                    if (this.specsInfo.isAdd) {
                        //添加
                        // console.log(this.form);
                        specsadd(this.form).then(res => {
                            if (res.code == 200) {
                                //弹窗提醒
                                this.$message.success(res.msg)
                                //数据响应式
                                this.getSpecslist()
                                // 关闭弹窗
                                this.cancel()
                                //获取总条数 用于计算页码
                                this.getCount()
                            }
                        }).catch(err => {
                            console.log(err);
                        })
                    } else {
                        // 编辑
                        console.log(this.form);
                        specsedit(this.form).then(res => {
                            console.log(res);
                            if (res.code == 200) {
                                //提示
                                this.$message.success(res.msg)
                                //数据响应
                                this.getSpecslist()
                                //关闭弹窗
                                this.cancel()
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
    components: {}
}
</script>
<style scoped>
.elfrom_btn {
    width: 60%;
    margin-right: 10px;
}
</style>