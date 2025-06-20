# Google Cloud Run 배포용 Dockerfile (v2)
# Node.js 18 버전을 기반으로 하는 공식 이미지를 사용합니다.
FROM node:18-slim

# 컨테이너 내부에 애플리케이션 코드를 저장할 작업 디렉터리를 설정합니다.
WORKDIR /usr/src/app

# 서버의 package.json 파일을 복사하고 종속성을 설치합니다.
# package-lock.json을 함께 복사하여 일관된 버전의 패키지를 설치합니다.
COPY server/package*.json ./server/
RUN npm install --prefix server

# 애플리케이션 소스 코드 전체를 컨테이너로 복사합니다.
# 클라이언트 파일과 서버 폴더가 모두 포함됩니다.
COPY . .

# 서버 코드가 클라이언트 파일을 올바르게 찾을 수 있도록
# 컨테이너의 작업 디렉터리를 서버 폴더로 변경합니다.
WORKDIR /usr/src/app/server

# 애플리케이션이 시작될 때 실행할 명령어를 지정합니다.
CMD ["node", "index.js"] 