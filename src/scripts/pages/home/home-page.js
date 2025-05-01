import HomePresenter from "./home-presenter";
import * as MinitalesAPI from "../../data/api";
import Map from "../../utils/map";
import {
  generateLoaderAbsoluteTemplate,
  generateStoriesItemTemplate,
  generateStoriesListEmptyTemplate,
  generateStoriesListErrorTemplate,
} from "../../templates";

export default class HomePage {
  #presenter = null;
  #map = null;

  async render() {
    return `
     <section>
     
        <div class="stories-list__map__container">
          <div id="map" class="stories-list__map"></div>
          <div id="map-loading-container"></div>
        </div>
      </section>

      <section class="container">
        <h1 class="section-title">Stories : </h1>

        <div class="stories-list__container">
          <div id="stories-list"></div>
          <div id="stories-list-loading-container"></div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new HomePresenter({
      view: this,
      model: MinitalesAPI,
    });

    // await this.#presenter.getStoriesList();

    // with map
    await this.#presenter.initialStoriesAndMap();
  }

  populateStoriesList(stories) {
    if (!stories) {
      this.populateStoriesListEmpty();
      return;
    }

    const html = stories.reduce((accumulator, stories) => {
      if (this.#map) {
        const coordinate = [stories.lat, stories.lon];
        const markerOptions = { alt: stories.name };
        const popupOptions = { content: stories.description };

        this.#map.addMarker(coordinate, markerOptions, popupOptions);
      }
      return accumulator.concat(
        generateStoriesItemTemplate({
          id: stories.id,
          name: stories.name,
          description: stories.description,
          createdAt: stories.createdAt,
          location: { lat: stories.lat, lon: stories.lon },
          photoUrl: stories.photoUrl,
        })
      );
    }, "");

    document.getElementById("stories-list").innerHTML = `
      <div class="stories-list">${html}</div>
    `;
  }

  populateStoriesListEmpty() {
    document.getElementById("stories-list").innerHTML =
      generateStoriesListEmptyTemplate();
  }

  populateStoriesListError(message) {
    document.getElementById("stories-list").innerHTML =
      generateStoriesListErrorTemplate(message);
  }

  async initialMap() {
    this.#map = await Map.build("#map", {
      zoom: 10,
      locate: true,
    });
  }

  showMapLoading() {
    document.getElementById("map-loading-container").innerHTML =
      generateLoaderAbsoluteTemplate();
  }

  hideMapLoading() {
    document.getElementById("map-loading-container").innerHTML = "";
  }

  showLoading() {
    document.getElementById("stories-list-loading-container").innerHTML =
      generateLoaderAbsoluteTemplate();
  }

  hideLoading() {
    document.getElementById("stories-list-loading-container").innerHTML = "";
  }
}
