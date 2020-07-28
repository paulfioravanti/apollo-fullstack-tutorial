import { GraphQLRequest } from "apollo-server-types"
import { EngineReportingOptions } from "apollo-engine-reporting"
import { AnyObject, Maybe } from "./utils"

// NOTE: Redefined from:
// https://github.com/apollographql/apollo-server/blob/main/packages/apollo-engine-reporting/src/agent.ts#L35
type ClientInfo = {
  clientName?: Maybe<string>
  clientVersion?: Maybe<string>
}

export const internalEngineDemo: EngineReportingOptions<AnyObject> = {
  graphVariant: "current",
  generateClientInfo: (
    { request }: { request: GraphQLRequest }
  ): ClientInfo => {
    if (!request || !request.http) return {}

    const clientName =
      request.http.headers.get("client-name") || undefined
    const clientVersion =
      request.http.headers.get("client-version") || undefined

    return { clientName, clientVersion }
  }
}
