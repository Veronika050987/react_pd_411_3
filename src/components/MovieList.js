import './MovieList.css';
import Movie from './Movie.js';

function MovieList(props){
    const { movies = [] } = props;
    const unique = Array.from(new Map(movies.map(m=>[m.imdbID, m])).values());
    return(
        <div className='movies'>
            {
                unique.length ? unique.map
                (                   
                    movie => 
                    {
                        return <Movie key={movie.imdbID} {...movie}/>
                    }
                )
                : <h2>Nothing found (◕⌒◕)</h2> 
            }
        </div>
    )
}
export default MovieList;