import { getPushSubscription, subscribe } from "../../utils/helper";
export default class ProfilePresenter {
  #apiModel;

  constructor({ apiModel }) {
    this.#apiModel = apiModel;
  }

  async notifyMe() {
    try {
      const response = await subscribe();
      console.log(response);
      if (response.error === true) {
        console.error("notifyMe: response:", response);
        return;
      }
      console.log("notifyMe:", response.message);
    } catch (error) {
      console.error("notifyMe: error:", error);
    }
  }
}
