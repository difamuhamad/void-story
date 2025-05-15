import routes from "../routes/routes";
import { getActiveRoute } from "../routes/url-parser";
import { getAccessToken } from "../utils/auth";
import {
  generateAuthenticatedNavbarTemplate,
  generateUnauthenticatedNavbarTemplate,
} from "../templates";

class App {
  #content = null;
  #sideBarButton = null;
  #navigationDrawer = null;

  constructor({ navigationDrawer, sideBarButton, content }) {
    this.#content = content;
    this.#sideBarButton = sideBarButton;
    this.#navigationDrawer = navigationDrawer;

    this._setupSideBar();
    this._setupNavigation();
  }

  _setupSideBar() {
    this.#sideBarButton.addEventListener("click", () => {
      this.#navigationDrawer.classList.toggle("open");
    });

    document.body.addEventListener("click", (event) => {
      if (
        !this.#navigationDrawer.contains(event.target) &&
        !this.#sideBarButton.contains(event.target)
      ) {
        this.#navigationDrawer.classList.remove("open");
      }

      this.#navigationDrawer.querySelectorAll("a").forEach((link) => {
        if (link.contains(event.target)) {
          this.#navigationDrawer.classList.remove("open");
        }
      });
    });
  }

  _setupNavigation() {
    const isAuthenticated = !!getAccessToken();
    const navList = this.#navigationDrawer.querySelector("#nav-list");

    if (isAuthenticated) {
      navList.innerHTML = generateAuthenticatedNavbarTemplate();
    } else {
      navList.innerHTML = generateUnauthenticatedNavbarTemplate();

      // Redirect if go to protected routes
      const protectedRoutes = ["/story", "/profile"];
      const currentRoute = getActiveRoute();
      if (protectedRoutes.includes(currentRoute)) {
        window.location.hash = "/register";
      }
    }
  }

  async renderPage() {
    const url = getActiveRoute();
    const page = routes[url];

    // Check authentication before rendering protected pages
    const isAuthenticated = !!getAccessToken();
    const protectedRoutes = ["/story", "/profile"];

    if (protectedRoutes.includes(url) && !isAuthenticated) {
      window.location.hash = "/register";
      return;
    }

    if (!document.startViewTransition) {
      this.#content.innerHTML = await page.render();
      await page.afterRender();
      this._setupNavigation(); // Update navbar after page render
      return;
    }

    document.startViewTransition(async () => {
      this.#content.innerHTML = await page.render();
      await page.afterRender();
      this._setupNavigation();
    });
  }
}

export default App;
