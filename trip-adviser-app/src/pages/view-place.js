import { html, css, LitElement } from 'lit';
import PlacesService from '../services/places-service.js';
import importStyles from '../styles/import-styles.js';

import '../components/images-slider.js';
import '../components/rate.js';
import '../components/comments.js';
import '../components/loading.js';

export default class ViewPlacePage extends LitElement {
  static styles = css``;

  static properties = {
    place: { type: Object, state: true },
  };

  async firstUpdated() {
    const { params } = this;
    const { placeId } = params;

    this.place = await PlacesService.getPlace(placeId);
  }

  render() {
    const { place } = this;

    if (!place) {
      return html`<div class="p-10"></ta-loading></div>`;
    }

    return html`
      <div>
        <button
          class="flex gap-1 justify-center text-xs bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow mb-5 cursor-pointer"
          @click="${() =>
            this.dispatchEvent(
              new CustomEvent('navigateToPage', {
                detail: { pageKey: 'Places' },
                bubbles: true,
                composed: true,
              }),
            )}"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-left"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M5 12l14 0" />
            <path d="M5 12l4 4" />
            <path d="M5 12l4 -4" />
          </svg>
          Back to Places
        </button>
      </div>
      <div class="flex gap-2">
        <div class="w-1/3 rounded-md overflow-hidden">
          <ta-images-slider
            .placeId="${this.place._id}"
            .images="${this.place.images}"
          ></ta-images-slider>
        </div>
        <div class="flex flex-col gap-2 w-2/3">
          <div class="flex justify-between align-center">
            <h2 class="text-3xl font-bold">
              ${place.title}
              <span class="text-xl text-yellow-500">${place.country}</span>
            </h2>
            <div class="text-xs text-gray-500">
              <ta-rate></ta-rate>
              ${place.comments.length} comments
            </div>
          </div>
          <p class="mb-10">${place.description}</p>
          <div>
            <ta-comments
              .placeId=${place._id}
              .comments="${place.comments}"
            ></ta-comments>
          </div>
        </div>
      </div>

      ${importStyles()}
    `;
  }
}
