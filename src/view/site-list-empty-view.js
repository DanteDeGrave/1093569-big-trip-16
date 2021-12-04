import {createElement} from '../render';

const defaultMessage = 'Click New Event to create your first point';

const createSiteListEmpty = () =>
  `
    <p class="trip-events__msg">Click New Event to create your first point</p>
  `;

export default class SiteListEmptyView {
  #element = null;
  #message = null;

  constructor(message = defaultMessage) {
    this.#message = message;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  get template() {
    return createSiteListEmpty(this.#message);
  }

  removeElement() {
    this.#element = null;
  }
}
