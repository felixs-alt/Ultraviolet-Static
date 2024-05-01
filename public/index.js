"use strict";
/**
 * @type {HTMLFormElement}
 */
const form = document.getElementById("uv-form");
/**
 * @type {HTMLInputElement}
 */
const address = document.getElementById("uv-address");
/**
 * @type {HTMLInputElement}
 */
const searchEngine = document.getElementById("uv-search-engine");
/**
 * @type {HTMLParagraphElement}
 */
const error = document.getElementById("uv-error");
/**
 * @type {HTMLPreElement}
 */
const errorCode = document.getElementById("uv-error-code");
const frame = document.getElementById("uv-frame");
const urlParams = new URLSearchParams(window.location.search);

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    await registerSW();
  } catch (err) {
    error.textContent = "Failed to register service worker.";
    errorCode.textContent = err.toString();
    throw err;
  }

  let url = search(address.value, searchEngine.value);

  frame.style.display = "block";
  frame.src = __uv$config.prefix + __uv$config.encodeUrl(url);
});

form.addEventListener("param", async (event) => {
  try {
    await registerSW();
  } catch (err) {
    error.textContent = "Failed to register service worker.";
    errorCode.textContent = err.toString();
    throw err;
  }
  let url = search(urlParams.get('url'), searchEngine.value);
  
  frame.style.display = "block";
  frame.src = __uv$config.prefix + __uv$config.encodeUrl(url);
});
var arr = window.location.href.split('?');

if (arr.length > 1 && arr[1] !== '') {
  const event = new Event("param");
  form.dispatchEvent(event);
}
