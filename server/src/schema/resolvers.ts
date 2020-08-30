import merge from "lodash.merge"
import { AuthResolvers } from "./auth/resolvers"
import { LaunchResolvers } from "./launch/resolvers"
import { LaunchConnectionResolvers } from "./launchConnection/resolvers"
import { MissionResolvers } from "./mission/resolvers"
import { TripUpdateResponseResolvers } from "./tripUpdateResponse/resolvers"
import { UserResolvers } from "./user/resolvers"
import { Resolvers } from "../generated/graphql"

export const resolvers: Resolvers =
  merge(
    AuthResolvers,
    LaunchResolvers,
    LaunchConnectionResolvers,
    MissionResolvers,
    TripUpdateResponseResolvers,
    UserResolvers
  )
