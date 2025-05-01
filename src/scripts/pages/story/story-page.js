import * as MinitalesAPI from "../../data/api";
import StoryPresenter from "./story-presenter";
import { convertBase64ToBlob } from "../../utils";
import { generateLoaderAbsoluteTemplate } from "../../templates";
import Camera from "../../utils/camera";
import Map from "../../utils/map";

export default class StoryPage {
  #presenter;
  #form;
  #camera;
  #isCameraOpen = false;
  #takenImage = null;
  #map = null;

  async render() {
    return `
           <section>
  <div class="new-story__header">
    <div class="container">
      <h1 class="new-story__header__title">Upload your new story</h1>
    </div>
  </div>
</section>

<section class="container">
  <div class="new-form__container">
    <form id="new-form" class="new-form">
      
      <div class="form-control">
        <label for="image-input" class="new-form__image__title sr-only">Upload image from local</label>
        <div class="new-form__image__container">
          <div class="new-form__image__buttons">
            <button id="image-input-button" class="btn" type="button" aria-describedby="image-more-info">
              Upload Image
            </button>
            <input
              id="image-input"
              class="new-form__image__input"
              name="image"
              type="file"
              accept="image/*"
              aria-describedby="image-more-info"
              hidden
            >
            <button id="open-image-camera-button" class="btn" type="button" aria-label="Open Camera to capture image">
              Open Camera
            </button>
          </div>

          <div id="camera-container" class="new-form__camera__container">
            <video id="camera-video" class="new-form__camera__video" aria-label="Camera preview">
              video stream not available.
            </video>
            <canvas id="camera-canvas" class="new-form__camera__canvas"></canvas>

            <div class="new-form__camera__tools">
              <label for="camera-select" class="sr-only">Select Camera</label>
              <select id="camera-select"></select>
              <div class="new-form__camera__tools_buttons">
                <button id="camera-take-button" type="button" class="btn" aria-label="Capture image from camera">
                  Capture
                </button>
              </div>
            </div>
          </div>

          <ul id="image-taken" class="new-form__image__outputs" aria-live="polite" role="status"></ul>
        </div>
      </div>

      <div class="form-control description-title-container">
        <label for="description-input" class="new-form__description__title">Description</label>
        <div class="new-form__description__container">
          <textarea
            id="description-input"
            name="description"
            placeholder="Enter description here..."
          ></textarea>
        </div>
      </div>

      <div class="form-control">
        <div class="new-form__location__title" id="location-label">Location:</div>
        <div class="new-form__location__container">
          <div class="new-form__location__map__container" aria-labelledby="location-label">
            <div id="map" class="new-form__location__map" role="application" aria-label="Interactive map to pick location"></div>
            <div id="map-loading-container" aria-live="polite" role="status"></div>
          </div>
          <div class="new-form__location__lat-lng">
            <input type="number" class="hidden-input" name="lat" value="-6.175389" readonly aria-label="Latitude">
            <input type="number" class="hidden-input" name="lon" value="106.827139" readonly aria-label="Longitude">
          </div>
        </div>
      </div>

      <div class="form-buttons">
        <span id="submit-button-container">
          <button class="new-form__submit-button" type="submit">
            Upload Story
          </button>
        </span>
      </div>
    </form>
  </div>
</section>

        `;
  }

