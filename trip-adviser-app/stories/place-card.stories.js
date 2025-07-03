import { html } from 'lit';

import '../src/components/place-card.js';

export default {
  title: 'Place Card',
  component: 'ra-place-card',
  argTypes: {
    place: { control: 'object' },
  },
};

const MOCK_PLACE = {
  _id: '6a8ac05c18468624442660f7',
  title: 'Eiffel Tower',
  country: 'France',
  cardImage: 'https://picsum.photos/700/400',
  commentsCount: 1,
};

function Template({ place }) {
  return html`<div style="width: 400px;">
    <ta-place-card .place="${place}"></ta-place-card>
  </div>`;
}

export const Default = Template.bind({});
Default.args = {
  place: MOCK_PLACE,
};
