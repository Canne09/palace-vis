/**
 * culture.js
 * 中国历代皇宫文化 - 功能分区与文化沿袭页面
 * 包含两部分：
 * 1. 功能分区演变堆叠柱状图（ECharts）
 * 2. 核心文化沿袭图文走廊（动态渲染，左右交替）
 */

// ----------------------------- 数据定义 -----------------------------
// 功能分区数据（百分比堆叠）
const funcPeriods = ['秦汉', '隋唐', '宋元', '明清'];
const funcCategories = ['朝区(政务)', '寝区(起居)', '园林(休闲)', '衙署(办公)', '服务区(后勤)'];
const funcData = [
    [40, 30, 32, 25],   // 朝区
    [25, 28, 19, 22],   // 寝区
    [12, 30, 27, 35],   // 园林
    [7,  7,  11,  7],   // 衙署
    [16,  5,  11, 11]    // 服务区
];

// 堆叠柱状图颜色（半透明历史感）
const funcColors = [
    '#ff990075',  // 朝区
    '#ee00007f',  // 寝区
    '#8eaadbb4',  // 园林
    '#ff747474',  // 衙署
    '#993300b5'   // 服务区
];

// 文化沿袭数据
const cultureData = [
    {
        num: '01',
        img: 'assets/icons/axis.png',
        title: '中轴对称',
        text: '从秦汉到明清，中轴对称布局贯穿始终，体现皇权至上的等级观念。东西两侧严格对称，主要殿宇均位于中轴线上，彰显天子居中御极的政治理念。'
    },
    {
        num: '02',
        img: 'assets/icons/sleep.png',
        title: '前朝后寝',
        text: '前朝处理政务，后寝生活起居，功能分区明确。起源于西周丰镐宫殿，历经汉未央宫、唐大明宫，至明清紫禁城发展至极致，外朝三大殿与内廷后三宫体现这一理念。'
    },
    {
        num: '03',
        img: 'assets/icons/ancestor.png',
        title: '左祖右社',
        text: '左设太庙祭祖，右设社稷坛祭天地，体现礼制思想。自周代确立以来，历代宫殿均遵循此制，明清北京故宫左侧东有太庙，右侧西有社稷坛。'
    },
    {
        num: '04',
        img: 'assets/icons/gates.png',
        title: '三朝五门',
        text: '外朝、治朝、燕朝三朝制度，五重门阙彰显威严。隋代大兴宫以承天门、太极殿、两仪殿确立三朝制度，明清以午门、太和门等五门体现五门之制。'
    }
];

// ----------------------------- 图表实例管理 -----------------------------
let funcChartInstance = null;

/**
 * 初始化功能分区演变堆叠柱状图
 * 使用 ECharts 生成百分比堆叠柱状图
 */
function initFuncEvolutionChart() {
    const container = document.getElementById('chart-func');
    if (!container) {
        console.error('容器 #chart-func 未找到');
        return;
    }

    // 销毁旧实例
    if (funcChartInstance) {
        funcChartInstance.dispose();
        funcChartInstance = null;
    }

    // 转换数据格式：每个系列对应一个功能分区，数据为各时期占比
    const seriesData = funcCategories.map((category, idx) => ({
        name: category,
        type: 'bar',
        stack: 'total',          // 堆叠
        barWidth: '40%',         // 柱宽40%
        data: funcData[idx],
        itemStyle: {
            borderRadius: [4, 4, 0, 0],  // 顶部圆角
            color: funcColors[idx]
        },
        label: {
            show: false          // 百分比标签不显示，保持简洁，tooltip展示即可
        }
    }));

    const option = {
        backgroundColor: 'transparent',
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' },
            backgroundColor: 'rgba(250,245,228,0.96)',
            borderColor: '#A67C00',
            borderWidth: 1,
            textStyle: { color: '#1A1A1A', fontFamily: 'Noto Sans SC' },
            formatter: function(params) {
                // params 是一个数组，每个元素对应一个系列（功能分区）
                if (!params || params.length === 0) return '';
                const period = params[0].axisValue;  // 时期名称
                let html = `<strong>${period}</strong><br/>`;
                params.forEach(p => {
                    html += `${p.marker} ${p.seriesName}: ${p.value}%<br/>`;
                });
                return html;
            }
        },
        legend: {
            orient: 'horizontal',
            left: 'center',
            bottom: 0,
            textStyle: { color: '#1A1A1A', fontFamily: 'Noto Sans SC' },
            itemWidth: 20,
            itemHeight: 12,
            borderRadius: 4
        },
        grid: {
            left: '8%',
            right: '5%',
            top: '10%',
            bottom: '12%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: funcPeriods,
            axisLabel: {
                fontFamily: 'Noto Serif SC',
                color: '#A67C00',
                fontSize: 12,
                fontWeight: '500'
            },
            axisLine: { lineStyle: { color: '#A67C00' } },
            axisTick: { show: false }
        },
        yAxis: {
            type: 'value',
            name: '占比 (%)',
            nameTextStyle: { color: '#A67C00', fontFamily: 'Noto Sans SC' },
            min: 0,
            max: 100,
            splitLine: { lineStyle: { color: 'rgba(166,124,0,0.15)' } },
            axisLabel: { color: '#4a3b22', formatter: '{value}%' }
        },
        series: seriesData
    };

    funcChartInstance = echarts.init(container);
    funcChartInstance.setOption(option);
}

