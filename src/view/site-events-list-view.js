import AbstractView from './abstract-view';

const createEventsListTemplate = () => (
  `
    <ul class="trip-events__list"></ul>
  `
);

export default class SiteEventsListView extends AbstractView {
  get template() {
    return createEventsListTemplate();
  }
}
