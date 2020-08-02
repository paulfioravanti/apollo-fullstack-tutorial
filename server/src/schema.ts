import { GraphQLSchema } from "graphql"
import { makeExecutableSchema } from "apollo-server"
import { resolvers } from "./schema/resolvers"
import { typeDefs } from "./schema/typedefs"

export const schema: GraphQLSchema =
  makeExecutableSchema({
    typeDefs,
    resolvers
  })
