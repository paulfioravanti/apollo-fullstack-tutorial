import { DocumentNode } from "graphql"
import { gql } from "apollo-server"

export const typeDefs: DocumentNode = gql`
  extend type Query {
    launch(id: ID!): Launch
  }

  type Launch {
    id: ID!
    site: String
    mission: Mission
    rocket: Rocket
    isBooked: Boolean!
  }
`
