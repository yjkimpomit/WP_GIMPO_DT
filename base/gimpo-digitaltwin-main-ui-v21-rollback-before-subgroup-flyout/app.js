const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

const drawer = $('#drawer');
const menuToggle = $('#menuToggle');
const dashboardLayer = $('#dashboardLayer');
const panelVisibilityButtons = $$('[data-panel-visibility]');
const quickPanel = $('#quickPanel');
const quickTitle = $('#quickTitle');
const quickBody = $('#quickBody');
const quickClose = $('#quickClose');
const popup = $('#popup');
const popupDim = $('#popupDim');
const popupTitle = $('#popupTitle');
const popupBody = $('#popupBody');
const popupClose = $('#popupClose');
const assetContextMenu = $('#assetContextMenu');
const contextAssetTag = $('#contextAssetTag');
const contextAssetName = $('#contextAssetName');
let selectedContextAsset = { title: 'HRSG #1', tag: 'HRSG-2001', status: '정상' };

function setPanelVisibility(isVisible) {
  dashboardLayer.classList.toggle('is-hidden', !isVisible);
  panelVisibilityButtons.forEach(button => {
    const active = button.dataset.panelVisibility === (isVisible ? 'show' : 'hide');
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
}

menuToggle.addEventListener('click', () => {
  const open = drawer.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

panelVisibilityButtons.forEach(button => {
  button.addEventListener('click', () => {
    setPanelVisibility(button.dataset.panelVisibility === 'show');
  });
});

const quickContent = {
  digitalTwin3d: ['3D 통합 화면', '3D 설비 선택 후 태그 기반 연계 정보를 바로가기 버튼그룹으로 제공합니다.'],
  dashboard: ['대시보드', '설비 상태와 주요 지표를 요약해 조회합니다.'],
  panorama: ['파노라마', '현장 공간 또는 설비 주변 시각 자료를 확인합니다.'],
  cctv: ['CCTV', '설비 또는 현장 영상을 확인합니다.'],
  pid: ['P&ID', '배관 및 계장 도면을 조회합니다.'],
  ows: ['OWS', '운전 화면 또는 운전 관련 화면을 조회합니다.'],
  gasPed: ['gasPED', '가스설비 이상진단 결과를 확인합니다.'],
  dcat: ['DCAT', '설비상태 진단 정보를 확인합니다.'],
  prevision: ['PreVISION', '예측 기반 안전진단 정보를 확인합니다.'],
  powerForecast: ['발전량 예측', '운전 데이터 기반 발전량 예측을 확인합니다.'],
  performanceForecast: ['성능 예측', '설비 성능 저하 또는 효율 변화 예측을 확인합니다.'],
  anomalyForecast: ['이상징후 예측', '운전 데이터 기반 이상징후 탐지 결과를 확인합니다.'],
  operationAnalysis: ['운전상태 분석', '운전 조건 및 상태 데이터를 분석합니다.'],
  preventiveDiagnosis: ['예방진단', '이상 발생 전 예방 관점의 진단 정보를 확인합니다.'],
  workerLocation: ['작업자 위치', '현장 작업자의 위치 및 이동 상태를 확인합니다.'],
  healthMonitoring: ['건강 모니터링', '작업자의 생체 또는 건강 상태를 모니터링합니다.'],
  robotDetection: ['4족 보행로봇 감지정보', '로봇이 감지한 현장 정보를 확인합니다.'],
  robotPatrolHistory: ['순찰이력', '로봇의 이동 경로 및 순찰 기록을 확인합니다.'],
  robotAnomalyAlert: ['이상감지 알림', '로봇 또는 AI가 감지한 이상 상황을 표시합니다.'],
  facilityInfo: ['설비정보', '기존 GENi/iPOS 명칭을 유지해 설비 기본 정보와 상세 정보를 조회합니다.'],
  tmStatus: ['TM현황', '태그 또는 계측 데이터 기반 현황을 조회합니다.'],
  redTag: ['RedTAG', '위험·주의·관리 대상 태그 정보를 확인합니다.'],
  inspectionStatus: ['점검현황', '설비별 점검 상태 및 이력을 확인합니다.'],
  pendingWork: ['미결작업', '완료되지 않은 작업 또는 정비 항목을 확인합니다.'],
  materialInfo: ['자재정보', '설비 관련 자재 및 예비품 정보를 조회합니다.'],
  arMarker: ['AR 점검마커', '설비별 AR 마커 정보를 확인합니다.'],
  mobileInspection: ['모바일 현장점검', '모바일 기기 기반 점검 수행 화면으로 진입합니다.'],
  inspectionResult: ['점검결과 등록', '현장 점검 결과를 입력하고 저장합니다.'],
  inspectionHistory: ['점검이력 조회', '과거 AR 기반 점검 내역을 확인합니다.']
};

$$('.drawer-menu button').forEach(button => {
  button.addEventListener('click', () => {
    $$('.drawer-menu button').forEach(b => b.classList.remove('is-active'));
    button.classList.add('is-active');
    const data = quickContent[button.dataset.quick] || ['Quick Panel', '연계 정보를 표시합니다.'];
    quickTitle.textContent = data[0];
    quickBody.innerHTML = `<p>${data[1]}</p><table class="popup-table"><tr><th>Tag</th><td>GT-1001</td></tr><tr><th>연계</th><td>3D 모델 · 도면 · 파노라마 · GENi</td></tr></table>`;
    quickPanel.classList.add('is-open');
    quickPanel.setAttribute('aria-hidden', 'false');
  });
});
quickClose.addEventListener('click', () => {
  quickPanel.classList.remove('is-open');
  quickPanel.setAttribute('aria-hidden', 'true');
});

$$('.tree-toggle').forEach(toggle => {
  toggle.addEventListener('click', event => {
    event.preventDefault();
    event.stopPropagation();
    const item = toggle.closest('.tree-item');
    const expanded = item.classList.toggle('is-expanded');
    toggle.setAttribute('aria-expanded', String(expanded));
    const label = item.querySelector('.tree-node')?.textContent?.trim() || '하위 설비';
    toggle.setAttribute('aria-label', `${label} 하위 설비 ${expanded ? '닫기' : '열기'}`);
  });
});
$('#expandTree').addEventListener('click', () => $$('.tree-item.has-children').forEach(item => { item.classList.add('is-expanded'); item.querySelector('.tree-toggle')?.setAttribute('aria-expanded','true'); }));
$('#collapseTree').addEventListener('click', () => $$('.tree-item.has-children').forEach(item => { item.classList.remove('is-expanded'); item.querySelector('.tree-toggle')?.setAttribute('aria-expanded','false'); }));

$$('.tree-node').forEach(node => {
  node.addEventListener('click', () => {
    $$('.tree-node').forEach(n => n.classList.remove('is-selected'));
    node.classList.add('is-selected');
    $('#assetTag').textContent = node.dataset.tag;
    $('#assetName').textContent = node.dataset.title;
    $('#assetStatus').textContent = node.dataset.status;
    $('#assetStatus').className = node.dataset.status === 'Red-Tag' ? 'danger' : '';
    showAssetContext({
      title: node.dataset.title,
      tag: node.dataset.tag,
      status: node.dataset.status
    });
  });
});

$$('.asset-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    $$('.asset-tab').forEach(t => { t.classList.remove('is-active'); t.setAttribute('aria-selected','false'); });
    $$('.asset-tab-panel').forEach(panel => panel.hidden = true);
    tab.classList.add('is-active');
    tab.setAttribute('aria-selected','true');
    $('#' + tab.dataset.tab).hidden = false;
  });
});

const popupData = {
  tagPopup: ['GT-1001 Tag 상세', '<p>Tag 기준 설비 데이터, 3D 모델, 도면, 운전정보, Trend, 정비이력, 파노라마 콘텐츠를 통합 조회합니다.</p>'],
  safetyPopup: ['작업자 위치·건강 / AI 안전', '<p>BLE/GPS/스마트워치, AI CCTV, 패트롤 로봇을 통합 관제합니다.</p>'],
  trendPopup: ['Tag Trend 및 예측진단', '<p>운전값, 진동, 온도, 압력 등 Tag 기반 시계열과 예측진단 결과를 조회합니다.</p>'],
  maintenancePopup: ['GENi 정비/TM 통계', '<h3>GENi Data 연계</h3><table class="popup-table"><tr><th>TM 발행</th><td>34건</td></tr><tr><th>Red-Tag</th><td>8건</td></tr><tr><th>미결 작업오더</th><td>6건</td></tr></table>'],
  assetPopup: ['선택 설비 상세', '<h3>GT-1001</h3><p>3D 모델, 도면, 운전정보, 정비이력, 파노라마가 동일 Tag 기준으로 연결됩니다.</p>'],
  drawingPopup: ['지능형 도면', '<p>P&ID-GT-1023, DCS 판넬, 전기단선도 Tag Highlight.</p>'],
  cctvPopup: ['CCTV 연계', '<p>선택 설비 주변 CCTV, AI 영상 분석, 소방 감지 이벤트를 확인합니다.</p>'],
  operationPopup: ['OWS 운전정보', '<p>선택 설비의 OWS 운전값, 알람, Trend, 운전 이력을 조회합니다.</p>'],
  inspectionPopup: ['점검현황', '<p>현장 점검 체크리스트, 예정 점검, 미조치 항목과 조치 이력을 확인합니다.</p>'],
  pendingWorkPopup: ['미결작업', '<p>선택 설비 기준의 미완료 작업오더, 담당 부서, 예정 완료일을 확인합니다.</p>'],
  redTagPopup: ['RedTAG 현황', '<p>RedTAG 발행 내역, 격리 상태, 작업오더, 해제 승인 정보를 확인합니다.</p>'],
  panoramaPopup: ['파노라마 Point', '<p>Point 083. 현장 360 View에서 GT-1001 Tag를 호출합니다.</p>'],
  gasPedPopup: ['GasPED 성능진단', '<h3>가스터빈 성능평가/진단</h3><table class="popup-table"><tr><th>상태</th><td>정상</td></tr><tr><th>성능저하</th><td>1.2%</td></tr><tr><th>판단</th><td>대기환경 보정 후 효율 정상범위</td></tr></table>'],
  dcatPopup: ['DCAT 연소튜닝', '<h3>가스터빈 연소기 자동튜닝</h3><table class="popup-table"><tr><th>상태</th><td>주의</td></tr><tr><th>권고</th><td>연료분배비 최적화 필요</td></tr><tr><th>관련 설비</th><td>GT-COMB-014</td></tr></table>'],
  preVisionPopup: ['PreVision 상태감시', '<h3>플랜트 운전상태 모니터링</h3><table class="popup-table"><tr><th>상태</th><td>정상</td></tr><tr><th>이상징후</th><td>없음</td></tr><tr><th>감시</th><td>출력 · 효율 · 진동 · 온도 Trend</td></tr></table>'],
  arPopup: ['AR 현장점검', '<p>AR 마커 인식, 설비정보 표출, 점검 체크리스트, 이상 등록을 지원합니다.</p>'],
  alarmPopup: ['실시간 알람', '<p>AI 안전 영상 분석, Red-Tag, 유해가스, 패트롤 로봇 이벤트를 통합 표시합니다.</p>']
};

function showAssetContext(asset) {
  selectedContextAsset = asset;
  contextAssetTag.textContent = asset.tag || '-';
  contextAssetName.textContent = asset.title || '선택 설비';
  assetContextMenu.hidden = false;
  $$('.hotspot').forEach(button => {
    button.classList.toggle('is-selected', button.dataset.equipmentTag === asset.tag);
  });
}

$$('[data-equipment-title]').forEach(button => {
  button.addEventListener('click', () => {
    showAssetContext({
      title: button.dataset.equipmentTitle,
      tag: button.dataset.equipmentTag,
      status: button.dataset.equipmentStatus
    });
  });
});

$$('[data-context-popup]').forEach(button => {
  button.addEventListener('click', () => {
    const key = button.dataset.contextPopup;
    const data = popupData[key] || popupData.assetPopup;
    popupTitle.textContent = `${selectedContextAsset.title} · ${data[0]}`;
    popupBody.innerHTML = data[1];
    popup.hidden = false;
    popupDim.hidden = false;
  });
});

$$('[data-popup]').forEach(button => {
  button.addEventListener('click', () => {
    const data = popupData[button.dataset.popup] || ['상세 정보','<p>연계 정보가 없습니다.</p>'];
    popupTitle.textContent = data[0];
    popupBody.innerHTML = data[1];
    popup.hidden = false;
    popupDim.hidden = false;
  });
});
function closePopup(){ popup.hidden = true; popupDim.hidden = true; }
popupClose.addEventListener('click', closePopup);
popupDim.addEventListener('click', closePopup);
document.addEventListener('keydown', event => { if(event.key === 'Escape') closePopup(); });
