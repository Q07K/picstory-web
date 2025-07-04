# Picstory Web Docker 배포 가이드

이 문서는 Picstory Web 애플리케이션을 Docker를 사용하여 배포하는 방법을 설명합니다.

## 파일 구조

- `Dockerfile`: 프로덕션용 다단계 빌드 Dockerfile
- `Dockerfile.dev`: 개발용 Dockerfile
- `nginx.conf`: Nginx 웹 서버 설정
- `docker-compose.yml`: Docker Compose 설정
- `.dockerignore`: Docker 빌드에서 제외할 파일 목록

## 빠른 시작

### 1. 프로덕션 배포

```bash
# Docker 이미지 빌드
docker build -t picstory-web .

# 컨테이너 실행
docker run -d -p 80:80 --name picstory-web picstory-web
```

### 2. Docker Compose 사용

```bash
# 프로덕션 환경
docker-compose up -d

# 개발 환경
docker-compose --profile dev up -d
```

## 상세 사용법

### 프로덕션 배포

1. **이미지 빌드**

   ```bash
   docker build -t picstory-web:latest .
   ```

2. **컨테이너 실행**

   ```bash
   docker run -d \
     -p 80:80 \
     --name picstory-web \
     --restart unless-stopped \
     picstory-web:latest
   ```

3. **애플리케이션 접속**
   - 브라우저에서 `http://localhost`로 접속

### 개발 환경

1. **개발용 이미지 빌드**

   ```bash
   docker build -f Dockerfile.dev -t picstory-web:dev .
   ```

2. **개발 서버 실행**

   ```bash
   docker run -d \
     -p 8080:8080 \
     -v ${PWD}:/app \
     -v /app/node_modules \
     --name picstory-web-dev \
     picstory-web:dev
   ```

3. **개발 서버 접속**
   - 브라우저에서 `http://localhost:8080`로 접속

### Docker Compose 명령어

```bash
# 서비스 시작
docker-compose up -d

# 서비스 중지
docker-compose down

# 로그 확인
docker-compose logs -f

# 개발 환경 시작
docker-compose --profile dev up -d

# 서비스 재빌드
docker-compose up -d --build
```

## 설정 커스터마이징

### Nginx 설정 수정

`nginx.conf` 파일을 수정하여 다음을 변경할 수 있습니다:

- 포트 설정
- 캐싱 정책
- 보안 헤더
- API 프록시 설정

### 환경 변수

필요한 경우 환경 변수를 설정할 수 있습니다:

```bash
docker run -d \
  -p 80:80 \
  -e NODE_ENV=production \
  -e API_URL=https://api.example.com \
  --name picstory-web \
  picstory-web:latest
```

## 트러블슈팅

### 포트 충돌 해결

다른 포트를 사용하려면:

```bash
docker run -d -p 8080:80 --name picstory-web picstory-web
```

### 컨테이너 로그 확인

```bash
docker logs picstory-web
```

### 컨테이너 내부 접속

```bash
docker exec -it picstory-web sh
```

## 성능 최적화

1. **다단계 빌드**: 최종 이미지 크기 최소화
2. **Nginx 최적화**: Gzip 압축, 캐싱 설정
3. **도커 레이어 캐싱**: package.json 먼저 복사하여 의존성 캐시 활용

## 보안 고려사항

- 정기적인 베이스 이미지 업데이트
- 불필요한 파일 `.dockerignore`로 제외
- 보안 헤더 설정 (nginx.conf)
- 최소 권한 원칙 적용
