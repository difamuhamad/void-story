import {
  generateLoaderAbsoluteTemplate,
  generateRemoveStoryButtonTemplate,
  generateSaveStoryButtonTemplate,
  generateStoryDetailErrorTemplate,
  generateStoryDetailTemplate,
} from "../../templates";
import StoryDetailPresenter from "../story-detail/story-detail-presenter";
import { parseActivePathname } from "../../routes/url-parser";
import * as ModelData from "../../data/api";
import Map from "../../utils/map";
import Database from "../../data/database";

export default class StoryDetailPage {
  #presenter = null;
  #map = null;

  async render() {
    return `
            <section>
                <div class="story-detail__container">
                    <div id="story-detail" class="story-detail"></div>
                    <div id="story-detail-loading-container"></div>
                </div>
            </section>
        `;
  }

  async afterRender() {
    this.#presenter = new StoryDetailPresenter(parseActivePathname().id, {
      view: this,
      apiModel: ModelData,
      dbModel: Database,
    });

    this.#presenter.showStoryDetail();
  }

  async populateStoryDetailAndInitialMap(story) {
    document.getElementById("story-detail").innerHTML =
      generateStoryDetailTemplate({
        userName: story.name,
        description: story.description,
        image: story.photoUrl,
        createdAt: story.createdAt,
        location: story.location,
      });

    if (story.location.latitude !== null && story.location.longitude !== null) {
      try {
        await this.#presenter.showStoryDetailMap();

        if (this.#map) {
          const coordinate = [
            story.location.latitude,
            story.location.longitude,
          ];
          const markerOptions = { alt: story.description };
          const popupOptions = { content: story.description };

          this.#map.changeCamera(coordinate);
          this.#map.addMarker(coordinate, markerOptions, popupOptions);
        }
      } catch (error) {
        console.log("ShoStoryDetailMap Error :", error);
      }
    }

    this.#presenter.showSaveButton();
  }

  populateStoryDetailError(message) {
    document.getElementById("story-detail").innerHTML =
      generateStoryDetailErrorTemplate(message);
  }

  async initialMap() {
    this.#map = await Map.build("#map", {
      zoom: 15,
    });
  }

  renderSaveButton() {
    document.getElementById("save-actions-container").innerHTML =
      generateSaveStoryButtonTemplate();

    document
      .getElementById("story-detail-save")
      .addEventListener("click", async () => {
        await this.#presenter.saveStory();
        await this.#presenter.showSaveButton();
      });
  }

  renderRemoveButton() {
    document.getElementById("save-actions-container").innerHTML =
      generateRemoveStoryButtonTemplate();

    document
      .getElementById("story-detail-remove")
      .addEventListener("click", async () => {
        await this.#presenter.removeStory();
        await this.#presenter.showSaveButton();
      });
  }

  saveToBookmarkSuccessfully(message) {
    alert(`Success : ${message}`);
  }

  saveToBookmarkFailed(message) {
    alert(`Failed: ${message}`);
  }
  removeFromBookmarkSuccessfully(message) {
    alert(`Success : ${message}`);
  }

  removeFromBookmarkFailed(message) {
    alert(`Failed : ${message}`);
  }

  showStoryDetailLoading() {
    document.getElementById("story-detail-loading-container").innerHTML =
      generateLoaderAbsoluteTemplate();
  }

  hideStoryDetailLoading() {
    document.getElementById("story-detail-loading-container").innerHTML = "";
  }

  showMapLoading() {
    document.getElementById("map-loading-container").innerHTML =
      generateLoaderAbsoluteTemplate();
  }

  hideMapLoading() {
    document.getElementById("map-loading-container").innerHTML = "";
  }
}
