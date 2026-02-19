import './Search.css';
import React from "react";

class Search extends React.Component
{
    state =
        {
            search: "",
            type: "all",
            page: 1,
            paginationLimit: 5 //кол-во кнопок страниц, видных одновременно
        }
        // Функция для выполнения поиска с текущими параметрами
        executeSearch = (newPage = this.state.page) => {
            this.setState({ page: newPage }, () => {
                this.props.searchMovie(this.state.search, this.state.type, this.state.page);
            });
    }
        prevPage = () =>
        {
            if(this.state.page > 1) {
                this.executeSearch(this.state.page - 1);
            }

        }
        nextPage = () =>
        {
            const { totalCount } = this.props;
            const { page, paginationLimit } = this.state;
            const limit = 10;
        
            // Вычисляем общее количество страниц
            const totalPages = totalCount > 0 ? Math.ceil(totalCount / limit) : 1;
        
            if (this.state.page < totalPages) {
                this.executeSearch(this.state.page + 1);
            }
        }
    handleKey = (event) =>
    {
        if(event.key === 'Enter')
        {
            // Сброс страницы на 1 при новом поиске
            this.setState({ page: 1 }, () => {
                this.props.searchMovie(this.state.search, this.state.type, 1);
            });
        }
    }
    handleFilter = (event) =>
    {
        this.setState
        (
            () => ({type: event.target.dataset.type, page: 1}), 
            () => this.props.searchMovie(this.state.search, this.state.type, 1)
        );
    }
    // Обработчик клика по номеру страницы
    handlePageClick = (pageNumber) => {
        if (pageNumber !== this.state.page) {
            this.executeSearch(pageNumber);
        }
    }
    renderPaginationNumbers() {
        const { totalCount } = this.props;
        const { page, paginationLimit } = this.state;
        const limit = 10;
        
        if (totalCount === 0) return null;
        
        const totalPages = Math.ceil(totalCount / limit);
        if (totalPages <= 1) return null;

        // Логика определения, какие страницы отображать
        let startPage = Math.max(1, page - Math.floor(paginationLimit / 2));
        let endPage = Math.min(totalPages, startPage + paginationLimit - 1);

        // Корректировка, если мы слишком близко к концу
        if (endPage - startPage + 1 < paginationLimit && totalPages >= paginationLimit) {
            startPage = Math.max(1, endPage - paginationLimit + 1);
        }

        const pages = [];
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        
        return (
            <>
                {startPage > 1 && (
                    <>
                        <button className='btn page-num' onClick={() => this.handlePageClick(1)}>1</button>
                        {startPage > 2 && <span className='dots'>...</span>}
                    </>
                )}
                
                {pages.map(num => (
                    <button 
                        key={num} 
                        className={`btn page-num ${this.state.page === num ? 'active' : ''}`} 
                        onClick={() => this.handlePageClick(num)}
                    >
                        {num}
                    </button>
                ))}

                {endPage < totalPages && (
                    <>
                        {endPage < totalPages - 1 && <span className='dots'>...</span>}
                        <button className='btn page-num' onClick={() => this.handlePageClick(totalPages)}>{totalPages}</button>
                    </>
                )}
            </>
        );
    }
    render()
    {
        const { page } = this.state;
        const { totalCount } = this.props;
        const limit = 10;
        const totalPages = totalCount > 0 ? Math.ceil(totalCount / limit) : 1;

        return(
            <>
                <div className='search'>
                    <input
                        type="search"
                        placeholder="Enter movie/game/series name for search...(◕‿◕)"
                        value={this.state.search}
                        onChange={(e) => this.setState({search: e.target.value})}
                        onKeyDown={this.handleKey}
                        />
                        <button className='btn' onClick={() => this.props.searchMovie(this.state.search, this.state.type, 1)}>
                            Search
                        </button>
                </div>
                <div className='radio'>
                        <div>
                            <input type ='radio' name='type' id="all" data-type="all" checked={this.state.type === 'all'} onChange={this.handleFilter}/>
                            <label htmlFor="all">All</label>
                        </div>
                        <div>
                            <input type ='radio' name='type' id="movie" data-type="movie" checked={this.state.type === 'movie'} onChange={this.handleFilter}/>
                            <label htmlFor="movie">Movie</label>
                        </div>
                        <div>
                            <input type ='radio' name='type' id="series" data-type="series" checked={this.state.type === 'series'} onChange={this.handleFilter}/>
                            <label htmlFor="series">Series</label>
                        </div>
                        <div>
                            <input type ='radio' name='type' id="game" data-type="game" checked={this.state.type === 'game'} onChange={this.handleFilter}/>
                            <label htmlFor="game">Game</label>
                        </div>
                </div>
                
                {/* Блок навигации */}
                {(totalCount > 10) && (
                    <div className='navigator'>
                        <button 
                            className='btn' 
                            onClick={this.prevPage} 
                            disabled={page === 1}
                        >
                            Prev
                        </button>
                        
                        {this.renderPaginationNumbers()}

                        <button 
                            className='btn' 
                            onClick={this.nextPage}
                            disabled={page === totalPages}
                        >
                            Next
                        </button>
                    </div>
                )}
                
                {/* Отображение текущей страницы */}
                {(totalCount > 10) && (
                    <p className="current-page-info">
                        Page {page} from {totalPages}
                    </p>
                )}
            </>
        )
    }
}
export default Search;