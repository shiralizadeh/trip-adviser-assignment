import { html } from 'lit';

import '../src/components/loading.js';

export default {
  title: 'Loading',
  component: 'ra-loading',
  argTypes: {},
};

function Template() {
  return html`<ta-loading></ta-loading> `;
}

export const Default = Template.bind({});
