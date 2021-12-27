import AbstractObservable from './utils/abstract-observable';

export default class OffersListModel extends AbstractObservable {
  #offersList = [];

  set points(offersList) {
    this.#offersList = [...offersList];
  }

  get points() {
    return this.#offersList;
  }
}
