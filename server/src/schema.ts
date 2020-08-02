import merge from "lodash.merge"
import { gql, makeExecutableSchema } from "apollo-server"
import { Auth } from "./schema/auth"
import { Launch } from "./schema/launch"
import { LaunchConnection } from "./schema/launchConnection"
import { Mission } from "./schema/mission"
import { TripUpdateResponse } from "./schema/tripUpdateResponse"
import { User } from "./schema/user"
import { typeDefs } from "./schema/typedefs"

export const schema =
  makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: merge(
      Auth.resolvers,
      Launch.resolvers,
      LaunchConnection.resolvers,
      Mission.resolvers,
      TripUpdateResponse.resolvers,
      User.resolvers
    )
  })
