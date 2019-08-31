# Meetapp

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

### Frontend

- Set the api url in `src/services/api.js` if you don't wanna use http://localhost:3333
- `yarn start`

### Mobile

- Set the api url in `src/services/api.js` if you don't wanna use http://localhost:3333

- iOS: `react-native run-ios`
- Android: `react-native run-android`

## Screens

<img width="1440" alt="Screenshot 2019-08-30 14 32 16" src="https://user-images.githubusercontent.com/4256471/64043163-04c3e700-cb3a-11e9-87e1-fb6cd8176853.png">

<img width="1440" alt="Screenshot 2019-08-30 14 32 26" src="https://user-images.githubusercontent.com/4256471/64043162-04c3e700-cb3a-11e9-9a8e-4fad2f012e65.png">

<img width="1440" alt="Screenshot 2019-08-30 14 46 00" src="https://user-images.githubusercontent.com/4256471/64043161-042b5080-cb3a-11e9-9f94-51820df69e00.png">

<img width="1440" alt="Screenshot 2019-08-30 14 46 58" src="https://user-images.githubusercontent.com/4256471/64043159-042b5080-cb3a-11e9-9552-95e09a00b0e5.png">

<img width="1440" alt="Screenshot 2019-08-30 14 46 36" src="https://user-images.githubusercontent.com/4256471/64043160-042b5080-cb3a-11e9-8b93-86d9aa52c59a.png">

<img width="33%" alt="Screenshot 2019-08-30 14 49 25" src="https://user-images.githubusercontent.com/4256471/64042281-f07eea80-cb37-11e9-941d-a5ee5bfdb3d4.png"><img width="33%" alt="Screenshot 2019-08-30 14 49 41" src="https://user-images.githubusercontent.com/4256471/64042280-f07eea80-cb37-11e9-9819-e1987df59c3d.png"><img width="33%" alt="Screenshot 2019-08-30 15 02 08" src="https://user-images.githubusercontent.com/4256471/64042279-efe65400-cb37-11e9-8199-81028d782bfe.png">

<img width="33%" alt="Screenshot 2019-08-30 15 02 24" src="https://user-images.githubusercontent.com/4256471/64042278-efe65400-cb37-11e9-8b89-b4c0090c65f1.png"><img width="33%" alt="Screenshot 2019-08-30 15 05 17" src="https://user-images.githubusercontent.com/4256471/64042273-ef4dbd80-cb37-11e9-8d55-fb2d4e3f1b1d.png"><img width="33%" alt="Screenshot 2019-08-30 15 04 38" src="https://user-images.githubusercontent.com/4256471/64042277-efe65400-cb37-11e9-860c-dabca0d731d1.png">

<img width="33%" alt="Screenshot 2019-08-30 15 04 56" src="https://user-images.githubusercontent.com/4256471/64042275-efe65400-cb37-11e9-8c06-17031968022b.png"><img width="33%" alt="Screenshot 2019-08-30 15 26 52" src="https://user-images.githubusercontent.com/4256471/64043373-a21f1b00-cb3a-11e9-9bd3-cc314b84ceab.png">
