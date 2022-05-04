const express = require('express');
const { Sequelize } = require('sequelize');

//routes
const { userRouter } = require('./routes/user.routes');

//utils
const { database } = require('./utils/database');

//init express app
const app = express();

// Enable incoming JSON data
app.use(express.json());

database
  .authenticate()
  .then(() => console.log('Database authenticated successfully'))
  .catch((err) => console.log(err));

database
  .sync()
  .then(() => console.log('Database synced'))
  .catch((err) => console.log(err));

// Spin up server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Express app running on port ${PORT}`);
});

//endpoints
app.use('/api/v1/users', userRouter);
//
