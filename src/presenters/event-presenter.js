import SiteEventsItemView from '../view/site-events-item-view';
import SiteEditPointFormView from '../view/site-edit-point-form-view';
import {RenderPosition, render, replace, remove} from '../utils/render';

export default class EventPresenter {
  #eventsListContainer = null;
  #point = null;
  #pointComponent = null;
  #pointEditComponent = null;
  #changeData = null;

  constructor(eventsListContainer, changeData) {
    this.#eventsListContainer = eventsListContainer;
    this.#changeData = changeData;
  }

  init = (point) => {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new SiteEventsItemView(point);
    this.#pointEditComponent = new SiteEditPointFormView(point);

    this.#pointComponent.setEditHandler(this.#replaceCardToForm);
    this.#pointEditComponent.setEditHandler(this.#replaceFormToCard);
    this.#pointEditComponent.setSubmitHandler(this.#handleFormSubmit);
    this.#pointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);

    if(!prevPointComponent || !prevPointEditComponent) {
      render(this.#eventsListContainer, this.#pointComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this.#eventsListContainer.element.contains(prevPointComponent.element)) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#eventsListContainer.element.contains(prevPointEditComponent.element)) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
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

  #handleFavoriteClick = () => {
    this.#changeData({...this.#point, isFavorite: !this.#point.isFavorite});
  }

  #handleFormSubmit = (point) => {
    this.#replaceFormToCard();
    this.#changeData(point);
  }
}
