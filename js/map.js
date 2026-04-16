const geoDataMap = {
  '北京':   { palaces: ['金中都宫城 (金)', '元大都宫城 (元)', '紫禁城 (明、清)'], count: 3, note: '金、元、明、清四朝都城所在，紫禁城为中国现存规模最大、保存最完整的古代宫殿建筑群。' },
  '河北':   { palaces: ['赵王城 (战国·赵)', '金代泰和宫 (金)'], count: 2, note: '战国赵国都城邯郸与金代离宫均坐落于此，是华北地区重要的古代宫殿遗址分布区。' },
  '山西':   { palaces: ['晋阳宫 (北齐)', '大明宫 (北齐)'], count: 2, note: '北齐晋阳为北方重镇，晋阳宫与大明宫均建于此，见证了南北朝时期的政权更迭。' },
  '内蒙古': { palaces: ['元上都宫城 (元)', '元中都宫城 (元)'], count: 2, note: '元代草原都城遗址，上都与中都展现了蒙古帝国独特的游牧与农耕融合宫殿文化。' },
  '辽宁':   { palaces: ['盛京皇宫 (清)'], count: 1, note: '清朝入关前都城，建筑特色融合了满、汉、蒙、藏多元文化，现为沈阳故宫博物院。' },
  '黑龙江': { palaces: ['渤海国土京龙泉府宫城 (唐·渤海国)', '金上京会宁府宫城 (金)'], count: 2, note: '渤海国与女真金朝的早期都城相继建于此地，是东北地区古代文明的重要见证。' },
  '江苏':   { palaces: ['建康宫 (东吴、东晋、南朝)', '明故宫 (明)'], count: 2, note: '六朝古都南京的核心所在，建康宫历经东吴至南朝数百年；明故宫为朱元璋所建，奠定了后世北京紫禁城的规划范本。' },
  '浙江':   { palaces: ['吴越国王宫 (五代·吴越国)', '南宋皇城 (南宋)'], count: 2, note: '江南地区重要的古代都城遗址，南宋皇城依凤凰山而建，吴越国王宫则体现了五代时期独特的江南宫苑风格。' },
  '安徽':   { palaces: ['明中都宫城 (明)'], count: 1, note: '朱元璋在故乡凤阳营建的明中都，规制宏大，虽未建成即告停工，仍是研究明代宫殿建筑的重要遗址。' },
  '福建':   { palaces: ['闽越国王都宫城 (汉·闽越国)'], count: 1, note: '汉代闽越国都城遗址，是华南地区保存较好的汉代王国宫殿遗存。' },
  '河南':   { palaces: ['二里头夏都宫殿 (夏)', '洹北商城宫城 (商)', '殷墟宫殿区 (商)', '东周王城宫殿区 (东周)', '南宫 (东汉)', '北宫 (东汉)', '紫微宫 (隋)', '洛阳宫 (唐)', '上阳宫 (唐)', '建昌宫 (后梁)', '大宁宫 (后晋、后汉、后周)'], count: 11, note: '河洛地区与中原腹地，华夏文明核心发祥地，历经夏商东周、东汉、隋唐、五代等朝代，收录皇宫遗址数量居全国之首。' },
  '广东':   { palaces: ['南越国王宫 (南越国)', '南汉国宫殿 (南汉)'], count: 2, note: '岭南地区古代宫殿遗址集中分布于广州，南越国宫苑为中国现存最早的宫苑实例之一。' },
  '重庆':   { palaces: ['大夏国皇宫 (元末明初·大夏)'], count: 1, note: '元末明初明玉珍在重庆建立大夏国并营建皇宫，是西南地区少见的地方政权宫殿遗址。' },
  '四川':   { palaces: ['古蜀王宫 (古蜀)', '蜀汉皇宫 (蜀汉)', '前蜀皇宫 (五代·前蜀)', '蜀王府 (明)'], count: 4, note: '天府之国历朝皆有宫殿营建，从古蜀文明到蜀汉、五代前蜀，直至明代蜀王府，展现了西南地区连绵不断的宫殿文化传承。' },
  '贵州':   { palaces: ['永历皇宫 (南明)'], count: 1, note: '南明永历帝流亡西南时于贵州建立的行宫，是明代皇权在西南地区最后的历史印记。' },
  '云南':   { palaces: ['南诏王宫 (唐·南诏)', '大理王宫 (宋·大理国)'], count: 2, note: '西南边疆的古代地方政权宫殿遗址，南诏与大理国先后在此建都，展现了云南独特的多元民族宫殿建筑文化。' },
  '西藏':   { palaces: ['雍布拉康 (吐蕃)', '青瓦达孜六宫 (吐蕃)', '古格王宫 (古格王朝)', '嘎朗王宫 (嘎朗王朝)'], count: 4, note: '西藏高原上的古代王朝宫殿遗址，从吐蕃王朝到古格、嘎朗等地方政权，形成了独特的藏式宫殿建筑体系。' },
  '陕西':   { palaces: ['咸阳宫 (秦)', '阿房宫 (秦)', '未央宫 (西汉等)', '长乐宫 (西汉)', '太极宫 (隋、唐)', '大明宫 (唐)'], count: 6, note: '关中地区，中国历史上建都时间最长、宫殿遗址最为密集的区域，秦、汉、隋、唐四大帝国的都城皆在于此。' },
  '宁夏':   { palaces: ['西夏王宫 (西夏)'], count: 1, note: '党项族建立的西夏王朝都城遗址，王宫遗存是研究西夏文明的重要实物资料。' },
  '新疆':   { palaces: ['高昌王宫 (唐·高昌)', '喀喇汗王宫 (宋·喀喇汗朝)', '叶尔羌汗王宫 (明·叶尔羌汗国)'], count: 3, note: '西域丝绸之路沿线的古代地方政权宫殿遗址，高昌、喀喇汗、叶尔羌汗国先后在此建都，见证了中西文明交汇的历史。' }
};

