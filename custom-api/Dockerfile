FROM node:14-alpine as base

WORKDIR /src
COPY package*.json /
EXPOSE 3000

FROM base as production
ENV NODE_ENV=production
RUN yarn install --frozen-lockfile
COPY . /
CMD ["node"]

FROM base as dev
ENV NODE_ENV=development
RUN yarn
COPY . /
CMD ["nodemon"]