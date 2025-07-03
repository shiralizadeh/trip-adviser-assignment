import { html, css, LitElement } from 'lit';

import importStyles from '../styles/import-styles.js';

export default class ViewPlacePage extends LitElement {
  static styles = css``;

  static properties = {};

  render() {
    return html`
      <div>
        <h1>Welcome to Trip Adviser!</h1>
      </div>

      ${importStyles()}
    `;
  }
}
