import { isSpoofedBot } from "@arcjet/inspect";
import arcjet, { detectBot, shield, tokenBucket } from "@arcjet/node";

const aj = arcjet({
  key: process.env.ARCJET_KEY,
  characteristics: ["ip.src"],
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE", "POSTMAN"],
    }),
    tokenBucket({
      mode: "LIVE",
      refillRate: 5,
      interval: 10,
      capacity: 10,
    }),
  ],
});

export async function arcjetProtect(req, res, next) {
  const decision = await aj.protect(req, { requested: 5 });

  console.log("Arcjet decision", decision);

  if (decision.isDenied() || decision.results.some(isSpoofedBot)) {
    const status = decision.reason.isRateLimit() ? 429 : 403;
    const errorMsg = decision.reason.isRateLimit()
      ? "Too Many Requests"
      : decision.reason.isBot()
      ? "No bots allowed"
      : "Forbidden";
    return res.status(status).json({ error: errorMsg });
  }
  next();
}
