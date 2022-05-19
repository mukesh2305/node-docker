FROM node:14
WORKDIR /app
COPY package.json .
# RUN npm install

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
    then npm install ; \
    else npm install --production; \
    fi
# copy rest of filWe in the container
COPY . ./
ENV PORT 3000
EXPOSE $PORT
CMD ["node", "index.js"]


# docker build .
# docker image ls
# docker image rm <image_id>

# docker build -t node-app-image . 

# docker run -d --name node-app node-app-image
# docker ps
# sudo docker rm node-app -f (delete running contianer)

# docker run -p 3000:3000 -d --name node-app node-app-image

# ----------------------------------------------------
# docker exec -it node-app bash
# printenv (print environment variables in container shell or linux machine) 
# ----------------------------------------------------


# volumes(sync folder with container) --------------------------------
# docker run -v $(pwd):/app -p 3000:3000 -d --name node-app node-app-image

# volume to prevent node_modules to delete
# docker run -v $(pwd):/app -p 3000:3000 -v /app/node_modules -d --name node-app node-app-image

# read only volume
# docker run -v $(pwd):/app:ro -p 3000:3000 -v /app/node_modules -d --name node-app node-app-   image

# docker run -v $(pwd):/app:ro --env PORT=4000 -p 3000:4000 -v /app/node_modules -d --name node-app node-app-image

# load enviroment variables from .env file ---------------
# docker run -v $(pwd):/app -v /app/node_modules --env-file ./.env -p 3000:4000 -d --name node-app node-app-image

# delete single volume --------- when we kill docker container (this are unnecessary volumes) 
# docker volume rm "volume-name"

# delete all volumes ------------- when we kill docker container
# docker volume prune


# delete volume automatically when container is deleted
# docker volume rm -fv


# -----------------------------------------------------------------------

# docker logs----------------------------------------------------------------
# docker logs node-app