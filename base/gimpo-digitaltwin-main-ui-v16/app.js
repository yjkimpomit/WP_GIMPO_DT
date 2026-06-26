const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));

const popupContent = {
  tagPopup: { type: 'Tag Detail', title: 'GT-1001 Tag 상세', html: '<p>Tag 기준 설비 데이터, 3D 모델, 도면, 운전정보, Trend, 정비이력, 파노라마 콘텐츠를 통합 조회합니다.</p>' },
  drawingPopup: { type: 'Drawing Viewer', title: '지능형 도면 Viewer', html: '<p>P&ID, OWS, 제어로직, DCS 판넬, 전기설비 도면을 Zoom, Pan, Highlight, Selection 방식으로 조회합니다.</p>' },
  operationPopup: { type: 'Operation Data', title: '운전정보 / 성능 Trend', html: '<p>출력, 효율, 진동, 압력, 온도 등 주요 운전 값을 Tag 기준으로 조회합니다.</p>' },
  maintenancePopup: { type: 'GENi', title: '정비이력 / TM / Red-Tag', html: '<p>GENi 연계 정비이력, TM 발행 내역, Red-Tag, 작업오더를 확인합니다.</p>' },
  panoramaPopup: { type: 'Panorama', title: '파노라마 현장 Viewer', html: '<p>400 Point 로드뷰 기반 파노라마와 Tag 정보를 연계합니다.</p>' },
  solutionPopup: { type: 'Solution Integration', title: '두케어 / 표준복합 솔루션', html: '<ul><li>GasPED: 가스터빈 성능평가/진단</li><li>DCAT: 연소기 자동튜닝</li><li>PreVision: 운전상태 모니터링</li><li>표준복합: 성능 영향도, 발전량 예측, 이상감시</li></ul>' },
  safetyPopup: { type: 'Safety Control', title: '작업자 위치·건강 / AI 안전 영상 / 로봇', html: '<p>BLE/GPS/스마트워치, AI CCTV, 패트롤 로봇을 통합 관제합니다.</p>' },
  alarmPopup: { type: 'Alarm Center', title: '통합 알람 현황', html: '<ul><li>10:24 CCTV-04 안전모 미착용 감지</li><li>10:21 GT-1001 Red-Tag 발행</li><li>10:18 Zone A CO 농도 주의</li></ul>' },
  trendPopup: { type: 'Trend Analysis', title: 'Tag Trend 및 예측진단', html: '<p>운전값, 진동, 온도, 압력 등 Tag 기반 시계열과 예측진단 결과를 조회합니다.</p>' }
};

const quickPanelContent = {
  model: ['3D Model','3D 모델 바로가기','선택 설비 3D 하이라이트, 내부구조, Red-Tag 시각화, 연계 Viewer를 제공합니다.'],
  drawing: ['Intelligent Drawing','도면 바로가기','P&ID, OWS, DCS 판넬 도면을 Tag 기준으로 검색하고 3D 모델과 상호 연계합니다.'],
  operation: ['Operation Data','운전정보 바로가기','출력, 효율, 진동, 압력, 온도, Trend 및 예측진단 결과를 조회합니다.'],
  safety: ['Safety Control','안전관제 바로가기','작업자 위치·건강, AI CCTV 알람, 패트롤 로봇 순찰 정보를 확인합니다.'],
  'safe-zone': ['Safety Zone','안전 Zone A','작업자 위치, 유해가스, 출입 상태를 Zone 단위로 확인합니다.'],
  cctv: ['Fire/CCTV','소방/CCTV Zone','고정형·모바일 CCTV와 소방 방재 알람을 조회합니다.'],
  panorama: ['Panorama','파노라마 Point','현장 파노라마 Point와 설비 Tag를 연결해 조회합니다.'],
  ar: ['AR Inspection','AR 점검 마커','AR 마커 기반 현장점검 위치와 연계 정보를 확인합니다.'],
  robot: ['Patrol Robot','패트롤 로봇','로봇 순찰, 과열·누설 점검, 안전 순찰 결과를 확인합니다.']
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
  statusEl.classList.add(status.includes('Red') ? 'danger' : status.includes('주의') ? 'warning' : 'success');
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
  $('#appShell').classList.toggle('panels-hidden', !isVisible);
  $$('#togglePanels, #floatingPanelToggle').forEach(button => {
    button.setAttribute('aria-pressed', String(isVisible));
    button.textContent = isVisible ? '패널 숨기기' : '패널 보이기';
  });
}
function togglePanels() { setPanelsVisible($('#appShell').classList.contains('panels-hidden')); }
function closeQuickPanel() {
  $('#quickPanel').hidden = true;
  $$('.rail-shortcut, .main-nav a[data-panel]').forEach(control => {
    control.classList.remove('is-active');
    control.setAttribute('aria-pressed', 'false');
  });
}
function openQuickPanel(panelKey) {
  const data = quickPanelContent[panelKey];
  if (!data) return;
  const panel = $('#quickPanel');
  const isSameOpen = !panel.hidden && panel.dataset.activePanel === panelKey;
  if (isSameOpen) return closeQuickPanel();
  panel.dataset.activePanel = panelKey;
  $('#quickPanelType').textContent = data[0];
  $('#quickPanelTitle').textContent = data[1];
  $('#quickPanelBody').innerHTML = `<ul class="quick-card-list"><li><strong>${data[1]}</strong><span>${data[2]}</span></li></ul><div class="quick-actions"><button type="button" data-popup="tagPopup">Tag 상세</button><button type="button" data-popup="trendPopup">Trend</button></div>`;
  panel.hidden = false;
  $$('.rail-shortcut').forEach(control => {
    const active = control.dataset.quickPanel === panelKey;
    control.classList.toggle('is-active', active);
    control.setAttribute('aria-pressed', String(active));
  });
  $$('.main-nav a[data-panel]').forEach(control => control.classList.toggle('is-active', control.dataset.panel === panelKey));
}
function openDrawerByHover() {
  $('#sidebar').classList.add('is-hover-open');
  $('#menuToggle').setAttribute('aria-expanded', 'true');
}
function closeDrawerHover() {
  const sidebar = $('#sidebar');
  sidebar.classList.remove('is-hover-open');
  if (!sidebar.classList.contains('is-open')) $('#menuToggle').setAttribute('aria-expanded', 'false');
}

