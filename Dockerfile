FROM node:12.2.0-alpine
WORKDIR app
COPY . .
RUN npm install
EXPOSE 3000
ENV ESLINT_NO_DEV_ERRORS=true
ENV CI=false
CMD ["npm", "run", "start"]