import { launches } from "./resolvers/queries/launches"
import { launch } from "./resolvers/queries/launch"
import { me } from "./resolvers/queries/me"
import { bookTrips } from "./resolvers/mutations/book-trips"
import { cancelTrip } from "./resolvers/mutations/cancel-trip"
import { login } from "./resolvers/mutations/login"
import { isBooked } from "./resolvers/launch/is-booked"
import { missionPatch } from "./resolvers/mission/mission-patch"
import { trips } from "./resolvers/user/trips"

export const resolvers = {
  Query: {
    launches,
    launch,
    me
  },
  Mutation: {
    bookTrips,
    cancelTrip,
    login
  },
  Launch: {
    isBooked
  },
  Mission: {
    missionPatch
  },
  User: {
    trips
  }
}
