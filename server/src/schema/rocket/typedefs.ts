import { DocumentNode } from "graphql"
import { gql } from "apollo-server"

export const RocketTypeDef: DocumentNode = gql`
  type Rocket {
    id: ID!
    name: String
    type: String
  }
`
