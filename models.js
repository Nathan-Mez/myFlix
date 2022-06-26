
//require the mongoose package
const mongoose = require('mongoose');

let movieSchema = mongoose.Schema({
  Title: {type: String, required: true},
  Description: {type: String, required: true},
  Genre: {
    Name: String,
    Description: String
  },
  Director: {
    Name: String,
    Bio: String
  },
  Duration: String,
  Released: Number,
  Actors: [String],
  ImagePath: String,
  Featured: Boolean,
  MovieID: Number
});  

let userSchema = mongoose.Schema({
  Username: {type: String, required: true},
  Password: {type: String, required: true},
  Email: {type: String, required: true},
  Birth_date: Date,
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
  //FavoriteMovies: [{ type: mongoose.Schema.Types.MovieID, ref: 'Movie' }]
});

let Movie = mongoose.model('Movie', movieSchema);               //Create Movie Model
let User = mongoose.model('User', userSchema);                  //Create User Model

//Export Movie and User Models
module.exports.Movie = Movie;
module.exports.User = User;
