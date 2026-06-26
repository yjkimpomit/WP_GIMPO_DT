const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const popupContent = {
  tagPopup: { type: 'Tag Linked Data', title: 'GT-1001 통합 연계 정보', html: `<div class="popup-grid"><section class="popup-box"><h3>기본정보</h3><p>Tag No. GT-1001<br>설비명 가스터빈<br>규격 472MW Class</p></section><section class="popup-box"><h3>GENi 연계</h3><p>Red-Tag 1건<br>작업오더 WO-240619<br>TM 발행 7건</p></section><section class="popup-box"><h3>연계 Viewer</h3><p>3D 모델, P&amp;ID, OWS, DCS 판넬, 파노라마 콘텐츠와 양방향 연계</p></section></div>` },
  drawingPopup: { type: 'Intelligent Drawing', title: '지능형 도면 Viewer', html: `<div class="popup-grid"><section class="popup-box"><h3>기능</h3><p>Zoom, Pan, Highlight, Selection 기반 Embedded Viewer</p></section><section class="popup-box"><h3>도면 유형</h3><p>OWS, 제어로직, DCS 판넬, 전기설비, P&amp;ID</p></section><section class="popup-box"><h3>검색</h3><p>Tag No., 도면번호, 속성정보 검색 및 3D 모델 상호 연계</p></section></div>` },
  operationPopup: { type: 'Operation Data', title: '실시간 운전정보', html: `<div class="popup-grid"><section class="popup-box"><h3>주요 지표</h3><p>출력 472MW<br>효율 58.2%<br>진동 2.1mm/s</p></section><section class="popup-box"><h3>Trend</h3><p>Tag 기준 실시간 Trend, 예측진단 결과, 운전상태 모니터링</p></section><section class="popup-box"><h3>연계</h3><p>GasPED, DCAT, PreVision 및 표준복합 솔루션 통합</p></section></div>` },
  maintenancePopup: { type: 'GENi / Maintenance', title: '정비이력 및 TM 통계', html: `<ul><li>GENi 설비정보, 정비이력, TM 발행 내역, Red-Tag 정보 조회</li><li>주간·월간·분기·반기 단위 통계 분석</li><li>Red-Tag 설비 클릭 시 작업오더명 팝업 제공</li></ul>` },
  panoramaPopup: { type: 'Panorama Viewer', title: '파노라마 기반 가상발전소', html: `<div class="popup-grid"><section class="popup-box"><h3>콘텐츠</h3><p>보일러, 터빈, Site 400 Point 기반 로드뷰형 콘텐츠</p></section><section class="popup-box"><h3>Tag</h3><p>파노라마 사진 내 Tag 삽입 및 3D 모델·도면·운영시스템 연계</p></section><section class="popup-box"><h3>관리자</h3><p>파노라마 사진 등록, Tag 관리, 연계정보 관리</p></section></div>` },
  solutionPopup: { type: 'Solution Integration', title: '두케어 / 표준복합 솔루션', html: `<ul><li>GasPED: 가스터빈 성능평가 및 진단</li><li>DCAT: 가스터빈 연소기 자동튜닝</li><li>PreVision: 플랜트 운전상태 모니터링</li><li>표준복합: 성능 영향도, 부분부하 성능예측, 발전량 예측, 압축기 최적화, 이상감시</li></ul>` },
  safetyPopup: { type: 'Safety Control', title: '작업자 위치·건강 / AI 안전 영상 / 로봇', html: `<div class="popup-grid"><section class="popup-box"><h3>작업자</h3><p>BLE, GPS, 스마트워치 기반 위치·심박·유해가스 모니터링</p></section><section class="popup-box"><h3>AI CCTV</h3><p>안전모 미착용, 작업자 쓰러짐, 화재/연기 감시 알람</p></section><section class="popup-box"><h3>로봇</h3><p>패트롤 로봇, 현장 일상점검, 안전 순찰 연계</p></section></div>` },
  alarmPopup: { type: 'Alarm Center', title: '통합 알람 현황', html: `<ul><li>10:24 CCTV-04 안전모 미착용 감지</li><li>10:21 GT-1001 Red-Tag 발행 / GENi WO-240619</li><li>10:18 Zone A CO 농도 주의</li><li>10:10 HRSG-VLV-102 급수밸브 상태 주의</li></ul>` },
  trendPopup: { type: 'Trend Analysis', title: 'Tag Trend 및 예측진단', html: `<div class="popup-grid"><section class="popup-box"><h3>실시간 Trend</h3><p>운전값, 진동, 온도, 압력 등 Tag 기반 시계열 조회</p></section><section class="popup-box"><h3>예측진단</h3><p>성능저하 원인, 발전량 예측, 압축기 효율 예측</p></section><section class="popup-box"><h3>출력</h3><p>통계 리포트와 Import/Export 업무 연결</p></section></div>` }
};

