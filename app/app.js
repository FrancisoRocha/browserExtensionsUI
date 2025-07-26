import { getExtension } from "./api.js";
import { renderExtension } from "./render.js";
import { toggleTheme } from "./toggleTheme.js";
import { setUpFilter } from "./filter.js";

/**
 * Inicializa la aplicación cuando el DOM está cargado
 */
document.addEventListener('DOMContentLoaded', async () => {
  // BUTTON TOGGLE THEME
  toggleTheme();

  try {
    // OBTENER EXTENSIONES - separando obtención de datos y renderizado
    const extensions = await getExtension();
    console.log('Extensions loaded:', extensions);

    // RENDERIZAR EXTENSIONES
    renderExtension(extensions);

    // CONFIGURAR FILTROS
    setUpFilter();

  } catch (error) {
    console.error('Error loading extensions:', error);
    showErrorMessage('Error al cargar las extensiones. Asegúrate de que json-server esté ejecutándose en el puerto 3000.');
  }
});
