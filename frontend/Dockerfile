FROM node:20

WORKDIR /app

COPY . .

RUN npm install -g npm@11.0.0

RUN yarn add axios
RUN yarn add prop-types
RUN yarn add react-router-dom
RUN yarn add bootstrap

CMD ["npm", "start"]
