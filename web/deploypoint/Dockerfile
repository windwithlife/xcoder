
#FROM node:latest
FROM node:12.19.0-alpine
RUN npm config set registry http://registry.npm.taobao.org

RUN mkdir -p /runDIR/web
COPY ./ /runDIR/web 
ENV HOST 0.0.0.0
ENV PORT 8080
ENV NODE_ENV production
WORKDIR /runDIR/web
EXPOSE 8080
ENTRYPOINT ["npm","start"]
