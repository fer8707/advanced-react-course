const { gql } = require ('apollo-server')

const typeDefs = gql`

    type User {
        id: ID
        name: String
        lastName: String
        email: String
        created: String
    }
    type Token {
        token: String
    }
    input UserInput {
        name: String!
        lastName: String!
        email: String!
        password: String!
    }
    input AuthInput {
        email: String!
        password: String!
    }
    type Query {
        obtenerCurso: String
    }
    type Mutation {
        newUser(input: UserInput): User
        userAuth(input: AuthInput): Token
    }
`;

module.exports = typeDefs