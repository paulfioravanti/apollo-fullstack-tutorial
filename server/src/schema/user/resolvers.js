export const UserResolvers = {
  Query: {
    me
  },
  User: {
    trips
  }
}

export async function me(_parent, _args, { dataSources: { userAPI } }) {
  return userAPI.findOrCreateUser()
}

export async function trips(
  _parent,
  _args,
  { dataSources: { userAPI, launchAPI } }
) {
  // get ids of launches by user
  const launchIds = await userAPI.getLaunchIdsByUser()

  if (!launchIds.length) {
    return []
  }

  // look up those launches by their ids
  const trips = await launchAPI.getLaunchesByIds({ launchIds })

  return (trips || [])
}