document.addEventListener('click', event => {
  const pageTrigger = event.target.closest('[data-open-page]');
  if (pageTrigger) { window.location.href = pageTrigger.dataset.openPage; return; }
  const quickTrigger = event.target.closest('[data-quick-panel]');
  if (quickTrigger) { event.preventDefault(); openQuickPanel(quickTrigger.dataset.quickPanel); return; }
  const navTrigger = event.target.closest('.main-nav a[data-panel]');
  if (navTrigger) { event.preventDefault(); openQuickPanel(navTrigger.dataset.panel); return; }
  const popupTrigger = event.target.closest('[data-popup]');
  if (popupTrigger) openPopup(popupTrigger.dataset.popup);
  if (event.target.matches('[data-close-popup]')) closePopup();
  const treeNode = event.target.closest('.tree-node');
  if (treeNode) setSelectedEquipment(treeNode);
});

$('#popupClose').addEventListener('click', closePopup);
$('#quickPanelClose').addEventListener('click', closeQuickPanel);
document.addEventListener('keydown', event => { if (event.key === 'Escape') { closePopup(); closeQuickPanel(); } });
$('#menuToggle').addEventListener('click', () => {
  const sidebar = $('#sidebar');
  const expanded = sidebar.classList.toggle('is-open');
  sidebar.classList.remove('is-hover-open');
  $('#menuToggle').setAttribute('aria-expanded', String(expanded));
});
$('#menuToggle').addEventListener('mouseenter', openDrawerByHover);
$('#menuToggle').addEventListener('focus', openDrawerByHover);
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
  if (match) { setSelectedEquipment(match); $('#sidebar').classList.add('is-open'); $('#menuToggle').setAttribute('aria-expanded','true'); }
  else { openPopup('alarmPopup'); $('#popupTitle').textContent = '검색 결과 없음'; $('#popupBody').innerHTML = '<p>입력한 검색어와 일치하는 Tag, 도면번호, 문서번호가 없습니다.</p>'; }
});
$('#togglePanels').addEventListener('click', togglePanels);
$('#floatingPanelToggle').addEventListener('click', togglePanels);
$$('[data-asset-tab]').forEach(tab => {
  tab.addEventListener('click', () => {
    const key = tab.dataset.assetTab;
    $$('.asset-tab').forEach(item => { const active = item.dataset.assetTab === key; item.classList.toggle('is-active', active); item.setAttribute('aria-selected', String(active)); });
    const map = { info: '#assetInfoTab', operation: '#operationInfoTab' };
    Object.entries(map).forEach(([name, selector]) => { const panel = $(selector); const active = name === key; panel.hidden = !active; panel.classList.toggle('is-active', active); });
  });
});

// v14: equipment tree open/close control
$$('.tree-toggle').forEach(toggle => {
  toggle.addEventListener('click', event => {
    event.preventDefault();
    event.stopPropagation();
    const item = event.currentTarget.closest('.tree-item');
    const expanded = item.classList.toggle('is-expanded');
    event.currentTarget.setAttribute('aria-expanded', String(expanded));
    const label = item.querySelector('.tree-node')?.textContent?.trim() || '하위 설비';
    event.currentTarget.setAttribute('aria-label', `${label} 하위 설비 ${expanded ? '닫기' : '열기'}`);
  });
});

setPanelsVisible(true);
