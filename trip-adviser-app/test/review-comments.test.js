import { html, fixture, expect } from '@open-wc/testing';
import sinon from 'sinon';

import ReviewCommentsPage from '../src/pages/review-comments.js';
import CommentsService from '../src/services/comments-service.js';

customElements.define('review-comments-page', ReviewCommentsPage);

describe('ReviewCommentsPage', () => {
  let getReviewCommentsStub;
  let approveCommentStub;

  const mockComments = [
    {
      _id: '68624442666a8a840f7c05c1',
      title: 'Eiffel Tower',
      comments: [
        {
          name: 'Will',
          date: 1751277039023,
          rate: 5,
          text: 'Great for hiking.',
          isApproved: null,
          _id: 'fb6e912276d140a297d2d8f5',
        },
        {
          name: 'Xena',
          date: 1751277039024,
          rate: 4,
          text: 'Amazing scenery.',
          isApproved: null,
          _id: 'd6be96b3f47246b6b7621c51',
        },
        {
          name: 'Iris',
          date: 1751277409050,
          rate: 5,
          text: "I didn't like it.",
          isApproved: null,
          _id: '4448599322f84a39877ff041',
        },
      ],
    },
    {
      _id: '68624455666a8a840f7c05c2',
      title: 'Mont Saint-Michel',
      comments: [
        {
          name: 'Jake',
          date: 1751277409050,
          rate: 4,
          text: 'Great place to take photos.',
          isApproved: null,
          _id: '75c9430882d24415bf0a1e7e',
        },
        {
          name: 'Jake',
          date: 1751277409050,
          rate: 5,
          text: 'Perfect for a day trip.',
          isApproved: null,
          _id: '3fff1bd0c939469793eaa503',
        },
        {
          name: 'Iris',
          date: 1751277409050,
          rate: 4,
          text: 'Fascinating history and architecture.',
          isApproved: null,
          _id: '9e048ef0039744adb078f892',
        },
      ],
    },
    {
      _id: '6862445e666a8a840f7c05c3',
      title: 'Colosseum',
      comments: [
        {
          name: 'Alice',
          date: 1751277039001,
          rate: 5,
          text: 'A must-see in Rome!',
          isApproved: null,
          _id: '6af3955ef8f147c1bf2afca6',
        },
        {
          name: 'Bob',
          date: 1751277039002,
          rate: 4,
          text: 'Impressive history.',
          isApproved: null,
          _id: 'df78874d6f814fb1a5ef80d7',
        },
        {
          name: 'Iris',
          date: 1751277409050,
          rate: 5,
          text: 'Enjoyed every moment there.',
          isApproved: null,
          _id: '4b2b4e50081447d2bb9535c2',
        },
        {
          name: 'Gina',
          date: 1751277409050,
          rate: 5,
          text: 'Absolutely loved it!',
          isApproved: null,
          _id: 'b3556d44d10e4bb9a0c1083e',
        },
      ],
    },
  ];

  const mockPlaceId = mockComments[0]._id;
  const mockCommentId = mockComments[0].comments[0]._id;

  beforeEach(() => {
    getReviewCommentsStub = sinon
      .stub(CommentsService, 'getReviewComments')
      .resolves(JSON.parse(JSON.stringify(mockComments)));

    approveCommentStub = sinon
      .stub(CommentsService, 'approveComment')
      .resolves();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('renders "No comments to review." if reviewComments is empty', async () => {
    getReviewCommentsStub.resolves([]);

    const el = await fixture(
      html`<review-comments-page></review-comments-page>`,
    );

    await el.updateComplete;

    expect(el.shadowRoot.textContent).to.include('No comments to review.');
  });

  it('renders places and comments', async () => {
    const el = await fixture(
      html`<review-comments-page></review-comments-page>`,
    );

    await el.updateComplete;

    // Check place titles
    mockComments.forEach(place => {
      expect(el.shadowRoot.textContent).to.include(place.title);
    });

    // Check comments
    mockComments.forEach(place => {
      place.comments.forEach(comment => {
        expect(el.shadowRoot.textContent).to.include(comment.text);
        expect(el.shadowRoot.textContent).to.include(comment.name);
      });
    });
  });

  it('calls approveComment with correct params when approve button is clicked', async () => {
    const el = await fixture(
      html`<review-comments-page></review-comments-page>`,
    );

    await el.updateComplete;

    // Find the first approve button
    const approveBtn = el.shadowRoot.querySelector('button.text-green-500');

    approveBtn.click();

    await el.updateComplete;

    expect(approveCommentStub.calledOnce).to.be.true;

    const [placeId, commentId, isApproved] = approveCommentStub.firstCall.args;

    expect(placeId).to.equal(mockPlaceId);
    expect(commentId).to.equal(mockCommentId);
    expect(isApproved).to.be.true;
  });

  it('calls approveComment with correct params when reject button is clicked', async () => {
    const el = await fixture(
      html`<review-comments-page></review-comments-page>`,
    );
    await el.updateComplete;

    // Find the first reject button
    const rejectBtn = el.shadowRoot.querySelector('button.text-red-500');

    rejectBtn.click();

    await el.updateComplete;

    expect(approveCommentStub.calledOnce).to.be.true;

    const [placeId, commentId, isApproved] = approveCommentStub.firstCall.args;

    expect(placeId).to.equal(mockPlaceId);
    expect(commentId).to.equal(mockCommentId);
    expect(isApproved).to.be.false;
  });
});
