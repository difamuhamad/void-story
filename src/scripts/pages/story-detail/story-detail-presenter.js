import { storyMapper } from "../../utils/map";

export default class StoryDetailPresenter {
  #storyId;
  #view;
  #apiModel;
  #dbModel;

  constructor(storyId, { view, apiModel, dbModel }) {
    this.#storyId = storyId;
    this.#view = view;
    this.#apiModel = apiModel;
    this.#dbModel = dbModel;
  }

  async showStoryDetailMap() {
    this.#view.showMapLoading();
    try {
      await this.#view.initialMap();
    } catch (error) {
      console.error("showDetailMap error", error);
    } finally {
      this.#view.hideMapLoading();
    }
  }

  async showStoryDetail() {
    this.#view.showStoryDetailLoading();

    try {
      console.log("Getiing story detail...");
      const response = await this.#apiModel.getStoryDetail(this.#storyId);

      if (response.error) {
        console.error("Get Story detail error :", response);
        this.#view.populateStoryDetailError(response.message);
        return;
      }

      const story = await storyMapper(response.data);

      this.#view.populateStoryDetailAndInitialMap(story);
    } catch (error) {
      console.error("Story and map : ", error);
      this.#view.populateStoryDetailError(error.message);
    } finally {
      this.#view.hideStoryDetailLoading();
    }
  }

  async saveStory() {
    try {
      const response = await this.#apiModel.getStoryDetail(this.#storyId);
      // console.log("Story to save:", response.data);

      await this.#dbModel.putStory(response.data);

      this.#view.saveToBookmarkSuccessfully("Story has been saved");
    } catch (error) {
      console.error("Save story", error);
      this.#view.saveToBookmarkFailed(error.message);
    }
  }

  async removeStory() {
    try {
      await this.#dbModel.removeStory(this.#storyId);

      this.#view.removeFromBookmarkSuccessfully("Removed story from bookmark");
    } catch (error) {
      console.error("Remove story error :", error);
      this.#view.removeFromBookmarkFailed(error.message);
    }
  }

  async showSaveButton() {
    if (await this.#isStorySaved()) {
      this.#view.renderRemoveButton();
      return;
    }

    this.#view.renderSaveButton();
  }

  async removeStory() {
    try {
      await this.#dbModel.removeStory(this.#storyId);

      this.#view.removeFromBookmarkSuccessfully("Removed story from bookmark");
    } catch (error) {
      console.error("RemoveStory errror :", error);
      this.#view.removeFromBookmarkFailed(error.message);
    }
  }

  async #isStorySaved() {
    return !!(await this.#dbModel.getStoryById(this.#storyId));
  }
}
