import { LitElement, css, html } from 'lit';

export default class RateComponent extends LitElement {
  static styles = css``;

  properties = {
    rate: { type: Number, state: true },
    editable: { type: Boolean },
  };

  constructor() {
    super();

    this.editable = false;
  }

  connectedCallback() {
    super.connectedCallback();

    if (this.editable) this.rate = 5;
    else if (!this.rate) this.rate = Math.floor(Math.random() * 5) + 1;
  }

  handleClick(e, rate) {
    this.rate = rate;

    this.dispatchEvent(
      new CustomEvent('rateChanged', {
        detail: { rate },
        bubbles: true,
        composed: true,
      }),
    );

    this.requestUpdate();
  }

  get value() {
    return this.rate.toString();
  }

  reset() {
    this.rate = 5;
    this.requestUpdate();
  }

  render() {
    const { rate, editable } = this;

    return html`
      <div
        class="flex"
        role="button"
        @click=${e => {
          if (editable) {
            const target = e.target.closest('svg');

            if (target) {
              const newRate = parseInt(target.getAttribute('date-rate'), 10);

              this.handleClick(e, newRate);
            }
          }
        }}
        @keydown=${e => {
          if (editable && (e.key === 'Enter' || e.key === ' ')) {
            const target = e.target.closest('svg');

            if (target) {
              const newRate = parseInt(target.getAttribute('date-rate'), 10);

              this.handleClick(e, newRate);
            }
          }
        }}
      >
        ${Array.from({ length: 5 }).map((_, index) =>
          index + 1 > rate
            ? html`<svg
                xmlns="http://www.w3.org/2000/svg"
                width=${editable ? '24' : '16'}
                height=${editable ? '24' : '16'}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="icon icon-tabler icons-tabler-outline icon-tabler-star"
                date-rate=${index + 1}
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"
                />
              </svg>`
            : html`<svg
                xmlns="http://www.w3.org/2000/svg"
                className=""
                width=${editable ? '24' : '16'}
                height=${editable ? '24' : '16'}
                viewBox="0 0 24 24"
                fill="currentColor"
                class="icon icon-tabler icons-tabler-filled icon-tabler-star"
                date-rate=${index + 1}
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z"
                />
              </svg>`,
        )}
        <input
          type="hidden"
          name="rate"
          id="rate"
          .value="${rate.toString()}"
        />
      </div>
    `;
  }
}

customElements.define('ta-rate', RateComponent);
