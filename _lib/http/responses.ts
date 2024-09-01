export function sendJson(data: object, options?: ResponseInit) {
  return new Response(JSON.stringify(data), options);
}

export function sendText(data: string, options?: ResponseInit) {
  return new Response(data, options);
}

export function sendRedirect(url: string, statusCode: number = 302) {
  return new Response(undefined, {
    status: statusCode,
    headers: { Location: url },
  });
}
