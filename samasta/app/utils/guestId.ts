/** API guest ids are `gst-{dbId}`; routes use numeric id. */
export function guestDbId(id: string | number) {
  return String(id).replace(/^gst-/, '')
}
