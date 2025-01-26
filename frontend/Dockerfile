FROM node:20.11-alpine

WORKDIR /frontend

COPY . /frontend/

RUN ls -al /frontend/

RUN rm -f .env
RUN ls -al /frontend/

# Check if we're in Docker and create .env with backend URL
RUN cp .env.docker .env
RUN ls -al /frontend/

RUN npm install

EXPOSE 8080

CMD [ "npm", "run", "dev" ]