import AbstractView from './abstract-view';

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

export default class SiteInfoView extends AbstractView {
  #points = null;

  constructor(points) {
    super();
    this.#points = points;
  }

  get template() {
    return createSiteInfoTemplate(this.#points);
  }
}
