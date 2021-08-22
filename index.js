const { ApolloServer }  = require ("apollo-server");
const typeDefs          = require ('./db/schema')
const resolvers         = require ('./db/resolvers')

const contectarDB       = require ('./config/db')

// DB Conect
contectarDB()

// Server
const server = new ApolloServer({
  typeDefs,
  resolvers
  
});

// Start server
server.listen().then(({ url }) => {
  console.log(`Server run in URL ${url}`);
});
