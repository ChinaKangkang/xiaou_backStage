<template>
    <div class="indicatorsCity">
        <div class="questions-other">
            <HistoGramLevel class="histogram" :histogramLevelData="histogramLevelData" />
        </div>
    </div>
</template>
   
<script>
import HistoGramLevel from "./homes.vue";
export default {
    components: {
        HistoGramLevel,
    },
    data() {
        return {
            // 水平柱状图
            histogramLevelData: {
                width: 100 + "%", //柱状图盒子宽度
                histogramBarHeight: "46.782vw",
                legend: {
                    //标记属性
                    data: ["更新前", "新增数据"],
                    orient: "horizontal", //标记排列显示
                    top: 15, //标记位置
                    left: 3 + "%", //标记位置
                    icon: "roundRect",
                    itemWidth: 10,
                    itemHeight: 10,
                },
                grid: {
                    //绘图区调整
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: true,
                },
                yAxis: {
                    //Y轴显示数值
                    type: "value",
                    boundaryGap: [0, 0.01], //数值精度
                    splitNumber: 1,
                    min: 0,
                    max: 250,
                    interval: 50,
                    axisLabel: {},
                },
                xAxis: {
                    //X轴显示分类
                    type: "category",
                    dataList: [
                        "菜单管理",
                        "角色管理",
                        "管理员管理",
                        "商品分类",
                        "商品规格",
                        "商品管理",
                        "会员列表",
                        "轮播图管理",
                        "秒杀活动",
                    ],
                    axisLabel: {
                        //坐标轴文字显示样式
                        lineHeight: 18, //字体行高
                        fontNum: 20, //每行显示字数
                        rotate: 0, //文字旋转角度，0不旋转
                    },
                },
                series: [
                    //柱状图数据
                    {
                        name: "更新前",
                        type: "bar",
                        stack: "total",//堆叠的属性配置，如果没有这个配置，柱状图将会水平并排显示
                        data: [20, 20, 30, 114, 82, 92, 160, 235, 199],
                        itemStyle: {
                            //柱状图样式设置
                            color: "#1492FF",
                        },
                        label: {
                            show: false,
                        },
                        // emphasis: {//鼠标移入是否展示当前的柱状图
                        //   focus: "series",
                        // },
                        labelLine: { show: false }, //是否显示线条
                    },
                    {
                        name: "新增数据",
                        type: "bar",
                        stack: "total",//堆叠的属性配置
                        data: [0, 0, 0, 14, 17, 0, 2, 0, 29],
                        itemStyle: {
                            color: "#FF9314", //柱状图颜色
                        },
                        label: {
                            show: false,
                        },
                        // emphasis: {//鼠标移入是否展示当前的柱状图
                        //   focus: "series",
                        // },
                        labelLine: { show: false }, //是否显示线条
                    },
                ],
            },

        };
    },
    mounted() {

    },
};
</script>
   
<style scoped></style>