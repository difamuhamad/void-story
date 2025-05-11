// import { showFormattedDate } from "./utils";

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

export function generateMainNavigationListTemplate() {
  return `
    <li><a id="report-list-button" class="report-list-button" href="#/">Daftar Laporan</a></li>
    <li><a id="bookmark-button" class="bookmark-button" href="#/bookmark">Laporan Tersimpan</a></li>
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
      <h2>Dunia sedang sibuk :)</h2>
      <p>Saat ini, tidak ada story yang dapat ditampilkan.</p>
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

export function generateStoryDetailErrorTemplate(message) {
  return `
      <div id="stories-detail-error" class="stories-detail__error">
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
          <img src="${photoUrl}" alt="${name}" class="story-card__image"/>
          <h2 class="story-card__name">${name}</h2>
          <p class="story-card__description">${description}</p>
          <small class="story-card__created-at">${new Date(
            createdAt
          ).toLocaleString()}</small>
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
