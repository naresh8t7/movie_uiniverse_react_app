import SERVER from './serverUrl';

const SERVER_URL = `${SERVER}/movie`;

class MovieApi {
    static getAllMovies() {
      return fetch(`${SERVER_URL}/all`).then(response => response.json());
    }

    static saveMovie(movie) {
      if (movie.id) {
        return fetch(`${SERVER_URL}/${movie.id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movie)
        }).then(response => response.json());
      } else {
        return fetch(SERVER_URL, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movie)
        }).then(response => response.json());
      }
    }

    static deleteMovie(movieId) {
        return fetch(`${SERVER_URL}/${movieId}`, {method:'delete'});
    }


    static getMovie(movieId) {
        return fetch(`${SERVER_URL}/${movieId}`).then(response => response.json());
    }

}

export default MovieApi;
