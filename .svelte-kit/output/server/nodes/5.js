

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/token/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.4meQ0Kpm.js","_app/immutable/chunks/scheduler.BvLojk_z.js","_app/immutable/chunks/index.CPBBmcIt.js","_app/immutable/chunks/title-bar.CsQ8IA3w.js"];
export const stylesheets = ["_app/immutable/assets/5.lNqisRD0.css","_app/immutable/assets/svetle.DjpbDF4a.css","_app/immutable/assets/title-bar.CW2D0VFb.css"];
export const fonts = [];
