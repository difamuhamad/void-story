// CSS imports
import "../styles/styles.css";
import "../styles/others.css";
import "leaflet/dist/leaflet.css";

import App from "./pages/app";
import Camera from "./utils/camera";

document.addEventListener("DOMContentLoaded", async () => {
  const app = new App({
    content: document.querySelector("#main-content"),
    drawerButton: document.querySelector("#drawer-button"),
    navigationDrawer: document.querySelector("#navigation-drawer"),
  });
  await app.renderPage();

  window.addEventListener("hashchange", async () => {
    if (app.currentPage && app.currentPage.destroy) {
      app.currentPage.destroy();
    }

    await app.renderPage();
    Camera.stopAllStreams();
  });
});
