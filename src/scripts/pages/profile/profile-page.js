import {
  generateSubscribeButtonTemplate,
  generateUnsubscribeButtonTemplate,
  generateLoaderAbsoluteTemplate,
  generateStoriesListEmptyTemplate,
  generateStoriesListErrorTemplate,
  generateStoriesItemTemplate,
} from "../../templates";
import {
  isServiceWorkerAvailable,
  registerServiceWorker,
} from "../../utils/index";
import {
  isCurrentPushSubscriptionAvailable,
  subscribe,
  unsubscribe,
} from "../../utils/helper";
import ProfilePresenter from "./profile-presenter";
import * as userModel from "../../utils/auth";
import Database from "../../data/database";

export default class ProfilePage {
  #presenter;

  render() {
    return `
      <section class="container">
        <!-- Profile Card -->
        <div class="profile-card">
          <div class="profile-header">
            <div class="profile-avatar">
              <span id="profile-avatar-letter"></span>
            </div>
            <h2 id="profile-name">Loading...</h2>
            <p id="profile-id" class="profile-id"></p>
          </div>
          <div class="profile-content">
            <div class="profile-actions">
              <button id="logout-button" class="logout-button">
                <i class="fas fa-sign-out-alt"></i> Logout
              </button>
            </div>
          </div>
        </div>

        <!-- Loading Indicator -->
        <div id="saved-stories-list-loading-container"></div>

        <!-- Push Notification Section -->
        <h2 class="subscribe-title">Subscribe to Push Notification :</h2>
        <div id="push-notification-tools" class="push-notification-tools"></div>

        <!-- Saved Stories -->
        <h1 class="section-title">Saved Stories :</h1>
        <div class="stories-list__container">
          <div id="stories-list"></div>
          <div id="stories-list-loading-container"></div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new ProfilePresenter({
      view: this,
      model: Database,
      userModel: userModel,
    });

    try {
      await this.#presenter.init();
      await this.#presenter.loadBookmarkedStories();

      if (isServiceWorkerAvailable()) {
        await this.#setupPushNotification();
      }

      this.#setupEventListeners();
    } catch (error) {
      console.error("Profile page initialization failed:", error);
      this.redirectToLogin();
    }
  }

  showUserProfile(userData) {
    if (!userData?.name || !userData?.id) {
      throw new Error("Invalid user data");
    }

    document.getElementById("profile-avatar-letter").textContent = userData.name
      .charAt(0)
      .toUpperCase();
    document.getElementById("profile-name").textContent = userData.name;
    document.getElementById("profile-id").textContent = `ID: ${userData.id}`;
  }

  redirectToLogin() {
    window.location.hash = "/login";
  }

  showBookmarkedStories(stories) {
    const storiesHTML = stories
      .map((story) =>
        generateStoriesItemTemplate({
          id: story.id,
          name: story.name,
          description: story.description,
          photoUrl: story.photoUrl,
          createdAt: story.createdAt,
          location: story.location,
        })
      )
      .join("");

    document.getElementById("stories-list").innerHTML = `
      <div class="stories-list">${storiesHTML}</div>
    `;
  }

  showEmptyBookmarks() {
    document.getElementById("stories-list").innerHTML =
      generateStoriesListEmptyTemplate();
  }

  showBookmarksError(message) {
    document.getElementById("stories-list").innerHTML =
      generateStoriesListErrorTemplate(message);
  }

  showLoading() {
    document.getElementById("saved-stories-list-loading-container").innerHTML =
      generateLoaderAbsoluteTemplate();
  }

  hideLoading() {
    document.getElementById("saved-stories-list-loading-container").innerHTML =
      "";
  }

  showStoriesListLoading() {
    document.getElementById("stories-list-loading-container").innerHTML =
      generateLoaderAbsoluteTemplate();
  }

  hideStoriesListLoading() {
    document.getElementById("stories-list-loading-container").innerHTML = "";
  }

  async #setupPushNotification() {
    try {
      await registerServiceWorker();
      const isSubscribed = await isCurrentPushSubscriptionAvailable();
      const container = document.getElementById("push-notification-tools");

      if (isSubscribed) {
        container.innerHTML = generateUnsubscribeButtonTemplate();
        document
          .getElementById("unsubscribe-button")
          .addEventListener("click", () => {
            unsubscribe().finally(() => this.#setupPushNotification());
          });
      } else {
        container.innerHTML = generateSubscribeButtonTemplate();
        document
          .getElementById("subscribe-button")
          .addEventListener("click", async () => {
            await subscribe();
            this.#setupPushNotification();
          });
      }
    } catch (error) {
      console.error("Push notification setup failed:", error);
    }
  }

  #setupEventListeners() {
    document.getElementById("logout-button")?.addEventListener("click", () => {
      this.#presenter.logout();
    });
  }

  showError(message) {
    console.error("Profile Error:", message);
    alert(`Error: ${message}`);
  }
}
