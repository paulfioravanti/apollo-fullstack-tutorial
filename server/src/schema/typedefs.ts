import { DocumentNode } from "graphql"
import { gql } from "apollo-server"
import { typeDefs as Auth } from "./auth/typedefs"
import { typeDefs as Launch } from "./launch/typedefs"
import { typeDefs as LaunchConnection } from "./launchConnection/typedefs"
import { typeDefs as Mission } from "./mission/typedefs"
import { typeDefs as Rocket } from "./rocket/typedefs"
import { typeDefs as TripUpdateResponse } from "./tripUpdateResponse/typedefs"
import { typeDefs as User } from "./user/typedefs"

const BaseTypeDef: DocumentNode = gql`
  type Query
  type Mutation
`

export const typeDefs: DocumentNode[] = [
  BaseTypeDef,
  Auth,
  Launch,
  LaunchConnection,
  Mission,
  Rocket,
  TripUpdateResponse,
  User
]
