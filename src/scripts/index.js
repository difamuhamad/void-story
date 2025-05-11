// CSS imports
import "../styles/styles.css";
import "../styles/others.css";
import "leaflet/dist/leaflet.css";

import { registerServiceWorker } from "./utils";
import App from "./pages/app";
import Camera from "./utils/camera";

document.addEventListener("DOMContentLoaded", async () => {
  const app = new App({
    content: document.querySelector("#main-content"),
    sideBarButton: document.querySelector("#sidebar-button"),
    navigationDrawer: document.querySelector("#navigation-drawer"),
  });
  await app.renderPage();

  // Register service-worker
  await registerServiceWorker();

  window.addEventListener("hashchange", async () => {
    if (app.currentPage && app.currentPage.destroy) {
      app.currentPage.destroy();
    }

    await app.renderPage();
    Camera.stopAllStreams();
  });
});