const quickPanelContent = {
  model: {
    type: '3D Model',
    title: '3D 모델 바로가기 패널',
    html: `<ul class="quick-card-list"><li><strong>선택 설비 3D 하이라이트</strong><span>현재 선택된 Tag를 3D 배경 모델에서 강조하고 내부구조·연계정보를 확인합니다.</span></li><li><strong>연계 Viewer</strong><span>3D 모델 기준으로 P&amp;ID, 운전화면, 파노라마, GENi 정비이력을 호출합니다.</span></li><li><strong>Red-Tag 시각화</strong><span>GENi Red-Tag 발행 설비를 색상으로 구분하고 작업오더 팝업으로 연결합니다.</span></li></ul><div class="quick-actions"><button type="button" data-popup="tagPopup">Tag 상세</button><button type="button" data-popup="panoramaPopup">파노라마</button></div>`
  },
  drawing: {
    type: 'Intelligent Drawing',
    title: '도면 바로가기 패널',
    html: `<ul class="quick-card-list"><li><strong>지능형 도면 Viewer</strong><span>OWS, 제어로직, DCS 판넬, 전기설비, P&amp;ID 도면을 Embedded Viewer로 확인합니다.</span></li><li><strong>Tag Highlight</strong><span>도면 내 Equipment, Valve, Pipeline, Instrument Tag를 검색·선택·강조합니다.</span></li><li><strong>3D 모델 상호연계</strong><span>선택한 도면 Tag를 3D 가상모델 및 설비 데이터와 양방향 연결합니다.</span></li></ul><div class="quick-actions"><button type="button" data-popup="drawingPopup">도면 열기</button><button type="button" data-popup="tagPopup">Tag 조회</button></div>`
  },
  operation: {
    type: 'Operation Data',
    title: '운전정보 바로가기 패널',
    html: `<ul class="quick-card-list"><li><strong>실시간 운전정보</strong><span>출력, 효율, 진동, 압력, 온도 등 주요 운전 데이터를 Tag 기준으로 조회합니다.</span></li><li><strong>Trend 분석</strong><span>주간·월간·분기 단위 Trend 및 예측진단 결과를 시계열로 확인합니다.</span></li><li><strong>솔루션 연계</strong><span>GasPED, DCAT, PreVision, 표준복합 솔루션의 성능·예측 정보를 가시화합니다.</span></li></ul><div class="quick-actions"><button type="button" data-popup="operationPopup">운전정보</button><button type="button" data-popup="trendPopup">Trend 확대</button></div>`
  },
  safety: {
    type: 'Safety Control',
    title: '안전관제 바로가기 패널',
    html: `<ul class="quick-card-list"><li><strong>작업자 위치·건강</strong><span>BLE/GPS/스마트워치 기반 위치, 심박, 유해가스 상태를 확인합니다.</span></li><li><strong>AI 안전 영상</strong><span>안전모 미착용, 작업자 쓰러짐, 화재·연기 감지 알람을 확인합니다.</span></li><li><strong>로봇 순찰</strong><span>패트롤 로봇의 일상점검, 과열·누설 감시, 안전 순찰 결과를 연계합니다.</span></li></ul><div class="quick-actions"><button type="button" data-popup="safetyPopup">안전 상세</button><button type="button" data-popup="alarmPopup">알람 전체</button></div>`
  }
};

function setSelectedEquipment(button) {
  $$('.tree-node').forEach(node => node.classList.remove('is-selected'));
  button.classList.add('is-selected');
  const tag = button.dataset.tag || '-';
  const title = button.dataset.title || button.textContent.trim();
  const status = button.dataset.status || '정상';
  $('#selectedTitle').textContent = title;
  $('#selectedTag').textContent = `Tag No. ${tag} · ${status}`;
  $('#detailTag').textContent = tag;
  const statusEl = $('#detailStatus');
  statusEl.textContent = status;
  statusEl.className = 'status-badge';
  if (status.includes('Red')) statusEl.classList.add('danger');
  else if (status.includes('주의')) statusEl.classList.add('warning');
  else statusEl.classList.add('success');
}

function openPopup(key) {
  const data = popupContent[key] || popupContent.tagPopup;
  $('#popupType').textContent = data.type;
  $('#popupTitle').textContent = data.title;
  $('#popupBody').innerHTML = data.html;
  $('#popupLayer').hidden = false;
  $('#popupClose').focus();
}
function closePopup(){ $('#popupLayer').hidden = true; }

function setPanelsVisible(isVisible) {
  const shell = $('#appShell');
  shell.classList.toggle('panels-hidden', !isVisible);
  $$('#togglePanels, #floatingPanelToggle').forEach(button => {
    button.setAttribute('aria-pressed', String(isVisible));
    button.textContent = isVisible ? '패널 숨기기' : '패널 보이기';
  });
}
function togglePanels() {
  setPanelsVisible($('#appShell').classList.contains('panels-hidden'));
}

function closeQuickPanel() {
  $('#quickPanel').hidden = true;
  $$('.rail-shortcut, .main-nav a[data-panel]').forEach(control => {
    control.classList.remove('is-active');
    control.setAttribute('aria-pressed', 'false');
  });
}

