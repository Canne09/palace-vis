/**
 * charts.js
 * 中国历代皇宫文化 - 综合数据可视化模块
 * 基于 ECharts 5 实现四个核心图表，遵循水墨宣纸风格配色
 */

// 基础数据（已由项目提供）
const chartData = [
    { name: '秦咸阳宫',   area: 372,  axis: 0,    kings: 7,  build: 143 },
    { name: '汉未央宫',   area: 484,  axis: 1800, kings: 34, build: 5   },
    { name: '隋紫微城',   area: 420,  axis: 2500, kings: 45, build: 1   },
    { name: '唐大明宫',   area: 320,  axis: 2200, kings: 17, build: 29  },
    { name: '北宋东京宫', area: 53,   axis: 1100, kings: 9,  build: 4   },
    { name: '南宋临安宫', area: 30,   axis: 800,  kings: 9,  build: 9   },
    { name: '元大都宫',   area: 84,   axis: 1200, kings: 11, build: 18  },
    { name: '明南京故宫', area: 116,  axis: 1500, kings: 3,  build: 26  },
    { name: '明清紫禁城', area: 72.4, axis: 960,  kings: 24, build: 14  }
];

// 玫瑰图专用渐变色（亮金→深棕）
const roseColors = [
    '#D4A76A', '#C8971A', '#B8862D', '#A67C00',
    '#8B6914', '#6B4F1A', '#5C4010', '#4A3308', '#3B2503'
];

// 存储所有 ECharts 实例，用于 resize 统一适配
const instances = {};

// 辅助函数：销毁旧实例（避免重复初始化时内存堆积）
function disposeInstance(containerId) {
    if (instances[containerId]) {
        instances[containerId].dispose();
        delete instances[containerId];
    }
}

// ==================== 图表1：南丁格尔玫瑰图（宫城面积） ====================
function initAreaRoseChart() {
    const container = document.getElementById('chart-area');
    if (!container) return;
    disposeInstance('chart-area');

    // 准备数据：名称 + 面积（万㎡）
    const pieData = chartData.map(item => ({
        name: item.name,
        value: item.area
    }));

    const option = {
        // 全局背景透明，融入宣纸底色
        backgroundColor: 'transparent',
        tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(250,245,228,0.95)',
            borderColor: '#A67C00',
            borderWidth: 1,
            textStyle: { color: '#1A1A1A', fontFamily: 'Noto Sans SC' },
            formatter: '{b}<br/>宫城面积: {c} 万㎡'
        },
        series: [{
            name: '宫城面积',
            type: 'pie',
            radius: ['20%', '70%'],
            center: ['50%', '50%'],
            roseType: 'area',          // 南丁格尔玫瑰图
            itemStyle: {
                borderRadius: 8,        // 扇形圆角
                borderColor: '#FAF5E4',
                borderWidth: 1.5
            },
            label: {
                show: true,
                rotate: 0,
                fontSize: 11,
                fontFamily: 'Noto Sans SC',
                color: '#4a3b22',
                formatter: '{b}\n{d}%',
                lineHeight: 16
            },
            emphasis: {
                scale: true,
                label: { show: true, fontWeight: 'bold', color: '#A67C00' }
            },
            data: pieData,
            color: roseColors,          // 渐变色方案按顺序分配
            animation: true,
            animationDuration: 1000,
            animationEasing: 'cubicOut'
        }],
        graphic: [
            // 极简装饰（可选，不加标题，因为外部卡片已有标题）
        ]
    };

    const chart = echarts.init(container);
    chart.setOption(option);
    instances['chart-area'] = chart;
}

