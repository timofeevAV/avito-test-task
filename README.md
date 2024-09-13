# Запуск

Клонирование репозитория

```sh
git clone https://github.com/timofeevAV/avito-test-task.git
cd avito-test-task
```

## Обычный

Установка зависимостей

```sh
npm install
```

Запуск приложения

```sh
npm run start
```

- frontend: http://localhost:5173
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

- frontend: http://localhost
- api: http://localhost:3000

# Проблемы

Связаны только с тем, что api json-server довольно скудный, из-за чего невозможно сделать адекватный поиск по подстроке, а также получение заказов, содержащих какое-либо из объявлений.
В этих двух случаях (если происходит поиск объявлений или получение заказов по объявлению) пришлось отказаться от пагинации и получать все объявления/заказы.
