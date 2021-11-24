import {createSiteInfoTemplate} from './view/site-info-view';
import {createNavigationTemplate} from './view/site-navigation-view';
import {createFiltersTemplate} from './view/site-filters-view';
import {createSiteSortFormTemplate} from './view/site-sort-form-view';
import {createEventsListTemplate} from './view/site-events-list';
import {createAddPointFormTemplate} from './view/site-add-point-form-view';
import {createEditPointFormTemplate} from './view/site-edit-point-form-view';
import {createEventsItemTemplate} from './view/site-events-item';

const WAYPOINT_COUNT = 3;
const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};
const tripMainElement = document.querySelector('.trip-main');
const tripNavigationElement = tripMainElement.querySelector('.trip-controls__navigation');
const tripFiltersElement = tripMainElement.querySelector('.trip-controls__filters');
const pageMainElement = document.querySelector('.page-main');
const tripEventsElement = pageMainElement.querySelector('.trip-events');

const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

renderTemplate(tripMainElement, createSiteInfoTemplate(), RenderPosition.AFTERBEGIN);
renderTemplate(tripNavigationElement, createNavigationTemplate(), RenderPosition.BEFOREEND);
renderTemplate(tripFiltersElement, createFiltersTemplate(), RenderPosition.BEFOREEND);
renderTemplate(tripEventsElement, createSiteSortFormTemplate(), RenderPosition.BEFOREEND);
renderTemplate(tripEventsElement, createEventsListTemplate(), RenderPosition.BEFOREEND);

const eventListElement = pageMainElement.querySelector('.trip-events__list');

renderTemplate(eventListElement, createEditPointFormTemplate(), RenderPosition.BEFOREEND);
renderTemplate(eventListElement, createAddPointFormTemplate(), RenderPosition.BEFOREEND);

for (let i = 0; i < WAYPOINT_COUNT; i++) {
  renderTemplate(eventListElement, createEventsItemTemplate(), RenderPosition.BEFOREEND);
}
