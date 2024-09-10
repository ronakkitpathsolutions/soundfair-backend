// src/config/sequelize.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    dialectModule: require('mysql2'),
    port: process.env.DB_PORT,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000, // Time in ms Sequelize will try to get connection before throwing error
      idle: 10000 // Time in ms to release the connection if idle
    }

  }
);

// Test the database connection
sequelize.authenticate()
  .then(() => {
    console.log('Database Connection Successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
