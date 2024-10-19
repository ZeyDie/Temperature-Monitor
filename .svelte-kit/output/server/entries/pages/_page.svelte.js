import { c as create_ssr_component } from "../../chunks/ssr.js";
import "../../chunks/title-bar.js";
import { invoke } from "@tauri-apps/api/core";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  console.log("Loading application...");
  invoke("token_is_actual").then((value) => {
    if (!value) navigation.navigate("/temperature");
    else navigation.navigate("/token");
  });
  return `<div class="container" data-svelte-h="svelte-1gyl51f"><svg class="spinner" width="150px" height="150px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg"><circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle></svg></div>`;
});
export {
  Page as default
};
