import {createElement} from '../render';

const createSiteInfoTemplate = (points) => {
  const amountTrip = points.reduce((acc, element) =>  acc + element.price, 0);
  return`
    <section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>
        <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
      </div>
      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${amountTrip}</span>
      </p>
    </section>
  `;
};

export default class SiteInfoView {
  #element = null;
  #points = null;

  constructor(points) {
    this.#points = points;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  get template() {
    return createSiteInfoTemplate(this.#points);
  }

  removeElement() {
    this.#element = null;
  }
}
