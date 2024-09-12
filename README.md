# Запуск

## Обычный

Клонирование репозитория

```sh
git clone https://github.com/timofeevAV/avito-test-task.git
cd avito-test-task
```

Установка зависимостей

```sh
npm install
```

Запуск приложения

```sh
npm run start
```

- frontend: http://localhost
- api: http://localhost:3000

## С помощью докера

Сборка образов

```sh
make build
docker-compose build
```

Запуск служб

```sh
make up
docker-compose up
```

Сборка и запуск

```sh
docker-compose up --build
```
