const express = require('express');
const mongodb = require('mongodb');
const path = require('path');

const MongoClient = mongodb.MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'restaurant';
const collectionName = 'users';

const app = express();

let db;

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
  } else {
    console.log('Connected to MongoDB');
    db = client.db(dbName);
  }
});

app.use(express.json());

app.use(express.static(path.join(__dirname, 'build')));

app.post('/login', (req, res, next) => {
  const { password, cuisine, location, image, username } = req.body;

  const user = {
    password,
    cuisine,
    location,
    image,
    username,
  };

  db.collection(collectionName).insertOne(user, (err) => {
    if (err) {
      console.error('Error saving user to database:', err);
      res.status(500).send('Error saving user to database');
    } else {
      res.status(200).send('User saved successfully');
    }
  });
});

app.get('/data', (req, res) => {
  db.collection(collectionName)
    .find({}, { projection: { cuisine: 1, location: 1, username: 1, _id: 0 } })
    .toArray((err, results) => {
      if (err) {
        console.error('Error fetching data from the database:', err);
        res.status(500).send('Error fetching data from the database');
      } else {
        res.json(results);
      }
    });
});

app.delete('/delete', (req, res) => {
  const { cuisine, location, image, username } = req.body;

  const conditions = {};

  if (cuisine) {
    conditions.cuisine = cuisine;
  }
  if (location) {
    conditions.location = location;
  }
  if (image) {
    conditions.image = image;
  }
  if (username) {
    conditions.username = username;
  }

  if (Object.keys(conditions).length === 0) {
    res.status(400).send('No conditions provided');
    return;
  }

  db.collection(collectionName).deleteMany(conditions, (err, result) => {
    if (err) {
      console.error('Error deleting user:', err);
      res.status(500).send('Error deleting user');
    } else {
      console.log('User deleted successfully');
      res.sendStatus(200);
    }
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
