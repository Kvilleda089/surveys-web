FROM node:10.13.0

RUN mkdir -p /app

WORKDIR /app

COPY package*.json ./app

RUN npm install --legacy-peer-deps
RUN npm install -g nodemon

COPY . /app

EXPOSE 4200

CMD ["nodemon", "--watch", "src", "--exec", "ng", "serve", "--host", "0.0.0.0"]
