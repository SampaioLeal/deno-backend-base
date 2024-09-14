export function sendJson(data: object, options?: ResponseInit): Response {
  return new Response(JSON.stringify(data), {
    ...options,
    headers: { ...options?.headers, "Content-Type": "application/json" },
  });
}

export function sendText(data: string, options?: ResponseInit): Response {
  return new Response(data, {
    ...options,
    headers: { ...options?.headers, "Content-Type": "text/plain" },
  });
}

export function sendRedirect(url: string, statusCode: number = 302): Response {
  return new Response(null, {
    status: statusCode,
    headers: { Location: url },
  });
}

export function sendHtml(html: string, options?: ResponseInit) {
  return new Response(html, {
    ...options,
    headers: { ...options?.headers, "Content-Type": "text/html" },
  });
}

export function sendXml(xml: string, options?: ResponseInit) {
  return new Response(xml, {
    ...options,
    headers: { ...options?.headers, "Content-Type": "application/xml" },
  });
}

export function sendError(message: string, statusCode: number = 500) {
  return new Response(JSON.stringify({ error: message }), {
    status: statusCode,
    headers: { "Content-Type": "application/json" },
  });
}

export function sendNoContent(options?: ResponseInit) {
  return new Response(null, {
    status: 204,
    ...options,
  });
}
