import { gql } from "apollo-server"

export const typeDefs = gql`
  extend type Query {
    me: User
  }

  type User {
    id: ID!
    email: String!
    profileImage: String
    trips: [Launch]!
  }
`
