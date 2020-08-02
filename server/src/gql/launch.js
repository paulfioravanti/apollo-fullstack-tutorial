import { gql } from "apollo-server"

export const typeDefs = gql`
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