// ==================== 图表2：中轴线长度 · 雷达图 ====================
function initAxisRadarChart() {
    const container = document.getElementById('chart-axis');
    if (!container) return;
    disposeInstance('chart-axis');

    // 构建雷达图指标（indicator）—— 9个宫殿，max统一2600
    const indicators = chartData.map(item => ({
        name: item.name,
        max: 2600
    }));

    // 系列数据：中轴线长度数组
    const axisValues = chartData.map(item => item.axis);

    // 自定义 tooltip：秦咸阳宫 axis=0 时显示 "无明确中轴线"
    const tooltipFormatter = (params) => {
        if (params.componentType === 'series') {
            const dataValue = params.value;
            const dimensionName = params.name;
            if (dimensionName === '秦咸阳宫' && dataValue === 0) {
                return `${dimensionName}<br/>中轴线长度: 无明确中轴线（史料无明确记载）`;
            }
            return `${dimensionName}<br/>中轴线长度: ${dataValue} 米`;
        }
        return params.value;
    };

    const option = {
        backgroundColor: 'transparent',
        tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(250,245,228,0.95)',
            borderColor: '#A67C00',
            formatter: tooltipFormatter,
            textStyle: { color: '#1A1A1A', fontFamily: 'Noto Sans SC' }
        },
        radar: {
            indicator: indicators,
            shape: 'circle',
            center: ['50%', '50%'],
            radius: '65%',
            name: {
                textStyle: {
                    color: '#A67C00',
                    fontFamily: 'Noto Serif SC',
                    fontSize: 11,
                    fontWeight: '500'
                },
                formatter: (name) => {
                    // 名称过长处理
                    return name.length > 6 ? name.slice(0,5)+'..' : name;
                }
            },
            splitArea: {
                areaStyle: {
                    color: ['rgba(166,124,0,0.05)', 'rgba(166,124,0,0.02)']
                }
            },
            splitLine: { lineStyle: { color: 'rgba(166,124,0,0.25)' } },
            axisLine: { lineStyle: { color: 'rgba(166,124,0,0.4)' } }
        },
        series: [{
            type: 'radar',
            data: [{ value: axisValues, name: '中轴线长度' }],
            areaStyle: {
                color: 'rgba(166,124,0,0.2)'     // 填充色符合要求
            },
            lineStyle: {
                color: '#A67C00',                  // 线条色
                width: 2
            },
            itemStyle: {
                color: '#8B1A1A',                  // 节点色
                borderColor: '#FAF5E4',
                borderWidth: 1.5
            },
            symbol: 'circle',
            symbolSize: 8,
            tooltip: { valueFormatter: (value) => value + ' 米' }
        }]
    };

    const chart = echarts.init(container);
    chart.setOption(option);
    instances['chart-axis'] = chart;
}

// ==================== 图表3：帝王临朝频次 · 渐变柱状图 ====================
function initKingsBarChart() {
    const container = document.getElementById('chart-kings');
    if (!container) return;
    disposeInstance('chart-kings');

    const xAxisData = chartData.map(item => item.name);
    const kingsData = chartData.map(item => item.kings);

    // 线性渐变（从上到下：顶部 #C8971A，底部 #A67C00）
    const barGradient = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: '#C8971A' },
        { offset: 1, color: '#A67C00' }
    ]);

    const option = {
        backgroundColor: 'transparent',
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' },
            backgroundColor: 'rgba(250,245,228,0.95)',
            borderColor: '#A67C00',
            textStyle: { color: '#1A1A1A' },
            formatter: '{b}<br/>帝王数量: {c} 位'
        },
        grid: {
            left: '8%',
            right: '5%',
            bottom: '25%',       // 为倾斜标签留足空间
            top: '10%',
            containLabel: false
        },
        xAxis: {
            type: 'category',
            data: xAxisData,
            axisLabel: {
                rotate: 40,       // 倾斜40度
                interval: 0,
                fontSize: 10,
                fontFamily: 'Noto Sans SC',
                color: '#5a4a2a',
                margin: 12
            },
            axisLine: { lineStyle: { color: '#A67C00' } },
            axisTick: { show: false }
        },
        yAxis: {
            type: 'value',
            name: '帝王数量（位）',
            nameTextStyle: { color: '#A67C00', fontFamily: 'Noto Sans SC' },
            splitLine: { lineStyle: { color: 'rgba(166,124,0,0.15)' } },
            axisLabel: { color: '#4a3b22' }
        },
        series: [{
            name: '帝王数量',
            type: 'bar',
            data: kingsData,
            itemStyle: {
                borderRadius: [8, 8, 0, 0],   // 顶部圆角
                color: barGradient,
                shadowColor: 'rgba(166,124,0,0.3)',
                shadowBlur: 6
            },
            label: {
                show: true,
                position: 'top',
                color: '#A67C00',
                fontWeight: 'bold',
                fontFamily: 'Noto Sans SC',
                fontSize: 11,
                formatter: '{c}'
            },
            barWidth: '55%'
        }]
    };

    const chart = echarts.init(container);
    chart.setOption(option);
    instances['chart-kings'] = chart;
}

