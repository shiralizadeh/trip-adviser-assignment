import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import { spy } from 'sinon';

import '../src/trip-adviser-app.js';

describe('TripAdviserApp', () => {
  it('renders the layout', async () => {
    const el = await fixture(html`<trip-adviser-app></trip-adviser-app>`);

    // sidebar
    const aside = el.shadowRoot.querySelector('aside');
    expect(aside).to.exist;

    // navigation buttons
    const buttons = aside.querySelectorAll('button');
    expect(buttons.length).to.equal(3); // Places, Review-Comments, Manage-Places

    //
    const h1 = el.shadowRoot.querySelector('h1');

    expect(h1).to.exist;
    expect(h1.textContent.trim()).to.include('Trip Adviser');
  });

  const pageNavigationHelper = async pageKey => {
    const el = await fixture(html`<trip-adviser-app></trip-adviser-app>`);

    const placesMenuButton = el.shadowRoot.querySelector(
      `[href="#${pageKey}"]`,
    );

    const navigateToPageSpy = spy(el, 'navigateToPage');

    placesMenuButton.click();

    await el.updateComplete;

    expect(navigateToPageSpy.calledWith(pageKey)).to.be.true;
    expect(placesMenuButton).to.exist;
    expect(el.pageKey).to.equal(pageKey);
  };

  it('Places page navigation', () => pageNavigationHelper('Places'));

  it('Review-Comments page navigation', () =>
    pageNavigationHelper('Review-Comments'));

  it('Manage-Places page navigation', () =>
    pageNavigationHelper('Manage-Places'));

  // it('passes the a11y audit', async () => {
  //   const el = await fixture(html`<trip-adviser-app></trip-adviser-app>`);
  //   await expect(el).shadowDom.to.be.accessible();
  // });
});
