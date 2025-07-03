import { html, render } from 'lit';
import './src/trip-adviser-app.js';

render(
  html`<trip-adviser-app></trip-adviser-app>`,
  document.querySelector('#app'),
);
