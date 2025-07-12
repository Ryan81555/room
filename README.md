# 크리스월드 빌리지 객실 요청 앱

## 📱 앱 개요
크리스월드 빌리지의 객실 요청/문의 시스템을 위한 하이브리드 모바일 앱입니다.

## ✨ 주요 기능
- 🏨 객실 요청/문의 접수
- 📊 관리자 대시보드
- 🔔 실시간 알림 시스템
- 📱 모바일 최적화 UI
- 🌐 PWA (Progressive Web App) 지원

## 🛠️ 기술 스택
- **Frontend**: HTML5, CSS3, JavaScript
- **Mobile Framework**: Capacitor
- **Backend**: Node.js
- **Database**: JSON 파일 기반
- **Platform**: Android, iOS, Web

## 📋 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. Android 개발 환경 설정
```bash
# Android Studio 설치 필요
# Android SDK 설정
# ANDROID_HOME 환경변수 설정
```

### 3. 앱 빌드
```bash
# 웹 빌드
npm run build

# Android 빌드
npx cap sync android
npx cap open android
```

### 4. 개발 서버 실행
```bash
# 웹 서버 실행
npm start

# Android 에뮬레이터에서 실행
npx cap run android
```

## 🎨 UI 개선사항

### 앱 시작 화면
- ✅ 현대적인 그라데이션 배경
- ✅ 로딩 스피너 추가
- ✅ 브랜드 컬러 적용
- ✅ 부드러운 애니메이션

### 메인 페이지
- ✅ 이모지 아이콘 추가
- ✅ 현대적인 버튼 디자인
- ✅ 그라데이션 효과
- ✅ 반응형 레이아웃
- ✅ 터치 피드백 개선

### 관리자 페이지
- ✅ 탭 기반 인터페이스
- ✅ 상태별 색상 구분
- ✅ 실시간 업데이트
- ✅ 모바일 최적화 테이블

## 🔧 설정 파일

### Capacitor 설정 (`capacitor.config.json`)
```json
{
  "appId": "com.worldvillage.roomrequest",
  "appName": "크리스월드 빌리지",
  "webDir": "www",
  "plugins": {
    "SplashScreen": {
      "launchShowDuration": 3000,
      "backgroundColor": "#4f8cff",
      "showSpinner": true,
      "spinnerColor": "#ffffff"
    },
    "StatusBar": {
      "style": "dark",
      "backgroundColor": "#4f8cff"
    }
  }
}
```

### Android 테마 설정
- Material Design 적용
- 브랜드 컬러 통일
- 다크/라이트 모드 지원
- 상태바 및 네비게이션바 커스터마이징

## 📱 앱 권한
- 인터넷 접근
- 진동 알림
- 백그라운드 실행
- 부팅 시 자동 시작

## 🚀 배포

### Android APK 빌드
```bash
# Android Studio에서
Build > Build Bundle(s) / APK(s) > Build APK(s)
```

### 웹 배포
```bash
# 정적 파일 서버에 업로드
# 또는 CDN 사용
```

## 🔄 업데이트 방법

### 코드 변경 후
```bash
npm run build
npx cap sync
npx cap open android
```

### 플러그인 추가 시
```bash
npm install @capacitor/plugin-name
npx cap sync
```

## 📞 지원
- 이메일: support@worldvillage.com
- 전화: 031-XXX-XXXX

## 📄 라이선스
이 프로젝트는 MIT 라이선스 하에 배포됩니다. 