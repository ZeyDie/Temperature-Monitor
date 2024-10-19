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
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/temperature",
				pattern: /^\/temperature\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/token",
				pattern: /^\/token\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
