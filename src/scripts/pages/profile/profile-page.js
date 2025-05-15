import {
  generateSubscribeButtonTemplate,
  generateUnsubscribeButtonTemplate,
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

export default class ProfilePage {
  #presenter;

  constructor() {
    this.#presenter = new ProfilePresenter({
      view: this,
      model: userModel,
    });
  }

  render() {
    return `
      <section class="container">
        <div class="profile-card">
          <div class="profile-header">
            <div class="profile-avatar">
              <span id="profile-avatar-letter"></span>
            </div>
            <h2 id="profile-name"></h2>
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
        <div id="saved-stories-list-loading-container"></div>
        <h2 class="subscribe-title">Subscribe to push notification : </h2>
        <div id="push-notification-tools" class="push-notification-tools"></div>
        <h1 class="section-title">Saved stories : </h1>
        <div class="saved-stories-list__container">
          <div id="saved-stories-list"></div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    await this.#presenter.init();

    if (isServiceWorkerAvailable()) {
      await this.#setupPushNotification();
    }

    this.#setupEventListeners();
  }

  showUserProfile(userData) {
    document.getElementById("profile-avatar-letter").textContent = userData.name
      .charAt(0)
      .toUpperCase();
    document.getElementById("profile-name").textContent = userData.name;
    document.getElementById(
      "profile-id"
    ).textContent = `User ID: ${userData.id}`;
  }

  showLoading() {}

  hideLoading() {}

  showError(message) {
    console.error(message);
  }

  #setupEventListeners() {
    const logoutButton = document.getElementById("logout-button");
    if (logoutButton) {
      logoutButton.addEventListener("click", () => {
        this.#presenter.logout();
      });
    }
  }

  async #setupPushNotification() {
    await registerServiceWorker();

    const pushNotificationTools = document.getElementById(
      "push-notification-tools"
    );
    const isSubscribed = await isCurrentPushSubscriptionAvailable();

    if (isSubscribed) {
      pushNotificationTools.innerHTML = generateUnsubscribeButtonTemplate();

      document
        .getElementById("unsubscribe-button")
        .addEventListener("click", () => {
          unsubscribe().finally(() => {
            this.#setupPushNotification();
          });
        });
    } else {
      pushNotificationTools.innerHTML = generateSubscribeButtonTemplate();

      document
        .getElementById("subscribe-button")
        .addEventListener("click", async () => {
          await subscribe();
          this.#setupPushNotification();
        });
    }
  }
}
