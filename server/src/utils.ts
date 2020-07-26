export type MaybeNull<T> = T | null

type Pagination = {
  after?: MaybeNull<string>
  pageSize?: number
  results: any[]
  getCursor?: (item: any) => MaybeNull<string>
}

export function paginateResults({
  after: cursor,
  pageSize = 20,
  results,
  // can pass in a function to calculate an item's cursor
  getCursor = () => null
}: Pagination): string[] {
  if (pageSize < 1) {
    return []
  }

  if (!cursor) {
    return results.slice(0, pageSize)
  }

  const cursorIndex =
    results.findIndex(hasCurrentCursor.bind(null, cursor, getCursor))

  return nextPage(results, cursorIndex, pageSize)
}

function hasCurrentCursor(cursor, getCursor, item) {
  // if an item has a `cursor` on it, use that, otherwise try to generate one
  const itemCursor = item.cursor || getCursor(item)
  // if there's still not a cursor, return false by default
  return itemCursor ? cursor === itemCursor : false
}

function nextPage(results, cursorIndex, pageSize) {
  if (cursorIndex < 0) {
    return results.slice(0, pageSize)
  }

  // don't let us overflow
  if (cursorIndex === results.length - 1) {
    return []
  }
  const nextPageLimit = Math.min(results.length, cursorIndex + 1 + pageSize)

  return results.slice(cursorIndex + 1, nextPageLimit)
}
