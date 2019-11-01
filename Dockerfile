FROM node:latest
COPY ./build /home/node/app
WORKDIR /home/node/app
# RUN npm start
EXPOSE 80