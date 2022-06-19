
const express = require('express'),
   bodyParser = require('body-parser'),
    //   uuid = require('uuid');
   app = express();

app.use(bodyParser.json());

let movies = [
  {
    title: 'Titanic',
    released_on: 1997,
    director: 'James Cameron',
    genre: 'Romance',
    runtime: '3h 15min'
  },
  {
    title: '1917',
    released_on: 2019,
    director: 'Sam Mendes',
    genre: 'Tragedy',
    runtime: '2h 10min'
  },
  {
    title: 'Just-Mercy',
    released_on: 2019,
    director: 'Destin Daniel Cretton',
    genre: 'Action',
    runtime: '2h 30min'
  }
];

let users = [
  {
    name: 'Jessica Drake',
    email: 'jessicadrake@email.com',
    favorites: ['movie1', 'movie2']
  },
  {
    name: 'Thomas Newman',
    email: 'thomasnewwman@email.com',
    favorites: ['movie1', 'movie2']
  },
  {
    name: 'George Mackey',
    email: 'georgemackey@email.com',
    favorites: ['movie1', 'movie2']
  }
];

let directors = [
  {
    name: 'James Cameron',
    birth_date: 1954,
    awards: ['award-1', 'award-2']
  },
  {
    name: 'Destin Daniel Cretton',
    birth_date: 1978,
    awards: ['award-1', 'award-2']
  },
  {
    name: 'Sam Mendes',
    birth_date: 1965,
    awards: ['award-1', 'award-2']
  }
];

let genres = [
  {
    name: 'Romance',
    description: ' Romance as a genre usually has a theme that explores an issue within love whether the end is happy or tragic.'
  },
  {
    name: 'Action',
    description: 'This is sample description, this is sample description'
  },
  {
    name: 'Tragedy',
    description: 'This is sample description, this is sample description'
  }

];


//default text response when at /
app.get("/",
  (req, res) => {
    res.send("Welcome to my app!");
  }
);

//Get list of data on all movies
app.get("/movies",(req, res)  => {
      res.json(movies);
    }
  );

// Gets the data about a single Movie, by title
app.get('/movies/:title', (req, res) => {
  res.json(movies.find((movie) =>
    { return movie.title === req.params.title }));
});

// Gets the data of a singel genre, by title
app.get('/genres/:name', (req, res) => {
  let genre = genres.find((genre) => { return genre.name === req.params.name});

  if (!genre){
    res.status(404).send('Genre with the name ' + req.params.name + ' was not found.');
  }
  else{
    res.status(201).send(genre.description);
  }
});

// Gets  data a director, by name
app.get('/directors/:name', (req, res) => {
  res.json(directors.find((director) =>
    { return director.name === req.params.name }));
});

// Adds data for a new user to the list of users.
app.post('/users', (req, res) => {
  let newUser = req.body;

  if (!newUser.name) {
    const message = 'Missing name in request body';
    res.status(400).send(message);
  }
  else if (!newUser.email) {
    const message = 'Missing email in request body';
    res.status(400).send(message);
  }
  else {
    //newStudent.id = uuid.v4();
    users.push(newUser);
    res.status(201).send(newUser.name+'  Registered succesfully');
  }
});

// Update the "user" info, by name
app.put('/users/:name/:email', (req, res) => {
  let user = users.find((user) => { return user.name === req.params.name });

  if (user) {
    user.email = req.params.email;
    res.status(201).send('User Email updated to '+req.params.email+' succesfully');
  }
  else {
    res.status(404).send('User with the name ' + req.params.name + ' was not found. ');
  }
});

// Adds "movie" to a list of favorites, by title
app.post('/users/:name/:title', (req, res) => {
  let user = users.find((user) =>  { return user.name === req.params.name });
  //let userFav = user.favorites;

  if (!user){
    res.send(req.params.name+' user is undefined.');
  }
  else{
    user.favorites.push(req.params.title);
    res.status(201).send(req.params.title+ ' is now added to the Favorites');
  }

});

// Remove "movie" from a list of favorites, by title
app.delete('/users/:name/:title', (req, res) => {
  let user = users.find((user) => { return user.name === req.params.name });
  let movie = req.params.title;
  //let userFav = user.favorites;

  if (movie) {
    movies = user.favorites.filter((obj) => { return obj.title !== req.params.title });
    res.status(201).send('The Movie ' + req.params.title + ' is now Removed form the Favorites list.');
  }
});

// Deletes user  email
app.delete('/users/:name', (req, res) => {
  let user = users.find((user) => { return user.name === req.params.name });
  let userEmail = user.email;

  if (user) {
    user = users.filter((obj) => { return obj.email !== req.params.email });
    res.status(201).send('Users email is deleted.');
  }
});



app.listen(8080, () => {
  console.log('Your app is listening on port 8080');
});