// ==================== 图表4：营造时长 · 平滑折线图（带面积渐变） ====================
function initBuildLineChart() {
    const container = document.getElementById('chart-build');
    if (!container) return;
    disposeInstance('chart-build');

    const xAxisData = chartData.map(item => item.name);
    const buildData = chartData.map(item => item.build);

    // 面积渐变：顶部 rgba(139,26,26,0.25) → 底部透明
    const areaGradient = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: 'rgba(139,26,26,0.25)' },
        { offset: 1, color: 'rgba(139,26,26,0.02)' }
    ]);

    const option = {
        backgroundColor: 'transparent',
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(250,245,228,0.95)',
            borderColor: '#A67C00',
            textStyle: { color: '#1A1A1A' },
            formatter: '{b}<br/>营造时长: {c} 年'
        },
        grid: {
            left: '8%',
            right: '6%',
            bottom: '10%',
            top: '12%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: xAxisData,
            axisLabel: {
                rotate: 25,
                fontSize: 10,
                fontFamily: 'Noto Sans SC',
                color: '#5a4a2a',
                margin: 10
            },
            axisLine: { lineStyle: { color: '#A67C00' } }
        },
        yAxis: {
            type: 'value',
            name: '营造年数（年）',
            nameTextStyle: { color: '#A67C00' },
            splitLine: { lineStyle: { color: 'rgba(166,124,0,0.15)' } },
            axisLabel: { color: '#4a3b22' }
        },
        series: [{
            name: '营造时长',
            type: 'line',
            data: buildData,
            smooth: true,               // 平滑曲线
            lineStyle: {
                color: '#8B1A1A',       // 线条色 暗红
                width: 3,
                shadowBlur: 8,
                shadowColor: 'rgba(139,26,26,0.3)'
            },
            areaStyle: {
                color: areaGradient      // 渐变填充
            },
            symbol: 'circle',
            symbolSize: 8,
            itemStyle: {
                color: '#8B1A1A',
                borderColor: '#FAF5E4',
                borderWidth: 1.5
            },
            emphasis: { scale: 1.2 }
        }]
    };

    const chart = echarts.init(container);
    chart.setOption(option);
    instances['chart-build'] = chart;
}

// ==================== 统一初始化入口 ====================
let resizeHandlerAttached = false;

function initCharts() {
    // 依次初始化四个图表
    initAreaRoseChart();
    initAxisRadarChart();
    initKingsBarChart();
    initBuildLineChart();

    // 绑定窗口 resize 事件（仅绑定一次，避免重复）
    if (!resizeHandlerAttached) {
        window.addEventListener('resize', () => {
            for (let key in instances) {
                if (instances[key] && instances[key].resize) {
                    instances[key].resize();
                }
            }
        });
        resizeHandlerAttached = true;
    }
}

// 如果页面已经加载完成，自动执行初始化；但更推荐由页面手动调用（确保容器存在）
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCharts);
} else {
    // DOM 已就绪，稍等微任务确保容器完全渲染
    setTimeout(initCharts, 50);
}

// 导出全局函数（便于外部按需重新初始化，例如页面切换后）
window.initCharts = initCharts;