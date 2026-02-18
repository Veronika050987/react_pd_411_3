import './Main.css';
import React from "react";
import Preloader from '../components/Preloader.js';
import MovieList from '../components/MovieList.js';
import Search from '../components/Search.js';

class Main extends React.Component
{
    state =
    {
        movies:[]
    }
    componentDidMount()
    {
        fetch('https://omdbapi.com/?apikey=221cf795&s=angel')
            .then(response => response.json())
            .then(data => this.setState({movies: data.Search}));
    }
    searchMovie = (str, type = 'all') =>
    {
         fetch(`https://omdbapi.com/?apikey=221cf795&s=${str}${type !== 'all' ? `&type=${type}` : ''}`)
            .then(response => response.json())
            .then(data => this.setState({movies: data.Search}));
    }
    render()
    {
        return(
            <div className='main'>
                <div className='wrap'>
                    <Search searchMovie={this.searchMovie} />
                    {
                        this.state.movies != null && this.state.movies.length === 0 ? <Preloader /> : <MovieList movies={this.state.movies} />
                    }
                </div>
            </div>
        )
    }
}
export default Main;