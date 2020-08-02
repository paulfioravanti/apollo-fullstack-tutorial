import { gql, makeExecutableSchema } from "apollo-server"
import { typeDefs as Launch } from "./gql/launch"
import { typeDefs as LaunchConnection } from "./gql/launchConnection"
import { typeDefs as Mission } from "./gql/mission"
import { typeDefs as Rocket } from "./gql/rocket"
import { typeDefs as TripUpdateResponse } from "./gql/tripUpdateResponse"
import { typeDefs as User } from "./gql/user"
import { resolvers } from "./resolvers"

const BaseTypeDef = gql`
  type Query

  type Mutation {
    login(email: String): String # login token
  }
`

export const schema =
  makeExecutableSchema({
    typeDefs: [
      BaseTypeDef,
      Launch,
      LaunchConnection,
      Mission,
      Rocket,
      TripUpdateResponse,
      User
    ],
    resolvers: resolvers
  })
