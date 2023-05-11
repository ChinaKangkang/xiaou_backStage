<template>
    <div class="echart" id="mychart" :style="myChartStyle"></div>
</template>
   
<script >
import * as echarts from "echarts";

export default {
    data() {
        return {
            // xData: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], //横坐标
            // yData: [23, 24, 18, 25, 27, 28, 25], //数据
            myChartStyle: { float: "left", width: "100%", height: "400px" } //图表样式
        };
    },
    mounted() {
        this.initEcharts();
    },
    methods: {
        initEcharts() {
            const option = {
                title: {
                    text: '小U后台管理 V2'
                },
                legend: {
                    // data: ['项目进度']
                },
                xAxis: {
                    data: ['菜单管理', '角色管理', '管理员管理', '商品分类', '商品规格', '商品管理', '会员列表', '轮播图管理', '秒杀活动']
                },
                yAxis: {
                    type: 'time'
                },
                tooltip: {//提示
                    show: true,
                    trigger: 'axis',
                },
                grid: {
                    left: '12%',
                    right: '10%'
                },
                series: [
                    {
                        name: '开始时间',
                        type: 'bar',
                        stack: '总量',
                        barWidth: '50%',
                        itemStyle: {
                            color: '#fddf',
                            borderRadius: 0,//柱形边框圆角半径，单位px，支持传入数组分别指定柱形4个圆角半径
                            shadowColor: 'rgba(0, 0, 0, 0)',//阴影颜色。支持的格式同color
                            shadowBlur: 0//图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果。
                        },
                        data: [
                            new Date("2023/04/30"),
                            new Date("2023/05/6")
                        ]
                    },
                    {
                        name: '结束时间',
                        type: 'bar',
                        stack: '总量',
                        barWidth: '50%',
                        itemStyle: {
                            color: '#25B59E',
                            borderRadius: 0,//柱形边框圆角半径，单位px，支持传入数组分别指定柱形4个圆角半径
                            shadowColor: 'rgba(0, 0, 0, 0)',//阴影颜色。支持的格式同color
                            shadowBlur: 0//图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果。
                        },
                        data: [
                            new Date("2023/5/1"),
                            new Date("2023/5/12")
                        ]
                    },

                ]
            };
            const myChart = echarts.init(document.getElementById("mychart"));
            myChart.setOption(option);
            //随着屏幕大小调节图表
            window.addEventListener("resize", () => {
                myChart.resize();
            });
        }
    }
};
</script>