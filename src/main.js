import {generateWaypoint} from './mock/waypoint';
import {RenderPosition, render} from './utils/render';
import SiteInfoView from './view/site-info-view';
import SiteNavigationView from './view/site-navigation-view';
import SiteFiltersView from './view/site-filters-view';
import EventsBoardPresenter from './presenters/events-board-presenter';
import PointsModel from './points-model';
import ApiService from './api-service';
import OffersListModel from './offers-list-model';

const WAYPOINT_COUNT = 20;
const AUTHORIZATION = 'Basic uVovanaBolshoiSkill';
const END_POINT = 'https://16.ecmascript.pages.academy/big-trip';
const points = Array.from({length: WAYPOINT_COUNT}, generateWaypoint);
const pointsModel = new PointsModel(new ApiService(END_POINT, AUTHORIZATION));
const offersListModel = new OffersListModel(new ApiService(END_POINT, AUTHORIZATION));
pointsModel.points = points;

const tripMainElement = document.querySelector('.trip-main');
const tripNavigationElement = tripMainElement.querySelector('.trip-controls__navigation');
const tripFiltersElement = tripMainElement.querySelector('.trip-controls__filters');

const tripEventsElement = document.querySelector('.trip-events');
const eventsBoardPresenter = new EventsBoardPresenter(tripEventsElement, pointsModel);

if (points.length) {
  render(tripMainElement, new SiteInfoView(points), RenderPosition.AFTERBEGIN);
}

render(tripFiltersElement, new SiteFiltersView(), RenderPosition.BEFOREEND);
render(tripNavigationElement, new SiteNavigationView(), RenderPosition.BEFOREEND);

eventsBoardPresenter.init();
