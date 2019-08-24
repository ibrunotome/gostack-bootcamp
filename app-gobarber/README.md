# GoBarber

## How to run

### Backend

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

### Frontend

- `yarn start`

### Mobile

- iOS: `react-native run-ios`
- Android: `react-native run-android`

## Screens

<img width="100%" alt="Screenshot 2019-08-24 09 15 16" src="https://user-images.githubusercontent.com/4256471/63637188-17c54b80-c650-11e9-98f0-896a6503c2fc.png">

<img width="100%" alt="Screenshot 2019-08-24 09 17 12" src="https://user-images.githubusercontent.com/4256471/63637181-109e3d80-c650-11e9-941e-a984ecde4865.png">

<img width="100%" alt="Screenshot 2019-08-24 09 15 49" src="https://user-images.githubusercontent.com/4256471/63637182-12680100-c650-11e9-8348-b0572bbf9df9.png">

<img width="33%" alt="Screenshot 2019-08-24 09 15 02" src="https://user-images.githubusercontent.com/4256471/63637249-d84b2f00-c650-11e9-87c0-a0be76aa8ab7.png"> <img width="33%" alt="Screenshot 2019-08-24 09 17 32" src="https://user-images.githubusercontent.com/4256471/63637251-dc774c80-c650-11e9-897f-81380cd8d08b.png"> <img width="33%" alt="Screen Shot 2019-08-24 at 09 23 56" src="https://user-images.githubusercontent.com/4256471/63637254-e731e180-c650-11e9-80c2-e82dbf86697f.png">
