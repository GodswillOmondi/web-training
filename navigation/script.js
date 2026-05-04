const speedSpan = document.querySelector("#speed-span");

navigator.geolocation.watchPosition((data) => {
  speedSpan.textContent = data.coords.speed; //this will only work on a mobile phone
});
