👍 Scalable free-ish options:

1. **Self-host MaxMind GeoLite2**

   * Free database (needs license key)
   * Run locally on server
   * No rate limit, full control

2. **Cloudflare Worker + `request.cf`**

   * If using Cloudflare, every request includes country/city/region in headers
   * Free, fast, scalable

3. **Fallback flow**

   * Try IP-based (e.g., `ipwho.is`)
   * If blocked/denied, fall back to GPS (if available)
   * Cache result (don’t fetch every time)

4. **Backend IP header parsing**

   * On backend, parse `req.ip` and use own geo-DB

These scale better than public APIs. Want to use MaxMind?
