import AbstractView from './abstract-view';

const defaultMessage = 'Click New Event to create your first point';

const createSiteListEmpty = () =>
  `
    <p class="trip-events__msg">Click New Event to create your first point</p>
  `;

export default class SiteListEmptyView extends AbstractView {
  #message = null;

  constructor(message = defaultMessage) {
    super();
    this.#message = message;
  }

  get template() {
    return createSiteListEmpty(this.#message);
  }
}
