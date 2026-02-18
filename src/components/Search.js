import './Search.css';
import React from "react";

class Search extends React.Component
{
    state =
        {
            search: "",
            type: "all",
            page: 1
        }
        prevPage = () =>
        {
            this.setState
            (
                () => (this.state.page > 1 ? {page: this.state.page - 1} : {page: 1}),
                () => {this.props.searchMovie(this.state.search, this.state.type, this.state.page)}
            )
        }
        nextPage = () =>
        {
            this.setState
            (
                () => ({page: this.state.page + 1}),
                () => 
                {
                    this.props.searchMovie(this.state.search, this.state.type, this.state.page)
                }
            )
        }
    handleKey = (event) =>
    {
        if(event.key === 'Enter')
        {
            this.props.searchMovie(this.state.search, this.state.type);
        }
    }
    handleFilter = (event) =>
    {
        this.setState
        (
            () => ({type: event.target.dataset.type}), 
            () => this.props.searchMovie(this.state.search, this.state.type)
        );
    }
    render()
    {
        let limit = 10;
        let totalPages = Math.ceil(this.props.totalCount / limit);
        const lastIndex = totalPages <=10 ? totalPages + 1 : this.state.page + limit;
        const firstIndex = totalPages <=10 ? lastIndex - limit + lastIndex + 1 : lastIndex - limit;
        return(
            <>
                <div className='search'>
                    <input
                        type="search"
                        placeholder="Поиск"
                        value={this.state.search}
                        onChange={(e) => this.setState({search: e.target.value})}
                        onKeyDown={this.handleKey}
                        />
                        <button className='btn' onClick={() => this.props.searchMovie(this.state.search, this.state.type)}>
                            Search
                        </button>
                </div>
                <div className='radio'>
                        <div>
                            <input type ='radio' name='type' id="all" data-type="all" checked={this.state.type === 'all'} onChange={this.handleFilter}/>
                            <label for="all">All</label>
                        </div>
                        <div>
                            <input type ='radio' name='type' id="movie" data-type="movie" checked={this.state.type === 'movie'} onChange={this.handleFilter}/>
                            <label for="movie">Movie</label>
                        </div>
                        <div>
                            <input type ='radio' name='type' id="series" data-type="series" checked={this.state.type === 'series'} onChange={this.handleFilter}/>
                            <label for="series">Series</label>
                        </div>
                        <div>
                            <input type ='radio' name='type' id="game" data-type="game" checked={this.state.type === 'game'} onChange={this.handleFilter}/>
                            <label for="game">Game</label>
                        </div>
                </div>
                <div className='navigator'>
                    <button className='btn' onClick={this.prevPage}>Prev</button>
                    <button className='btn' onClick={this.nextPage}>Next</button>

                </div>
            </>
        )
    }
}
export default Search;