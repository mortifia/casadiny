# run node
FROM node:18-alpine
# set working directory
WORKDIR /app
# copy package.json and package-lock.json
COPY package.json ./
COPY package-lock.json ./

# install dependencies
RUN npm install

EXPOSE 3000
#finish
CMD ["npm", "run", "dev"]