import { validationConfig } from "./utils/constants.js";
import FormValidator from "./utils/FormValidator.js";

const addTodoForm = document.querySelector("#add-todo-form");
const formValidator = new FormValidator(validationConfig, addTodoForm);
formValidator.enableValidation();
