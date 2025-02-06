# 📑 프로젝트 소개

모닥모닥은 "모으다"라는 의미를 담은 방언에서 영감을 받아 탄생한 프라이빗 모임 관리 및 추억 공유 플랫폼입니다. <span style="background-color: #ffdce0; color: black;">공개적인 SNS의 피로감에서 벗어나, 우리만의 소중한 공간에서 모임을 기록하고 추억을 나눌 수는 없을까?</span> 라는 질문에서 시작되었습니다.
모닥모닥은 친구, 가족, 동료 등 소중한 사람들과의 특별한 순간을 간직하고 공유할 수 있는 따뜻한 공간을 제공합니다.

- 우리만의 공간: 초대된 멤버만 참여할 수 있는 프라이빗한 공간을 만들어보세요.

- 추억 기록: 사진, 메모, 날짜 등 모임의 소중한 순간을 간편하게 기록하고 저장할 수 있습니다.

- 추억 공유: 함께한 사람들과만 추억을 나누며, 오랜 시간이 지나도 다시 돌아볼 수 있는 공간을 제공합니다.

![1 신규서비스_표지_1](https://github.com/user-attachments/assets/6397d4d4-6edf-4b69-ba64-44755f4eecd6)

<br>

# 👨‍👩‍👧‍👦 Our Team

| 박상기                                               | 박산하                                                   | 김민후                                | 박은영                                   | 원윤선                                     |
| ---------------------------------------------------- | -------------------------------------------------------- | ------------------------------------- | ---------------------------------------- | ------------------------------------------ |
| [@adorable-otter](https://github.com/adorable-otter) | [@heftyCornerstone](https://github.com/heftyCornerstone) | [@minhoo](https://github.com/Kminhoo) | [@euncloud](https://github.com/euncloud) | [@WonYunSun](https://github.com/WonYunSun) |
| 팀장                                                 | 부팀장                                                   | 팀원                                  | 팀원                                     | 팀원                                       |

<br>

## 🚧 시스템 아키텍쳐

![Image](https://github.com/user-attachments/assets/a04f3b1c-7bb1-4452-858d-289f1d2e2e14)

## 🕹️ 프로젝트 기능

### 1. **페이지 구성**

- **채팅페이지 (`/chat`)** : CSR 렌더링 방식, 채팅방 리스트 업데이트, 채팅 메세지 읽음 처리기능
- **채팅 상세 페이지 (`/chat/[id]`)** : CSR 렌더링 방식, 채팅 내용 실시간 업데이트, 읽음 처리, AI요약 기능

### 2. **상세 기능**

#### 인증 및 프로필 관리

- 사용자 회원가입(이메일/비밀번호)
- Google OAuth 로그인
- 사용자 프로필 관리

#### 홈페이지 및 뮤지컬 리스트

- Swiper 기반의 슬라이드 캐러셀 기능
- 섹션별 뮤지컬 컨텐츠 분류
- Tanstack Query를 활용한 데이터 페칭
- useInfiniteQuery 훅을 사용하여 무한스크롤 구현

#### 뮤지컬 디테일 페이지

- 뮤지컬 상세 정보 확인 기능
- 상세 뮤지컬에 대한 CRUD 기능
- 뮤지컬 후기 페이지네이션

#### 공연장 리스트 페이지

- MOCK_DATA를 활용한 공연장 데이터 표시
- 공연장 리스트 페이지네이션
- 공연장 검색 기능

#### 💬 채팅

- **Supabase Realtime**을 활용한 실시간 채팅 기능 제공
- **OpenAI API**를 활용한 **대화 요약 AI 기능** 지원
- **Browser WebSocket API**를 사용해 양방향 데이터 통신 구현
- **Supabase 메시지 구독**을 통해 읽음 처리 기능 추가

<br>

## 📱 기능 구현 영상

|                                    로그인 및 로그아웃                                     |                                         모임 생성                                         |                                         모임 삭제                                         |                                        게시글 작성                                        |
| :---------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------: |
| ![Image](https://github.com/user-attachments/assets/31a50791-579e-4f99-9bba-7584f5555947) | ![Image](https://github.com/user-attachments/assets/d63184c3-4179-4443-b380-935086fb7163) | ![Image](https://github.com/user-attachments/assets/3dcf61c8-cc13-457e-b1b4-4a806c227e1a) | ![Image](https://github.com/user-attachments/assets/5e319835-4f51-47e3-a663-684ed91ad79d) |

|                                        게시글 수정                                        |                                         일정 생성                                         |                                           알림                                            |                                      채팅 및 AI요약                                       |
| :---------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------: |
| ![Image](https://github.com/user-attachments/assets/3d60bc75-8200-43f9-9ae0-75df6e3d548a) | ![Image](https://github.com/user-attachments/assets/aab09072-7ab2-4f72-8d0e-a822391da413) | ![Image](https://github.com/user-attachments/assets/9ffefc4e-bf4c-48ec-88db-f262f3ae311b) | ![Image](https://github.com/user-attachments/assets/89a45cd3-a9ba-4c9d-8924-7fbcd282d816) |

|                                        마이 페이지                                        |                                        모임방 참여                                        |                                         멤버 관리                                         |                                         댓글 CRUD                                         |
| :---------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------: |
| ![Image](https://github.com/user-attachments/assets/07505ebc-aebc-4898-8f75-c9837e430f95) | ![Image](https://github.com/user-attachments/assets/f5bd45d8-289f-489f-995f-0015543f3b19) | ![Image](https://github.com/user-attachments/assets/0d6ddeed-7d5c-4ee4-9eeb-b47f83971e6b) | ![Image](https://github.com/user-attachments/assets/69b868e1-d221-4cea-a708-7073c3e139e7) |

<br>

## ⚙️ 기술 스택

### **프레임워크 및 라이브러리 코어**

- Next.js
- React
- TypeScript

### **상태 관리 및 데이터 페칭**

- Tanstack Query
- supabase
- zustand

### **UI/UX**

- Tailwind css
- Swiper
- React Modal Sheet
- React intersection obsever
- React Day Picker
- React Dropzone
- motion

### **유틸리티 및 기타 개발 도구**

- day.js
- eslint
- prettier

### **기타 도구 및 설정**

- ESLint 및 Prettier로 코드 스타일 관리
- vercel을 통한 배포
- sentry를 통한 에러 추적 및 모니터링

<br>

# 🌳 프로젝트 구조

```bash
📦src
 ┣ 📂app
 ┃ ┣ 📂api
 ┃ ┃ ┣ 📂auth
 ┃ ┃ ┗ 📂post
 ┃ ┣ 📂chat
 ┃ ┃ ┣ 📂[id]
 ┃ ┃ ┗ 📂_components
 ┃ ┣ 📂fonts
 ┃ ┣ 📂groups
 ┃ ┃ ┣ 📂new
 ┃ ┃ ┃ ┗ 📂_components
 ┃ ┃ ┃   ┗ 📂stepComponents
 ┃ ┃ ┗ 📂[id]
 ┃ ┃   ┣ 📂management
 ┃ ┃   ┃ ┣ 📂members
 ┃ ┃   ┃ ┃ ┗ 📂_components
 ┃ ┃   ┃ ┗ 📂_components
 ┃ ┃   ┣ 📂posts
 ┃ ┃   ┃ ┣ 📂new
 ┃ ┃   ┃ ┃ ┗ 📂_components
 ┃ ┃   ┃ ┗ 📂[postId]
 ┃ ┃   ┃   ┗ 📂edit
 ┃ ┃   ┃     ┗ 📂_components
 ┃ ┃   ┣ 📂schedules
 ┃ ┃   ┃ ┣ 📂new
 ┃ ┃   ┃ ┣ 📂[scheduleid]
 ┃ ┃   ┃ ┗ 📂_components
 ┃ ┃   ┗ 📂_components
 ┃ ┣ 📂join
 ┃ ┃ ┗ 📂[id]
 ┃ ┃   ┗ 📂_components
 ┃ ┣ 📂login
 ┃ ┃ ┗ 📂_components
 ┃ ┣ 📂mypage
 ┃ ┃ ┗ 📂_components
 ┃ ┣ 📂notifications
 ┃ ┃ ┗ 📂_components
 ┃ ┣ 📂signup
 ┃ ┃ ┣ 📂success
 ┃ ┃ ┃ ┗ 📂_components
 ┃ ┃ ┗ 📂_components
 ┃ ┗ 📂_components
 ┣ 📂components
 ┃ ┣ 📂common
 ┃ ┣ 📂icons
 ┃ ┗ 📂providers
 ┣ 📂hooks
 ┃ ┣ 📂chat
 ┃ ┣ 📂comment
 ┃ ┣ 📂common
 ┃ ┣ 📂home
 ┃ ┣ 📂join
 ┃ ┣ 📂management
 ┃ ┣ 📂notifications
 ┃ ┣ 📂photo
 ┃ ┣ 📂post
 ┃ ┣ 📂schedule
 ┃ ┗ 📂user
 ┣ 📂lib
 ┃ ┗ 📂join
 ┣ 📂queries
 ┃ ┣ 📂chat
 ┃ ┣ 📂group
 ┃ ┃ ┗ 📂comments
 ┃ ┣ 📂home
 ┃ ┣ 📂join
 ┃ ┣ 📂management
 ┃ ┣ 📂notifications
 ┃ ┣ 📂photo
 ┃ ┣ 📂post
 ┃ ┣ 📂schedule
 ┃ ┗ 📂users
 ┣ 📂stores
 ┣ 📂types
 ┗ 📂utils
   ┗ 📂supabase
```

<br>

## 🛠️ 설치 및 실행

### **로컬에서 실행**

1. **프로젝트 클론**

   ```bash
   git clone https://github.com/adorable-otter/modak-modak.git
   cd modak-modak
   ```

2. **패키지 설치**

   ```bash
   yarn or yarn install
   ```

3. **개발 서버 실행**

   ```bash
   yarn dev
   ```

   브라우저에서 `http://localhost:3000`에 접속하여 확인.

4. **빌드 및 프로덕션 실행**
   ```bash
   yarn s
   ```

---
