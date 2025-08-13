# 다단계 빌드를 사용하여 최적화된 이미지 생성

# 빌드 스테이지
FROM node:18-alpine AS build-stage

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 yarn.lock 복사 (캐시 최적화)
COPY package.json yarn.lock ./

# 의존성 설치 (개발 의존성 포함 - 빌드에 필요)
RUN yarn install --frozen-lockfile && yarn cache clean

# 소스 코드 복사
COPY . .

# Vue.js 애플리케이션 빌드
RUN yarn build

# 프로덕션 스테이지
FROM nginx:stable-alpine AS production-stage

# Nginx 설정 파일 복사
COPY nginx.conf /etc/nginx/nginx.conf

# 빌드된 파일을 Nginx 정적 파일 디렉토리로 복사
COPY --from=build-stage /app/dist /usr/share/nginx/html

# 8080 포트 노출
EXPOSE 8080

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]
