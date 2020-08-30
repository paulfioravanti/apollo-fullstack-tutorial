import { DocumentNode } from "graphql"
import { gql } from "apollo-server"

export const TripUpdateResponseTypeDef: DocumentNode = gql`
  extend type Mutation {
    # if false, signup failed -- check errors
    bookTrips(launchIds: [ID]!): TripUpdateResponse!

    # if false, cancellation failed -- check errors
    cancelTrip(launchId: ID!): TripUpdateResponse!
  }

  type TripUpdateResponse {
    success: Boolean!
    message: String
    launches: [Launch]
  }
`
