
const express = require('express'),
   bodyParser = require('body-parser'),
        // uuid = require('uuid');
          app = express();

let auth = require('./auth')(app);
const passport = require('passport');
require('./passport');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


const// { rest } = require('lodash');
    mongoose = require('mongoose');
    Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;


//Mongoose connection to database for CRUD
mongoose.connect('mongodb://localhost:27017/[myFlixDB]', { useNewUrlParser: true, useUnifiedTopology: true });


//Get list of data on all movies

app.get('/', (req, res) => {
    res.send("Welcome to Movie api, myFlix!");
});


// Get all movies
app.get('/movies', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
      });
});



// Get a movie by Title
app.get('/movies/:Title', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({ Title: req.params.Title })
    .then((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});



// Gets the data of a single genre, by Name
app.get('/movies/genre/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({ 'Genre.Name': req.params.Name })
    .then((genre) => {
      res.json(genre.Genre);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error: ' + err);
    });
});


// Gets  data a director, by name
app.get('/movies/director/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
   Movies.findOne({ 'Director.Name': req.params.Name })
     .then((director) => {
       res.json(director.Director);
     })
     .catch((err) => {
       console.error(err);
       res.status(500).send('Error: ' + err);
     });
});


//Get all users
app.get('/users', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.find()
      .then((users) => {
        res.status(201).json(users);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  });


//Get user by Username
app.get('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.findOne({ Username: req.params.Username })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  });


//Register a new user
app.post('/users', (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birth_date: req.body.Birthday
          })
          .then((user) =>{res.status(201).json(user) })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});



// Update the "user" info, by name

app.put('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
    {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birth_date: req.body.Birth_date
    }
  },
  { new: true }, // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});


// Adds "movie" to a list of favorites, by title

app.post('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username },
      {
        $push: { FavoriteMovies: req.params.MovieID },
      },
      { new: true }, // This line makes sure that the updated document is returned
      (err, updatedUser) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error: ' + err);
        } else {
          res.json(updatedUser);
        }
      }
    );
  });;



// Remove "movie" from a list of favorites, by title
app.delete('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $pull: { FavoriteMovies: req.params.MovieID }
      },
      { new: true }
    )
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  }
);


// Deletes user registration

app.delete('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Username + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});



app.listen(8080, () => {
  console.log('Your app is listening on port 8080');
});
