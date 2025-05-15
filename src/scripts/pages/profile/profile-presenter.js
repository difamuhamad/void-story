export default class ProfilePresenter {
  #model;
  #view;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async init() {
    try {
      this.#view.showLoading();
      const userData = await this.getUserData();
      this.#view.showUserProfile(userData);
    } catch (error) {
      this.#view.showError("Failed to load profile data");
    } finally {
      this.#view.hideLoading();
    }
  }

  async getUserData() {
    try {
      const userData = await this.#model.getUserData();
      if (!userData) {
        throw new Error("No user data available");
      }
      return userData;
    } catch (error) {
      console.error("Failed getting user data:", error);
      throw error;
    }
  }

  logout() {
    try {
      this.#model.getLogout();
      window.location.hash = "/login";
    } catch (error) {
      this.#view.showError("Failed to logout");
    }
  }

  async notifyMe() {
    try {
      const response = await subscribe();
      if (response.error === true) {
        this.#view.showError("Notification subscription failed");
        return;
      }
      console.log("notifyMe:", response.message);
    } catch (error) {
      this.#view.showError("Notification error: " + error.message);
    }
  }
}