  async afterRender() {
    this.#presenter = new StoryPresenter({
      view: this,
      model: MinitalesAPI,
    });

    this.#presenter.showNewFormMap();
    this.#setupForm();
  }

  #setupForm() {
    this.#form = document.getElementById("new-form");
    this.#form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const data = {
        image: this.#takenImage ? this.#takenImage.blob : null,
        description: this.#form.elements.namedItem("description").value,
        lat: this.#form.elements.namedItem("lat").value,
        lon: this.#form.elements.namedItem("lon").value,
      };

      await this.#presenter.uploadStory(data);
    });

    document
      .getElementById("image-input")
      .addEventListener("change", async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        await this.#addTakenPicture(file);
        await this.#populateTakenPicture();
      });

    document
      .getElementById("image-input-button")
      .addEventListener("click", () => {
        this.#form.elements.namedItem("image").click();
      });

    const cameraContainer = document.getElementById("camera-container");
    document
      .getElementById("open-image-camera-button")
      .addEventListener("click", async (event) => {
        cameraContainer.classList.toggle("open");

        this.#isCameraOpen = cameraContainer.classList.contains("open");
        if (this.#isCameraOpen) {
          event.currentTarget.textContent = "Turn Off Camera";
          this.#setupCamera();
          this.#camera.launch();

          return;
        }

        event.currentTarget.textContent = "Open Camera";
        this.#camera.stop();
      });
  }

  async initialMap() {
    this.#map = await Map.build("#map", {
      zoom: 15,
      locate: true,
    });

    const centerCoordinate = this.#map.getCenter();

    this.#updateLatLonInput(
      centerCoordinate.latitude,
      centerCoordinate.longitude
    );

    const draggableMarker = this.#map.addMarker(
      [centerCoordinate.latitude, centerCoordinate.longitude],
      { draggable: true }
    );

    draggableMarker.addEventListener("move", (event) => {
      const coordinate = event.target.getLatLng();
      this.#updateLatLonInput(coordinate.lat, coordinate.lng);
    });

    this.#map.addMapEventListener("click", (event) => {
      draggableMarker.setLatLng(event.latlng);

      this.#map.changeCamera(event.latlng);
    });
  }

  #updateLatLonInput(lat, lon) {
    this.#form.elements.namedItem("lat").value = lat;
    this.#form.elements.namedItem("lon").value = lon;
  }

  #setupCamera() {
    if (this.#camera) {
      return;
    }

    this.#camera = new Camera({
      video: document.getElementById("camera-video"),
      cameraSelect: document.getElementById("camera-select"),
      canvas: document.getElementById("camera-canvas"),
    });

    this.#camera.addCheeseButtonListener("#camera-take-button", async () => {
      const image = await this.#camera.takePicture();
      await this.#addTakenPicture(image);
      await this.#populateTakenPicture();
    });
  }

  async #addTakenPicture(image) {
    let blob = image;

    if (typeof image === "string") {
      blob = await convertBase64ToBlob(image, "image/png");
    }

    if (!(blob instanceof Blob)) {
      console.error("Error Invalid blob:", blob);
      return;
    }

    this.#takenImage = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      blob: blob,
    };
  }

  async #populateTakenPicture() {
    if (!this.#takenImage || !this.#takenImage.blob) {
      console.error("Error: Blob is not available!", this.#takenImage);
      return;
    }

    const imageUrl = URL.createObjectURL(this.#takenImage.blob);
    document.getElementById("image-taken").innerHTML = `
            <li class="new-form__image__outputs-item">
              <button type="button" id="delete-picture-button" class="new-form__image__outputs-item__delete-btn">
                <img src="${imageUrl}" alt="image">
              </button>
            </li>
        `;

    document;
    document
      .getElementById("delete-picture-button")
      .addEventListener("click", () => {
        this.#removePicture();
        document.getElementById("image-taken").innerHTML = "";
      });
  }

  #removePicture() {
    this.#takenImage = null;
  }

  storeSuccessfully(message) {
    console.log(message);
    this.clearForm();

    location.href = "/";
  }

  storeFailed(message) {
    alert(message);
  }

  clearForm() {
    this.#form.reset();
  }

  showLoadingMap() {
    document.getElementById("map-loading-container").innerHTML =
      generateLoaderAbsoluteTemplate();
  }

  hideLoadingMap() {
    document.getElementById("map-loading-container").innerHTML = "";
  }

  showSubmitLoadingButton() {
    document.getElementById("submit-button-container").innerHTML = `
          <button class="btn" type="submit" disabled>
            <i class="fas fa-spinner loader-button"></i> Uploading...
          </button>
        `;
  }

  hideSubmitLoadingButton() {
    document.getElementById("submit-button-container").innerHTML = `
            <button class="new-form__submit-button" type="submit">
            Upload Story
          </button>
        `;
  }
}
