export default class HomePresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
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

  async initialStoriesAndMap() {
    this.#view.showLoading();
    try {
      await this.showStoriesListMap();

      const response = await this.#model.getAllStories();
      const stories = response.storyList;
      console.log("Ini ada boos: ", stories);

      if (!stories) {
        console.error("Init Story: error:", stories);
        // this.#view.populateStoriesListError(stories.message);
        return;
      }

      this.#view.populateStoriesList(stories);
    } catch (error) {
      console.error("Populate story: error:", error);
      // this.#view.populateReportsListError(error.message);
    } finally {
      this.#view.hideLoading();
    }
  }
}
