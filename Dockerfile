FROM node:12.2.0-alpine
WORKDIR app
COPY . .
RUN npm install && npm install -g react-scripts
EXPOSE 3000
CMD ["sh", "-c", "CI=false ESLINT_NO_DEV_ERRORS=true react-scripts start"]