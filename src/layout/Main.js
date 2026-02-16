import './Main.css';
import React from "react";
import Preloader from '../components/Preloader.js';
import MovieList from '../components/MovieList.js';

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
    render()
    {
        return(
            <div className='main'>
                <div className='wrap'>
                    {
                        this.state.movies.length === 0 ? <Preloader /> : <MovieList movies={this.state.movies} />
                    }
                </div>
            </div>
        )
    }
}
export default Main;