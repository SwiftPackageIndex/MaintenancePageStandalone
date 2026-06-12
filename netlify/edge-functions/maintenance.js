// Ask Netlify to serve the maintenance page with HTTP 503 and a retry
// header so that search engines know the downtime is temporary.
export default async (request, context) => {
    const page = await context.next()

    const headers = new Headers(page.headers)
    headers.set('retry-after', '3600')

    return new Response(page.body, { status: 503, headers })
}

// exclude this page's assets so they load normally.
export const config = {
    path: '/*',
    excludedPath: ['/styles.css', '/eta.js', '/logo.svg'],
}
