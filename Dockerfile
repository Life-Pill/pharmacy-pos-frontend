FROM node:19-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
ENV PORT 3000
CMD ["npm","run","electron:start"]
