/**
 * 文件名：js/main.js
 * 功能：处理 SPA 路由切换，并统筹调用各个独立业务模块 (charts, map, culture, timeline) 的初始化函数
 * 依赖：无。作为主控脚本，它将在最后被引入。
 */

// 映射各个页面的初始化入口（调用你写在其他文件中的具体逻辑）
const initControllers = {
    dataPage: () => { if (typeof window.initCharts === 'function') window.initCharts(); },
    geoPage: () => { if (typeof window.initMap === 'function') window.initMap(); },
    culturePage: () => { if (typeof window.initCulture === 'function') window.initCulture(); },
    timelinePage: () => { if (typeof window.initTimeline === 'function') window.initTimeline(); },
    homePage: () => { /* 首页无动态图表 */ }
};

/**
 * 核心：全局切换页面函数 (SPA)
 * @param {string} targetId - 目标跳转页面的 ID
 */
function switchPage(targetId) {
    const pages = document.querySelectorAll('.page');
    let targetPage = document.getElementById(targetId);
    if (!targetPage) return;
    
    // 如果已经处于激活状态，无需重复切换
    if (targetPage.classList.contains('active')) return;

    // 清除所有页面的 active 状态
    pages.forEach(page => page.classList.remove('active'));
    
    // 激活目标页面并回到顶部
    targetPage.classList.add('active');
    targetPage.scrollTop = 0;

    // 等待 CSS 转场动画 (0.5s) 完成后，再执行对应的图表/模块渲染，防止因 display:none 导致计算高度失败
    setTimeout(() => {
        if (initControllers[targetId]) {
            initControllers[targetId]();
        }
    }, 650);
}

// 页面加载完成后进行初次分配
window.addEventListener('load', () => {
    // 默认回到首页
    const activePage = document.querySelector('.page.active');
    if (!activePage || activePage.id !== 'homePage') {
        document.getElementById('homePage').classList.add('active');
    }
    
    // 如果刷新时恰好在某个分页面，尝试触发该页面的初始化
    setTimeout(() => {
        if (document.getElementById('dataPage').classList.contains('active')) initControllers.dataPage();
        else if (document.getElementById('geoPage').classList.contains('active')) initControllers.geoPage();
        else if (document.getElementById('culturePage').classList.contains('active')) initControllers.culturePage();
        else if (document.getElementById('timelinePage').classList.contains('active')) initControllers.timelinePage();
    }, 200);
});

// 暴露全局函数供 HTML 内联 onClick 调用
window.switchPage = switchPage;