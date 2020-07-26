type ClientInfo = {
  clientName: string
  clientVersion: string
} | Record<string, unknown>

export const internalEngineDemo = {
  graphVariant: "current",
  generateClientInfo: ({ request }: any): ClientInfo => {
    if (!request || !request.http) return {}
    const clientName = request.http.headers.get("client-name")
    const clientVersion = request.http.headers.get("client-version")
    return { clientName, clientVersion }
  }
}
