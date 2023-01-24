<h1 align="center">
  <img src="images/habits.gif"/> 
</h1>
<h1 align="center" widht="50%">
  <img alt="TypeScript" width="7%" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/typescript/typescript.png" />
  <img alt="React" width="7%" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/react/react.png" />
  <img alt="NodeJS" width="7%" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" />
</h1>

## ⚡️ The Project
  Habits tracker full-Stack app developed during the NLW Event by RocketSeat using React, React-Native and NodeJS.
  
  
## 🎯 Features
 - Habits creation and tracking
 - Animations
 - API Connections
  
## 🖥️ Used Tecnologies
 - [ReactJS](https://reactjs.org/)
 - [React-Native](https://reactnative.dev/)
 - [NodeJS](https://nodejs.org/en/)
 - [Fastify](https://www.fastify.io/)
 - [Expo](https://expo.dev/)

## ⚙️ Dependencies
 - [NodeJS](https://nodejs.org/en/)
 
## 🚀️ Getting Started

1. Clone this repository: 

```bash
git clone https://github.com/avnerjose/reactjs-react-native-nodejs-habits.git && cd reactjs-react-native-nodejs-habits
```
2. Install all dependencies

- Backend
```bash
cd server && npm i
```
- Frontend
```bash
cd web && npm i
```
- Mobile
```bash
cd mobile && npm i
```

3. Start the application

- Backend

```bash
cd server #Selecting backend folder
```
```bash
npx prisma migrate dev #Migrating database
```
```bash
npx prisma db seed #Seeding database
```
```bash
npm run dev #Run backend
```
Obs: Make requests to [localhost:3333](http://localhost:3333) to test it

- Frontend
  
```bash 
cd web #Selecting frontend folder
```
```bash
npm run dev #Run frontend
```
Obs: Make requests to [localhost:5173](http://localhost:5173) to test it


- Mobile 


```bash
npx expo start 
```
Obs: Run an Mobile Emulator with AndroidStudio or install the Expo app on your phone to test it.