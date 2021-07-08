const redirectUrl = 'https://www.linkedin.com/in/nrkirby/';

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Records client ip addresses in a KV store before redirecting to a url
 * @param {Request} request
 */
async function handleRequest(request) {

  // Get the ip address of the client making the request
  const clientIP = request.headers.get("CF-Connecting-IP")
  console.log('ip address was', clientIP)

  if (clientIP != null) {
    let count = await IP_LIST.get(clientIP)
    if (count != null) {
      await IP_LIST.put(clientIP, ++count)
    } else {
      await IP_LIST.put(clientIP, 1)
    }
  }

  return Response.redirect(redirectUrl, 301)
}
