import { patchExtension } from "./api.js";
import { deleteExtension } from "./modalDelete.js";

/**
 * Agrega event listeners a todos los switches y botones de eliminar
 */
export function addEventsListeners() {
  // Manejar switches de activar/desactivar
  addSwitchListeners();

  // Manejar botones de eliminar
  addDeleteButtonListeners();
}

/**
 * Agrega event listeners a los switches de activar/desactivar extensiones
 */
function addSwitchListeners() {
  const switches = document.querySelectorAll('.switch');

  console.log('🔍 Found switches:', switches.length);

  if (switches.length === 0) {
    console.warn('⚠️ No switches found in DOM');
    return;
  }

  switches.forEach(switchElement => {
    // Remover event listeners previos para evitar duplicados
    switchElement.removeEventListener('change', handleSwitchChange);

    // Agregar nuevo event listener
    switchElement.addEventListener('change', handleSwitchChange);
  });
}

/**
 * Maneja el cambio de estado de un switch
 * @param {Event} e - Evento del switch
 */
async function handleSwitchChange(e) {
  try {
    const switchId = e.target.dataset.id;
    const isChecked = e.target.checked;

    if (!switchId) {
      console.error('❌ Switch ID not found');
      return;
    }

    console.log(`🔄 Updating extension ${switchId} to ${isChecked ? 'active' : 'inactive'}`);

    // Deshabilitar el switch durante la actualización
    e.target.disabled = true;

    // Llamar a la API para actualizar la extensión
    await patchExtension(switchId, isChecked);

    console.log(`✅ Extension ${switchId} updated successfully`);

  } catch (error) {
    console.error('❌ Error updating extension:', error);

    // Revertir el switch si hay error
    e.target.checked = !e.target.checked;

    // Mostrar mensaje de error (opcional)
    alert('Error updating extension. Please try again.');
  } finally {
    // Rehabilitar el switch
    e.target.disabled = false;
  }
}

/**
 * Agrega event listeners a los botones de eliminar
 */
function addDeleteButtonListeners() {
  const deleteButtons = document.querySelectorAll('.btn__delete');

  console.log('🗑️ Found delete buttons:', deleteButtons.length);

  if (deleteButtons.length === 0) {
    console.warn('⚠️ No delete buttons found in DOM');
    return;
  }

  deleteButtons.forEach(button => {
    // Remover event listeners previos para evitar duplicados
    button.removeEventListener('click', handleDeleteClick);

    // Agregar nuevo event listener
    button.addEventListener('click', handleDeleteClick);
  });
}

/**
 * Maneja el click en un botón de eliminar
 * @param {Event} e - Evento del botón
 */
async function handleDeleteClick(e) {
  try {
    e.preventDefault();

    const extensionId = e.target.dataset.id;

    if (!extensionId) {
      console.error('❌ Extension ID not found');
      return;
    }

    // Obtener el nombre de la extensión del DOM
    const card = e.target.closest('.card');
    const extensionNameElement = card?.querySelector('.title__card');
    const extensionName = extensionNameElement?.textContent || 'Unknown Extension';

    console.log(`🗑️ Attempting to delete extension: ${extensionName} (ID: ${extensionId})`);

    // Deshabilitar el botón durante la eliminación
    e.target.disabled = true;
    e.target.textContent = 'Deleting...';

    // Llamar a la función de eliminación con modal
    const wasDeleted = await deleteExtension(parseInt(extensionId), extensionName);

    if (wasDeleted) {
      console.log(`✅ Extension ${extensionName} deleted successfully`);

      // Remover la card del DOM inmediatamente para mejor UX
      const card = e.target.closest('.card');
      if (card) {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
        card.style.transition = 'all 0.3s ease';

        setTimeout(() => {
          card.remove();
        }, 300);
      }
    } else {
      console.log(`❌ Extension ${extensionName} deletion cancelled or failed`);
    }

  } catch (error) {
    console.error('❌ Error in delete handler:', error);
    alert('Error deleting extension. Please try again.');
  } finally {
    // Rehabilitar el botón
    e.target.disabled = false;
    e.target.textContent = 'Remove';
  }
}
