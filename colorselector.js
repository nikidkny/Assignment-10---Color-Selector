"use strict";
const colorWheel = document.querySelector("#wheel");
const hexValueContainer = document.querySelector(".hex-value");
const rgbValueContainer = document.querySelector(".rgb-value");
const hslValueContainer = document.querySelector(".hsl-value");
const selectedColorContainer = document.querySelector(".selected-color");

document.addEventListener("DOMContentLoaded", init);
function init() {
  colorWheel.addEventListener("input", selectColor);
}
// get selected color
function selectColor() {
  const hexValue = colorWheel.value.substring(1);
  const rgbValue = hexToRGB(hexValue);
  //console.log(rgbValue);
  const hslValue = rgbToHsl(rgbValue);
  //console.log(hslValue);
  displayValues(hexValue, rgbValue, hslValue);
  displayColor(rgbValue);
}
// converting the values
// convert hex to rgb
function hexToRGB(hex) {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5), 16);
  return { r, g, b };
}
// convert rgb to hsl
function rgbToHsl(rgb) {
  const red = rgb.r / 255;
  const green = rgb.g / 255;
  const blue = rgb.b / 255;
  // hue, saturation, luminance variables
  let h, s, l;

  const min = Math.min(red, green, blue);
  const max = Math.max(red, green, blue);

  if (max === min) {
    h = 0;
  } else if (max === red) {
    h = 60 * (0 + (green - blue) / (max - min));
  } else if (max === green) {
    h = 60 * (2 + (blue - red) / (max - min));
  } else if (max === blue) {
    h = 60 * (4 + (red - green) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;
  h = Math.round(h);
  s = Math.round(s);
  l = Math.round(l);

  return { h, s, l };
}
function displayValues(hex, rgb, hsl) {
  hexValueContainer.textContent = `#${hex}`;
  rgbValueContainer.textContent = `(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  hslValueContainer.textContent = `h:${hsl.h} s:${hsl.s} l:${hsl.l}`;
}
function displayColor() {
  selectedColorContainer.style.backgroundColor = colorWheel.value;
}
