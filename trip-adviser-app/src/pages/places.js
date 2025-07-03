import { html, css, LitElement } from 'lit';
import PlacesService from '../services/places-service.js';
import importStyles from '../styles/import-styles.js';

import '../components/loading.js';
import '../components/place-card.js';

export default class PlacesPage extends LitElement {
  static styles = css``;

  static properties = {
    isLoading: { type: Boolean, state: true },
    places: { type: Array, state: true },
  };

  connectedCallback() {
    super.connectedCallback();

    this.loadPlaces();
  }

  loadPlaces() {
    this.places = [];
    this.isLoading = true;

    PlacesService.getPlaces()
      .then(places => {
        this.places = places;
        this.isLoading = false;
      })
      .catch(error => {
        console.error('Error fetching places:', error);
      });
  }

  render() {
    const { isLoading, places } = this;

    return html`
      ${isLoading
        ? html`<div class="m-10"></div><ta-loading></ta-loading></div>`
        : undefined}

      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        ${places.map(
          place =>
            html`<ta-place-card
              .place=${place}
              @click=${() =>
                this.dispatchEvent(
                  new CustomEvent('navigateToPage', {
                    detail: {
                      pageKey: 'View-Place',
                      params: { placeId: place._id },
                    },
                    bubbles: true,
                    composed: true,
                  }),
                )}
            ></ta-place-card>`,
        )}
      </div>

      ${importStyles()}
    `;
  }
}
