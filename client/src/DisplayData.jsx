import React, { useEffect, useState } from "react";
import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client"
import * as mygql from './gql-type-defs'
import UserList from "./components/UserList";
import MovieList from "./components/MovieList";

export function DisplayMovies() {
  const { data: moviesdata, loading: moviesloading } = useQuery(mygql.QUERY_ALL_MOVIES)
  const [smovie, setSmovie] = useState('')
  const [fetchMovie, { data: moviesearchdata, error: movieError }] = useLazyQuery(mygql.GET_MOVIE_BY_NAME)


  
  if (moviesloading) return <h1>Movies Loading...</h1>
  // No need for Button. just press enter key to search
  // But fetchMovie must be provided with variables when ever used

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
        {/* Movie List */}
        <MovieList moviesearchdata={moviesearchdata} moviesdata={moviesdata}/>
    </div>
  )
}

export function DisplayData() {
  const [fetchUser, { data: userSearchData, error: userError }] = useLazyQuery(mygql.GET_USER_BY_ID)
  const { data: usersdata, loading: usersloading ,refetch:userRefecth} = useQuery(mygql.QUERY_ALL_USERS)
  const [deleteuser] = useMutation(mygql.DELETE_USER_BY_ID)
  const [name,setName] = useState('')
  const [username,setUsername] = useState('')
  const [age,setAge] = useState(0)
  const [nationality,setNationality] = useState('')
  const [userId, setUserId] = useState('')
  const [createUser] = useMutation(mygql.CREATE_USER_MUTATION)

  function newUser(){
    createUser({
      variables:{
        //As shorthand of JS if you have to name:name then simply write name its ok.
        input:{name,username,age,nationality}
      }
    })
    userRefecth()
  }

  function deleteUser(id){
    deleteuser({
      variables:{
        id
      }
    })
    userRefecth()
  }


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
      <input type='text' placeholder="Enter name" onChange={(e)=>{setName(e.target.value)}}/>
      <input type='text' placeholder="Enter username" onChange={(e)=>{setUsername(e.target.value)}}/>
      <input type='number' placeholder="Enter Age" onChange={(e)=>{setAge(Number(e.target.value))}}/>
      <input type='text' placeholder="Eter Nationality e.g PAKISTAN" onChange={(e)=>{setNationality(e.target.value.toUpperCase())}}/>
      <button onClick={newUser}>Create New User</button>
      {/* All Users */}
      <UserList usersdata={usersdata} userSearchData={userSearchData} deleteUser={deleteUser}/>
    </div>
  )
}