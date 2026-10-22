FROM node:20-bookworm-slim
WORKDIR /app
COPY package.json package-lock.json ./
RUN ["npm", "ci"]
COPY . .
RUN ["sh", "-c", "test \"$(id -u node)\" = 1000 && test \"$(id -g node)\" = 1000"]
USER 1000:1000
EXPOSE 4587
CMD ["npm", "start"]