function openQuickPanel(panelKey) {
  const panel = $('#quickPanel');
  const data = quickPanelContent[panelKey];
  if (!data) return;

  const isSameOpen = !panel.hidden && panel.dataset.activePanel === panelKey;
  if (isSameOpen) {
    closeQuickPanel();
    return;
  }

  panel.dataset.activePanel = panelKey;
  $('#quickPanelType').textContent = data.type;
  $('#quickPanelTitle').textContent = data.title;
  $('#quickPanelBody').innerHTML = data.html;
  panel.hidden = false;

  $$('.rail-shortcut').forEach(control => {
    const active = control.dataset.quickPanel === panelKey;
    control.classList.toggle('is-active', active);
    control.setAttribute('aria-pressed', String(active));
  });
  $$('.main-nav a[data-panel]').forEach(control => {
    control.classList.toggle('is-active', control.dataset.panel === panelKey);
  });
}

function openDrawerByHover() {
  const sidebar = $('#sidebar');
  sidebar.classList.add('is-hover-open');
  $('#menuToggle').setAttribute('aria-expanded', 'true');
}
function closeDrawerHover() {
  const sidebar = $('#sidebar');
  sidebar.classList.remove('is-hover-open');
  if (!sidebar.classList.contains('is-open')) {
    $('#menuToggle').setAttribute('aria-expanded', 'false');
  }
}

document.addEventListener('click', event => {
  const quickTrigger = event.target.closest('[data-quick-panel]');
  if (quickTrigger) {
    event.preventDefault();
    openQuickPanel(quickTrigger.dataset.quickPanel);
    return;
  }

  const navTrigger = event.target.closest('.main-nav a[data-panel]');
  if (navTrigger) {
    event.preventDefault();
    openQuickPanel(navTrigger.dataset.panel);
    return;
  }

  const popupTrigger = event.target.closest('[data-popup]');
  if (popupTrigger) openPopup(popupTrigger.dataset.popup);
  if (event.target.matches('[data-close-popup]')) closePopup();

  const treeNode = event.target.closest('.tree-node');
  if (treeNode) setSelectedEquipment(treeNode);
});

$('#popupClose').addEventListener('click', closePopup);
$('#quickPanelClose').addEventListener('click', closeQuickPanel);
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closePopup();
    closeQuickPanel();
  }
});

$('#menuToggle').addEventListener('click', () => {
  const sidebar = $('#sidebar');
  const expanded = sidebar.classList.toggle('is-open');
  sidebar.classList.remove('is-hover-open');
  $('#menuToggle').setAttribute('aria-expanded', String(expanded));
});

const headerMenuToggle = $('#menuToggle');
headerMenuToggle.addEventListener('mouseenter', openDrawerByHover);
headerMenuToggle.addEventListener('focus', openDrawerByHover);
$('#sidebar').addEventListener('mouseleave', closeDrawerHover);

$('#treeViewSwitch').addEventListener('click', event => {
  const tree = $('#equipmentTree');
  const isList = tree.classList.toggle('is-list');
  event.currentTarget.textContent = isList ? 'Tree' : 'List';
});

$$('.tree-toolbar button').forEach(button => {
  button.addEventListener('click', () => {
    $$('.tree-toolbar button').forEach(btn => btn.classList.remove('is-active'));
    button.classList.add('is-active');
    const filter = button.dataset.filter;
    $$('#equipmentTree > li').forEach(item => {
      const text = item.dataset.keyword || '';
      item.classList.toggle('is-hidden', filter !== 'all' && !text.includes(filter));
    });
  });
});

$('#searchButton').addEventListener('click', () => {
  const keyword = $('#globalSearch').value.trim().toLowerCase();
  if (!keyword) return;
  const match = $$('.tree-node').find(node => `${node.dataset.tag} ${node.dataset.title} ${node.textContent}`.toLowerCase().includes(keyword));
  if (match) {
    setSelectedEquipment(match);
    $('#sidebar').classList.add('is-open');
    $('#menuToggle').setAttribute('aria-expanded','true');
  } else {
    openPopup('alarmPopup');
    $('#popupTitle').textContent = '검색 결과 없음';
    $('#popupBody').innerHTML = `<p>입력한 검색어와 일치하는 Tag, 도면번호, 문서번호가 없습니다.</p>`;
  }
});

$('#togglePanels').addEventListener('click', togglePanels);
$('#floatingPanelToggle').addEventListener('click', togglePanels);
setPanelsVisible(true);

// v6: Selected Asset Panel tab interaction
$$('[data-asset-tab]').forEach(tab => {
  tab.addEventListener('click', () => {
    const key = tab.dataset.assetTab;
    $$('.asset-tab').forEach(item => {
      const active = item.dataset.assetTab === key;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-selected', String(active));
    });
    const tabMap = { info: '#assetInfoTab', operation: '#operationInfoTab' };
    Object.entries(tabMap).forEach(([name, selector]) => {
      const panel = $(selector);
      if (!panel) return;
      const active = name === key;
      panel.hidden = !active;
      panel.classList.toggle('is-active', active);
    });
  });
});

// v6: keep dashboard overlay visible on initial load
setPanelsVisible(true);
