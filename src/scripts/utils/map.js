import {
  map,
  tileLayer,
  Icon,
  icon,
  marker,
  popup,
  latLng,
  control,
} from "leaflet";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import CONFIG from "../config";
import { city } from "../data/city";

export default class Map {
  #zoom = 5;
  #map = null;

  static isGeolocationAvailable() {
    return "geolocation" in navigator;
  }

  static getCurrentPosition(options = {}) {
    return new Promise((resolve, reject) => {
      if (!Map.isGeolocationAvailable()) {
        reject("Geolocation API unsupported");
        return;
      }

      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }

  static async build(selector, options = {}) {
    if ("center" in options && options.center) {
      return new Map(selector, options);
    }

    const bandungCoordinate = [-6.9175, 107.6191];

    if ("locate" in options && options.locate) {
      try {
        const position = await Map.getCurrentPosition();
        const coordinate = [
          position.coords.latitude,
          position.coords.longitude,
        ];

        return new Map(selector, {
          ...options,
          center: coordinate,
        });
      } catch (error) {
        console.error("build: error:", error);
        return new Map(selector, {
          ...options,
          center: bandungCoordinate,
        });
      }
    }

    return new Map(selector, {
      ...options,
      center: bandungCoordinate,
    });
  }

  addMapEventListener(eventName, callback) {
    this.#map.addEventListener(eventName, callback);
  }

  constructor(selector, options = {}) {
    this.#zoom = options.zoom ?? this.#zoom;

    const tileOsm = tileLayer(
      "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
      }
    );

    const tileSatellite = tileLayer(
      `https://api.maptiler.com/maps/satellite/{z}/{x}/{y}.jpg?key=${CONFIG.MAP_SERVICE_API_KEY}`,
      {
        attribution:
          '&copy; <a href="https://www.maptiler.com/" target="_blank">MapTiler</a> contributors',
      }
    );

    this.#map = map(document.querySelector(selector), {
      zoom: this.#zoom,
      scrollWheelZoom: true,
      layers: [tileOsm],
      keyboard: false,
      ...options,
    });

    const baseMaps = {
      Default: tileOsm,
      "Satelite View": tileSatellite,
    };

    const overlayMaps = {
      City: city,
    };

    control.layers(baseMaps, overlayMaps).addTo(this.#map);
  }

  changeCamera(coordinate, zoomLevel = null) {
    if (!zoomLevel) {
      this.#map.setView(latLng(coordinate), this.#zoom);
      return;
    }
    this.#map.setView(latLng(coordinate), zoomLevel);
  }

  getCenter() {
    const { lat, lng } = this.#map.getCenter();
    return {
      latitude: lat,
      longitude: lng,
    };
  }

  createIcon(options = {}) {
    return icon({
      ...Icon.Default.prototype.options,
      iconUrl:
        "https://preview.redd.it/2yv5x9hto5f61.png?width=341&format=png&auto=webp&s=eccf34f646917d5a7c0196de5c2fc2e7ef3e2427",
      shadowUrl: markerShadow,
      iconSize: [35, 40],
      ...options,
    });
  }

  addMarker(coordinates, markerOptions = {}, popupOptions = null) {
    if (typeof markerOptions !== "object") {
      throw new Error("markerOptions must be an object");
    }

    const newMarker = marker(coordinates, {
      icon: this.createIcon(),
      keyboard: false,
      ...markerOptions,
    });

    if (popupOptions) {
      if (typeof popupOptions !== "object") {
        throw new Error("popupOptions must be an object");
      }

      if (!("content" in popupOptions)) {
        throw new Error("popupOptions must include `content` property.");
      }
      const newPopup = popup(popupOptions);
      newMarker.bindPopup(newPopup);
    }

    newMarker.addTo(this.#map);
    return newMarker;
  }
}
