const MovieList = ({moviesearchdata,moviesdata}) =>{

    return(
        <>
        <h1>List of Movies</h1>
        {moviesearchdata ?
          <div className="card">
            <p>Movie :{moviesearchdata.movie.name}</p>
            <p>Year :{moviesearchdata.movie.year}</p>
            <p>Boxoffice :{moviesearchdata.movie.hit ? 'Hit' : "Flop"}</p>
          </div> : null}
        {!moviesearchdata ? moviesdata.movies.map((movie) => {
          return (
  
            <div className="card" key={movie.id}>
              <p >movie : {movie.name}</p>
              <p>year : {movie.year}</p>
              <p>BoxOffice: {movie.hit ? 'Hit' : 'Flop'}</p>
            </div>
          )
        }) : null
        }
        </>
    )
}
export default MovieList