FROM node:carbon-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY dist/.entrypoint .
COPY dist/server.js .

RUN source .entrypoint
RUN npm install --only=production

EXPOSE 5000
CMD ["node", "--optimize_for_size", "--max_old_space_size=920", "--gc_interval=100", "server.js"]
