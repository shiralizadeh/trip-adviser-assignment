import { html, fixture, expect, oneEvent } from '@open-wc/testing';
import { stub, restore } from 'sinon';

import PlacesPage from '../src/pages/places.js';
import PlacesService from '../src/services/places-service.js';

customElements.define('ta-places-page', PlacesPage);

describe('PlacesPage', () => {
  let getPlacesStub;

  const mockPlaces = [
    {
      _id: '68624442666a8a840f7c05c1',
      title: 'Eiffel Tower',
      country: 'France',
      cardImage: 'https://picsum.photos/700/400',
      commentsCount: 1,
    },
    {
      _id: '68624455666a8a840f7c05c2',
      title: 'Mont Saint-Michel',
      country: 'France',
      cardImage: 'https://picsum.photos/700/400',
      commentsCount: 1,
    },
  ];

  beforeEach(() => {
    getPlacesStub = stub(PlacesService, 'getPlaces').resolves(mockPlaces);
  });

  afterEach(() => {
    restore();
  });

  it('renders loading indicator while loading', async () => {
    // Delay the promise to keep isLoading true
    let resolvePromise;
    getPlacesStub.returns(
      new Promise(resolve => {
        resolvePromise = resolve;
      }),
    );

    const el = await fixture(html`<ta-places-page></ta-places-page>`);

    expect(el.isLoading).to.be.true;
    expect(el.shadowRoot.querySelector('ta-loading')).to.exist;

    resolvePromise(mockPlaces);
  });

  it('renders place cards after loading', async () => {
    const el = await fixture(html`<ta-places-page></ta-places-page>`);

    await el.updateComplete;

    expect(el.isLoading).to.be.false;

    const cards = el.shadowRoot.querySelectorAll('ta-place-card');

    expect(cards.length).to.equal(mockPlaces.length);
    expect(cards[0].place).to.deep.equal(mockPlaces[0]);
  });

  it('dispatches navigateToPage event with correct detail when a place card is clicked', async () => {
    const el = await fixture(html`<ta-places-page></ta-places-page>`);

    await el.updateComplete;

    const card = el.shadowRoot.querySelector('ta-place-card');

    setTimeout(() => card.click());

    const event = await oneEvent(el, 'navigateToPage');

    expect(event.detail).to.deep.equal({
      pageKey: 'View-Place',
      params: { placeId: mockPlaces[0]._id },
    });
  });
});
