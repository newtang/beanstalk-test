const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const { Client } = require('pg')
 
console.log(process.env)

const client = new Client({
  host: process.env.RDS_HOSTNAME,
  port: process.env.RDS_PORT,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DB_NAME,
})

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/db', (req, res) => {
  client.query("SELECT * FROM kv WHERE KEY = 'foo'", [], (err, queryResult) => {
    res.send(queryResult);
  })
  
})


client.connect((err) => {
  if (err) {
    console.error('database connection error', err.stack)
  } else {
    console.log('database connected')

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    })

  }
})
