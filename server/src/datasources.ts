import { DataSource } from "apollo-datasource"
import { RESTDataSource } from "apollo-datasource-rest"
import { Store } from "./store"
import { Launch, LaunchAPI } from "./datasources/launch"
import { UserAPI } from "./datasources/user"

export { Launch, LaunchAPI, UserAPI }
export type DataSourcesFunction = () => DataSources

type DataSources = {
  launchAPI: RESTDataSource
  userAPI: DataSource
}

export function initDataSources(store: Store): DataSourcesFunction {
  return (): DataSources => ({
    launchAPI: new LaunchAPI(),
    userAPI: new UserAPI({ store })
  })
}
