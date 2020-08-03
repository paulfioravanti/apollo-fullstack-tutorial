import { DocumentNode } from "graphql"
import { gql } from "apollo-server"

export const typeDefs: DocumentNode = gql`
  type Rocket {
    id: ID!
    name: String
    type: String
  }
`
