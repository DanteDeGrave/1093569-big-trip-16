import dayjs from 'dayjs';
import SmartView from './smart-view';

const BLANK_POINT = {
  price: '',
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
  offersList: [],
};

const createEditPointFormTemplate = (point) => {
  const { price, cities, timeStart, timeEnd, destination, offer, offersList } = point;
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
         <input class="event__offer-checkbox  visually-hidden" id="event-offer-${element.title.toLowerCase()}-1" type="checkbox" name="event-offer-luggage" ${element.isChecked ? 'checked' : ''}>
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
  const getTypeList = () => offersList.map((element) => `
      <div class="event__type-item">
        <input id="event-type-${element.type.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${element.type.toLowerCase()}">
        <label class="event__type-label  event__type-label--${element.type.toLowerCase()}" for="event-type-${element.type.toLowerCase()}-1">${element.type}</label>
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
              <img class="event__type-icon" width="17" height="17" src="img/icons/${offer.type.toLowerCase()}.png" alt="Event type icon">
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
              ${offer.type}
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

export default class SiteEditPointFormView extends SmartView {

  constructor(point = BLANK_POINT) {
    super();
    this._data = SiteEditPointFormView.parsePointToData(point);
    this.#setInnerHandlers();
  }

  get template() {
    return createEditPointFormTemplate(this._data);
  }

  restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setSubmitHandler(this._callback.editSubmit);
    this.setEditHandler(this._callback.editClick);
  }

  reset = (point) => {
    this.updateData(SiteEditPointFormView.parsePointToData(point));
  }

  setEditHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editHandler);
  }

  setSubmitHandler = (callback) => {
    this._callback.editSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#submitHandler);
  }

  #setInnerHandlers = () => {
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#cityChangeHandler);
    this.element.querySelector('.event__type-list').addEventListener('change', this.#typeChangeHandler);
  }

  #cityChangeHandler = (evt) => {
    const city = this._data.destinationsList.find(({name}) => name.toLowerCase() === evt.target.value.toLowerCase());
    if (!city) {
      return;
    }
    this.updateData({destination: city});
  }

  #typeChangeHandler = (evt) => {
    const newOffer = this._data.offersList.find(({type}) => type.toLowerCase() === evt.target.value.toLowerCase());
    this.updateData({offer: newOffer});
  }

  #editHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  }

  #submitHandler = (evt) => {
    evt.preventDefault();
    this._callback.editSubmit(SiteEditPointFormView.parseDataToPoints(this._data));
  }

  // Заготовка на будуще, если не пригодиться - удалить
  static parsePointToData = (point) => ({...point});
  static parseDataToPoints = (data) => ({...data});
}
