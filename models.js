

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

//Hash submitted Passwords
userSchema.statics.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

//compares submitted hashed passwords with the hashed passwords
userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.Password);
};




let Movie = mongoose.model('Movie', movieSchema);               //Create Movie Model
let User = mongoose.model('User', userSchema);                  //Create User Model

//Export Movie and User Models
module.exports.Movie = Movie;
module.exports.User = User;
