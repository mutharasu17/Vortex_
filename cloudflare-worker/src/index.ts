/**
 * Vortex Media Worker
 * Proxies media files from Backblaze B2 private bucket through Cloudflare's CDN.
 * B2 <-> Cloudflare = Bandwidth Alliance = zero egress fees.
 */

const B2_ACCOUNT_ID = "d7ac00535535";
const B2_BUCKET_NAME = "vortex-media";
const B2_API_URL = "https://api006.backblazeb2.com";
const B2_DOWNLOAD_URL = "https://f006.backblazeb2.com";

// Cache the auth token (valid for 24h, Workers KV not needed for simple proxy)
let cachedAuth: { token: string; expires: number } | null = null;

async function getB2AuthToken(appKeyId: string, appKey: string): Promise<string> {
    const now = Date.now();
    if (cachedAuth && cachedAuth.expires > now) return cachedAuth.token;

    const credentials = btoa(`${appKeyId}:${appKey}`);
    const res = await fetch(`${B2_API_URL}/b2api/v2/b2_authorize_account`, {
        headers: { Authorization: `Basic ${credentials}` },
    });

    if (!res.ok) throw new Error(`B2 auth failed: ${res.status}`);
    const data: any = await res.json();

    // Cache for 23 hours (token valid 24h)
    cachedAuth = {
        token: data.authorizationToken,
        expires: now + 23 * 60 * 60 * 1000,
    };
    return cachedAuth.token;
}

export default {
    async fetch(request: Request, env: any): Promise<Response> {
        const url = new URL(request.url);
        const filePath = url.pathname; // e.g. /frames/0001.webp

        // CORS headers for browser requests
        const corsHeaders = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
            "Cache-Control": "public, max-age=31536000, immutable",
        };

        if (request.method === "OPTIONS") {
            return new Response(null, { headers: corsHeaders });
        }

        try {
            const authToken = await getB2AuthToken(env.B2_APP_KEY_ID, env.B2_APP_KEY);

            // Build B2 download URL
            const b2FileUrl = `${B2_DOWNLOAD_URL}/file/${B2_BUCKET_NAME}${filePath}`;

            const b2Response = await fetch(b2FileUrl, {
                headers: { Authorization: authToken },
                cf: {
                    // Aggressive Cloudflare edge caching — file never changes
                    cacheEverything: true,
                    cacheTtl: 31536000, // 1 year
                },
            });

            if (!b2Response.ok) {
                return new Response(`File not found: ${filePath}`, {
                    status: b2Response.status,
                    headers: corsHeaders,
                });
            }

            // Stream the file back with caching headers
            const responseHeaders = new Headers(corsHeaders);
            const contentType = b2Response.headers.get("Content-Type");
            if (contentType) responseHeaders.set("Content-Type", contentType);
            responseHeaders.set("Cache-Control", "public, max-age=31536000, immutable");

            return new Response(b2Response.body, {
                status: 200,
                headers: responseHeaders,
            });
        } catch (err: any) {
            return new Response(`Worker error: ${err.message}`, {
                status: 500,
                headers: corsHeaders,
            });
        }
    },
};
