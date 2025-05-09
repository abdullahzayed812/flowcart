import http, { RequestOptions } from "http";
import { Request, Response, NextFunction } from "express";
import { URL } from "url";

export function proxyMiddleware(targetBase: string) {
  return (req: Request, res: Response, _next: NextFunction) => {
    const targetUrl = new URL(req.originalUrl, targetBase);

    const options: RequestOptions = {
      hostname: targetUrl.hostname,
      port: targetUrl.port || 80,
      path: targetUrl.pathname + targetUrl.search,
      method: req.method,
      headers: req.headers,
    };

    const proxyReq = http.request(options, (proxyRes) => {
      res.writeHead(proxyRes.statusCode || 500, proxyRes.headers);
      proxyRes.pipe(res, { end: true });
    });

    proxyReq.on("error", (err) => {
      console.error("Proxy error:", err.message);
      res.status(502).json({ error: "Bad Gateway: Unable to connect to service." });
    });

    // Pipe body to target
    req.pipe(proxyReq, { end: true });
  };
}
