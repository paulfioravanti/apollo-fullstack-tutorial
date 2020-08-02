import merge from "lodash.merge"
import { gql, makeExecutableSchema } from "apollo-server"
import { Launch } from "./schema/launch"
import { LaunchConnection } from "./schema/launchConnection"
import { Mission } from "./schema/mission"
import { Rocket } from "./schema/rocket"
import { TripUpdateResponse } from "./schema/tripUpdateResponse"
import { User } from "./schema/user"
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
      Mission.typeDefs,
      Rocket.typeDefs,
      TripUpdateResponse.typeDefs,
      User.typeDefs
    ],
    resolvers: merge(
      resolvers,
      Launch.resolvers,
      LaunchConnection.resolvers,
      Mission.resolvers,
      TripUpdateResponse.resolvers
    )
  })
