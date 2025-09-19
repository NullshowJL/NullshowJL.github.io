document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("dark-mode-toggle");
  if (!toggle) return;

  const label = toggle.querySelector(".mode-label");
  const html = document.documentElement;

  //const updateLabel = () => {
  //  const scheme = html.getAttribute("data-scheme");
  //  label.textContent = scheme === "dark" ? "Light" : "Dark";
  //};

  updateLabel();

  toggle.addEventListener("click", () => {
    const current = html.getAttribute("data-scheme");
    const next = current === "dark" ? "dark" : "light";
    html.setAttribute("data-scheme", next);
    localStorage.setItem("preferred-color-scheme", next);
    updateLabel();
  });
});
