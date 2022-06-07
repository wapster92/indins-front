FROM node:14.16.1

ARG PROJECT_NAME
ARG PGID
ARG PUID

WORKDIR /var/www/${PROJECT_NAME}

# Install yarn
RUN npm install -g yarn -f --silent

# Configure non-root user
RUN groupadd -g ${PGID} -o ${PROJECT_NAME} && \
    useradd -m -u ${PUID} -g ${PGID} -o -d /home/${PROJECT_NAME} -s /sbin/nologin -c "Docker image user is" ${PROJECT_NAME}

RUN chown -R ${PROJECT_NAME}:${PROJECT_NAME} /var/www/${PROJECT_NAME} && \
    chown -R ${PROJECT_NAME}:${PROJECT_NAME} /home/${PROJECT_NAME}

USER ${PROJECT_NAME}

EXPOSE 5000

# Set up Nuxt.js environment
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=5000

CMD ["yarn", "docker-dev"]
