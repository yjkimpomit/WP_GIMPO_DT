# 김포열병합 디지털트윈 플랫폼 UI v21

## 버전 키워드

- `v21-dark-base`
- `v20-markup`
- `v16-dark-style`
- `rollback-menu-ia-before-gimpo-dt-definition`
- `rollback-before-safety-external-icons`
- `rollback-before-click-only-drawer`
- `rollback-before-hidden-closed-scrollbar`
- `rollback-before-hidden-drawer-scrollbar-all-states`
- `rollback-before-closed-drawer-alignment`
- `rollback-before-subgroup-flyout`

## 수정 반영

- v20 라이트모드의 마크업과 인터랙션 구조 유지
- v16 다크모드의 블루/글래스/고대비 스타일을 v20 클래스 구조에 맞게 재매핑
- 기존 v20은 유지하고 `gimpo-digitaltwin-main-ui-v21` 폴더로 버전 분리
- `gimpo_dt_menu_group_definition.md` 기준 좌측 메뉴 IA 및 3D 설비 선택 바로가기 반영
- 메뉴 IA 반영 전 상태는 `../gimpo-digitaltwin-main-ui-v21-rollback-before-menu-ia`에 보관
- 안전 메뉴를 단일 그룹으로 묶고 `두케어`/`표준복합`을 서브그룹으로 표시
- 안전 하위 메뉴의 외부 연결창 성격을 `↗` 아이콘으로 표시
- 안전 메뉴 외부 연결 아이콘 반영 전 상태는 `../gimpo-digitaltwin-main-ui-v21-rollback-before-safety-external-icons`에 보관
- 서랍 메뉴는 상단 메뉴 아이콘 클릭으로만 열리고, 닫힌 상태 hover는 좁은 메뉴 스크롤만 허용
- 클릭 전용 서랍 동작 반영 전 상태는 `../gimpo-digitaltwin-main-ui-v21-rollback-before-click-only-drawer`에 보관
- 닫힌 좁은 서랍의 스크롤 기능은 유지하되 스크롤바는 숨김 처리
- 닫힌 서랍 스크롤바 숨김 전 상태는 `../gimpo-digitaltwin-main-ui-v21-rollback-before-hidden-closed-scrollbar`에 보관
- 서랍 스크롤바가 메뉴를 가리지 않도록 열림/닫힘 전체 상태에서 스크롤바 숨김 처리
- 전체 서랍 스크롤바 숨김 전 상태는 `../gimpo-digitaltwin-main-ui-v21-rollback-before-hidden-drawer-scrollbar-all-states`에 보관
- 닫힌 서랍 상태에서 헤더 숨김, 메뉴 버튼 중앙 정렬, drawer-menu 패딩 0 적용
- 닫힌 서랍 정렬 보정 전 상태는 `../gimpo-digitaltwin-main-ui-v21-rollback-before-closed-drawer-alignment`에 보관
- 닫힌 서랍 상태에서 `두케어`/`표준복합` 서브그룹만 보이고 hover 시 우측 플로팅 하위메뉴 표시
- 서브그룹 플로팅 하위메뉴 반영 전 상태는 `../gimpo-digitaltwin-main-ui-v21-rollback-before-subgroup-flyout`에 보관
