const title = document.querySelector(".head");
const divBody = document.querySelector(".body");

title.textContent = "shoes";

title.style.color = "red";
title.addEventListener("click", () => {
  console.log("this user clicked me");
});

divBody.style.color = "green";

const list = document.createElement("li");

list.textContent = "new item list";
list.remove();
divBody.appendChild(list);
