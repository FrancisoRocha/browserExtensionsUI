import { getExtension } from "./api.js";
import { renderExtension } from "./render.js";
import { toggleTheme } from "./toggleTheme.js"

document.addEventListener('DOMContentLoaded', () => {

  toggleTheme()
  getExtension();

})

