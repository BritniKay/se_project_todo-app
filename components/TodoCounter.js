export default class TodoCounter {
  constructor(todos, selector) {
    this._element = document.querySelector(selector);
    if (!this._element) {
      console.error(`Element with selector '${selector}' not found.`);
      return;
    }

    this._completed = todos.filter((todo) => todo.completed).length; // Corrected to count completed todos
    this._total = todos.length;
    this._updateText();
  }

  updateCompleted(increment) {
    if (!this._element) return;
    this._completed += increment ? 1 : -1;
    this._updateText();
  }

  updateTotal(increment) {
    if (!this._element) return;
    this._total += increment ? 1 : -1;
    this._updateText();
  }

  _updateText() {
    if (!this._element) return;
    this._element.textContent = `Showing ${this._completed} out of ${this._total} completed`;
  }
}
