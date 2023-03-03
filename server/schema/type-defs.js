const { gql } = require("apollo-server");
const typeDefs = gql`



    type User {
        id:ID!
        name:String!
        username:String!
        age:Int!
        nationality:Nationality!
        friends:[User]
        favoriteMovie:[Movie]
       
    }
    type Movie{
        id:ID!
        name:String!
        year:Int!
        hit:Boolean!
    }
    input CreateUserInput{
        name:String!
        username:String!
        age:Int!
        nationality:Nationality=PAKISTAN
    }

    input UpdateUsername{
     id:ID!
     newUserName:String!
    }
    

    type Mutation{
        createUser(input:CreateUserInput!):User
        updateUserName(input:UpdateUsername!):User
        deleteUser(id:ID!):User
    }

    enum Nationality{
    INDIA
    PAKISTAN
    CHINA
    AFGHANISTAN
    RUSSIA
    }


    type Query{
    users:[User!]!
    user(id:ID!):User!
    movies:[Movie]
    movie(name:String!):Movie!
    }

   
`

module.exports = { typeDefs }