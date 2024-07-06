This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Prerequisites
- Node version: 20.10.0
- PM2 (Process manager)
  - Run `npm i -g pm2` to install

## Environment variables

There are 2 environment variables need to be set in the .env file

NEXT_PUBLIC_API_URL=${BACKEND_API_URL}
NEXT_PUBLIC_API_PREFIX=v1


## Deployment

In the root directory

Run:

- `npm install` to install dependencies
- `npm run build` to build
- `pm2 start npm -- start` to start production server with the process manager in the background
  - When you redeploy you can restart the existing process, run `pm2 restart ${processId}` to restart
  - You can get the process id by running `pm2 list` (it is usually 0)


## Nginx configuration

The nextjs server uses `/konfigurator` as a base path it means, you access to the frontned via `localhost:3000/configurator`. So on nginx you need to setup a proxy pass to the `/configurator` path.

Example

```nginx

location /konfigurator {
  proxy_redirect                      off;
  proxy_set_header Host               $host;
  proxy_set_header X-Real-IP          $remote_addr;
  proxy_set_header X-Forwarded-For    $proxy_add_x_forwarded_for;
  proxy_set_header X-Forwarded-Proto  $scheme;
  proxy_read_timeout          1m;
  proxy_connect_timeout       1m;
  proxy_pass http://localhost:3030;
}

```

Put this block into your nginx config.

> Note: After a redeploy you don't need to restart the nginx service


References

- PM2 https://pm2.keymetrics.io/
- Nginx proxy pass https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/
