import { getExtension } from "./api.js";
import { renderExtension } from "./render.js";
import { toggleTheme } from "./toggleTheme.js"

document.addEventListener('DOMContentLoaded', () => {

  toggleTheme()

})

try{

  const extensions = await getExtension();
  console.log('Extensions loades:', extensions);
  renderExtension(extensions);

} catch(error){

  console.log('Error loading extensions', error);

}
