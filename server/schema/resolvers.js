const { UserList, MovieList } = require('../fakeData')
const _ = require('lodash')

const resolvers = {
    Query: {
        users: () => {
            return UserList
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
    // creating resolver for User, it will return specific list of movies
    User: {
        favoriteMovie: () => {
            return _.filter(MovieList, (movie) => movie.year >= 2000)
        }
    },
    Mutation: {
        createUser: (parent, args) => {
            const user = args.input
            const lastid = UserList[UserList.length - 1].id
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