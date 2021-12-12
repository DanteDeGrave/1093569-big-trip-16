import dayjs from 'dayjs';
import SiteEventsItemView from './site-events-item-view';

const BLANK_POINT = {
  price: '',
  wayPointType: '',
  wayPointTypes: '',
  cities: '',
  timeStart: '',
  timeEnd: '',
  destination: {
    name: '',
    destinationInfo: '',
    pictures: [],
  },
  offer: {
    type: '',
    offers: [],
  },
};

const createEditPointFormTemplate = (point) => {
  const { price, wayPointType, wayPointTypes, cities, timeStart, timeEnd, destination, offer } = point;
  const resetBtnText = price ? 'Delete' : 'Cancel';
  const getCloseEditFormBtn = () => {
    if (!price) { return; }
    return `
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    `;
  };
  const getOffersList = () => {
    if (!offer.offers.length) {
      return '';
    }
    const offerItem = offer.offers.map((element) =>
      `<div class="event__offer-selector">
         <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" ${element.isChecked ? 'checked' : ''}>
           <label class="event__offer-label" for="event-offer-${element.title.toLowerCase()}-1">
             <span class="event__offer-title">${element.title}</span>
             &plus;&euro;&nbsp;
             <span class="event__offer-price">${element.price}</span>
           </label>
       </div>
      `).join('');
    return `
      <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            <div class="event__available-offers">
              ${offerItem}
            </div>
          </section>
    `;
  };
  const getTypeList = () => wayPointTypes.map((element) => `
      <div class="event__type-item">
        <input id="event-type-${element.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${element.toLowerCase()}">
        <label class="event__type-label  event__type-label--${element.toLowerCase()}" for="event-type-${element.toLowerCase()}-1">${element}</label>
      </div>
    `).join('');
  const getCitiesList = () => cities.map((element) => `
    <option value="${element}"></option>
  `).join('');
  const getPhotoList = () => {
    if (!destination.pictures.length) {
      return '';
    }
    const photoList = destination.pictures.map((element) => `<img class="event__photo" src="${element}" alt="Event photo">`).join('');
    return `
    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${photoList}
      </div>
    </div>
    `;
  };
  const getDestination = () => {
    if (!destination.destinationInfo.length || !destination.pictures.length) {
      return '';
    }
    return `
      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        ${destination.destinationInfo.length ? `<p class="event__destination-description">${destination.destinationInfo.join(' ')}</p>` : ''}
        ${getPhotoList()}
      </section>
    `;
  };
  return `
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${wayPointType.toLowerCase()}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${getTypeList()}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${wayPointType}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
            <datalist id="destination-list-1">
              ${getCitiesList()}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dayjs(timeStart).format('YY/MM/DD HH:mm')}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dayjs(timeEnd).format('YY/MM/DD HH:mm')}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">${resetBtnText}</button>
          ${getCloseEditFormBtn()}
        </header>
        <section class="event__details">
          ${getOffersList()}
          ${getDestination()}
        </section>
      </form>
    </li>
  `;
};

export default class SiteEditPointFormView extends SiteEventsItemView {
  constructor(points = BLANK_POINT) {
    super(points);
  }

  get template() {
    return createEditPointFormTemplate(this._points);
  }

  setSubmitHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('form').addEventListener('submit', this.#submitHandler);
  }

  #submitHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  }
}
