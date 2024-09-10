const express = require('express');
const pool = require('./src/config/connection');
const sequelize = require('./src/config/connection'); // Include sequelize
const User = require('./src/models/user'); // Include User model
const authRoutes = require('./src/routes/user');
const cors = require('cors')


const app = express();
const port = 3000;

app.use(express.json());
app.use(cors())

// Define routes
const router = require("./src/routes/routes");

app.use("/api", router);

// const db = require("./src/models");
// db.sequelize.sync({
//   alter: true,
//   force: false,
// })
//   .then(() => {
//     console.log("Synced db.");
//   })
//   .catch((err) => {
//     console.log("Failed to sync db: " + err.message);
//   });

app.get('/', (req, res) => {
  res.send('<h2>SoundFair app server</h2>');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

