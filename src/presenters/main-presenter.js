import {RenderPosition, render, replace} from '../utils/render';
import SiteSortFormView from '../view/site-sort-form-view';
import SiteEventsListView from '../view/site-events-list-view';
import SiteEditPointFormView from '../view/site-edit-point-form-view';
import SiteEventsItemView from '../view/site-events-item-view';
import SiteListEmptyView from '../view/site-list-empty-view';

export default class MainPresenter {
  #eventContainer = null;
  #sortComponent = new SiteSortFormView();
  #eventsListComponent = new SiteEventsListView();
  #emptyEventsListComponent = new SiteListEmptyView();
  #points = [];

  constructor(container) {
    this.#eventContainer = container;
  }

  init(points) {
    this.#points = [...points];
    this.#renderPointsBoard();
  }

  #renderSort = () => {
    render(this.#eventContainer, this.#sortComponent, RenderPosition.BEFOREEND);
  }

  #renderPoint = (point) => {
    const pointComponent = new SiteEventsItemView(point);
    const pointEditComponent = new SiteEditPointFormView(point);

    const replaceCardToForm = () => {
      replace(pointEditComponent, pointComponent);
    };

    const replaceFormToCard = () => {
      replace(pointComponent, pointEditComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToCard();
      }
      document.removeEventListener('keydown', onEscKeyDown);
    };

    pointComponent.setEditClickHandler(() => {
      replaceCardToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.setEditClickHandler(() => {
      replaceFormToCard();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.setEditSubmitHandler(() => {
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(this.#eventsListComponent, pointComponent, RenderPosition.BEFOREEND);
  }

  #renderPointsList = () => {
    render(this.#eventContainer, this.#eventsListComponent, RenderPosition.BEFOREEND);
    this.#points.forEach((point) => this.#renderPoint(point));
  }

  #renderEmptyEventList = () => {
    render(this.#eventContainer, this.#emptyEventsListComponent, RenderPosition.BEFOREEND);
  }

  #renderPointsBoard = () => {
    if (!this.#points.length) {
      this.#renderEmptyEventList();
      return;
    }

    this.#renderSort();
    this.#renderPointsList();
  }
}
