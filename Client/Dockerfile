FROM node:21-bookworm as build
COPY . /app
WORKDIR /app
RUN npm install
RUN npm run build

FROM nginx:1.25-bookworm
COPY --from=build /app/cert.pem /etc/nginx/certs/ssl_certificate.crt
COPY --from=build /app/key.pem /etc/nginx/certs/ssl_certificate.key


COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf