import { filterExtensions } from "./api.js";
import { renderExtension } from "./render.js";

/**
 * Configura los event listeners para los botones de filtro
 */
export function setUpFilter() {
  const allButton = document.querySelector('.all');
  const activeButton = document.querySelector('.actives');
  const inactiveButton = document.querySelector('.inactive');

  // Remover clases active de todos los botones
  const removeActiveClass = () => {
    allButton.classList.remove('active');
    activeButton.classList.remove('active');
    inactiveButton.classList.remove('active');
  };

  // Activar clase del botón seleccionado
  const activeButtonClass = (button) => {
    removeActiveClass();
    button.classList.add('active');
  };

  // Función para aplicar filtro y renderizar
  const applyFilter = async (filterType) => {
    try {
      const filteredExtensions = await filterExtensions(filterType);
      renderExtension(filteredExtensions);
    } catch (error) {
      console.error('Error al filtrar extensiones:', error);
      // Mostrar mensaje de error al usuario
      showFilterError();
    }
  };

  // Event listener para botón "All"
  allButton.addEventListener('click', async (e) => {
    e.preventDefault();
    activeButtonClass(allButton);
    await applyFilter('all');
  });

  // Event listener para botón "Active"
  activeButton.addEventListener('click', async (e) => {
    e.preventDefault();
    activeButtonClass(activeButton);
    await applyFilter('active');
  });

  // Event listener para botón "Inactive"
  inactiveButton.addEventListener('click', async (e) => {
    e.preventDefault();
    activeButtonClass(inactiveButton);
    await applyFilter('inactive');
  });
}

/**
 * Muestra un mensaje de error cuando falla el filtrado
 */
function showFilterError() {
  const container = document.querySelector('.container');

  // Remover mensaje de error anterior si existe
  const existingError = container.querySelector('.filter-error');
  if (existingError) {
    existingError.remove();
  }

  const errorDiv = document.createElement('div');
  errorDiv.classList.add('filter-error');
  errorDiv.innerHTML = `
    <div style="
      background-color: #fff3cd;
      border: 1px solid #ffeaa7;
      color: #856404;
      padding: 15px;
      margin: 15px 0;
      border-radius: 5px;
      text-align: center;
    ">
      <strong>⚠️ Error al filtrar extensiones</strong>
      <p>No se pudieron cargar las extensiones filtradas. Verifica tu conexión.</p>
    </div>
  `;

  // Insertar el error después de los filtros
  const filtersContainer = container.querySelector('.container__filters');
  filtersContainer.insertAdjacentElement('afterend', errorDiv);

  // Remover el mensaje después de 5 segundos
  setTimeout(() => {
    if (errorDiv && errorDiv.parentNode) {
      errorDiv.remove();
    }
  }, 5000);
}
