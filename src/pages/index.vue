<template>
    <div>
        <!-- 布局 
        <el-container>：外层容器。当子元素中包含 <el-header> 或 <el-footer> 时，全部子元素会垂直上下排列，否则会水平左右排列。
        <el-header>：顶栏容器。
        <el-aside>：侧边栏容器。
        <el-main>：主要区域容器。
        <el-footer>：底栏容器。
        -->
        <el-container>
            <!-- 顶栏容器 -->
            <el-header>
                <div>
                    小U商城后台管理系统
                </div>
                <div style="font-size: 20px;">
                    欢迎-{{ $store.getters.getuserinfo.username }}-登录小U后台系统
                    <el-button type="danger" @click="leave">退出登录</el-button>
                </div>
            </el-header>
            <!-- 内容区 -->
            <el-container>
                <el-aside>
                    <v-nav></v-nav>
                </el-aside>
                <el-main>
                    <!-- 二级路由出口 -->
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
import vNav from '../components/vNav.vue'
export default {
    data() {
        return {

        }
    },
    methods: {
        //退出登录
        leave() {

            this.$confirm("你确定要离开我吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(res => {
                console.log(res);
                this.$message.success('退出成功')
                //更新仓库
                this.$store.dispatch('changeuserInfo', false)
                //跳转登录
                this.$router.push('/login')

            }).catch(err=>{
               console.log(err);
               this.$message.error('取消退出')
            })
        }
    },
    mounted() { },
    watch: {},
    computed: {},
    filters: {},
    //注册组件
    components: {
        vNav
    }
}
</script>
<style scoped lang="less">
.el-header {
    background-color: #65696c;
    // text-align: center;
    font-size: 30px;
    font-weight: bold;
    color: #fff;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
}
</style>