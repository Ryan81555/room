# 1. Node.js 공식 이미지 사용 (버전은 필요에 따라 변경)
FROM node:18

# 2. 작업 디렉토리 생성 및 이동
WORKDIR /app

# 3. package.json, package-lock.json 복사
COPY package*.json ./

# 4. 의존성 설치
RUN npm install

# 5. 소스코드 전체 복사
COPY . .

# 6. (선택) 3001 포트 오픈 (서버 포트에 맞게 수정)
EXPOSE 3001

# 7. 서버 실행 (시작 파일명에 맞게 수정)
CMD ["node", "index.js"]