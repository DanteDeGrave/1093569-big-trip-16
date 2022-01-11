import AbstractView from './abstract-view';
import{FilterType} from '../const';

const emptySiteListMessageType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no past events now future',
  [FilterType.PAST]: 'There are no past events now past',
};

const createSiteListEmpty = (filterType) =>
  `
    <p class="trip-events__msg">${emptySiteListMessageType[filterType]}</p>
  `;

export default class SiteListEmptyView extends AbstractView {
  #filterType = null;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createSiteListEmpty(this.#filterType);
  }
}
