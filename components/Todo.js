export default class Todo {
  constructor(data, selector) {
    this._data = data;
    this._selector = selector;

    this._templateElement = document.querySelector(this._selector).content;
    this._element = this._templateElement
      .querySelector(".todo")
      .cloneNode(true);

    this._checkbox = this._element.querySelector(".todo__completed");
    this._nameElement = this._element.querySelector(".todo__name");
    this._dateElement = this._element.querySelector(".todo__date");
    this._deleteButton = this._element.querySelector(".todo__delete-btn");
  }

  _setEventListeners() {
    this._checkbox.addEventListener("change", () => {
      this._element.classList.toggle("todo_completed", this._checkbox.checked);
    });

    this._deleteButton.addEventListener("click", () => {
      this._element.remove();
    });
  }

  getView() {
    this._nameElement.textContent = this._data.name;
    this._dateElement.textContent = this._data.date
      ? new Date(this._data.date).toLocaleDateString()
      : "No due date";

    const uniqueId = this._data.id;
    this._checkbox.id = uniqueId;
    this._element.querySelector(".todo__label").setAttribute("for", uniqueId);

    this._setEventListeners();

    return this._element;
  }
}
