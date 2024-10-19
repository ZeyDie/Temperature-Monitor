

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.WDglDqgR.js","_app/immutable/chunks/scheduler.BvLojk_z.js","_app/immutable/chunks/index.CPBBmcIt.js","_app/immutable/chunks/title-bar.CsQ8IA3w.js"];
export const stylesheets = ["_app/immutable/assets/3.D6pe11jt.css","_app/immutable/assets/title-bar.CW2D0VFb.css"];
export const fonts = [];
