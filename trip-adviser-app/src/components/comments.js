import { LitElement, html, css } from 'lit';
import { format } from 'date-fns';
import CommentsService from '../services/comments-service.js';
import importStyles from '../styles/import-styles.js';

import './rate.js';

export default class CommentsComponent extends LitElement {
  static styles = css``;

  static properties = {
    placeId: { type: Number },
    comments: { type: Array },
    isLoading: { type: Boolean, state: true },
    isSuccessful: { type: Boolean, state: true },
  };

  firstUpdated() {
    this.rateComponent = this.shadowRoot.querySelector('#rate');
  }

  async handleSubmit(e) {
    e.preventDefault();

    const form = e.target;

    const { placeId } = this;

    const formData = new FormData(e.target);

    const name = formData.get('name');
    const rate = this.rateComponent.value;
    const text = formData.get('text');

    const newComment = {
      name,
      rate,
      text,
      date: Date.now(),
    };

    this.isLoading = true;

    await CommentsService.addComment(placeId, newComment);

    this.isLoading = false;
    this.isSuccessful = true;

    form.reset();
    this.rateComponent.reset();
  }

  render() {
    const { comments, isLoading, isSuccessful } = this;

    return html`
      <div class="flex flex-col gap-3">
        ${comments.map(
          comment => html`
            <div
              class="p-2 border border-gray-100 hover:border-yellow-400 rounded shadow"
            >
              <div
                class="flex justify-between items-center text-xs text-gray-500 mb-2"
              >
                <p class="flex items-center gap-1">
                  <ta-rate .rate=${comment.rate}></ta-rate>
                  By: ${comment.name}
                </p>
                <p>${format(new Date(comment.date), 'dd MMM yyyy HH:mm')}</p>
              </div>
              <p class="text-gray-800">${comment.text}</p>
            </div>
          `,
        )}
        <div class="p-2 border border-gray-400 rounded shadow">
          <form class="flex flex-col gap-2" @submit=${this.handleSubmit}>
            <div class="grid grid-cols-2 grid-rows-2 gap-2">
              <div class="col-span-1 row-span-1">
                <label
                  for="price"
                  class="block text-sm/6 font-medium text-gray-900"
                  >Name</label
                >
                <div class="mt-2">
                  <div
                    class="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600"
                  >
                    <input
                      type="text"
                      name="name"
                      id="name"
                      class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                      placeholder="Your name"
                      autocomplete="off"
                      required
                    />
                  </div>
                </div>
              </div>
              <div class="col-span-1 row-span-1">
                <label
                  for="price"
                  class="block text-sm/6 font-medium text-gray-900"
                  >Rate</label
                >
                <div class="mt-2 text-yellow-500">
                  <ta-rate
                    id="rate"
                    .editable=${true}
                    .disabled=${isLoading}
                  ></ta-rate>
                </div>
              </div>
              <div class="col-span-2 row-span-2">
                <label
                  for="price"
                  class="block text-sm/6 font-medium text-gray-900"
                  >Text</label
                >
                <div class="mt-2">
                  <div
                    class="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600"
                  >
                    <input
                      type="text"
                      name="text"
                      id="text"
                      class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                      placeholder="Your comment"
                      autocomplete="off"
                      required
                    />
                  </div>
                </div>
              </div>

              <div class="gap-2 col-span-2 row-span-2">
                <button
                  type="submit"
                  ?disabled=${isLoading}
                  class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                  ${isLoading ? 'Sending...' : 'Send'}
                </button>
                ${isSuccessful
                  ? html`
                      <span
                        class="p-2 text-xs text-white bg-green-400 rounded shadow h-auto"
                      >
                        Comment sent successfully! Wait for the admin to approve
                        it.
                      </span>
                    `
                  : undefined}
              </div>
            </div>
          </form>
        </div>

        ${importStyles()}
      </div>
    `;
  }
}

customElements.define('ta-comments', CommentsComponent);
