import {createElement} from '../utils/render';

export default class AbstractView {
  #element = null;
  _callback = {};

  constructor() {
    if (new.target === AbstractView) {
      throw new Error('Оу оу потише, это абстракция !');
    }
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  get template() {
    throw new Error('Метод template не имплементирован в абстрактном классе');
  }

  removeElement() {
    this.#element = null;
  }
}
