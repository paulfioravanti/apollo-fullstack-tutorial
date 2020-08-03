import { DocumentNode } from "graphql"
import { gql } from "apollo-server"

export const typeDefs: DocumentNode = gql`
  type Mission {
    name: String
    missionPatch(size: PatchSize): String
  }

  enum PatchSize {
    SMALL
    LARGE
  }
`
