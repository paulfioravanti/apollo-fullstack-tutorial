import { gql } from "apollo-server"

export const typeDefs = gql`
  type Mission {
    name: String
    missionPatch(size: PatchSize): String
  }

  enum PatchSize {
    SMALL
    LARGE
  }
`
