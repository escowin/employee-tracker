const express = require("express");
const db = require("./db/connection");
const init = require('./menu');


const PORT = process.env.PORT || 3001;
const app = express();

// connecting to server
db.connect((err) => {
  if (err) throw err;
  console.log("database connected");
  app.listen(PORT, () => {
    console.log(`
    server is running on localhost:${PORT}`);
    init();
  });
});
