export async function bookTrips(
  _parent,
  { launchIds },
  { dataSources: { userAPI, launchAPI } }
) {
  const results = await userAPI.bookTrips({ launchIds })
  const launches = await launchAPI.getLaunchesByIds({ launchIds })
  const success = results?.length === launchIds.length
  const message =
    results.length === launchIds.length
      ? 'trips booked successfully'
      : `the following launches couldn't be booked: ${launchIds.filter(
          id => !results.includes(id),
        )}`

  return { success, message, launches }
}
