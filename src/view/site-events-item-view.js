import dayjs from 'dayjs';
import AbstractView from './abstract-view';

const createEventsItemTemplate = (point) => {
  const {dueDate, price, timeStart, timeEnd, destination, offer, isFavorite} = point;
  const favorite = isFavorite ? 'event__favorite-btn--active' : '';
  const timeDifference = dayjs(timeEnd).diff(timeStart, 'second');
  const elapsedTime = {
    day: Math.round(timeDifference / 60 / 60 / 24),
    hour: Math.round(timeDifference / 60 / 60 % 24),
    minute: Math.round(timeDifference / 60 % 60),
  };

  const getElapsedTimeString = () => {
    const day = elapsedTime.day < 10 ? `0${elapsedTime.day}D`: `${elapsedTime.day}D`;
    const hour = elapsedTime.hour < 10 ? `0${elapsedTime.hour}H`: `${elapsedTime.hour}H`;
    const minute = elapsedTime.minute < 10 ? `0${elapsedTime.minute}M`: `${elapsedTime.minute}M`;
    if (elapsedTime.day) {
      return `${day} ${hour} ${minute} `;
    }
    if (elapsedTime.hour) {
      return `${hour} ${minute} `;
    }
    return `${minute} `;
  };
  const getOffersList = (offerData) => offerData.offers.map((element) => `
    <li class="event__offer">
      <span class="event__offer-title">${element.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${element.price}</span>
    </li>
  `).join('');
  const offersList = getOffersList(offer);
  return `
    <li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${dayjs(dueDate).format('YYYY-MM-D')}">${dayjs(dueDate).format('MMM D')}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${offer.type.toLowerCase()}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${offer.type} ${destination.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dayjs(timeStart).format('YYYY-MM-DDTHH:mm')}">${dayjs(timeStart).format('HH:mm')}</time>
            &mdash;
            <time class="event__end-time" datetime="${dayjs(timeEnd).format('YYYY-MM-DDTHH:mm')}">${dayjs(timeEnd).format('HH:mm')}</time>
          </p>
          <p class="event__duration">${getElapsedTimeString()}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        ${offer.offers.length ? `<ul class="event__selected-offers">${offersList}</ul>` : ''}
        <button class="event__favorite-btn ${favorite}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>
  `;
};

export default class SiteEventsItemView extends AbstractView {
  #points = null;

  constructor(points) {
    super();
    this.#points = points;
  }

  get template() {
    return createEventsItemTemplate(this.#points);
  }

  setEditHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editHandler);
  }

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  }

  #editHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  }

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  }
}
