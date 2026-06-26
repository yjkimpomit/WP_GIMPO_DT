# 김포열병합 디지털트윈 메인 UI v13

## 변경사항
- dashboard-layer의 grid 레이아웃 제거
- 좌/우 패널 rail을 동일 너비로 구성
- 중앙 3D 모델 가시 영역을 flex safe zone으로 확보
- 카드 높이는 콘텐츠 기준으로 유지하되, CSS 변수의 max-height를 초과하면 각 카드 body에서 내부 스크롤
- 전체 대시보드 틀에는 스크롤이 생기지 않도록 유지

## 주요 CSS 변수
```css
:root {
  --rail-width: clamp(340px, 24vw, 430px);
  --card-selected-max-h: 48vh;
  --card-maintenance-max-h: 26vh;
  --card-metrics-max-h: 132px;
  --card-links-max-h: 32vh;
  --card-alarm-max-h: 30vh;
}
```
