FROM node:latest

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/

# Bundle app source
COPY . /usr/src/app

CMD [ "npm", "start" ]

RUN wget https://get.docker.io/builds/Linux/x86_64/docker-latest -O /bin/docker
RUN chmod +x /bin/docker

# Add the docker group if it doesn't already exist.
RUN groupadd docker
 
# Add the connected user "${USERNAME}" to the docker group.
RUN gpasswd -a ${USERNAME} docker
 
# Restart the docker daemon.
RUN service docker restart