/**
 * 渲染文化图文走廊（动态生成，左右交替）
 * 容器: #culture-corridor
 * 防止重复渲染：检查是否已有 .culture-row 存在，若有则跳过
 */
function renderCultureCorridor() {
    const corridorContainer = document.getElementById('culture-corridor');
    if (!corridorContainer) {
        console.error('容器 #culture-corridor 未找到');
        return;
    }

    // 防止重复渲染：如果容器内已有 .culture-row 元素，则不再生成
    if (corridorContainer.querySelector('.culture-row')) {
        return;
    }

    // 清空容器（确保干净，但上面判断已保证无重复，仍可清空保留）
    corridorContainer.innerHTML = '';

    // 遍历文化数据，生成交替行（偶数索引图片左，奇数索引图片右）
    cultureData.forEach((item, index) => {
        const row = document.createElement('div');
        row.className = 'culture-row';

        // 图片框
        const imgBox = document.createElement('div');
        imgBox.className = 'culture-img-box';
        const img = document.createElement('img');
        img.src = item.img;
        img.alt = item.title;
        img.className = 'culture-img';
        // 图片加载失败时的后备样式（避免破碎图标）
        img.onerror = function() {
            this.style.opacity = '0.6';
            this.style.backgroundColor = '#e6dcc8';
        };
        imgBox.appendChild(img);

        // 文字框
        const textBox = document.createElement('div');
        textBox.className = 'culture-text-box';

        const numSpan = document.createElement('div');
        numSpan.className = 'culture-num';
        numSpan.textContent = item.num;

        const titleH4 = document.createElement('h4');
        titleH4.className = 'culture-title';
        titleH4.textContent = item.title;

        const para = document.createElement('p');
        para.className = 'culture-text';
        para.textContent = item.text;

        textBox.appendChild(numSpan);
        textBox.appendChild(titleH4);
        textBox.appendChild(para);

        // 根据索引决定左右顺序（偶数索引: 图片左文字右；奇数索引: 文字左图片右）
        if (index % 2 === 0) {
            row.appendChild(imgBox);
            row.appendChild(textBox);
        } else {
            row.appendChild(textBox);
            row.appendChild(imgBox);
        }

        corridorContainer.appendChild(row);
    });
}

/**
 * 统一初始化入口（供页面切换时调用）
 * 包含图表初始化和图文走廊渲染
 * 同时绑定窗口 resize 事件，使图表自适应
 */
function initCulture() {
    // 渲染图文走廊（内部已防重复）
    renderCultureCorridor();
    // 初始化堆叠柱状图
    initFuncEvolutionChart();

    // 绑定窗口 resize 事件（避免重复绑定）
    if (!window._cultureResizeHandler) {
        window._cultureResizeHandler = function() {
            if (funcChartInstance) {
                funcChartInstance.resize();
            }
        };
        window.addEventListener('resize', window._cultureResizeHandler);
    }
}

// 如果 DOM 已加载且容器存在，自动初始化（通常由页面切换调用，这里提供自动执行）
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // 确保 culturePage 容器存在时再初始化（避免干扰其他页面）
        if (document.getElementById('culture-corridor') || document.getElementById('chart-func')) {
            initCulture();
        }
    });
} else {
    if (document.getElementById('culture-corridor') || document.getElementById('chart-func')) {
        initCulture();
    }
}

// 导出全局函数（供外部调用，例如在 switchPage 中调用）
window.initCulture = initCulture;