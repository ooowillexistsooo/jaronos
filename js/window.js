document.querySelectorAll(".window").forEach(setupWindow);

document.querySelectorAll("[data-opens-window]").forEach((launcher) => {
  launcher.addEventListener("click", () => {
    const targetWindow = document.getElementById(launcher.dataset.opensWindow);
    openWindow(targetWindow);
  });
});

function openWindow(element) {
  if (!element) return;

  element.classList.remove("is-closed");
  element.style.zIndex = "2";
}

function setupWindow(element) {
  const header = element.querySelector(".window-header");
  const closeButton = element.querySelector(".close-window");
  const maximizeButton = element.querySelector(".maximize-window");
  let initialX = 0;
  let initialY = 0;
  let savedBounds = null;

  if (header) {
    header.addEventListener("mousedown", startDragging);
    header.addEventListener("mousedown", () => {
      element.style.zIndex = "2";
    });
  }

  if (closeButton) {
    closeButton.addEventListener("click", () => element.classList.add("is-closed"));
  }

  if (maximizeButton) {
    maximizeButton.addEventListener("click", toggleMaximize);
  }

  function startDragging(e) {
    if (e.target.closest("button") || element.classList.contains("maximized")) return;
    e.preventDefault();

    initialX = e.clientX;
    initialY = e.clientY;

    document.addEventListener("mousemove", dragWindow);
    document.addEventListener("mouseup", stopDragging, { once: true });
  }

  function dragWindow(e) {
    e.preventDefault();

    const currentX = initialX - e.clientX;
    const currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;

    element.style.top = `${element.offsetTop - currentY}px`;
    element.style.left = `${element.offsetLeft - currentX}px`;
  }

  function stopDragging() {
    document.removeEventListener("mousemove", dragWindow);
  }

  function toggleMaximize() {
    if (element.classList.contains("maximized")) {
      element.classList.remove("maximized");
      element.style.top = savedBounds.top;
      element.style.left = savedBounds.left;
      element.style.width = savedBounds.width;
      element.style.height = savedBounds.height;
      maximizeButton?.setAttribute("aria-label", "Maximize window");
      return;
    }

    savedBounds = {
      top: `${element.offsetTop}px`,
      left: `${element.offsetLeft}px`,
      width: `${element.offsetWidth}px`,
      height: `${element.offsetHeight}px`
    };
    element.classList.add("maximized");
    maximizeButton?.setAttribute("aria-label", "Restore window");
  }
}