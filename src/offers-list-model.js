import AbstractObservable from './utils/abstract-observable';

export default class OffersListModel extends AbstractObservable {
  #apiService = null;
  #offers = [];

  constructor(apiService) {
    super();
    this.#apiService = apiService;

    this.#apiService.offers.then((offers) => {
      console.log(offers);
    });
  }

  get points() {
    return this.#offers;
  }
}
