# Build Stage
FROM node AS build

WORKDIR /app

# Copy minimal set of files for dependency installation
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy the rest of the files
COPY . .

# Build the app
RUN yarn build

# Runtime Stage
FROM node

WORKDIR /app

# Copy built app from the build stage
COPY --from=build /app ./

# Install PM2 globally
RUN yarn global add pm2

# Expose the listening port
EXPOSE 3001

# Launch app with PM2
CMD [ "pm2-runtime", "start", "npm", "--", "start" ]
