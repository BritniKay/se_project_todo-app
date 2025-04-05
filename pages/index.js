import { initialTodos, validationConfig } from "./utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import Todo from "../components/Todo.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = new PopupWithForm("#add-todo-popup", (formData) => {
  const name = formData.name.trim();
  if (!name) {
    console.error("Todo name cannot be empty.");
    return;
  }

  const date = formData.date ? new Date(formData.date) : null;
  if (date) {
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  }

  const values = { name, date, id: uuidv4(), completed: false };
  const todo = generateTodo(values);
  todoSection.addItem(todo);
  todoCounter.updateTotal(true);
});

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const todoSection = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todo = generateTodo(item);
    todoSection.addItem(todo);
  },
  containerSelector: ".todos__list",
});

const generateTodo = (data) => {
  const todoItem = new Todo(data, "#todo-template");
  const checkbox = todoItem.getView().querySelector(".todo__completed");

  checkbox.checked = data.completed;
  checkbox.addEventListener("change", () => {
    todoCounter.updateCompleted(checkbox.checked);
  });

  return todoItem.getView();
};

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

todoSection.renderItems();
addTodoPopup.setEventListeners();

const formValidator = new FormValidator(validationConfig, addTodoPopup._form);
formValidator.enableValidation();
