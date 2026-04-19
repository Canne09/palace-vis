/**
 * timeline.js
 * 中国历代皇宫文化 - 历代卷轴页（可拖拽横向滚动时间轴 + 电影舞台预览 + 弹窗详情）
 * 核心交互模块，完全按照需求文档实现
 */

// 朝代数据（由项目提供）
const timelineData = [
    { id: 'xia',        name: '夏',       era: '先秦', period: 'BC2070—BC1600', palace: '二里头遗址',
      img: 'assets/dynasty/xia.png',
      intro: '中国历史上最早的宫殿建筑群遗迹。开创了中国古代宫殿建筑的先河，被誉为"最早的中国"。',
      tech: '首次采用夯土技术筑成高台基址，确立"廊庑庭院"基本形制。',
      tags: ['夯土台基', '廊庑庭院', '中轴雏形'],
      stats: { '占地面积': '约10.8万㎡', '夯土台基高': '约0.5米' }
    },
    { id: 'shang',      name: '商',       era: '先秦', period: 'BC1600—BC1046', palace: '殷墟遗址',
      img: 'assets/dynasty/shang.png',
      intro: '位于洹河南岸，是商代晚期约250年间的政治中心。分为宫殿区、宗庙区和祭祀区。',
      tech: '商代主殿位于院子北端，与围墙合一。晚期出现打磨平整的石质柱础防潮。',
      tags: ['殿墙合一', '石质柱础', '擎檐柱'],
      stats: { '占地面积': '约41万㎡', '基址数量': '近百处' }
    },
    { id: 'zhou',       name: '周',       era: '先秦', period: 'BC1046—BC256',  palace: '凤雏遗址',
      img: 'assets/dynasty/zhou.png',
      intro: '西周早期典型的宫殿建筑群，整体呈"日"字形，是第一座格局清晰的两进四合院。',
      tech: '浮柱础石，榫卯精工，板瓦陶瓦告别茅草。确立前朝后寝。',
      tags: ['板瓦陶瓦', '两进四合院', '前朝后寝'],
      stats: { '占地面积': '约10万㎡', '使用君王': '12位' }
    },
    { id: 'qin',        name: '秦',       era: '秦代', period: 'BC350—BC206',   palace: '咸阳宫',
      img: 'assets/dynasty/qin.png',
      intro: '秦始皇每破一国便仿建其宫室，形成"六国宫殿"群聚奇观。项羽入咸阳后焚毁。',
      tech: '开创复道、甬道连接宫殿的立体交通体系，采用"象天设都"法天思想。',
      tags: ['立体交通', '法天规划', '砖瓦标准化'],
      stats: { '占地面积': '约500万㎡', '台基高度': '约6—8米' }
    },
    { id: 'han',        name: '汉',       era: '汉代', period: 'BC202—220年',   palace: '未央宫',
      img: 'assets/dynasty/han.png',
      intro: '西汉政治中心。前殿台基高15米，以"非壮丽无以重威"为设计理念。建章宫首创中轴线。',
      tech: '抬梁、穿斗、井干三大构架体系出现。斗栱普遍使用。',
      tags: ['斗栱成熟', '中轴线首创', '瓦当艺术'],
      stats: { '占地面积': '约484万㎡', '前殿台基高': '15米' }
    },
    { id: 'sui',        name: '隋',       era: '隋代', period: '581—618年',     palace: '紫微城',
      img: 'assets/dynasty/sui.png',
      intro: '宇文恺设计，10个月建成，号称"万宫之宫"。是当时世界上最为辉煌的建筑群之一。',
      tech: '宇文恺创立"材份制"，以"材"为基本模数统一构件尺寸，实现标准化预制。',
      tags: ['材份制', '预制建造', '七城北斗'],
      stats: { '宫城面积': '约420万㎡', '营建时间': '10个月' }
    },
    { id: 'tang',       name: '唐',       era: '唐代', period: '618—907年',     palace: '大明宫',
      img: 'assets/dynasty/tang.png',
      intro: '大唐帝国统治中心，含元殿、麟德殿规模宏大，被称为"千宫之宫"。',
      tech: '完善材份制为制度，实现"设计—预制—装配"流水作业。含元殿采用减柱法。',
      tags: ['减柱法', '装配预制', '中轴强化'],
      stats: { '大明宫面积': '约320万㎡', '中轴线长': '约2.2km' }
    },
    { id: 'song',       name: '宋',       era: '宋代', period: '960—1279年',    palace: '东京宫城',
      img: 'assets/dynasty/song.png',
      intro: '北宋东京不存在严格分区，直接临街。南宋临安"因山为城"，顺应自然。',
      tech: '颁布《营造法式》，将材份制法典化。大量使用假山园林，风格趋向秀丽精巧。',
      tags: ['营造法式', '因山为城', '防火体系'],
      stats: { '使用皇帝': '14位', '遗址埋深': '地下8—10米' }
    },
    { id: 'yuan',       name: '元',       era: '元代', period: '1271—1368年',   palace: '大都宫城',
      img: 'assets/dynasty/yuan.png',
      intro: '位于大都城中轴线南部，以太液池为中心。奠定了北京城的中轴线格局。',
      tech: '继承宋制趋于简化，减柱法广泛应用。"中轴突出、水系环绕"布局为明清继承。',
      tags: ['中轴定型', '水系环绕', '北京奠基'],
      stats: { '占地面积': '约84万㎡', '使用皇帝': '11位' }
    },
    { id: 'mingnanjing', name: '明(南京)', era: '明代', period: '1366—1392年', palace: '南京故宫',
      img: 'assets/dynasty/mingnanjing.png',
      intro: '作为明朝宫殿建筑群使用54年，1421年迁都北京。总占地面积超过101.25万平方米，约为北京故宫的1.4倍。',
      tech: '大规模运用精密的榫卯结构和"标准化预制"建造方法，形成"墙倒屋不塌"的抗震性能。',
      tags: ['北京故宫"母本"', '复合地基技术', '官式建材'],
      stats: { '历时': '26年', '宫城面积': '1.16 km²', '皇帝': '3位' }
    },
    { id: 'mingqing',   name: '明清',     era: '明清', period: '1368—1912年',   palace: '北京紫禁城',
      img: 'assets/dynasty/mingqing.png',
      intro: '现存世界最大、最完整的木质结构古建筑群。严格遵循"五门三朝"礼制。',
      tech: '一块玉地基工艺，糯米灰浆，榫卯数十种。样式雷图档程式化巅峰。',
      tags: ['一块玉地基', '螭首排水', '样式雷图档'],
      stats: { '紫禁城面积': '72.4万㎡', '中轴线长': '约0.96km' }
    }
];

