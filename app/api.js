import { API_EXTENSIONS } from "./config.js";

/**
 * Obtiene todas las extensiones desde la API.
 *
 * @returns {Promise<Array>} Array de extensiones obtenidas de la API
 */
export const getExtension = async () => {
  try {
    const url = API_EXTENSIONS;
    const res = await fetch(url); // Solicitud a la API de extensiones

    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }

    const data = await res.json(); // Obtiene los datos en formato JSON
    // console.log('Extensiones obtenidas:', data); // Imprime los datos obtenidos de la API

    return data; // Retorna solo los datos, sin renderizar
  } catch (error) {
    console.error('Error al obtener extensiones:', error);
    throw error;
  }
};

/**
 * Actualiza el estado de una extensión específica.
 *
 * @param {number} id - ID de la extensión a actualizar
 * @param {boolean} isActive - Nuevo estado de la extensión
 * @returns {Promise<Object>} Datos de la extensión actualizada
 */
export const patchExtension = async (id, isActive) => {

  try {
    const url = `${API_EXTENSIONS}/${id}`; // Construye la URL con el ID
    console.log('URL de actualización:', url);

    const res = await fetch(url, { // Solicitando a la API para actualizar la extension
      method: 'PATCH',
      body: JSON.stringify({ isActive }), // Opcion para activar/desactivar la extension
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) { // Si la respuesta es exitosa
      const data = await res.json(); // Obtiene los datos en formato JSON
      console.log('Extensión actualizada:', data);
      return data;
    } else {
      throw new Error(`Error al actualizar la extension: ${res.status}`); // Error y manda un mensaje
    }
  } catch (error) {
    console.error('Error en patchExtension:', error);
    throw error;
  }

};

/**
 * Filtra extensiones según su estado activo/inactivo.
 *
 * @param {string} filterType - Tipo de filtro: 'all', 'active', 'inactive'
 * @returns {Promise<Array>} Array de extensiones filtradas
 */
export const filterExtensions = async (filterType) => {

  try {
    let url = API_EXTENSIONS;

    // Aplicar filtros según el tipo
    switch (filterType) {
      case 'active':
        url += '?isActive=true';
        break;
      case 'inactive':
        url += '?isActive=false';
        break;
      case 'all':
      default:
        // No agregar parámetros para mostrar todas
        break;
    }

    console.log('URL de filtro:', url);
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }

    const data = await res.json();
    console.log('Extensiones filtradas:', data);
    return data;
  } catch (error) {
    console.error('Error en filterExtensions:', error);
    throw error;
  }

};

/**
 * Elimina una extensión específica.
 *
 * @param {number} id - ID de la extensión a eliminar
 * @returns {Promise<boolean>} true si se eliminó correctamente
 */
export const deleteExtension = async (id) => {

  try {
    const url = `${API_EXTENSIONS}/${id}`;
    const res = await fetch(url, {
      method: 'DELETE'
    });

    if (!res.ok) {
      throw new Error(`Error al eliminar extensión: ${res.status}`);
    }

    console.log(`Extensión con ID ${id} eliminada correctamente`);
    return true;
  } catch (error) {
    console.error('Error en deleteExtension:', error);
    throw error;
  }
};

/**
 * Agrega una nueva extensión.
 *
 * @param {Object} extensionData - Datos de la nueva extensión
 * @returns {Promise<Object>} Datos de la extensión creada
 */
export const addExtension = async (extensionData) => {
  try {
    const res = await fetch(API_EXTENSIONS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(extensionData)
    });

    if (!res.ok) {
      throw new Error(`Error al agregar extensión: ${res.status}`);
    }

    const data = await res.json();
    console.log('Nueva extensión agregada:', data);
    return data;
  } catch (error) {
    console.error('Error en addExtension:', error);
    throw error;
  }
};
