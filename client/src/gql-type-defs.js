import { gql } from "@apollo/client";

export const QUERY_ALL_USERS = gql`
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
export const QUERY_ALL_MOVIES = gql`
query GetMovies{
    movies {
      id
      name
      year
      hit
  }
}
`
export const GET_MOVIE_BY_NAME = gql`
  query Movie($name: String!) {
  movie(name:$name){
    id
    name
    year
    hit
  }
}
`
export const GET_USER_BY_ID = gql`
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
export const CREATE_USER_MUTATION = gql`
      mutation CreateUser($input:CreateUserInput!){
        createUser(input:$input){
          name
          id
        }
      }

`