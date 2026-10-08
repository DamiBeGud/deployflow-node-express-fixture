FROM node:20-bookworm-slim
WORKDIR /app
COPY package.json package-lock.json ./
RUN ["npm", "ci"]
COPY . .
USER node
EXPOSE 4587
CMD ["npm", "start"]
