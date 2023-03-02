const {ApolloServer} = require("apollo-server")
const {typeDefs} = require("./schema/type-defs")
const {resolvers} = require("./schema/resolvers")
// typeDefs are just to define types, resolvers will do req,res etc
const server = new ApolloServer({typeDefs,resolvers}) 

server.listen().then(({url})=>{
    console.log(`Server is up and running :) @: ${url}`)
})