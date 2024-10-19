import { c as create_ssr_component, d as add_attribute, e as escape } from "../../../chunks/ssr.js";
/* empty css                     */
import "../../../chunks/title-bar.js";
import "@tauri-apps/api/core";
let message = "";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let token = "";
  return `<div class="container"><p data-svelte-h="svelte-17bgkc1">Token</p> <form class="row"><input id="token-input" placeholder="Enter a token of bot"${add_attribute("value", token)}> <button type="submit" data-svelte-h="svelte-1f2bxem">Save</button></form> <p>${escape(message)}</p></div>`;
});
export {
  Page as default
};
