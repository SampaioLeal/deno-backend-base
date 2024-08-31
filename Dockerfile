FROM denoland/deno:1.46.2

WORKDIR /app

COPY . .

RUN deno cache main.ts

CMD [ "deno", "task", "start" ]