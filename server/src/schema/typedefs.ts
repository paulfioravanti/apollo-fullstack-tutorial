import { DocumentNode } from "graphql"
import { gql } from "apollo-server"
import { AuthTypeDef } from "./auth/typedefs"
import { LaunchTypeDef } from "./launch/typedefs"
import { LaunchConnectionTypeDef } from "./launchConnection/typedefs"
import { MissionTypeDef } from "./mission/typedefs"
import { RocketTypeDef } from "./rocket/typedefs"
import { TripUpdateResponseTypeDef } from "./tripUpdateResponse/typedefs"
import { UserTypeDef } from "./user/typedefs"

const BaseTypeDef: DocumentNode = gql`
  type Query
  type Mutation
`

export const typeDefs: DocumentNode[] = [
  BaseTypeDef,
  AuthTypeDef,
  LaunchTypeDef,
  LaunchConnectionTypeDef,
  MissionTypeDef,
  RocketTypeDef,
  TripUpdateResponseTypeDef,
  UserTypeDef
]
