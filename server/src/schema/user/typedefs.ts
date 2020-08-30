import { DocumentNode } from "graphql"
import { gql } from "apollo-server"

export const UserTypeDef: DocumentNode = gql`
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
