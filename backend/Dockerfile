FROM node:24-alpine3.22
ENV NODE_ENV=production

WORKDIR /app
COPY . .

RUN npm ci

# 安裝 netcat 用於檢查資料庫連接
RUN apk add --no-cache netcat-openbsd

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["node", "./bin/www.js"]