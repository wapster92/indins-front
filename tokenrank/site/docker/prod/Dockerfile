FROM node:14.16.1

ARG PGID
ARG PUID

# Create prodcution directory
WORKDIR /var/www/prod

# Copy admin dirrectory
COPY ./ /var/www/prod

# Install yarn and yarn build & install
RUN npm install -g yarn -f --silent
RUN yarn install
RUN yarn build

# Configure user
RUN groupmod -o -g ${PGID} www-data && \
    usermod -o -u ${PUID} -g www-data www-data

EXPOSE 5000

# Set up Nuxt.js environment
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=5000

CMD ["yarn", "docker"]
