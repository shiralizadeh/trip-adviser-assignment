import { html } from 'lit';

import '../src/components/comments.js';

export default {
  title: 'Comments',
  component: 'ra-comments',
  argTypes: {
    placeId: { control: 'string', readonly: true },
    comments: { control: 'object' },
  },
};

const MOCK_PLACE = {
  _id: '6a8ac05c18468624442660f7',
  comments: [
    {
      name: 'Carla',
      date: 1751277039003,
      rate: 5,
      text: 'Loved the guided tour.',
      isApproved: true,
      _id: '9de81f7190834fcb908ea1aa',
    },
    {
      name: 'Cathy',
      date: 1751277409050,
      rate: 5,
      text: 'A bit crowded but worth it.',
      isApproved: true,
      _id: 'e456c8d59d554fe8890916e7',
    },
    {
      name: 'Derek',
      date: 1751277409050,
      rate: 5,
      text: 'Enjoyed every moment there.',
      isApproved: true,
      _id: 'e0498d89e1eb4fa092c11712',
    },
    {
      name: 'Anna',
      date: 1751277409050,
      rate: 4,
      text: 'Stunning views and great atmosphere.',
      isApproved: true,
      _id: '50ee68d9b9b6435d8c6a10e4',
    },
  ],
};

function Template({ placeId, comments }) {
  return html`
    <div style="width: 800px;">
      <ta-comments .placeId="${placeId}" .comments="${comments}"></ta-comments>
    </div>
  `;
}

export const Default = Template.bind({});
Default.args = {
  placeId: MOCK_PLACE._id,
  comments: MOCK_PLACE.comments,
};
