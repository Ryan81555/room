# Node.js 공식 이미지 사용
FROM node:18

# 작업 디렉토리 생성 및 이동
WORKDIR /app/server

# package.json, package-lock.json 복사
COPY server/package*.json ./

# 의존성 설치
RUN npm install

# 서버 코드 복사
COPY server/. .

# 루트의 images, sound 폴더도 컨테이너에 복사
WORKDIR /app
COPY images ./images
COPY sound ./sound

# (선택) 3001 포트 오픈 (서버 포트에 맞게 수정)
EXPOSE 3001

# 서버 실행 (index.js 기준)
CMD ["node", "index.js"]