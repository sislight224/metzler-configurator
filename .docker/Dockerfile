FROM node:16.15.1
WORKDIR /app
ARG CI_SERVER_HOST
ARG CI_JOB_TOKEN
COPY package.json yarn.lock ./
RUN git config --global url."https://".insteadOf "git://"
RUN git config --global url."https:///gitlab-ci-token:$CI_JOB_TOKEN@$CI_SERVER_HOST/".insteadOf "git@$CI_SERVER_HOST:"
RUN yarn --network-timeout 1000000
COPY . .
RUN yarn build
CMD yarn start

