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
        return 0.0;

    let text = element.textContent;

    if (text == null)
        return 0.0;

    return parseFloat(text.replaceAll(",", ".")) / 100.0;
}

function getColor(value) {
    var hue = ((1 - value) * 120).toString(10);
    return ["hsl(", hue, ",100%,50%)"].join("");
}

export {loadBar, fillSensors};
