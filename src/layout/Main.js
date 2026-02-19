import './Main.css';
import React from "react";
import Preloader from '../components/Preloader.js';
import MovieList from '../components/MovieList.js';
import Search from '../components/Search.js';

class Main extends React.Component
{
    state =
    {
        movies:null,
        totalResults: 0, // Изменено с count на totalResults
        isLoading: true
    }
    componentDidMount()
    {
        fetch('https://omdbapi.com/?apikey=221cf795&s=angel')
            .then(response => response.json())
            .then(data => this.setState({movies: data.Search}));
    }
    searchMovie = (str, type = 'all', page = 1) =>
    {
        this.setState({ isLoading: true, movies: null });

        const typeParam = type !== 'all' ? `&type=${type}` : '';
        const url = `https://omdbapi.com/?apikey=221cf795&s=${str}${typeParam}&page=${page}`;

         fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    // OMDB часто возвращает {Response: "False"} и Error, если ничего не найдено
                    movies: data.Search || [], // Если Search нет, ставим пустой массив
                    totalResults: data.totalResults ? parseInt(data.totalResults) : 0,
                    isLoading: false // Загрузка завершена
                });
            })
            .catch(() => {
                 this.setState({
                    movies: [],
                    totalResults: 0,
                    isLoading: false
                });
            });
        //  fetch(`https://omdbapi.com/?apikey=221cf795&s=${str}${type !== 'all' ? `&type=${type}` : ''}${`&page=${page}`}`)
        //     .then(response => response.json())
        //     .then(data => this.setState({movies: data.Search}));
    }
    render()
    {
        const { isLoading, movies, totalResults } = this.state;

        let content;

        if (isLoading) {
            // Состояние загрузки (крутится прелоадер)
            //content = <Preloader />;
        } else if (movies && movies.length > 0) {
            // Результаты найдены
            content = <MovieList movies={movies} />;
        } else if (totalResults === 0 && movies !== null) {
            // Поиск завершен, но результатов нет (movies может быть [])
            content = <h2 className="no-results">Nothing found (◕⌒◕)</h2>;
        } else {
            // На всякий случай, если movies все еще null (хотя isLoading должен был его поймать)
            content = <Preloader />;
        }

        return(
             <div className='main'>
                <div className='wrap'>
                    <Search searchMovie={this.searchMovie} totalCount={this.state.totalResults} />
                    {content}
                </div>
            </div>
        )
    }
}
export default Main;