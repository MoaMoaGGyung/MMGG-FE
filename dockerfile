FROM node:lts

RUN mkdir -p /app

WORKDIR /app

COPY . /app

RUN yarn install && \
    yarn build

EXPOSE 80

CMD ["yarn", "preview", "--host"]
