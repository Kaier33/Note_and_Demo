const mongoose = require('mongoose')
const Movie = mongoose.model('Movie')

export const getAllMovies = async (type, year) => {
  let query = {}
  if (type) {
    query.moviesTypes = {
      $in: [type]
    }
  }

  if (year) {
    query.year = year
  }

  const movies = await Movie.find(query)
  
  return movies
}

export const getMovieDetail = async (id) => {
  const movie = await Movie.findOne({_id: id})

  return movie
}

export const getRelativeMoives = async (movie) => {
  const movies = await Movie.find({
    moviesTypes: {
      $in: movie.moviesTypes
    }
  })

  return movies
}
