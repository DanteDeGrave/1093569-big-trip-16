import SiteEventsItemView from '../view/site-events-item-view';
import SiteEditPointFormView from '../view/site-edit-point-form-view';
import {RenderPosition, render, replace} from '../utils/render';

export default class EventPresenter {
  #eventsListContainer = null;
  #point = null;
  #pointComponent = null;
  #pointEditComponent = null;

  constructor(eventsListContainer) {
    this.#eventsListContainer = eventsListContainer;
  }

  init = (point) => {
    this.#point = point;
    this.#pointComponent = new SiteEventsItemView(point);
    this.#pointEditComponent = new SiteEditPointFormView(point);

    this.#pointComponent.setEditHandler(this.#replaceCardToForm);
    this.#pointEditComponent.setEditHandler(this.#replaceFormToCard);
    this.#pointEditComponent.setSubmitHandler(this.#replaceFormToCard);

    render(this.#eventsListContainer, this.#pointComponent, RenderPosition.BEFOREEND);
  }

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToCard();
    }
    document.removeEventListener('keydown', this.#onEscKeyDown);
  }

  #replaceCardToForm = () => {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#onEscKeyDown);
  }

  #replaceFormToCard = () => {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#onEscKeyDown);
  }
}
