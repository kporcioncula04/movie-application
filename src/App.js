
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css'
import React, { Component } from 'react'
import MovieCard2 from './components/MovieCard2'
import axios from 'axios'

export default class App extends Component {
  constructor(){
    super()
    this.state = {
      moviesList: ['tt2294629'],
      searchTerm: '',
    };
  }

  search = event => {
    event.preventDefault();
    axios
      .get(
        `https://www.omdbapi.com/?apikey=f6f37531&s=${this.state.searchTerm
        }&plot=full`
      )
      .then(res => res.data)
      .then(res => {
        if (!res.Search) {
          this.setState({ moviesList: [] });
          return;
        }

        const moviesList = res.Search.map(movie => movie.imdbID);

        this.setState({
          moviesList
        });
      });
  };

  handleChange = event => {
    this.setState({
      searchTerm: event.target.value
    });
  };

  render() {
    const { moviesList } = this.state;
    return (
      <div>
        <form onSubmit={this.search}>
          <input
            placeholder="Search a movie.."
            onChange={this.handleChange}
          />
          <button type="submit">
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-search" fill="yellow" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z" />
              <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z" />
            </svg>

          </button>
        </form>
        {moviesList.length > 0 ? (
          moviesList.map(movie => (
            <>
            <MovieCard2 movieID={movie} key={movie} />
            </>
          ))
        ) : (
            <p className='nomovie'>
              No movies found!
            </p>
          )}
      </div>
    );
  }
}

