import { API_EXTENSIONS } from "./config.js";
import { renderExtension } from "./render.js";

/**
 * Obtiene las extensiones desde la API y las renderiza.
 * 
 * @returns {Promise<any>} Resultado de la función renderExtension con los datos obtenidos
 */

// METHOD: GET
export const getExtension = async () => {

  const url = API_EXTENSIONS; 
  const res = await fetch(url); // Solicitud a la API de extensiones

  const data = await res.json(); // Obtiene los datos en formato JSON
  console.log(data); // Imprime los datos obtenidos de la API

  const render = renderExtension(data) 
  return render; // Llama la función que renderiza las extensiones

}
