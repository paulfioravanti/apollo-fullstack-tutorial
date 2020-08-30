export const TripUpdateResponseResolvers = {
  Mutation: {
    bookTrips,
    cancelTrip
  }
}

async function cancelTrip(
  _parent,
  { launchId },
  { dataSources: { userAPI, launchAPI } }
) {
  const result = await userAPI.cancelTrip({ launchId })

  if (!result) {
    return { success: false, message: "failed to cancel trip" }
  }

  const launch = await launchAPI.getLaunchById({ launchId })

  return {
    success: true,
    message: "trip cancelled",
    launches: [launch]
  }
}

async function bookTrips(
  _parent,
  { launchIds },
  { dataSources: { userAPI, launchAPI } }
) {

  const [results, launches] = await Promise.all([
    userAPI.bookTrips({ launchIds }),
    launchAPI.getLaunchesByIds({ launchIds })
  ])
  const success = results?.length === launchIds.length
  const message = await determineMessage(results, launchIds)

  return { success, message, launches }
}

async function determineMessage(results, launchIds) {
  if (results.length === launchIds.length) {
    return "trips booked successfully"
  }

  const unbookableIds = launchIds.filter(id => !results.includes(id))
  return `the following launches couldn't be booked: ${unbookableIds}`
}
