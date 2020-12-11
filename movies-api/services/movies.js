const MongoLib = require('../lib/mongo');

class MoviesService {
  constructor() {
    this.collection = 'movies';
    this.mongoDB = new MongoLib();
  }

  //Select Collection
  async getMovies({ tags }) {
    const query = tags && { tags: { $in: tags } };

    const movies = await this.mongoDB.getAll(this.collection, query);

    return movies || [];
  }

  //Read Movie
  async getMovie({ movieId }) {
    const movie = await this.mongoDB.get(this.collection, movieId);

    return movie || {};
  }

  //Create Movie
  async createMovie({ movie }) {
    const creteMovieId = await this.mongoDB.create(this.collection, movie);

    return creteMovieId;
  }

  //Update Movie
  async updateMovie({ movieId, movie } = {}) {
    const updatedMovieId = await this.mongoDB.update(
      this.collection,
      movieId,
      movie
    );

    return updatedMovieId;
  }

  //Delete Movie
  async deleteMovie({ movieId }) {
    const deletedMovieId = await this.mongoDB.delete(this.collection, movieId);

    return deletedMovieId;
  }
}

module.exports = MoviesService;
