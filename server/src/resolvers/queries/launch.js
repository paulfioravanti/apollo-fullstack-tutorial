export function launch(_parent, { id }, { dataSources: { launchAPI } }) {
  return launchAPI.getLaunchById({ launchId: id })
}
