import { LitElement, html, css } from 'lit';

export default class LoadingComponent extends LitElement {
  static styles = css`
    .loading-bar {
      width: 130px;
      height: 5px;
      margin: 0 auto;
      border-radius: 2px;
      background-color: #fff;
      position: relative;
      overflow: hidden;
      z-index: 1;
      transform: rotateY(0);
      transition: transform 0.3s ease-in;
    }

    .blue-bar {
      height: 100%;
      width: 68px;
      position: absolute;
      transform: translate(-34px);
      background-color: #0a66c2;
      border-radius: 2px;
      animation: initial-loading 1.5s ease infinite;
    }

    @keyframes initial-loading {
      0% {
        transform: translate(-34px);
      }

      50% {
        transform: translate(96px);
      }

      to {
        transform: translate(-34px);
      }
    }
  `;

  render() {
    return html`
      <div class="loading-bar">
        <div class="blue-bar"></div>
      </div>
    `;
  }
}

customElements.define('ta-loading', LoadingComponent);
