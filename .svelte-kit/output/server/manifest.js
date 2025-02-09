export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["close.png","favicon.png","minimize.png","moon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.XMoBNPQg.js","app":"_app/immutable/entry/app.Bqb-0m7k.js","imports":["_app/immutable/entry/start.XMoBNPQg.js","_app/immutable/chunks/entry.DZOrZqmg.js","_app/immutable/chunks/scheduler.BvLojk_z.js","_app/immutable/entry/app.Bqb-0m7k.js","_app/immutable/chunks/scheduler.BvLojk_z.js","_app/immutable/chunks/index.CPBBmcIt.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
