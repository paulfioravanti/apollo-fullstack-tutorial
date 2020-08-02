import merge from "lodash.merge"
import { typeDefs as Auth } from "./auth/resolvers"
import { typeDefs as Launch } from "./launch/resolvers"
import { typeDefs as LaunchConnection } from "./launchConnection/resolvers"
import { typeDefs as Mission } from "./mission/resolvers"
import { typeDefs as TripUpdateResponse } from "./tripUpdateResponse/resolvers"
import { typeDefs as User } from "./user/resolvers"

export const resolvers =
  merge(
    Auth,
    Launch,
    LaunchConnection,
    Mission,
    TripUpdateResponse,
    User
  )
