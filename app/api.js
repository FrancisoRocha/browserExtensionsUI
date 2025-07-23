import { API_EXTENSIONS } from "./config.js";

// METHOD: GET
export const getExtension = async () => {

  try{ // Inicia el bloque para manejar errores
    const response = await fetch(API_EXTENSIONS); // Solicitud a la API de extensiones

    if(!response.ok){
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json(); // Obtiene los datos en formato JSON
    console.log(data); // Imprime los datos obtenidos de la API
    return data; // Retorna los datos obtenidos de la API

  }catch(error){
    console.log('Error fetching extensions', error);
    throw error; // Lanza el error para que sea manejado
  }

}
