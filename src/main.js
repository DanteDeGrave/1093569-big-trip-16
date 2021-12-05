import {generateWaypoint} from './mock/waypoint';
import {RenderPosition, render, replace} from './utils/render';
import SiteInfoView from './view/site-info-view';
import SiteNavigationView from './view/site-navigation-view';
import SiteFiltersView from './view/site-filters-view';
import SiteSortFormView from './view/site-sort-form-view';
import SiteEventsListView from './view/site-events-list-view';
import SiteEditPointFormView from './view/site-edit-point-form-view';
import SiteEventsItemView from './view/site-events-item-view';
import SiteListEmptyView from './view/site-list-empty-view';

const WAYPOINT_COUNT = 20;
const points = Array.from({length: WAYPOINT_COUNT}, generateWaypoint);
const tripMainElement = document.querySelector('.trip-main');
const tripNavigationElement = tripMainElement.querySelector('.trip-controls__navigation');
const tripFiltersElement = tripMainElement.querySelector('.trip-controls__filters');
const pageMainElement = document.querySelector('.page-main');
const tripEventsElement = pageMainElement.querySelector('.trip-events');

render(tripFiltersElement, new SiteFiltersView(), RenderPosition.BEFOREEND);
render(tripNavigationElement, new SiteNavigationView(), RenderPosition.BEFOREEND);

if (points.length) {
  render(tripMainElement, new SiteInfoView(points), RenderPosition.AFTERBEGIN);
  render(tripEventsElement, new SiteSortFormView(), RenderPosition.BEFOREEND);

  const renderPoint = (pointListElement, point) => {
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

    render(pointListElement, pointComponent, RenderPosition.BEFOREEND);
  };

  const eventsListComponent = new SiteEventsListView();

  render(tripEventsElement, eventsListComponent, RenderPosition.BEFOREEND);

  for (let i = 0; i < points.length; i++) {
    renderPoint(eventsListComponent.element, points[i]);
  }
} else {
  render(tripEventsElement, new SiteListEmptyView(), RenderPosition.BEFOREEND);
}
