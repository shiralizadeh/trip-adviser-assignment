import { LitElement, css, html } from 'lit';
import importStyles from '../styles/import-styles.js';

import './rate.js';

export default class PlaceCardComponent extends LitElement {
  static styles = css``;

  static properties = {
    index: { type: Number },
    place: { type: Object },
  };

  render() {
    const { place } = this;

    return html`
      <button
        class="bg-white hover:bg-orange-100 rounded-md shadow hover:shadow-lg cursor-pointer overflow-hidden w-full"
        tabindex="0"
        @click=${() => {
          this.dispatchEvent(
            new CustomEvent('view-place', {
              detail: { placeId: place._id },
            }),
          );
        }}
      >
        <div class="relative">
          <img
            src="${place.cardImage}?random=${place._id}"
            alt="${place.title}"
            class="block"
          />
          <span
            class="absolute bottom-2 right-2 bg-green-200 opacity-75 text-xs px-3 py-1 rounded"
            >${place.country}</span
          >
        </div>
        <div class="flex items-center justify-between p-4 font-light">
          <span>${place.title}</span>
          <span class="text-xs">
            <span class="text-yellow-500">
              <ta-rate></ta-rate>
            </span>
            <span class="text-gray-500">${place.commentsCount} comments</span>
          </span>
        </div>
      </button>

      ${importStyles()}
    `;
  }
}

customElements.define('ta-place-card', PlaceCardComponent);
