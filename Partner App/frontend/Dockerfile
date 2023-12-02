FROM node:14 AS builder
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html

RUN echo $'server {\n\
    listen       80;\n\
    server_name  localhost;\n\
    location / {\n\
        root   /usr/share/nginx/html;\n\
        index  index.html index.htm;\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
    error_page   500 502 503 504  /50x.html;\n\
    location = /50x.html {\n\
        root   /usr/share/nginx/html;\n\
    }\n\
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]