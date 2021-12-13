import {RenderPosition, render} from '../utils/render';
import SiteSortFormView from '../view/site-sort-form-view';
import SiteEventsListView from '../view/site-events-list-view';
import SiteListEmptyView from '../view/site-list-empty-view';
import EventPresenter from './event-presenter';
import {updateItem} from '../utils/common';

export default class EventsBoardPresenter {
  #eventContainer = null;
  #sortComponent = new SiteSortFormView();
  #eventsListComponent = new SiteEventsListView();
  #emptyEventsListComponent = new SiteListEmptyView();
  #points = [];
  #eventPresenter = new Map();

  constructor(container) {
    this.#eventContainer = container;
  }

  init(points) {
    this.#points = [...points];
    this.#renderEventsBoard();
  }

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#eventPresenter.get(updatedPoint.id).init(updatedPoint);
  }

  #renderSort = () => {
    render(this.#eventContainer, this.#sortComponent, RenderPosition.BEFOREEND);
  }

  #renderPoint = (point) => {
    const eventPresenter = new EventPresenter(this.#eventsListComponent, this.#handlePointChange);
    eventPresenter.init(point);
    this.#eventPresenter.set(point.id, eventPresenter);
  }

  #renderPointsList = () => {
    render(this.#eventContainer, this.#eventsListComponent, RenderPosition.BEFOREEND);
    this.#points.forEach((point) => this.#renderPoint(point));
  }

  #clearPointsList = () => {
    this.#eventPresenter.forEach((presenter) => presenter.destroy());
    this.#eventPresenter.clear();
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
