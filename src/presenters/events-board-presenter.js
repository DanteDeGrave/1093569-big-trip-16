import {RenderPosition, render} from '../utils/render';
import SiteSortFormView from '../view/site-sort-form-view';
import SiteEventsListView from '../view/site-events-list-view';
import SiteListEmptyView from '../view/site-list-empty-view';
import EventPresenter from './event-presenter';
import {sortByDay, sortByPrice, sortByTime, updateItem} from '../utils/common';
import {SortType} from '../const';

export default class EventsBoardPresenter {
  #tasksModel = null;
  #offersListModel = null;
  #eventContainer = null;
  #sortComponent = new SiteSortFormView();
  #eventsListComponent = new SiteEventsListView();
  #emptyEventsListComponent = new SiteListEmptyView();
  #points = [];
  #eventPresenter = new Map();
  #currentSortType = SortType.DAY;
  #sourcedBoardEvents = [];

  constructor(container, tasksModel, offersListModel) {
    this.#eventContainer = container;
    this.#tasksModel = tasksModel;
    this.#offersListModel = offersListModel;
  }

  get points() {
    return this.#tasksModel.points;
  }

  get offersList() {
    return this.#offersListModel.offers;
  }

  init(points) {
    this.#points = [...points].sort(sortByDay);
    this.#sourcedBoardEvents = [...points];
    this.#renderEventsBoard();
  }

  #handleModeChange = () => {
    this.#eventPresenter.forEach((presenter) => presenter.resetView());
  }

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#sourcedBoardEvents = updateItem(this.#sourcedBoardEvents, updatedPoint);
    this.#eventPresenter.get(updatedPoint.id).init(updatedPoint);
  }

  #handleSortTypeChange = (sortType) => {
    this.#sortPoints(sortType);
    this.#clearPointsList();
    this.#renderPointsList();
  }

  #renderSort = () => {
    render(this.#eventContainer, this.#sortComponent, RenderPosition.BEFOREEND);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  }

  #sortPoints = (sortType) => {
    switch (sortType) {
      case SortType.TIME:
        this.#points.sort(sortByTime);
        break;
      case SortType.PRICE:
        this.#points.sort(sortByPrice);
        break;
      default:
        this.#points = this.#sourcedBoardEvents.sort(sortByDay);
    }
    this.#currentSortType = sortType;
  }

  #renderPoint = (point) => {
    const eventPresenter = new EventPresenter(this.#eventsListComponent, this.#handlePointChange, this.#handleModeChange);
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
