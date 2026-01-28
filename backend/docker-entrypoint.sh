#!/bin/sh

echo "等待資料庫連接..."
until nc -z $DB_HOST $DB_PORT; do
  echo "資料庫尚未就緒，等待中..."
  sleep 2
done

echo "資料庫連接成功！"

echo "正在執行 CreditPackage seeder..."
npm run seed:creditPackage

echo "Seeder 執行完成，正在啟動應用程式..."
exec "$@"