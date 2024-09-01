export function sendJson(data: object, options?: ResponseInit) {
  return new Response(JSON.stringify(data), options);
}