// 全局变量
let isTimelineInitialized = false;
let currentDetailId = null;
let stageResetTimer = null;

// DOM 元素
let tlWrap = null;
let tlProgress = null;
let stageImg = null;
let stageInfo = null;
let stageDefaultText = null;
let stageTitleSpan = null;
let stageSubtitleSpan = null;
let detailOverlay = null;

// 拖拽相关变量
let isDragging = false;
let startX = 0;
let scrollLeftStart = 0;
let dragSpeed = 1.5;      // 加速比

// ==================== 辅助函数 ====================
function getElementSafely(id) {
    const el = document.getElementById(id);
    if (!el) console.warn(`Element #${id} not found`);
    return el;
}

// 预绑定 DOM（在 initTimeline 中调用）
function bindDOMElements() {
    tlWrap = getElementSafely('tl-wrap');
    tlProgress = getElementSafely('tl-progress');
    stageImg = getElementSafely('stage-img');
    stageInfo = getElementSafely('stage-info');
    stageDefaultText = getElementSafely('stage-default-text');
    stageTitleSpan = getElementSafely('stage-title');
    stageSubtitleSpan = getElementSafely('stage-subtitle');
    detailOverlay = getElementSafely('detail-overlay');
}

// 更新进度条宽度（根据滚动比例）
function updateProgress() {
    if (!tlWrap || !tlProgress) return;
    const maxScroll = tlWrap.scrollWidth - tlWrap.clientWidth;
    if (maxScroll <= 0) {
        tlProgress.style.width = '0%';
        return;
    }
    const scrollPercent = tlWrap.scrollLeft / maxScroll;
    // 映射到 10% ~ 100%（保证最小宽度10%视觉舒适）
    const widthPercent = 10 + scrollPercent * 90;
    tlProgress.style.width = `${widthPercent}%`;
}

