FROM node:14.18-alpine as build

WORKDIR /usr/app

COPY package.json  .

RUN npm install

COPY . .
ENV API_URL=http://backend:3333
ENV NAME_STORAGE=@Shop
RUN npm run lint
RUN npm run prettier
RUN npm run build

CMD [ "npx", "serve", "-s", "build" ]

