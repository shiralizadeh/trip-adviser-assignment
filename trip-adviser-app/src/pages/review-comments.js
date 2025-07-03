import { html, css, LitElement } from 'lit';
import { format } from 'date-fns';
import CommentsService from '../services/comments-service.js';
import AIService from '../services/ai-service.js';
import importStyles from '../styles/import-styles.js';

import '../components/rate.js';
import '../components/loading.js';

export default class ReviewCommentsPage extends LitElement {
  static styles = css``;

  static properties = {
    reviewComments: { type: Array },
    isLoading: { type: Boolean, state: true },
  };

  constructor() {
    super();

    this.reviewComments = [];
    this.isLoading = false;
  }

  async firstUpdated() {
    this.isLoading = true;

    this.reviewComments = await CommentsService.getReviewComments();

    try {
      const placesComments = this.reviewComments.flatMap(
        place => place.comments,
      );

      const aiReview = async (comments, index) => {
        if (index >= comments.length) return;

        const comment = comments[index];

        comment.aiResponse = await AIService.getCommentAIReview(comment);

        // Update the component after processing each comment
        this.requestUpdate();

        // Process the next comment
        aiReview(comments, index + 1);
      };

      aiReview(placesComments, 0);
    } catch (error) {
      console.error('Error in AI language model:', error);
    }

    this.isLoading = false;
  }

  async handleComment(place, comment, isApproved) {
    // eslint-disable-next-line no-param-reassign
    comment.isApproved = isApproved;

    this.requestUpdate();

    await CommentsService.approveComment(place._id, comment._id, isApproved);
  }

  render() {
    const { isLoading, reviewComments } = this;

    if (isLoading) {
      return html`<ta-loading></ta-loading>`;
    }

    if (reviewComments.length === 0) {
      return html`<div class="p-2 border">No comments to review.</div>`;
    }

    return html`
      <div class="flex flex-col gap-5">
        ${reviewComments.map(
          place =>
            html` <div>
              <h2 class="text-2xl font-bold text-gray-800 mb-2">
                ${place.title}
                <span class="text-sm font-medium"
                  >(${place.comments.length} comments)</span
                >
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                ${place.comments.map(comment => {
                  let approvedClass = '';

                  if (comment.isApproved === true) {
                    approvedClass = 'bg-green-50';
                  } else if (comment.isApproved === false) {
                    approvedClass = 'bg-red-50';
                  }

                  return html`
                    <div
                      class="p-2 border border-gray-100 hover:border-yellow-400 rounded shadow ${approvedClass}"
                    >
                      <div
                        class="flex justify-between items-center text-xs text-gray-500 mb-2"
                      >
                        <p class="flex items-center gap-1">
                          <ta-rate .rate=${comment.rate}></ta-rate>
                          By: ${comment.name}
                        </p>
                        <p>
                          ${format(new Date(comment.date), 'dd MMM yyyy HH:mm')}
                        </p>
                      </div>
                      <p class="text-gray-800 mb-2">${comment.text}</p>
                      <div
                        class="flex items-center text-gray-600 text-sm border border-gray-300 rounded gap-2 p-2 mb-2"
                      >
                        <div>
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
                            class="icon icon-tabler icons-tabler-outline icon-tabler-robot"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path
                              d="M6 4m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z"
                            />
                            <path d="M12 2v2" />
                            <path d="M9 12v9" />
                            <path d="M15 12v9" />
                            <path d="M5 16l4 -2" />
                            <path d="M15 14l4 2" />
                            <path d="M9 18h6" />
                            <path d="M10 8v.01" />
                            <path d="M14 8v.01" />
                          </svg>
                        </div>
                        <div>
                          ${!comment.aiResponse
                            ? html`<ta-loading></ta-loading>`
                            : comment.aiResponse}
                        </div>
                      </div>
                      <button
                        class="text-green-500 hover:text-green-700 cursor-pointer"
                        @click=${() => this.handleComment(place, comment, true)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          class="icon icon-tabler icons-tabler-filled icon-tabler-square-check"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path
                            d="M18.333 2c1.96 0 3.56 1.537 3.662 3.472l.005 .195v12.666c0 1.96 -1.537 3.56 -3.472 3.662l-.195 .005h-12.666a3.667 3.667 0 0 1 -3.662 -3.472l-.005 -.195v-12.666c0 -1.96 1.537 -3.56 3.472 -3.662l.195 -.005h12.666zm-2.626 7.293a1 1 0 0 0 -1.414 0l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.32 1.497l2 2l.094 .083a1 1 0 0 0 1.32 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
                          />
                        </svg>
                      </button>
                      <button
                        class="text-red-500 hover:text-red-700 cursor-pointer"
                        @click=${() =>
                          this.handleComment(place, comment, false)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          class="icon icon-tabler icons-tabler-filled icon-tabler-square-x"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path
                            d="M19 2h-14a3 3 0 0 0 -3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3 -3v-14a3 3 0 0 0 -3 -3zm-9.387 6.21l.094 .083l2.293 2.292l2.293 -2.292a1 1 0 0 1 1.497 1.32l-.083 .094l-2.292 2.293l2.292 2.293a1 1 0 0 1 -1.32 1.497l-.094 -.083l-2.293 -2.292l-2.293 2.292a1 1 0 0 1 -1.497 -1.32l.083 -.094l2.292 -2.293l-2.292 -2.293a1 1 0 0 1 1.32 -1.497z"
                          />
                        </svg>
                      </button>
                    </div>
                  `;
                })}
              </div>
            </div>`,
        )}
      </div>

      ${importStyles()}
    `;
  }
}
