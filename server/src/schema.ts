import merge from "lodash.merge"
import { makeExecutableSchema } from "apollo-server"
import { Launch } from "./schema/launch"
import { LaunchConnection } from "./schema/launchConnection"
import { Mission } from "./schema/mission"
import { TripUpdateResponse } from "./schema/tripUpdateResponse"
import { typeDefs } from "./schema/typedefs"
import { User } from "./schema/user"
import { resolvers } from "./resolvers"

export const schema =
  makeExecutableSchema({
    typeDefs,
    resolvers: merge(
      resolvers,
      Launch.resolvers,
      LaunchConnection.resolvers,
      Mission.resolvers,
      TripUpdateResponse.resolvers,
      User.resolvers
    )
  })
