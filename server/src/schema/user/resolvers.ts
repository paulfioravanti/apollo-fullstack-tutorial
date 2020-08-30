import { MaybeNull, AnyObject } from "../../utils"
import { LaunchAPI, Launch, UserAPI } from "../../datasources"
import { UserAttributes } from "../../store"
import { ResolversParentTypes } from "../../generated/graphql"

export const UserResolvers = {
  Query: {
    me
  },
  User: {
    trips
  }
}

type DataSources = {
  dataSources: {
    userAPI: UserAPI
    launchAPI: LaunchAPI
  }
}

export async function me(
  _parent: ResolversParentTypes["User"],
  _args: AnyObject,
  { dataSources: { userAPI } }: DataSources
): Promise<MaybeNull<UserAttributes>> {
  return userAPI.findOrCreateUser()
}

export async function trips(
  _parent: ResolversParentTypes["User"],
  _args: AnyObject,
  { dataSources: { userAPI, launchAPI } }: DataSources
): Promise<Launch[]> {
  // get ids of launches by user
  const launchIds: string[] = await userAPI.getLaunchIdsByUser()

  if (!launchIds.length) {
    return []
  }

  // look up those launches by their ids
  const trips: Launch[] = await launchAPI.getLaunchesByIds({ launchIds })

  return (trips || [])
}
