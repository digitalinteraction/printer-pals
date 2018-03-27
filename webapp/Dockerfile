FROM node:alpine as builder
RUN mkdir /app
WORKDIR /app

COPY ./package.json /app/package.json
RUN npm install --unsafe-perm=true

COPY ./ /app/
RUN ls -la
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
# COPY ./default.conf /etc/nginx/conf.d/defualt.conf
