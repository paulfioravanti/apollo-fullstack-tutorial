import { RESTDataSource } from "apollo-datasource-rest"
// import { Launch } from "../generated/graphql"

export type RemoteLaunch = {
  flight_number: string
  launch_date_unix: string
  launch_site: {
    site_name: string
  }
  mission_name: string
  links: {
    mission_patch_small: string
    mission_patch: string
  }
  rocket: {
    rocket_id: string
    rocket_name: string
    rocket_type: string
  }
}

export type Launch = {
  id: string
  cursor: string
  site: string
  mission: {
    name: string
    missionPatchSmall: string
    missionPatchLarge: string
  }
  rocket: {
    id: string
    name: string
    type: string
  }
}

export class LaunchAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = "https://api.spacexdata.com/v2/"
  }

  // leaving this inside the class to make the class easier to test
  launchReducer(launch: RemoteLaunch): Launch {
    return {
      id: launch.flight_number || "0",
      cursor: `${launch.launch_date_unix}`,
      site: launch.launch_site && launch.launch_site.site_name,
      mission: {
        name: launch.mission_name,
        missionPatchSmall: launch.links.mission_patch_small,
        missionPatchLarge: launch.links.mission_patch
      },
      rocket: {
        id: launch.rocket.rocket_id,
        name: launch.rocket.rocket_name,
        type: launch.rocket.rocket_type
      }
    }
  }

  async getAllLaunches(): Promise<Launch[]> {
    const response: RemoteLaunch[] = await this.get("launches")
    if (!Array.isArray(response)) {
      return []
    }

    // transform the raw launches to a more friendly
    return response.map((launch: RemoteLaunch) => this.launchReducer(launch))
  }

  async getLaunchById({ launchId }: { launchId: string }): Promise<Launch> {
    const [launch] = await this.get("launches", { flight_number: launchId })
    return this.launchReducer(launch)
  }

  async getLaunchesByIds(
    { launchIds }: { launchIds: string[] }
  ): Promise<Launch[]> {
    return Promise.all(
      launchIds.map(launchId => this.getLaunchById({ launchId }))
    )
  }
}
