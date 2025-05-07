export default class HomePresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async initialStoriesAndMap() {
    this.#view.showLoading();
    try {
      await this.showStoriesListMap();

      const response = await this.#model.getAllStories();
      const stories = response.storyList;

      if (!stories) {
        console.error("Init Story: error:", stories);
        return;
      }

      this.#view.populateStoriesList(stories);
    } catch (error) {
      console.error("Populate story: error:", error);
    } finally {
      this.#view.hideLoading();
    }
  }

  async showStoriesListMap() {
    this.#view.showMapLoading();
    try {
      await this.#view.initialMap();
    } catch (error) {
      console.error("showStoriesListMap: error:", error);
    } finally {
      this.#view.hideMapLoading();
    }
  }
}
