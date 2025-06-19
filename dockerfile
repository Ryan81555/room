FROM node:18

# 작업 디렉토리 설정
WORKDIR /app/server

# package.json, package-lock.json 복사
COPY server/package*.json ./

# 의존성 설치
RUN npm install

# 서버 코드 복사
COPY server/. .

# 루트로 이동
WORKDIR /app

# images, sound 폴더도 컨테이너에 복사
COPY images ./images
COPY sound ./sound

# 8080 포트 오픈
EXPOSE 8080

# 서버 실행 (index.js 기준)
CMD ["node", "server/index.js"]