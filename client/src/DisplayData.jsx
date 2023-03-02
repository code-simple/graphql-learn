import React from "react";
import { useQuery, gql } from "@apollo/client"

const QUERY_ALL_USERS = gql`
    query GetAllUsers{
    users {
      id
      name
      username
      age
      nationality
    }  
  }
`
const QUERY_ALL_MOVIES = gql`
query GetMovies{
  movies {
    name
    year
    hit
  }
}
`

export  function DisplayMovies() {
  const {data:moviesdata,loading:moviesloading} = useQuery(QUERY_ALL_MOVIES)

  if(moviesdata){
    console.log(moviesdata)
  }
  if(moviesloading) return <h1>Movies Loading...</h1>

  return(
    <div>
      <h1>List of Movies</h1>
      {moviesdata.movies.map((movie)=>{
        return(
          <div key={movie.id} className="card">
            <p>Movie : {movie.name}</p>
            <p>Year : {movie.year}</p>
            <p>BoxOffice: {movie.hit?'Hit':'Flop'}</p>
          </div>
        )
      })}
    </div>
  )
}

export  function DisplayData() {
  const { data:usersdata,loading:usersloading } = useQuery(QUERY_ALL_USERS)
  if (usersdata) {
    console.log(usersdata)
  }
  if (usersloading) return <h1>Users Loading...</h1>
  return (
  <div>
    <h1>List of Users</h1>
    {usersdata && usersdata.users.map((user)=>{
     return(
      <div className="card" key={user.id}>
      <p>Name : {user.name}</p>
      <p>Username : {user.username}</p>
      <p>Age : {user.age}</p>
      <p>Nationality : {user.nationality}</p>
    </div>
     )
    })}
  </div>
    )
}