// ==================== 拖拽滚动逻辑 ====================
function initDragScroll() {
    if (!tlWrap) return;

    // 鼠标按下
    tlWrap.addEventListener('mousedown', (e) => {
        // 只允许左键
        if (e.button !== 0) return;
        isDragging = true;
        startX = e.pageX - tlWrap.offsetLeft;
        scrollLeftStart = tlWrap.scrollLeft;
        tlWrap.style.cursor = 'grabbing';
        tlWrap.style.userSelect = 'none';
        e.preventDefault();
    });

    // 鼠标移动
    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const x = e.pageX - tlWrap.offsetLeft;
        const walk = (x - startX) * dragSpeed;   // 加速比 1.5
        tlWrap.scrollLeft = scrollLeftStart - walk;
        updateProgress();
        e.preventDefault();
    });

    // 鼠标松开
    window.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            tlWrap.style.cursor = 'grab';
            tlWrap.style.userSelect = '';
        }
    });

    // 滚轮滚动时也更新进度条
    tlWrap.addEventListener('scroll', updateProgress);
    // 初始进度
    updateProgress();
}

// ==================== 舞台悬浮预览 ====================
function hoverStage(dynastyId) {
    // 清除恢复默认的定时器
    if (stageResetTimer) {
        clearTimeout(stageResetTimer);
        stageResetTimer = null;
    }

    // 查找朝代数据
    const data = timelineData.find(item => item.id === dynastyId);
    if (!data) return;

    // 淡出旧图（移除 show 类）
    if (stageImg) {
        stageImg.classList.remove('show');
    }
    // 淡出舞台信息标题（可选，但为了平滑，先隐藏 stage-info）
    if (stageInfo) {
        stageInfo.classList.remove('show');
    }
    // 隐藏默认文字
    if (stageDefaultText) {
        stageDefaultText.classList.add('hide');
    }

    // 延迟 100ms 后更新图片和标题，并淡入
    setTimeout(() => {
        if (stageImg) {
            // 处理图片加载失败时的占位
            const imgEl = stageImg;
            imgEl.src = data.img;
            imgEl.alt = `${data.name}·${data.palace}`;
            imgEl.onerror = function() {
                this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect width="100" height="100" fill="%23FAF5E4"/%3E%3Ctext x="50" y="55" text-anchor="middle" fill="%23A67C00" font-size="14"%3E🏯%3C/text%3E%3C/svg%3E';
            };
            // 强制重新加载（如果src相同，可能不触发onload，但无伤大雅）
            // 然后添加 show 类触发淡入
            imgEl.classList.add('show');
        }
        if (stageTitleSpan && stageSubtitleSpan) {
            stageTitleSpan.textContent = data.name;
            stageSubtitleSpan.textContent = data.palace;
        }
        if (stageInfo) {
            stageInfo.classList.add('show');
        }
    }, 100);
}

function resetStage() {
    // 设置定时器，150ms后恢复默认状态
    stageResetTimer = setTimeout(() => {
        if (stageImg) {
            stageImg.classList.remove('show');
            // 可选：将图片地址暂时留空或保持最后一张，但最好还是保留最后一张但透明度0，不影响默认文字显示
        }
        if (stageInfo) {
            stageInfo.classList.remove('show');
        }
        if (stageDefaultText) {
            stageDefaultText.classList.remove('hide');
        }
    }, 150);
}

