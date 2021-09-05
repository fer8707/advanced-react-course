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
    type Product {
        id: ID
        name: String
        units: Int
        price: Float
        created: String
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
    input ProductInput {
        name: String!
        units: Int!
        price: Float!
    }

    type Query {
        #Users
        obtainUser (token: String!): User 

        #Products
        obtainProducts: [Product]
        obtainProduct (id: ID!): Product
    }
    type Mutation {

        #Users
        newUser(input: UserInput): User
        authUser(input: AuthInput): Token

        #Products
        newProduct(input: ProductInput): Product
        updateProduct(id: ID!, input: ProductInput): Product
        deleteProduct(id: ID!): String
    }
`;

module.exports = typeDefs