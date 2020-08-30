import { ArgumentNode } from "graphql"
import {
  LaunchResolvers as GeneratedLaunchResolvers,
  Launch,
  ResolversParentTypes
} from "../../generated/graphql"
import { LaunchAPI } from "../../datasources/launch"
import { UserAPI } from "../../datasources/user"

export const LaunchResolvers: GeneratedLaunchResolvers = {
  Query: {
    launch
  },
  Launch: {
    isBooked
  }
}

function launch(
  _parent: ResolversParentTypes["Launch"],
  { id }: { id: string },
  { dataSources: { launchAPI } }: { dataSources: { launchAPI: LaunchAPI } }
): Promise<any> {
  return launchAPI.getLaunchById({ launchId: id })
}

async function isBooked(
  { id }: Launch,
  _args: ArgumentNode,
  { dataSources: { userAPI } }: { dataSources: { userAPI: UserAPI } }
): Promise<boolean> {
  return userAPI.isBookedOnLaunch({ launchId: id })
}
