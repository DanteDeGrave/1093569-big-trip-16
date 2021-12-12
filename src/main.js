import {generateWaypoint} from './mock/waypoint';
import {RenderPosition, render} from './utils/render';
import SiteInfoView from './view/site-info-view';
import SiteNavigationView from './view/site-navigation-view';
import SiteFiltersView from './view/site-filters-view';
import MainPresenter from './presenters/main-presenter';

const WAYPOINT_COUNT = 20;
const points = Array.from({length: WAYPOINT_COUNT}, generateWaypoint);
const tripMainElement = document.querySelector('.trip-main');
const tripNavigationElement = tripMainElement.querySelector('.trip-controls__navigation');
const tripFiltersElement = tripMainElement.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');
const mainPresenter = new MainPresenter(tripEventsElement);

if (points.length) {
  render(tripMainElement, new SiteInfoView(points), RenderPosition.AFTERBEGIN);
}

render(tripFiltersElement, new SiteFiltersView(), RenderPosition.BEFOREEND);
render(tripNavigationElement, new SiteNavigationView(), RenderPosition.BEFOREEND);

mainPresenter.init(points);
