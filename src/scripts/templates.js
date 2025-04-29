import { showFormattedDate } from "./utils";

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
}) {
  return `
     <div id="${id}" class="story-card">
        <img src="${photoUrl}" alt="${name}" class="story-card__image"/>
        <h2 class="story-card__name">${name}</h2>
        <p class="story-card__description">${description}</p>
        <small class="story-card__created-at">${new Date(
          createdAt
        ).toLocaleString()}</small>
      </div>
  `;
}

// export function generateDamageLevelMinorTemplate() {
//   return `
//     <span class="report-detail__damage-level__minor" data-damage-level="minor">Kerusakan Rendah</span>
//   `;
// }

// export function generateDamageLevelModerateTemplate() {
//   return `
//     <span class="report-detail__damage-level__moderate" data-damage-level="moderate">Kerusakan Sedang</span>
//   `;
// }

// export function generateDamageLevelSevereTemplate() {
//   return `
//     <span class="report-detail__damage-level__severe" data-damage-level="severe">Kerusakan Berat</span>
//   `;
// }

// export function generateDamageLevelBadge(damageLevel) {
//   if (damageLevel === "minor") {
//     return generateDamageLevelMinorTemplate();
//   }

//   if (damageLevel === "moderate") {
//     return generateDamageLevelModerateTemplate();
//   }

//   if (damageLevel === "severe") {
//     return generateDamageLevelSevereTemplate();
//   }

//   return "";
// }

export function generateStoryDetailImageTemplate(imageUrl = null, alt = "") {
  if (!imageUrl) {
    return `
      <img class="report-detail__image" src="images/placeholder-image.jpg" alt="Placeholder Image">
    `;
  }

  return `
    <img class="report-detail__image" src="${imageUrl}" alt="${alt}">
  `;
}

// export function generateReportCommentItemTemplate({
//   photoUrlCommenter,
//   nameCommenter,
//   body,
// }) {
//   return `
//     <article tabindex="0" class="report-detail__comment-item">
//       <img
//         class="report-detail__comment-item__photo"
//         src="${photoUrlCommenter}"
//         alt="Commenter name: ${nameCommenter}"
//       >
//       <div class="report-detail__comment-item__body">
//         <div class="report-detail__comment-item__body__more-info">
//           <div class="report-detail__comment-item__body__author">${nameCommenter}</div>
//         </div>
//         <div class="report-detail__comment-item__body__text">${body}</div>
//       </div>
//     </article>
//   `;
// }

export function generateStoryDetailTemplate({
  title,
  description,
  damageLevel,
  evidenceImages,
  location,
  latitudeLocation,
  longitudeLocation,
  reporterName,
  createdAt,
}) {
  const createdAtFormatted = showFormattedDate(createdAt, "id-ID");
  const damageLevelBadge = generateDamageLevelBadge(damageLevel);
  const imagesHtml = evidenceImages.reduce(
    (accumulator, evidenceImage) =>
      accumulator.concat(
        generateReportDetailImageTemplate(evidenceImage, title)
      ),
    ""
  );

  return `
    <div class="report-detail__header">
      <h1 id="title" class="report-detail__title">${title}</h1>
 
      <div class="report-detail__more-info">
        <div class="report-detail__more-info__inline">
          <div id="createdat" class="report-detail__createdat" data-value="${createdAtFormatted}"><i class="fas fa-calendar-alt"></i></div>
          <div id="location-place-name" class="report-detail__location__place-name" data-value="${location.placeName}"><i class="fas fa-map"></i></div>
        </div>
        <div class="report-detail__more-info__inline">
          <div id="location-latitude" class="report-detail__location__latitude" data-value="${location.latitude}">Latitude:</div>
          <div id="location-longitude" class="report-detail__location__longitude" data-value="${location.longitude}">Longitude:</div>
        </div>
        <div id="author" class="report-detail__author" data-value="${reporterName}">Dilaporkan oleh:</div>
      </div>
 
      <div id="damage-level" class="report-detail__damage-level">
        ${damageLevelBadge}
      </div>
    </div>

    <div class="container">
      <div class="report-detail__images__container">
        <div id="images" class="report-detail__images">${imagesHtml}</div>
      </div>
    </div>

    <div class="container">
      <div class="report-detail__body">
        <div class="report-detail__body__description__container">
          <h2 class="report-detail__description__title">Informasi Lengkap</h2>
          <div id="description" class="report-detail__description__body">
            ${description}
          </div>
        </div>
        <div class="report-detail__body__map__container">
          <h2 class="report-detail__map__title">Peta Lokasi</h2>
          <div class="report-detail__map__container">
            <div id="map" class="report-detail__map"></div>
            <div id="map-loading-container"></div>
          </div>
        </div>
  
        <hr>
  
        <div class="report-detail__body__actions__container">
          <h2>Aksi</h2>
          <div class="report-detail__actions__buttons">
            <div id="save-actions-container"></div>
            <div id="notify-me-actions-container">
              <button id="report-detail-notify-me" class="btn btn-transparent">
                Try Notify Me <i class="far fa-bell"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
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

export function generateSaveStoriesButtonTemplate() {
  return `
    <button id="stories-detail-save" class="btn btn-transparent">
      Simpan laporan <i class="far fa-bookmark"></i>
    </button>
  `;
}

export function generateRemoveStoriesButtonTemplate() {
  return `
    <button id="stories-detail-remove" class="btn btn-transparent">
      Buang laporan <i class="fas fa-bookmark"></i>
    </button>
  `;
}
