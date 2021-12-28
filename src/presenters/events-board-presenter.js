import {RenderPosition, render} from '../utils/render';
import SiteSortFormView from '../view/site-sort-form-view';
import SiteEventsListView from '../view/site-events-list-view';
import SiteListEmptyView from '../view/site-list-empty-view';
import EventPresenter from './event-presenter';
import {sortByDay, sortByPrice, sortByTime} from '../utils/common';
import {SortType} from '../const';

export default class EventsBoardPresenter {
  #pointsModel = null;
  #eventContainer = null;
  #sortComponent = new SiteSortFormView();
  #eventsListComponent = new SiteEventsListView();
  #emptyEventsListComponent = new SiteListEmptyView();
  #eventPresenter = new Map();
  #currentSortType = SortType.DAY;

  constructor(container, pointsModel) {
    this.#eventContainer = container;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    switch (this.#currentSortType) {
      case SortType.TIME:
        return [...this.#pointsModel.points].sort(sortByTime);
      case SortType.PRICE:
        return [...this.#pointsModel.points].sort(sortByPrice);
    }
    return  [...this.#pointsModel.points].sort(sortByDay);
  }

  init() {
    this.#renderEventsBoard();
  }

  #handleViewAction = (actionType, updateType, update) => {
    console.log(actionType, updateType, update);
  }

  #handleModelEvent = (updateType, data) => {
    console.log(updateType, data);
  }

  #handleModeChange = () => {
    this.#eventPresenter.forEach((presenter) => presenter.resetView());
  }

  #handleSortTypeChange = (sortType) => {
    this.#currentSortType = sortType;
    this.#clearPointsList();
    this.#renderPointsList();
  }

  #renderSort = () => {
    render(this.#eventContainer, this.#sortComponent, RenderPosition.BEFOREEND);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  }

  #renderPoint = (point) => {
    const eventPresenter = new EventPresenter(this.#eventsListComponent, this.#handleViewAction, this.#handleModeChange);
    eventPresenter.init(point);
    this.#eventPresenter.set(point.id, eventPresenter);
  }

  #renderPointsList = () => {
    render(this.#eventContainer, this.#eventsListComponent, RenderPosition.BEFOREEND);
    this.points.forEach((point) => this.#renderPoint(point));
  }

  #clearPointsList = () => {
    this.#eventPresenter.forEach((presenter) => presenter.destroy());
    this.#eventPresenter.clear();
  }

  #renderEmptyEventList = () => {
    render(this.#eventContainer, this.#emptyEventsListComponent, RenderPosition.BEFOREEND);
  }

  #renderEventsBoard = () => {
    if (!this.points.length) {
      this.#renderEmptyEventList();
      return;
    }
    this.#renderSort();
    this.#renderPointsList();
  }
}
