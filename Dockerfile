# Build
FROM node:18.7.0

ARG ENVIRONMENT="dev"

RUN echo "Environment: ${ENVIRONMENT}"

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied where available (npm@5+)
COPY package*.json ./

#Use `npm ci` when running in continuous integration, or if you want to install dependencies without modifying the package-lock.json
#it is faster than regular npm i and more reliable
RUN npm ci

COPY . .

#docker build -t my_docker .  --build-arg ENVIRONMENT=prod
#transpile our ts files to js
RUN npm run build-${ENVIRONMENT} && rm -rf node_modules/ 

## Run 
FROM nginx:alpine as runtime

COPY --from=0 /usr/src/app/dist/ng-chirper-app /var/www/htdocs

COPY --from=0 /usr/src/app/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80