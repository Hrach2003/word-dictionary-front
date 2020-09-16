import { createProxyMiddleware } from 'http-proxy-middleware';

export default function (app: { use: (arg0: string, arg1: import("http-proxy-middleware").RequestHandler) => void; }) {
  app.use(
    '/',
    createProxyMiddleware({
      target: 'http://localhost:4000',
      changeOrigin: true,
    })
  );
}