import { html } from 'lit';

import '../src/components/rate.js';

export default {
  title: 'Rate',
  component: 'ra-rate',
  argTypes: {
    rate: { control: 'number' },
    editable: { control: 'boolean' },
  },
};

function Template({ rate, editable }) {
  return html` <ta-rate .rate="${rate}" .editable="${editable}"></ta-rate> `;
}

export const Default = Template.bind({});

export const WithRateValue = Template.bind({});
WithRateValue.args = {
  rate: 3,
};

export const Editable = Template.bind({});
Editable.args = {
  editable: true,
};
