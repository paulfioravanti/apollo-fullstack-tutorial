export async function bookTrips(
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
