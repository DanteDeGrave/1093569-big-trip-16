import {createSiteInfoTemplate} from './view/site-info-view';
import {createNavigationTemplate} from './view/site-navigation-view';
import {createFiltersTemplate} from './view/site-filters-view';
import {createSiteSortFormTemplate} from './view/site-sort-form-view';
import {createEventsListTemplate} from './view/site-events-list';
import {createEditPointFormTemplate} from './view/site-edit-point-form-view';
import {createEventsItemTemplate} from './view/site-events-item';
import {generateWaypoint} from './mock/waypoint';

const WAYPOINT_COUNT = 20;
const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};
const points = Array.from({length: WAYPOINT_COUNT}, generateWaypoint);
const tripMainElement = document.querySelector('.trip-main');
const tripNavigationElement = tripMainElement.querySelector('.trip-controls__navigation');
const tripFiltersElement = tripMainElement.querySelector('.trip-controls__filters');
const pageMainElement = document.querySelector('.page-main');
const tripEventsElement = pageMainElement.querySelector('.trip-events');

const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

renderTemplate(tripMainElement, createSiteInfoTemplate(points), RenderPosition.AFTERBEGIN);
renderTemplate(tripNavigationElement, createNavigationTemplate(), RenderPosition.BEFOREEND);
renderTemplate(tripFiltersElement, createFiltersTemplate(), RenderPosition.BEFOREEND);
renderTemplate(tripEventsElement, createSiteSortFormTemplate(), RenderPosition.BEFOREEND);

if (points.length) {
  renderTemplate(tripEventsElement, createEventsListTemplate(), RenderPosition.BEFOREEND);

  const eventListElement = pageMainElement.querySelector('.trip-events__list');

  renderTemplate(eventListElement, createEditPointFormTemplate(points[0]), RenderPosition.BEFOREEND);
  for (let i = 1; i < points.length; i++) {
    renderTemplate(eventListElement, createEventsItemTemplate(points[i]), RenderPosition.BEFOREEND);
  }
}
