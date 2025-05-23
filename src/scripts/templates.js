import { showFormattedDate } from "./utils";

export function generateAuthenticatedNavbarTemplate() {
  return `
    <li><a href="#/">Home</a></li>
    <li><a href="#/story">Add Story</a></li>
    <li><a href="#/about">About</a></li>
    <li><a href="#/profile">Profile</a></li>
  `;
}

export function generateUnauthenticatedNavbarTemplate() {
  return `
    <li><a href="#/about">About</a></li>
    <li><a href="#/register" class="auth-button">Register</a></li>
  `;
}

export function generateLoaderTemplate() {
  return `
    <div class="loader"></div>
  `;
}

export function generateLoaderAbsoluteTemplate() {
  return `
    <div class="loader loader-absolute"></div>
  `;
}

export function generateUnauthenticatedNavigationListTemplate() {
  return `
    <li id="push-notification-tools" class="push-notification-tools"></li>
    <li><a id="login-button" href="#/login">Login</a></li>
    <li><a id="register-button" href="#/register">Register</a></li>
  `;
}

export function generateAuthenticatedNavigationListTemplate() {
  return `
    <li id="push-notification-tools" class="push-notification-tools"></li>
    <li><a id="new-report-button" class="btn new-report-button" href="#/new">Buat Laporan <i class="fas fa-plus"></i></a></li>
    <li><a id="logout-button" class="logout-button" href="#/logout"><i class="fas fa-sign-out-alt"></i> Logout</a></li>
  `;
}

export function generateStoriesListEmptyTemplate() {
  return `
    <div id="stories-list-empty" class="stories-list__empty">
      <p>No story data available.</p>
    </div>
  `;
}

export function generateStoriesListErrorTemplate(message) {
  return `
    <div id="stories-list-error" class="stories-list__error">
      <h2>Error while fetching story</h2>
      <p>${message ? message : "Check your connection and try again"}</p>
      </div>
      `;
}

export function generateStoriesItemTemplate({
  id,
  name,
  description,
  createdAt,
  photoUrl,
  role = "article",
  ariaPosinset,
}) {
  return `
     <div id="${id}" 
        class="story-card
        role="${role}"
        tabindex="0"
        aria-posinset="${ariaPosinset}"
        aria-setsize="10"
        >
        <a class="story-details" href="#/story/${id}">
        <img src="${photoUrl}" alt="${name}" class="story-card__image"/>
        <h2 class="story-card__name">${name}</h2>
        <p class="story-card__description">${description}</p>
        <small class="story-card__created-at">${new Date(
          createdAt
        ).toLocaleString()}</small>
            <a class="story-details-link" href="#/story/${id}">Details
            </a>
        </a>
        </div>
  `;
}

export function generateSubscribeButtonTemplate() {
  return `
    <button id="subscribe-button" class="btn subscribe-button">
      Subscribe <i class="fas fa-bell"></i>
    </button>
  `;
}

export function generateUnsubscribeButtonTemplate() {
  return `
    <button id="unsubscribe-button" class="btn unsubscribe-button">
      Unsubscribe <i class="fas fa-bell-slash"></i>
    </button>
  `;
}

export function generateStoryDetailTemplate({
  image,
  description,
  location,
  userName,
  createdAt,
}) {
  const createdAtFormatted = showFormattedDate(createdAt, "id-ID");
  const imageHtml = generateImageDetailTemplate(image);

  return `
      <div class="container">
      <div class="story-detail__body">
      <div class="story-detail__images__container">
          <div id="image" class="story-detail__image">${imageHtml}</div>
      </div>
              <div class="story-detail__more-info">
                  <div class="story-detail__more-info__inline">
                    <div id="createdat" class="story-detail__createdat" data-value="${createdAtFormatted}"><i class="fas fa-calendar-alt"></i></div>
                    <div id="location-place-name" class="story-detail__location__place-name" data-value="${location.placeName}"><i class="fas fa-map"></i></div>
                  </div>
                 
                  <div id="author" class="story-detail__author">Created by user : <span>${userName}</span></div>
            </div>
            
            <div class="story-detail__body__description__container">
              <h2 class="story-detail__description__title">Description :</h2>
              <div id="description" class="story-detail__description__body">
                ${description}
              </div>
            </div>
            
             <div class="story-detail__body__map__container">
                <h2 class="story-detail__map__title">Location :</h2>
                <div class="story-detail__map__container">
                  <div id="map" class="story-detail__map"></div>
                  <div id="map-loading-container"></div>
                  </div>
                  <div class="story-detail__more-info__inline">
                   <div id="location-latitude" class="story-detail__location__latitude">Latitude: ${location.latitude}</div>
                   <div id="location-longitude" class="story-detail__location__longitude">Longitude: ${location.longitude}</div>
                 </div>
             </div>
             <hr>

             <div class="story-detail__body__actions__container">
               <div class="story-detail__actions__buttons">
                 <div id="save-actions-container"></div>
               </div>
             </div>
          </div>
      </div>
  `;
}

export function generateStoryDetailErrorTemplate(message) {
  return `
  <div id="story-detail-error" class="story-detail__error">
    <h2>Failed getting detail story</h2>
    <p>${message}</p>
  </div>
`;
}

export function generateSaveStoryButtonTemplate() {
  return `
  <button id="story-detail-save">
    Save this story <i class="far fa-bookmark"></i>
  </button>
`;
}

export function generateRemoveStoryButtonTemplate() {
  return `
  <button id="story-detail-remove">
    Remove Story <i class="fas fa-bookmark"></i>
  </button>
`;
}

export function generateImageDetailTemplate(imageUrl = null, alt = "") {
  if (!imageUrl) {
    return `<img class="story-detail__image" src="" alt="Placeholder Image">`;
  }

  return `
      <img class="story-detail__image" src="${imageUrl}" alt="${alt}">
  `;
}