// 省份列表（用于下拉菜单，与geoDataMap的key顺序一致）
const provinceList = [
  '北京', '河北', '山西', '内蒙古', '辽宁', '黑龙江',
  '江苏', '浙江', '安徽', '福建', '河南', '广东',
  '重庆', '四川', '贵州', '云南', '西藏', '陕西',
  '宁夏', '新疆'
];

/**
 * 更新右侧信息面板（与原版完全相同）
 * @param {string} regionName 省份名称
 */
function updateInfoPanel(regionName) {
  const regionTitle = document.getElementById('geo-region-name');
  const palacesListDiv = document.getElementById('geo-palaces-list');
  const noteDiv = document.getElementById('geo-note');

  if (!regionTitle || !palacesListDiv || !noteDiv) return;

  const data = geoDataMap[regionName];
  if (data) {
    regionTitle.innerHTML = `${regionName} · 皇宫遗址 ${data.count} 处`;
    let palacesHtml = '<ul style="list-style: none; padding-left: 0;">';
    data.palaces.forEach(palace => {
      palacesHtml += `<li class="palace-item" style="margin-bottom: 12px; padding-left: 8px; border-left: 2px solid #A67C00;"><span>🏯 ${palace}</span></li>`;
    });
    palacesHtml += '</ul>';
    palacesListDiv.innerHTML = palacesHtml;
    noteDiv.innerHTML = `<p style="margin-top: 1rem; line-height: 1.6;">${data.note}</p>`;
  } else {
    regionTitle.innerHTML = `${regionName}`;
    palacesListDiv.innerHTML = '<p style="color: #8B6914;">暂未收录该地区的历史皇宫遗址数据。<br>可查阅更多史料补充。</p>';
    noteDiv.innerHTML = '<p>华夏文明源远流长，许多地区的宫殿遗址尚待进一步考古发现与研究。</p>';
  }
}

/**
 * 初始化地理页面（标准地图图片 + 下拉菜单交互）
 */
function initMap() {
  // 检查是否已经绑定过下拉菜单事件，避免重复
  const selectEl = document.getElementById('province-select');
  if (!selectEl) {
    console.warn('省份下拉菜单 #province-select 未找到');
    return;
  }

  // 移除旧监听器（如果有），避免重复绑定
  const newSelect = selectEl.cloneNode(true);
  selectEl.parentNode.replaceChild(newSelect, selectEl);
  const finalSelect = document.getElementById('province-select');

  // 填充下拉菜单选项（确保包含所有有数据的省份）
  // 注意：HTML中已预设常用省份，此处为了完整补充所有20个，重新生成选项
  finalSelect.innerHTML = '<option value="">-- 请选择 --</option>';
  provinceList.forEach(prov => {
    const option = document.createElement('option');
    option.value = prov;
    option.textContent = prov;
    finalSelect.appendChild(option);
  });

  // 绑定 change 事件
  finalSelect.addEventListener('change', (e) => {
    const selected = e.target.value;
    if (selected && geoDataMap[selected]) {
      updateInfoPanel(selected);
    } else if (selected && !geoDataMap[selected]) {
      // 如果选了有数据但没匹配（理论上不会），显示友好提示
      updateInfoPanel(selected);
    } else {
      // 未选择时恢复默认提示
      const regionTitle = document.getElementById('geo-region-name');
      const palacesListDiv = document.getElementById('geo-palaces-list');
      const noteDiv = document.getElementById('geo-note');
      if (regionTitle) regionTitle.innerHTML = '请选择省份';
      if (palacesListDiv) palacesListDiv.innerHTML = '<p style="color: #8B6914;">请从下拉菜单中选择省份，<br>探索历代皇宫地理坐标。</p>';
      if (noteDiv) noteDiv.innerHTML = '';
    }
  });

  console.log('地理页面已初始化（标准地图图片 + 下拉菜单）');
}

// 导出全局函数（供 main.js 调用）
window.initMap = initMap;


if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('province-select')) {
      initMap();
    }
  });
} else {
  if (document.getElementById('province-select')) {
    initMap();
  }
}