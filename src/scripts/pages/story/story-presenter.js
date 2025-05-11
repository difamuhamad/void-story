export default class StoryPresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async showNewFormMap() {
    this.#view.showLoadingMap();
    try {
      await this.#view.initialMap();
    } catch (error) {
      console.error("showNewFormMap: error:", error);
    } finally {
      this.#view.hideLoadingMap();
    }
  }

  async uploadStory({ image, description, lat, lon }) {
    this.#view.showSubmitLoadingButton();
    try {
      const data = {
        image: image,
        description: description,
        lat: lat,
        lon: lon,
      };
      const response = await this.#model.postNewStory(data);

      if (response.error) {
        console.error("Post story error message:", response);
        this.#view.storeFailed(response.message);
        return;
      }

      this.#view.storeSuccessfully(response.message, response.data);
    } catch (error) {
      console.error("Post story error message:", error);
      this.#view.storeFailed(error.message);
    } finally {
      this.#view.hideSubmitLoadingButton();
    }
  }
}
