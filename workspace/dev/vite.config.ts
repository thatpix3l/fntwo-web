import console from "node:console";
import type { IncomingMessage, ServerResponse } from "node:http";
import * as vite from "vite";
import pluginSolid from "vite-plugin-solid";

type Proxy = vite.HttpProxy.ProxyServer<
	typeof IncomingMessage,
	typeof ServerResponse,
	Error
>;

function proxyConfig(proxy: Proxy, _: vite.ProxyOptions) {
	proxy.on("error", (err, _req, _res) => console.log(`Proxy error:\n${err}`));

	proxy.on("proxyReq", (_proxyReq, req, _res) => {
		const msg = {
			head: req.method,
			url: req.url,
		};
		console.log(`Sending request to the target:\n${msg}`);
	});

	proxy.on("proxyRes", (proxyRes, req, _res) => {
		const msg = {
			statusCode: proxyRes.statusCode,
			url: req.url,
		};
		console.log(`Received response from the target:\n${msg}`);
	});
}

const cfg = vite.defineConfig((_cfg) => {
	return {
		plugins: [pluginSolid()],
		root: "../web",
		cacheDir: "../../node_modules/.vite",
		build: {
			outDir: "../../dist",
			emptyOutDir: true,
			sourcemap: "inline",
		},
		server: {
			proxy: {
				"/api": {
					target: "http://localhost:3000",
					changeOrigin: true,
					ws: true,
					configure: proxyConfig,
				},
			},
		},
	};
});

export default cfg;
