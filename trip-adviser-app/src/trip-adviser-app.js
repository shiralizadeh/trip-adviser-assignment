import { html, css, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

import importStyles from './styles/import-styles.js';

export class TripAdviserApp extends LitElement {
  static styles = css`
    :host {
      font-family: 'Roboto', sans-serif;
    }
  `;

  static properties = {
    pageKey: { type: String, state: true },
  };

  firstUpdated() {
    this.containerElement = this.renderRoot.querySelector('#container');

    this.navigateToPage('Home')();
    // this.navigateToPage('View-Place', {
    //   placeId: '68624471666a8a840f7c05c5',
    // })();
    // this.navigateToPage('Review-Comments')();
  }

  navigateToPage(pageKey, params = {}) {
    return e => {
      e?.preventDefault();

      this.pageKey = pageKey;

      if (this.containerElement.childNodes.length > 0)
        this.containerElement.removeChild(this.containerElement.childNodes[0]);

      this.containerElement.innerHTML = 'Loading Page...';

      import(`/src/pages/${pageKey.toLowerCase()}.js`).then(page => {
        const htmlTag = `ta-${pageKey.toLowerCase()}`;

        if (!customElements.get(htmlTag))
          customElements.define(htmlTag, page.default);

        const el = document.createElement(htmlTag);

        el.addEventListener('navigateToPage', navigationEvent =>
          this.navigateToPage(
            navigationEvent.detail.pageKey,
            navigationEvent.detail.params,
          )(),
        );
        el.params = params;

        this.containerElement.removeChild(this.containerElement.childNodes[0]);
        this.containerElement.appendChild(el);
      });
    };
  }

  render() {
    const { pageKey } = this;

    return html`
      ${importStyles()}
      <div class="h-screen w-screen flex">
        <!-- container -->
        <aside
          class="flex flex-col items-center bg-white text-gray-700 shadow h-full"
        >
          <!-- Side Nav Bar-->
          <div class="h-16 flex items-center w-full">
            <!-- Logo Section -->
            <a href="/" class="mx-auto">
              <img
                class="h-10 w-10 mx-auto"
                src="./src/assets/logo.png"
                alt=""
              />
            </a>
          </div>

          <nav>
            <ul>
              <!-- Places -->
              <li class="hover:bg-gray-100">
                <button
                  class="h-16 px-6 flex justify-center items-center w-full cursor-pointer ${classMap(
                    {
                      'text-orange-500': pageKey === 'Places',
                    },
                  )}"
                  href="#Places"
                  aria-label="Places"
                  @click=${this.navigateToPage('Places')}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-home"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
                    <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                    <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                  </svg>
                </button>
              </li>
              <!-- Comments -->
              <li class="hover:bg-gray-100">
                <button
                  class="h-16 px-6 flex justify-center items-center w-full cursor-pointer ${classMap(
                    {
                      'text-orange-500': pageKey === 'Review-Comments',
                    },
                  )}"
                  href="#Review-Comments"
                  aria-label="Review Comments"
                  @click=${this.navigateToPage('Review-Comments')}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-message-report"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path
                      d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z"
                    />
                    <path d="M12 8v3" />
                    <path d="M12 14v.01" />
                  </svg>
                </button>
              </li>
              <!-- Add Place -->
              <li class="hover:bg-gray-100">
                <button
                  class="h-16 px-6 flex justify-center items-center w-full cursor-pointer ${classMap(
                    {
                      'text-orange-500': pageKey === 'Manage-Places',
                    },
                  )}"
                  href="#Manage-Places"
                  aria-label="Manage Places"
                  @click=${this.navigateToPage('Manage-Places')}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-map-plus"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 18.5l-3 -1.5l-6 3v-13l6 -3l6 3l6 -3v8.5" />
                    <path d="M9 4v13" />
                    <path d="M15 7v8" />
                    <path d="M16 19h6" />
                    <path d="M19 16v6" />
                  </svg>
                </button>
              </li>
            </ul>
          </nav>

          <div class="mt-auto h-16 flex items-center w-full">
            <!-- Logout -->
            <a
              href="/"
              class="w-full h-16 mx-auto flex justify-center items-center focus:text-orange-500 hover:bg-red-200 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="icon icon-tabler icons-tabler-outline icon-tabler-logout"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"
                />
                <path d="M9 12h12l-3 -3" />
                <path d="M18 15l3 -3" />
              </svg>
            </a>
          </div>
        </aside>

        <div class="flex-1 flex flex-col">
          <nav
            class="px-4 flex justify-between bg-white h-16 border-b-2 border-gray-300"
          >
            <ul class="flex items-center">
              <!-- top bar center -->
              <li>
                <h1 class="pl-10 lg:pl-0 text-gray-700">
                  Trip Adviser - ${pageKey || 'App'}
                </h1>
              </li>
            </ul>

            <ul class="flex items-center">
              <!-- to bar right  -->
              <li class="pr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="icon icon-tabler icons-tabler-outline icon-tabler-bell"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path
                    d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6"
                  />
                  <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                </svg>
              </li>

              <li class="h-8 w-8">
                <img
                  class="h-full w-full rounded-full mx-auto"
                  src="/src/assets/profile.jpeg"
                  alt="profile woman"
                />
              </li>
            </ul>
          </nav>
          <div id="container" class="h-full overflow-auto p-5"></div>
        </div>
      </div>
    `;
  }
}

customElements.define('trip-adviser-app', TripAdviserApp);
