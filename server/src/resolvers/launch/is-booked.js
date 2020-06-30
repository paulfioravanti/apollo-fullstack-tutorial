export async function isBooked({ id }, _args, { dataSources: { userAPI } }) {
  return userAPI.isBookedOnLaunch({ launchId: id })
}
