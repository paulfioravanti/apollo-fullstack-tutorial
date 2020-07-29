export async function cancelTrip(
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
