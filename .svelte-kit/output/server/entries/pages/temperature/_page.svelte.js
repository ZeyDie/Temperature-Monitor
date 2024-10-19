import { c as create_ssr_component, e as escape } from "../../../chunks/ssr.js";
/* empty css                     */
import "../../../chunks/title-bar.js";
import { invoke } from "@tauri-apps/api/core";
const DIAMETER = 100;
const BORDER_WIDTH = 10;
docReady(loadBar);
function docReady(fn) {
  if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(fn, 100);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}
function loadBar() {
  fillCircular();
  fillContent();
  fillRightBars();
  fillLeftBars();
  fillRightProgress();
  fillLeftProgress();
  fillSensors();
}
function fillSensors() {
  fillCPUProgress();
  fillGPUProgress();
}
function fillCircular() {
  for (var element of document.getElementsByClassName("circular")) {
    element.style.height = DIAMETER + "px";
    element.style.width = DIAMETER + "px";
  }
}
function fillContent() {
  for (var element of document.getElementsByClassName("content")) {
    element.style.height = DIAMETER - BORDER_WIDTH + "px";
    element.style.width = DIAMETER - BORDER_WIDTH + "px";
  }
}
function fillRightBars() {
  for (var element of document.getElementsByClassName("bar-right"))
    element.style.clip = `rect(0px, ${DIAMETER}px, ${DIAMETER}px, ${DIAMETER / 2}px)`;
}
function fillLeftBars() {
  for (var element of document.getElementsByClassName("bar-left"))
    element.style.clip = `rect(0px, ${DIAMETER / 2}px, ${DIAMETER}px, 0px)`;
}
function fillRightProgress() {
  for (var element of document.getElementsByClassName("progress-right"))
    element.style.clip = `rect(0px, ${DIAMETER / 2}px, ${DIAMETER}px, 0px)`;
}
function fillLeftProgress() {
  for (var element of document.getElementsByClassName("progress-left"))
    element.style.clip = `rect(0px, ${DIAMETER}px, ${DIAMETER}px, ${DIAMETER / 2}px)`;
}
function fillCPUProgress() {
  var avg = getCpuAVG();
  var right = document.getElementById("cpu-circle-bar-right-progress");
  var left = document.getElementById("cpu-circle-bar-left-progress");
  fillProgress(avg, right, left);
}
function fillGPUProgress() {
  var avg = getGpuAVG();
  var right = document.getElementById("gpu-circle-bar-right-progress");
  var left = document.getElementById("gpu-circle-bar-left-progress");
  fillProgress(avg, right, left);
}
function fillProgress(avg, right, left) {
  right.style.backgroundColor = getColor(avg);
  left.style.backgroundColor = getColor(avg);
  right.style.transform = `rotate(${avg < 0.5 ? avg * 2 * 180 : 180}deg)`;
  left.style.transform = `rotate(${avg > 0.5 ? avg * 2 * 180 + 180 : 0}deg)`;
}
function getCpuAVG() {
  return getAVG("cpu-avg");
}
function getGpuAVG() {
  return getAVG("gpu-avg");
}
function getAVG(id) {
  let element = document.getElementById(id);
  if (element == null)
    return 0;
  let text = element.textContent;
  if (text == null)
    return 0;
  return parseFloat(text.replaceAll(",", ".")) / 100;
}
function getColor(value) {
  var hue = ((1 - value) * 120).toString(10);
  return ["hsl(", hue, ",100%,50%)"].join("");
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let cpu = { min: "0", avg: "0", max: "0" };
  let gpu = { min: "0", avg: "0", max: "0" };
  setInterval(
    () => {
      invoke("get_computer_data").then((value) => {
        cpu = value.cpu;
        gpu = value.gpu;
      }).then(setTimeout(100)).then(fillSensors());
    },
    1e3
  );
  return `<div class="container"><div class="sensors"><div class="circular-container"><div class="label" data-svelte-h="svelte-kc6v6r">CPU</div> <div class="circular" data-svelte-h="svelte-1g3m7tb"><div class="circle" id="cpu-circle"><div class="bar bar-right" id="cpu-circle-bar-right"><div class="progress progress-right" id="cpu-circle-bar-right-progress"></div></div> <div class="bar bar-left" id="cpu-circle-bar-left"><div class="progress progress-left" id="cpu-circle-bar-left-progress"></div></div></div></div> <div class="content" id="cpu-content"><span id="cpu-avg">${escape(cpu.avg)}</span>℃</div></div> <div class="circular-container"><div class="label" data-svelte-h="svelte-1yo9rwn">GPU</div> <div class="circular" data-svelte-h="svelte-crirsz"><div class="circle" id="gpu-circle"><div class="bar bar-right" id="gpu-circle-bar-right"><div class="progress progress-right" id="gpu-circle-bar-right-progress"></div></div> <div class="bar bar-left" id="gpu-circle-bar-left"><div class="progress progress-left" id="gpu-circle-bar-left-progress"></div></div></div></div> <div class="content" id="gpu-content"><span id="gpu-avg">${escape(gpu.avg)}</span>℃</div></div></div> <div class="panel"> <div class="panel-buttons"><a href="/token" data-svelte-h="svelte-18ysok3"><button class="token-button">Change Token</button></a> <button class="refresh-button" data-svelte-h="svelte-lcnp81">Refresh Page</button></div></div></div>`;
});
export {
  Page as default
};
