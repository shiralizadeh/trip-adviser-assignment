import { html, css, LitElement } from 'lit';

import importStyles from '../styles/import-styles.js';

export default class ManagePlacesPage extends LitElement {
  static styles = css``;

  static properties = {};

  render() {
    return html`
      <div>Manage Places</div>
      ${importStyles()}
    `;
  }
}
