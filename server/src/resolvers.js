import { launches } from "./resolvers/queries/launches.js"
import { launch } from "./resolvers/queries/launch.js"
import { me } from "./resolvers/queries/me.js"
import { bookTrips } from "./resolvers/mutations/book-trips.js"
import { cancelTrip } from "./resolvers/mutations/cancel-trip.js"
import { login } from "./resolvers/mutations/login.js"
import { uploadProfileImage } from "./resolvers/mutations/upload-profile-image.js"
import { isBooked } from "./resolvers/launch/is-booked.js"
import { missionPatch } from "./resolvers/mission/mission-patch.js"
import { trips } from "./resolvers/user/trips.js"

export const resolvers = {
  Query: {
    launches,
    launch,
    me
  },
  Mutation: {
    bookTrips,
    cancelTrip,
    login,
    uploadProfileImage
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
