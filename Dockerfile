FROM node:18-alpine

RUN npm install typescript tsc-alias -g

RUN mkdir -p /app
WORKDIR /app
ADD . ./

RUN : && npm ci && npm cache clean --force && npm run build :

RUN cp -R /app/src/assets /app/dist/assets
ENV HOST=0.0.0.0
ENV PORT=$PORT

EXPOSE $PORT

ENTRYPOINT ["node", "dist/index.js"]
  
HEALTHCHECK --interval=15s --timeout=2s --start-period=30s \  
CMD node dist/healthcheck.js