FROM nginxinc/nginx-unprivileged:1.23.1-alpine

ARG version=1

RUN rm /etc/nginx/conf.d/default.conf
ADD server.nginx /etc/nginx/conf.d/app.conf.template
COPY build/${version}/ /user/share/nginx/html
ADD start-server.sh ./start-server.sh

EXPOSE 8383

# using bash over sh for betterssignal-handling
CMD sh /start-server.sh          
