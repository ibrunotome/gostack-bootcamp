# GoBarber backend

## How to run

```
docker run --name postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
docker run --name mongobarber -p 27017:27017 -d -t mongo
docker run --name redisbarber -p 6379:6379 -d -t redis:alpine
```

`cp .env.example .env` and set the correct variables

Install the dependencies and run the database migrations

`yarn && yarn sequelize db:migrate`

Then run the server and queue

- Server: `yarn dev`
- Queue: `yarn queue`
