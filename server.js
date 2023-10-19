import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import register from '../controllers/register.js';
import signin from './controllers/signin.js';
import profile from './controllers/profile.js';
import image from './controllers/image.js';
import fetch from 'node-fetch';

const app = express();

const knex = require('knex')({
  client: 'pg',
  connection: {
    connectionString: process.env.DB_URL,
    ssl: { rejectUnauthorized: false },
    host: process.env.DB_HOST,
    port: 5432,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
});

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Success!');
});

app.post('/signin', (req, res) => {
  signin.handleSignin(req, res, knex, bcrypt);
});

app.post('/register', (req, res) => {
  register.handleRegister(req, res, knex, bcrypt);
});

app.get('/profile/:id', (req, res) => {
  profile.handleProfileGet(req, res, knex);
});

app.put('/image', (req, res) => {
  image.handleImage(req, res, knex);
});
app.post('/imageurl', (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT}`);
});
