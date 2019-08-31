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

<img width="1440" alt="Screenshot 2019-08-31 19 40 59" src="https://user-images.githubusercontent.com/4256471/64069775-4b433f80-cc27-11e9-8e5e-1f3915318ea3.png">
