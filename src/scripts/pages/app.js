import routes from "../routes/routes";
import { getActiveRoute } from "../routes/url-parser";

class App {
  #content = null;
  #sideBarButton = null;
  #navigationDrawer = null;

  constructor({ navigationDrawer, sideBarButton, content }) {
    this.#content = content;
    this.#sideBarButton = sideBarButton;
    this.#navigationDrawer = navigationDrawer;

    this._setupSideBar();
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

  // #setupNavigationList() {
  //   const isLogin = !!getAccessToken();
  //   const navListMain =
  //     this.#drawerNavigation.children.namedItem("navlist-main");
  //   const navList = this.#drawerNavigation.children.namedItem("navlist");

  //   // User not log in
  //   if (!isLogin) {
  //     navListMain.innerHTML = "";
  //     navList.innerHTML = generateUnauthenticatedNavigationListTemplate();
  //     return;
  //   }

  //   navListMain.innerHTML = generateMainNavigationListTemplate();
  //   navList.innerHTML = generateAuthenticatedNavigationListTemplate();

  //   const logoutButton = document.getElementById("logout-button");
  //   logoutButton.addEventListener("click", (event) => {
  //     event.preventDefault();

  //     if (confirm("Apakah Anda yakin ingin keluar?")) {
  //       getLogout();

  //       // Redirect
  //       location.hash = "/login";
  //     }
  //   });
  // }

  async renderPage() {
    const url = getActiveRoute();
    const page = routes[url];

    if (!document.startViewTransition) {
      this.#content.innerHTML = await page.render();
      await page.afterRender();

      return;
    }

    document.startViewTransition(async () => {
      this.#content.innerHTML = await page.render();
      await page.afterRender();
    });
  }
}

export default App;
