import { storyMapper } from "../../utils/map";

export default class ProfilePresenter {
  #model;
  #view;
  #userModel;

  constructor({ view, model, userModel }) {
    this.#view = view;
    this.#model = model;
    this.#userModel = userModel;
  }

  async init() {
    try {
      this.#view.showLoading();

      if (!this.#userModel.getAccessToken()) {
        throw new Error("User not authenticated");
      }

      const userData = await this.getUserData();
      if (!userData) {
        throw new Error("User data not found");
      }

      this.#view.showUserProfile(userData);
    } catch (error) {
      console.error("ProfilePresenter init error:", error);
      this.#view.showError(error.message);
      this.#view.redirectToLogin();
    } finally {
      this.#view.hideLoading();
    }
  }

  async getUserData() {
    try {
      const data = this.#userModel.getUserData();

      if (!data || !data.id || !data.name) {
        console.warn("Invalid user data structure:", data);
        return null;
      }

      return data;
    } catch (error) {
      console.error("Failed to get user data:", error);
      throw error;
    }
  }

  logout() {
    try {
      this.#userModel.getLogout();
      this.#view.redirectToLogin();
    } catch (error) {
      console.error("Logout failed:", error);
      this.#view.showError("Failed to logout");
    }
  }

  async loadBookmarkedStories() {
    try {
      this.#view.showStoriesListLoading();

      const stories = await this.#model.getAllStories();
      const mappedStories = await Promise.all(stories.map(storyMapper));

      if (mappedStories.length === 0) {
        this.#view.showEmptyBookmarks();
      } else {
        this.#view.showBookmarkedStories(mappedStories);
      }
    } catch (error) {
      console.error("Failed to load bookmarks:", error);
      this.#view.showBookmarksError(error.message);
    } finally {
      this.#view.hideStoriesListLoading();
    }
  }
}
