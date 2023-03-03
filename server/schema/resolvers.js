const { UserList, MovieList } = require('../fakeData')
const _ = require('lodash')

const resolvers = {
    Query: {
        users: () => {
            // This small trick is useful to sort Array by key here we sort it by id, Higher-Lower
            return UserList.sort( (a,b) => b.id - a.id );
        },
        user: (parent, args) => {
            const id = args.id
            const user = _.find(UserList, { id: Number(id) })
            return user
        },
        //Movie Resolver
        movies: () => {
            return MovieList
        },

        movie: (parent, args) => {
            const name = args.name
            const movie = _.find(MovieList, { name })
            return movie
        },

    },
    // Movie: {
    //     name: (movie) => movie.name.toLowerCase()
    // },

    // creating resolver for User, it will return specific list of movies
    User: {
        favoriteMovie: () => {
            return _.filter(MovieList, (movie) => movie.year >= 2000)
        }
    },
    Mutation: {
        createUser: (parent, args) => {
            const user = args.input
            // const lastid = UserList[UserList.length - 1].id
            // As we are getting Users in High-Low order so first one will be highest so we add 1 more to its id 
            const lastid = UserList[0].id
            user.id = lastid + 1
            UserList.push(user)
            return user
        },
        updateUserName: (parent, args) => {
            const { id, newUserName } = args.input
            let userUpdated;
            UserList.forEach((user) => {
                if (user.id == id) {
                    user.username = newUserName
                    userUpdated = user
                }
            })
            return userUpdated
        },
        deleteUser: (parent, args) => {
            const id = args.id
            _.remove(UserList, (user) => {
                return (
                    user.id === Number(id)
                )
            })
            console.log(`user with id ${id} deleted `);
        }
    }
}

module.exports = { resolvers }