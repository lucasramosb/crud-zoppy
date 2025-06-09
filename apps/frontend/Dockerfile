FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build --configuration production

FROM node:20-alpine

WORKDIR /usr/share/httpd/html

RUN yarn global add http-server

COPY --from=builder /app/dist/browser/. .

EXPOSE 4200

CMD ["http-server", ".", "-p", "4200", "-c-1", "--push-state", "--no-dotfiles", "--no-clipboard"]