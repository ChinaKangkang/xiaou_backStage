<template>
    <div class="view">
        <div class="content">
            <!-- 
            el-form:表单数据对象
            rules:表单验证规则
            validate 对整个表单进行校验的方法，参数为一个回调函数。
         -->
            <img src="/logo1.png" alt="">
            <el-form ref="formData" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
                <el-form-item label="账号" prop="username">
                    <el-input v-model="ruleForm.username" clearable></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="ruleForm.password" show-password clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="login">立即登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import { userlogin } from '../request/api'
export default {
    data() {
        return {
            //表单数据对象
            ruleForm: {
                username: '',
                password: ''
            },
            //表单验证规则
            rules: {
                username: [
                    { required: true, message: '请输入账号', trigger: 'blur' },
                    { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        //登录
        login() {
            // 表单验证
            this.$refs.formData.validate(val => {
                // console.log(val);
                if (val) {
                    // console.log(this.ruleForm);
                    userlogin(this.ruleForm).then(res => {
                        console.log(res);
                        if (res.code == 200) {
                            this.$message.success(res.msg)
                            // 把登陆信息存储到仓库中
                            this.$store.dispatch('changeuserInfo', res.list)
                            this.$router.push('/index')
                        } else {
                            this.$message.error(res.msg)
                        }
                    }).catch(err => {
                        console.log(err);
                    })
                    // 判断账号密码是否正确
                    // 登录成功
                    // this.$router.push('/index')
                }
            })
        },

    },
    mounted() {
        // setInterval(() => {
        //     console.log('您还未登录,请先去登录');
        // }, 1);
    },
    watch: {},
    computed: {},
    filters: {},
    components: {}
}
</script>
<style scoped lang="less">
.content {
    width: 500px;
    height: 300px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -150px 0 0 -250px;
    // background-color: aqua;
    text-align: center;

    img {
        margin: 0 0 20px 100px;
    }

    span {
        text-align: left !important;
        margin-left: -100px;
    }
}

/deep/ .el-form-item__content {
    margin-left: 0;
}

.view {
    width: 100vw;
    height: 100vh;
    background-color: aqua;
    /* 执行动画：动画名 时长 线性的 无限次播放 */
    background: linear-gradient(125deg, #8e44ad, #e74c3c, #9ec0e2, #2980b9, #27ae60);
    /* 指定背景图像的大小 */
    background-size: 500%;
    /* 应用动画 */
    animation: bgAnimation 15s linear infinite;
}

@keyframes bgAnimation {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}
</style>