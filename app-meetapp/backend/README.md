## How to run

### Backend

```
docker run --name postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
docker run --name redis -p 6379:6379 -d -t redis:alpine
```

Create the database if not created yet

`cp .env.example .env` and set the correct variables, including the APP_URL if you don't wanna use http://localhost:3333

Install the dependencies and run the database migrations

`yarn && yarn sequelize db:migrate`

Then run the server and queue

- Server: `yarn dev`
- Queue: `yarn queue`
