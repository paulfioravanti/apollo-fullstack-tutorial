export async function me(_parent, _args, { dataSources: { userAPI } }) {
  return userAPI.findOrCreateUser()
}
