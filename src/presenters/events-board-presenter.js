import {RenderPosition, render} from '../utils/render';
import SiteSortFormView from '../view/site-sort-form-view';
import SiteEventsListView from '../view/site-events-list-view';
import SiteListEmptyView from '../view/site-list-empty-view';
import EventPresenter from './event-presenter';

export default class EventsBoardPresenter {
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
    this.#renderEventsBoard();
  }

  #renderSort = () => {
    render(this.#eventContainer, this.#sortComponent, RenderPosition.BEFOREEND);
  }

  #renderPoint = (point) => {
    const eventPresenter = new EventPresenter(this.#eventsListComponent);
    eventPresenter.init(point);
  }

  #renderPointsList = () => {
    render(this.#eventContainer, this.#eventsListComponent, RenderPosition.BEFOREEND);
    this.#points.forEach((point) => this.#renderPoint(point));
  }

  #renderEmptyEventList = () => {
    render(this.#eventContainer, this.#emptyEventsListComponent, RenderPosition.BEFOREEND);
  }

  #renderEventsBoard = () => {
    if (!this.#points.length) {
      this.#renderEmptyEventList();
      return;
    }

    this.#renderSort();
    this.#renderPointsList();
  }
}
