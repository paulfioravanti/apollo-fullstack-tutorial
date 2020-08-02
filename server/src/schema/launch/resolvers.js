export const resolvers = {
  Query: {
    launch
  },
  Launch: {
    isBooked
  }
}

function launch(_parent, { id }, { dataSources: { launchAPI } }) {
  return launchAPI.getLaunchById({ launchId: id })
}

async function isBooked({ id }, _args, { dataSources: { userAPI } }) {
  return userAPI.isBookedOnLaunch({ launchId: id })
}
