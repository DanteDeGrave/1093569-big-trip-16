import {RenderPosition, render, remove} from '../utils/render';
import SiteSortFormView from '../view/site-sort-form-view';
import SiteEventsListView from '../view/site-events-list-view';
import SiteListEmptyView from '../view/site-list-empty-view';
import EventPresenter from './event-presenter';
import {sortByDay, sortByPrice, sortByTime} from '../utils/common';
import {SortType, UpdateType, UserAction} from '../const';
import {filter} from '../utils/filter';

export default class EventsBoardPresenter {
  #pointsModel = null;
  #eventContainer = null;
  #sortComponent = null;
  #eventsListComponent = new SiteEventsListView();
  #emptyEventsListComponent = new SiteListEmptyView();
  #eventPresenter = new Map();
  #currentSortType = SortType.DAY;
  #filterModel = null;

  constructor(container, pointsModel, filterModel) {
    this.#eventContainer = container;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    const filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredTasks = filter[filterType](points);
    switch (this.#currentSortType) {
      case SortType.TIME:
        return filteredTasks.sort(sortByTime);
      case SortType.PRICE:
        return filteredTasks.sort(sortByPrice);
    }
    return  filteredTasks.sort(sortByDay);
  }

  init() {
    this.#renderEventsBoard();
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  }

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#eventPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearEventsBoard();
        this.#renderEventsBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearEventsBoard({resetSortType: true});
        this.#renderEventsBoard();
        break;
    }
  }

  #handleModeChange = () => {
    this.#eventPresenter.forEach((presenter) => presenter.resetView());
  }

  #handleSortTypeChange = (sortType) => {
    this.#currentSortType = sortType;
    this.#clearEventsBoard();
    this.#renderEventsBoard();
  }

  #renderSort = () => {
    this.#sortComponent = new SiteSortFormView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#eventContainer, this.#sortComponent, RenderPosition.BEFOREEND);
  }

  #renderPoint = (point) => {
    const eventPresenter = new EventPresenter(this.#eventsListComponent, this.#handleViewAction, this.#handleModeChange);
    eventPresenter.init(point);
    this.#eventPresenter.set(point.id, eventPresenter);
  }

  #renderEmptyEventList = () => {
    render(this.#eventContainer, this.#emptyEventsListComponent, RenderPosition.BEFOREEND);
  }

  #clearEventsBoard = ({resetSortType = false} = {}) => {
    this.#eventPresenter.forEach((presenter) => presenter.destroy());
    this.#eventPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#emptyEventsListComponent);
    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderEventsBoard = () => {
    if (!this.points.length) {
      this.#renderEmptyEventList();
      return;
    }

    this.#renderSort();

    render(this.#eventContainer, this.#eventsListComponent, RenderPosition.BEFOREEND);
    this.points.forEach((point) => this.#renderPoint(point));
  }
}
