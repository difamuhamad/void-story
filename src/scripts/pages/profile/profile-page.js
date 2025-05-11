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

export default class ProfilePage {
  #presenter;

  async render() {
    return `
    <section class="container">
      <div id="push-notification-tools" class="push-notification-tools">
        <!-- Tombol akan dimasukkan di sini oleh setupPushNotification -->
      </div>
    </section>
    `;
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

  async afterRender() {
    if (isServiceWorkerAvailable()) {
      await this.#setupPushNotification();
    }
  }
}
