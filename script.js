var root = document.documentElement;
try {
  var t = localStorage.getItem("theme");
  if (t) root.setAttribute("data-theme", t);
} catch (e) {}
document.getElementById("theme").onclick = function () {
  var cur = root.getAttribute("data-theme");
  var dark =
    cur === "dark" ||
    (!cur && matchMedia("(prefers-color-scheme:dark)").matches);
  var n = dark ? "light" : "dark";
  root.setAttribute("data-theme", n);
  try {
    localStorage.setItem("theme", n);
  } catch (e) {}
};
