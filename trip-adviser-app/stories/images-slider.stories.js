import { html } from 'lit';

import '../src/components/images-slider.js';

export default {
  title: 'Images Slider',
  component: 'ra-images-slider',
  argTypes: {
    images: { control: 'array' },
  },
};

function Template({ images }) {
  return html`
    <ta-images-slider
      .placeId=${'68624442666a8a840f7c05c1'}
      .images=${images}
    ></ta-images-slider>
  `;
}

export const Default = Template.bind({});

Default.args = {
  images: [
    'https://picsum.photos/700/400',
    'https://picsum.photos/700/400',
    'https://picsum.photos/700/400',
  ],
};
