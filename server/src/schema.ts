import merge from "lodash.merge"
import { gql, makeExecutableSchema } from "apollo-server"
import { Launch } from "./schema/launch"
import { LaunchConnection } from "./schema/launchConnection"
import { typeDefs as Mission } from "./schema/mission"
import { typeDefs as Rocket } from "./schema/rocket"
import { typeDefs as TripUpdateResponse } from "./schema/tripUpdateResponse"
import { typeDefs as User } from "./schema/user"
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
      Launch.typeDefs,
      LaunchConnection.typeDefs,
      Mission,
      Rocket,
      TripUpdateResponse,
      User
    ],
    resolvers: merge(
      resolvers,
      Launch.resolvers,
      LaunchConnection.resolvers
    )
  })
