import React, { useState } from "react";
import { useQuery, useLazyQuery, gql } from "@apollo/client"

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
      id
      name
      year
      hit
  }
}
`
const GET_MOVIE_BY_NAME = gql`
  query Movie($name: String!) {
  movie(name:$name){
    id
    name
    year
    hit
  }
}
`
const GET_USER_BY_ID = gql`
  query User($id:ID!){
    user(id:$id){
      id
      name
      username
      age 
      nationality
    }
  }
`

export function DisplayMovies() {
  const { data: moviesdata, loading: moviesloading } = useQuery(QUERY_ALL_MOVIES)
  const [smovie, setSmovie] = useState('')
  const [fetchMovie, { data: moviesearchdata, error: movieError }] = useLazyQuery(GET_MOVIE_BY_NAME)
  if (moviesdata) {
  }
  if (moviesloading) return <h1>Movies Loading...</h1>


  // No need for Button. just press enter key to search
  // But fetchMovie must be provided with variables when ever
  //used
  function enterSearch(e) {
    if (e.key == 'Enter') {
      fetchMovie({
        variables: {
          name: smovie
        }
      })
    }
  }

  return (

    <div className="Display">
      <input type='text' placeholder="Search Movie"
        onChange={(e) => setSmovie(e.target.value)} onKeyDown={enterSearch} />

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
      }) : null}
    </div>
  )
}

export function DisplayData() {
  const [fetchUser, { data: userSearchData, error: userError }] = useLazyQuery(GET_USER_BY_ID)
  const { data: usersdata, loading: usersloading } = useQuery(QUERY_ALL_USERS)
  const [userId, setUserId] = useState('')
  if (usersdata) {

  }
  if (usersloading) return <h1>Users Loading...</h1>

  function enterSearch(e) {
    if (e.key == 'Enter') {
      fetchUser({
        variables: {
          id: userId
        }
      })
    }
  }

  return (
    <div className="dataContainer">
      <input type='text' placeholder="Search User" onChange={(e) => setUserId(e.target.value)} onKeyDown={enterSearch} />
      <br></br>
      <input type='text' placeholder="Enter name"></input>
      <input type='text' placeholder="Enter username"></input>
      <input type='number' placeholder="Enter Age"></input>
      <input type='text' placeholder="Eter Nationality e.g PAKISTAN"></input>
      <button>Create New User</button>
      <h1>List of Users</h1>
      <div className="cardcontainer">
      {userSearchData ?
        <div className="card" key={userSearchData.user.id}>
          <p>Name : {userSearchData.user.name}</p>
          <p>Username : {userSearchData.user.username}</p>
          <p>Age : {userSearchData.user.age}</p>
          <p>Nationality : {userSearchData.user.nationality}</p>
        </div> : ""}
      {!userSearchData && usersdata && usersdata.users.map((user) => {
        return (
          <div className="card" key={user.id}>
            <p>Name : {user.name}</p>
            <p>Username : {user.username}</p>
            <p>Age : {user.age}</p>
            <p>Nationality : {user.nationality}</p>
          </div>
        )
      })}
      </div>
    </div>
  )
}