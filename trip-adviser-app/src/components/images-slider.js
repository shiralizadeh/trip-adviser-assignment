import { LitElement, css, html } from 'lit';
import Swiper from 'swiper';

import importStyles from '../styles/import-styles.js';

export default class ImagesSliderComponent extends LitElement {
  static styles = css`
    .swiper {
      width: 700px;
      height: 400px;
    }
  `;

  properties = {
    placeId: { type: Number },
    images: { type: Array },
  };

  firstUpdated() {
    const root = this.renderRoot.querySelector('.swiper');

    // eslint-disable-next-line no-new
    new Swiper(root, {
      autoplay: {
        delay: 3000,
      },
      loop: true,
    });
  }

  render() {
    const { placeId, images } = this;

    return html`
      <div class="swiper bg-gray-300">
        <div class="swiper-wrapper">
          ${images.map(
            (image, index) => html`
              <div class="swiper-slide">
                <img src="${image}?random=${placeId}-${index}" alt="" />
              </div>
            `,
          )}
        </div>
      </div>

      ${importStyles()}
    `;
  }
}

customElements.define('ta-images-slider', ImagesSliderComponent);
