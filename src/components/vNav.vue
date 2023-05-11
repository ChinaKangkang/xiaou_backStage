<template>
    <div>
        <!-- 侧边栏-->
        <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
             <el-radio-button :label="true">收起</el-radio-button>
             <el-radio-button :label="false">展开</el-radio-button>
            </el-radio-group> -->
        <!-- 
            菜单
            default-active	当前激活菜单的 index
            unique-opened	是否只保持一个子菜单的展开
            collapse	是否水平折叠收起菜单（仅在 mode 为 vertical 时可用）
            router	是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转
         -->
        <el-menu :default-active="defaultactive" class="" :collapse="isCollapse" background-color="#333743"
            text-color="#fff" router>
            <!-- 菜单栏 -->
            <el-menu-item index="/home">
                <i class="el-icon-menu"></i>
                <span slot="title">首页</span>
            </el-menu-item>
            <!-- 选项一 -->
            <el-submenu :index="item.id + ''" v-for="item in userInfo" :key="item.id">
                <template slot="title">
                    <i class="el-icon-s-tools"></i>
                    <span slot="title">{{ item.title }}</span>
                </template>
                <el-menu-item v-for="menu in item.children" :key="menu.id" :index="menu.url">{{ menu.title }}</el-menu-item>
                <!-- <el-menu-item-group>
                    <el-menu-item index="/menu">菜单管理</el-menu-item>
                    <el-menu-item index="/role">角色管理</el-menu-item>
                    <el-menu-item index="/administrator">管理员管理</el-menu-item>
                </el-menu-item-group> -->
            </el-submenu>
            <!-- 选项二 -->
            <!-- <el-submenu index="">
                <template slot="title">
                    <i class="el-icon-s-goods"></i>
                    <span slot="title">商城管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/1">商品分类</el-menu-item>
                    <el-menu-item index="/2">商品规格</el-menu-item>
                    <el-menu-item index="/3">商品管理</el-menu-item>
                </el-menu-item-group>
            </el-submenu> -->
        </el-menu>
    </div>
</template>
<script>
export default {
    data() {
        return {
            //是否开启隐藏菜单
            isCollapse: false,
            //刷新默认选中菜单
            defaultactive: '/home',
            userInfo: this.$store.getters.getuserinfo.menus ? this.$store.getters.getuserinfo.menus : []
        }
    },

    methods: {},
    mounted() {
        //页面初始化刷新选中的菜单
        this.defaultactive = this.$route.path
        // console.log(this.$store.getters.getuserinfo);
    },
    watch: {},
    computed: {},
    filters: {},
    components: {
    }
}
</script>
<style scoped lang="less">
.el-menu {
    width: 260px;
    min-height: 700px;
    //  background-color: #333743;
}
</style>