FROM node:21-alpine AS base
WORKDIR /usr/src/app
COPY package*.json ./

# ----------------------------------------------
# dev stage
FROM base AS dev
RUN --mount=type=cache,target=/usr/src/app/.npm \
    npm set cache /usr/src/app/.npm && \
    npm install
COPY . .
CMD ["npm", "run", "dev"]
# ----------------------------------------------

# ----------------------------------------------
# production stage
# TODO