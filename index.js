const express = require('express');
const app = express();

const morgan = require('morgan');


app.use(morgan('common'));

app.get('/', (req, res) => {
  res.send('Welcome to the index.html page of my myFlix page!!');
});

app.get('/movies', (req, res) => {
  res.json(top10movies);
});

app.use(express.static('public'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// listen for requests
app.listen(8080, () => {
  console.log('App running on port 8080.');
});
