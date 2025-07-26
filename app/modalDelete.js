import { deleteExtension as deleteExtensionAPI } from "./api.js";

// SweetAlert2 está disponible globalmente via CDN
const Swal = window.Swal;

/**
 * Muestra un modal de confirmación y elimina la extensión si el usuario confirma
 * @param {number} extensionID - ID de la extensión a eliminar
 * @param {string} extensionName - Nombre de la extensión para mostrar en el modal
 * @returns {Promise<boolean>} true si se eliminó, false si se canceló
 */
export async function deleteExtension(extensionID, extensionName = '') {
  try {
    // Modal de confirmación con SweetAlert2
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: extensionName ? `Delete extension: ${extensionName}` : 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
      focusCancel: true
    });

    // Si el usuario confirma la eliminación
    if (result.isConfirmed) {
      try {
        // Mostrar loading
        Swal.fire({
          title: 'Deleting...',
          text: 'Please wait while we delete the extension',
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });

        // Llamar a la API para eliminar la extensión
        await deleteExtensionAPI(extensionID);

        // Mostrar mensaje de éxito
        await Swal.fire({
          title: 'Deleted!',
          text: 'The extension has been successfully removed.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });

        // Refrescar la lista de extensiones
        await refreshExtensions();

        return true; // Eliminación exitosa

      } catch (error) {
        console.error('Error deleting extension:', error);

        // Mostrar error al usuario
        await Swal.fire({
          title: 'Error!',
          text: 'Failed to delete the extension. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });

        return false; // Error en la eliminación
      }
    }

    return false; // Usuario canceló

  } catch (error) {
    console.error('Error in deleteExtension modal:', error);
    return false;
  }
}

/**
 * Función simplificada para eliminar extensión con confirmación rápida
 * @param {number} extensionID - ID de la extensión a eliminar
 * @param {string} extensionName - Nombre de la extensión
 */
export async function quickDeleteExtension(extensionID, extensionName = '') {
  try {
    const result = await Swal.fire({
      title: `Delete ${extensionName}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      await deleteExtensionAPI(extensionID);

      Swal.fire({
        title: 'Deleted!',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });

      // Refrescar la lista
      setTimeout(async () => {
        await refreshExtensions();
      }, 1500);

      return true;
    }

    return false;

  } catch (error) {
    console.error('Error in quickDeleteExtension:', error);
    Swal.fire({
      title: 'Error!',
      text: 'Could not delete extension',
      icon: 'error'
    });
    return false;
  }
}

/**
 * Elimina múltiples extensiones con confirmación
 * @param {Array<{id: number, name: string}>} extensions - Array de extensiones a eliminar
 */
export async function deleteBulkExtensions(extensions) {
  if (!extensions || extensions.length === 0) {
    return false;
  }

  try {
    const extensionNames = extensions.map(ext => ext.name).join(', ');
    const count = extensions.length;

    const result = await Swal.fire({
      title: `Delete ${count} extension${count > 1 ? 's' : ''}?`,
      text: `Extensions: ${extensionNames}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete All',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      // Mostrar progress
      Swal.fire({
        title: 'Deleting extensions...',
        text: `Deleting ${count} extensions`,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      // Eliminar todas las extensiones
      const deletePromises = extensions.map(ext => deleteExtensionAPI(ext.id));
      await Promise.all(deletePromises);

      // Mostrar éxito
      await Swal.fire({
        title: 'Success!',
        text: `${count} extension${count > 1 ? 's' : ''} deleted successfully`,
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      });

      // Refrescar la lista
      await refreshExtensions();

      return true;
    }

    return false;

  } catch (error) {
    console.error('Error in deleteBulkExtensions:', error);
    Swal.fire({
      title: 'Error!',
      text: 'Some extensions could not be deleted',
      icon: 'error'
    });
    return false;
  }
}

/**
 * Muestra un toast de confirmación simple
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo de toast: 'success', 'error', 'warning', 'info'
 */
export function showToast(message, type = 'success') {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });

  Toast.fire({
    icon: type,
    title: message
  });
}
