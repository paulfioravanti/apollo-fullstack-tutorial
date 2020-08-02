import merge from "lodash.merge"
import { resolvers as Auth } from "./auth/resolvers"
import { resolvers as Launch } from "./launch/resolvers"
import { resolvers as LaunchConnection } from "./launchConnection/resolvers"
import { resolvers as Mission } from "./mission/resolvers"
import { resolvers as TripUpdateResponse } from "./tripUpdateResponse/resolvers"
import { resolvers as User } from "./user/resolvers"
import { Resolvers } from "../generated/graphql"

export const resolvers: Resolvers =
  merge(
    Auth,
    Launch,
    LaunchConnection,
    Mission,
    TripUpdateResponse,
    User
  )