// ==================== 弹窗详情 ====================
function openDetail(dynastyId) {
    const data = timelineData.find(item => item.id === dynastyId);
    if (!data || !detailOverlay) return;

    currentDetailId = dynastyId;

    // 填充内容
    const dEra = getElementSafely('d-era');
    const dTitle = getElementSafely('d-title');
    const dPeriod = getElementSafely('d-period');
    const dIntro = getElementSafely('d-intro');
    const dStatsGrid = getElementSafely('d-stats-grid');
    const dTechText = getElementSafely('d-tech-text');
    const dTechTags = getElementSafely('d-tech-tags');

    if (dEra) {
        dEra.textContent = data.era;
        // 特殊处理：先秦三个遗址不添加额外提示（直接显示朝代）
        // 需求中说“不显示(插图为该建筑群之正殿)”，实际上弹窗中无此文字，所以不需要额外处理
    }
    if (dTitle) dTitle.textContent = `${data.name} · ${data.palace}`;
    if (dPeriod) dPeriod.textContent = data.period;
    if (dIntro) dIntro.textContent = data.intro;

    // 渲染数据格 stats
    if (dStatsGrid) {
        dStatsGrid.innerHTML = '';
        for (const [key, value] of Object.entries(data.stats)) {
            const statBox = document.createElement('div');
            statBox.className = 'stat-box';
            statBox.innerHTML = `<div class="stat-key">${key}</div><div class="stat-value">${value}</div>`;
            dStatsGrid.appendChild(statBox);
        }
    }

    // 技术突破文字
    if (dTechText) dTechText.textContent = data.tech;

    // 渲染标签组
    if (dTechTags && data.tags) {
        dTechTags.innerHTML = '';
        data.tags.forEach(tag => {
            const tagSpan = document.createElement('span');
            tagSpan.className = 'tech-tag';
            tagSpan.textContent = tag;
            dTechTags.appendChild(tagSpan);
        });
    }

    // 显示弹窗
    detailOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // 防止背景滚动
}

function closeDetail() {
    if (!detailOverlay) return;
    detailOverlay.classList.remove('active');
    document.body.style.overflow = '';
    currentDetailId = null;
}

// ==================== 渲染时间轴节点 ====================
function renderTimelineNodes() {
    const tlNodesContainer = getElementSafely('tl-nodes');
    if (!tlNodesContainer) return;
    // 清空并重新生成（防止重复调用时重复添加）
    tlNodesContainer.innerHTML = '';

    timelineData.forEach((item, idx) => {
        const node = document.createElement('div');
        node.className = 'dynasty-node';
        node.setAttribute('data-id', item.id);
        // 内嵌结构
        node.innerHTML = `
            <div class="node-dot"></div>
            <div class="node-name">${item.name}</div>
            <div class="node-palace">${item.palace}</div>
            <div class="node-era">${item.era}</div>
        `;
        // 悬浮事件
        node.addEventListener('mouseenter', () => hoverStage(item.id));
        node.addEventListener('mouseleave', resetStage);
        // 点击事件
        node.addEventListener('click', (e) => {
            e.stopPropagation();
            openDetail(item.id);
        });
        tlNodesContainer.appendChild(node);
    });
}

// ==================== 主初始化函数 ====================
function initTimeline() {
    if (isTimelineInitialized) return;
    bindDOMElements();
    renderTimelineNodes();
    initDragScroll();

    // 确保舞台初始状态：默认图片透明，默认文字可见
    if (stageImg) stageImg.classList.remove('show');
    if (stageInfo) stageInfo.classList.remove('show');
    if (stageDefaultText) stageDefaultText.classList.remove('hide');

    // 点击遮罩关闭弹窗
    if (detailOverlay) {
        detailOverlay.addEventListener('click', (e) => {
            if (e.target === detailOverlay) closeDetail();
        });
    }

    // 可选：监听窗口 resize 重新调整进度条（无额外影响）
    window.addEventListener('resize', () => updateProgress());

    isTimelineInitialized = true;
}

// 如果页面加载完成后自动初始化（通常由 switchPage 调用，此处作为后备）
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (document.getElementById('tl-wrap')) initTimeline();
    });
} else {
    if (document.getElementById('tl-wrap')) initTimeline();
}

// 导出全局函数（供外部调用，例如在切换页面时重新确保初始化）
window.initTimeline = initTimeline;
window.openDetail = openDetail;
window.closeDetail = closeDetail;
