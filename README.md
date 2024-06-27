## JSON데이터 및 유튜브 데이터를 활용한 나만의 플레이리스트 사이트 만들기

### 📑 제작 의도

- 이 사이트는 Youtube API를 통해서 나만의 플레이리스트를 만들 수 있고 검색할 수 있는 사이트 입니다.

### 🏷️ 사용한 기술 & 스택

- Python : 멜론, 지니, 빌보드, 벅스, 애플의 음원사이트에서 실시간 차트 정보를 Python을 사용하여 데이터를 JSON파일로 매일 수집
- React : 수집한 JSON파일의 데이터를 React로 웹사이트에 연동 및 scss로 전체적인 레이아웃 디자인 진행
- Vercel : 완성한 결과물을 다른 사람들도 볼 수 있게 Vercel에서 웹사이트로 링크화함

### 👍 주요 기능

- 멜론, 지니, 빌보드, 벅스, 애플의 탑100 음원 순위 정보를 확인할 수 있음
- 오른쪽 재생바를 통해 영상 재생 및 원하는 노래 리스트 작성 가능 및 한곡재생, 랜덤재생 동시적용도 가능
- 음원사이트 외 다른 사람들의 JSON파일만 있으면 해당 리스트 정보 및 노래들을 플리에 추가할 수 있음
- CREATE에서 파일 목록을 만들 수 있고, 내가 지정한 카테고리 폴더에 맞게 노래들을 추가, 삭제가 가능

### ✨사이트 프리뷰

#### [홈화면]

![image](https://github.com/kimyih/api-music/assets/163376151/2b6921b7-02a9-489c-864b-c46cd0a0a036)

-Y2k 컨셉의과 블로그 컨셉을 합친 플레이리스트를 제작해보았습니다. 

<br>


![image](https://github.com/kimyih/api-music/assets/163376151/11b05241-65fe-4ee6-9cc0-8cf23679a74d)

-왼쪽 메뉴탭에는 나만의 플레이리스트인것을 보여주기 위해 나의 사진, 이름, 메모를 지정해서 저장할 수 있습니다.   
-새로 고침해도 바뀌지 않습니다.


![image](https://github.com/kimyih/api-music/assets/163376151/dd31160a-b940-4eee-95bf-b14b09449420)

- 홈 화면은 Aside 구조로 만들었으며, 좌측은 메뉴탭이 있고 우측엔 플레이리스트가 있습니다.
- 우측 플레이리스트는 내가 재생되는 곡은 이미지가 CD가 재생되는 것 처럼 360도 돌고, 영상이 멈추면 도는것도 멈춥니다.

<br>

#### [메뉴탭]

![image](https://github.com/kimyih/api-music/assets/163376151/eae5acab-3163-4f17-bb8a-75daf6678a73)
![image](https://github.com/kimyih/api-music/assets/163376151/60d74549-d9a3-4357-8cda-33e965b30963)
![image](https://github.com/kimyih/api-music/assets/163376151/a50ff90b-d836-4068-aec3-6b00f659b02a)


- Python을 통해 멜론, 벅스, 애플, 지니, 빌보드 차트 순위 100을 크롤링 
- 각 사이트별 리스트를 누르면 하단에 관련 유튜브 검색 결과가 나올 수 있도록 기능 구현

  

#### [마이뮤직 리스트]

![image](https://github.com/kimyih/api-music/assets/163376151/7936874d-97ad-4e2a-925c-91e4e564bebe)


- My music 메뉴에는 상단 Select를 통해 JSON파일로 저장된 폴더들을 한번에 확인할 수 있고, 해당 폴더를 누르면 그 안에 있는 데이터가 오른쪽 플레이리스트에 자동으로 전송되며 리스트가 바뀌도록 기능 구현

### 🛠️ 필요한 라이브러리 설치 순서

````bash
- react 설치 `npx create-react-app 폴더이름` : 폴더를 생략하고 싶으면 app . 으로 설치
- react-router-dom 설치 `npm install react-router-dom` : 주소 설정을 위한 라이브러리
- axios 설치 `npm install axios` : API라이브러리
- react icon 설치 `npm install react-icons` : 리액트에 필요한 아이콘
- react-player 설치 `npm install react-player` : 유튜브 영상 재생
- sass 설치 `npm install sass` : CSS 라이브러리
- react-helmet-async 설치 `npm install react-helmet-async` : SEO
- swiper 설치 `npm install swiper` : 이미지 슬라이드
````

- 필요한 라이브러리 한번에 설치할 때

```bash
npm install react-router-dom, axios, react-icons, react-player, sass, react-helmet-async, swiper
npm i react-spinners
npm i react-datepicker
npm i react-toastify
npm i react-modal
```

- src폴더에 폴더 추가 생성

```bash
- assets
- components
- context
- hook
- pages
- utils
````

- 작업 순서

```bash
1. Node.js 설치
   노드 다운로드 페이지(https://nodejs.org/en/download)에서 버전 20을 다운로드 받습니다.  
   설치가 완료되면 터미널에서 node -v를 입력하여 버전을 확인합니다.

2. 프로젝트 폴더 설정
   깃허브에서 youtube-api라는 이름의 새로운 폴더를 생성합니다.  
   이 폴더를 열어서 작업을 진행합니다.

3. 불필요한 파일 제거 및 셋팅
   새로 생성한 youtube-api 폴더 내에는 필요 없는 파일들을 삭제하고, 프로젝트에 필요한 설정을 해줍니다.

4. App.js
   내용 삭제 후 rafce로 입력하기

5. index.js

- assets폴더에 파일 가져온 후 import './assets/scss/style.scss'; 추가하여 스타일 적용시키기

6. App.js 설정 (자동완성 이용하기)

- `<BrowserRouter>, <Suspense>, <Routes>, <Route>`

7. 각 페이지마다 메타 태그 설정

- Main.jsx파일에 `<HelmetProvider>` 태그 및 `<Helmet>` 태그 설정
- pages의 파일에 `<Helmet>` 태그 내용 적용시키기
````

### ⚡ 트러블 슈팅

1. npx create-react-app . 실행 후 에러 발생 시
   -> 만약 경로 설정 관련 에러가 발생한다면, 해당 경로에 들어가 폴더에 npm 초기화 폴더를 만들어준 후 다시 npx create-react-app .을 입력하고 'y'를 눌러줍니다.

2. 다른 사람의 소스를 가져올 경우
   -> 새로운 임의의 파일을 하나 만든 후 git clone 해주기
   -> 노드 모듈은 없기 때문에 해당 cd를 통해 해당 폴더에 들어간 후
   -> `npm i`로 인스톨 해주기
   -> 그래도 안된다면 버전이 맞는지 확인(버전이 다를 경우 충돌)
