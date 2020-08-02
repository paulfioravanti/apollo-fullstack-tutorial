import { DocumentNode } from "graphql"
import { gql } from "apollo-server"

export const typeDefs: DocumentNode = gql`
  extend type Mutation {
    login(email: String): String # login token
  }
`
