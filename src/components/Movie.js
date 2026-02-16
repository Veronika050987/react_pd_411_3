import './Movie.css';

function Movie(props)
{
    const {Title, Year, imdbID, Type, Poster} = props;
    return(
        <div className="card">
            <img src={Poster} alt={imdbID}/>
            <div>
                <h3>{Title}</h3>
                <p>{Year} <span>{Type}</span></p>
            </div>
        </div>
    )
}
export default Movie;