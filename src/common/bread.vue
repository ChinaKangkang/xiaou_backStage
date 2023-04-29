<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="#">{{ $route.meta.title }}</a></el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>
<script>
export default {
    data() {
        return {}
    },
    methods: {},
    mounted() { },
    watch: {},
    computed: {},
    filters: {},
    components: {}
}
</script>
<style scoped></style>