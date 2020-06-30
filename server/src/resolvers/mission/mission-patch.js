// make sure the default size is 'large' in case user doesn't specify
export function missionPatch(
  { missionPatchSmall, missionPatchLarge },
  { size } = { size: "LARGE" }
) {
  return size === "SMALL" ? missionPatchSmall : missionPatchLarge
}
