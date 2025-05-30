# Этап 1: Сборка приложения
FROM node:18 AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Этап 2: Nginx
FROM nginx:alpine

# Удалим стандартные файлы
RUN rm -rf /usr/share/nginx/html/*

# Копируем сборку из Vite (dist → html)
COPY --from=build /app/dist /usr/share/nginx/html

# Копируем конфиг nginx (если есть)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]