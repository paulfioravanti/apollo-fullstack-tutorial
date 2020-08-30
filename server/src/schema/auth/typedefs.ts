import { DocumentNode } from "graphql"
import { gql } from "apollo-server"

export const AuthTypeDef: DocumentNode = gql`
  extend type Mutation {
    login(email: String): String # login token
  }
`
