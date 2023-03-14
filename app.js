const express = require('express');
const app = express();
const { Pool } = require('pg');
const nconf = require("nconf");


nconf
  .env()
  .file({file: ".env"});


const port = nconf.get("PORT") || 3000;


const pool = new Pool({
  host: nconf.get("RDS_HOSTNAME"),
  port: nconf.get("RDS_PORT"),
  user: nconf.get("RDS_USERNAME"),
  password: nconf.get("RDS_PASSWORD"),
  database: nconf.get("PLUMFEED_DB_NAME"),
  ssl: nconf.get("PLUMFEED_DATABASE_SSL"),
  max: nconf.get("PLUMFEED_DATABASE_MAX_CONNECTIONS"), 
  min: nconf.get("PLUMFEED_DATABASE_MIN_CONNECTIONS"), 
  idleTimeoutMillis: nconf.get("PLUMFEED_DATABASE_IDLE_TIMEOUT_MILLIS"), //close idle clients after
  application_name: nconf.get("LOGNAME"), //usually "webapp"
  fallback_application_name: "web_fallback"
})


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/db', (req, res) => {
  pool.connect((err, client, release) => {
    client.query("SELECT * FROM feeds LIMIT 2", [], (err, queryResult) => {
      if(err){
        console.error("/db err", err);
      }
      res.send(queryResult);
      release();
    })
  });
});

app.listen(port, function() {
  console.log("Beanstalk listening on port " + port);
});   
