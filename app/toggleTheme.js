const btnTheme = document.querySelector('.btn__theme');

/**
 * Inicializa el tema de la aplicación al cargar la página
 */
export const initTheme = () => {
  // Obtener tema guardado del localStorage o usar 'light' por defecto
  const savedTheme = localStorage.getItem('theme') || 'light';
  applyTheme(savedTheme);
};

/**
 * Alterna entre tema claro y oscuro
 */
export const toggleTheme = () => {
  const body = document.body;
  const currentTheme = body.classList.contains('dark') ? 'dark' : 'light';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  applyTheme(newTheme);
  
  // Guardar tema en localStorage
  localStorage.setItem('theme', newTheme);
};

/**
 * Aplica un tema específico a todos los elementos
 * @param {string} theme - 'light' o 'dark'
 */
const applyTheme = (theme) => {
  const isDark = theme === 'dark';
  
  // Elementos que siempre existen
  const body = document.body;
  const header = document.querySelector('.header');
  const title = document.querySelector('.title__container');
  const logo = document.querySelector('.logo');
  const iconTheme = document.querySelector('.icon__theme');
  const fillAll = document.querySelector('.all');
  const fillActives = document.querySelector('.actives');
  const fillInactive = document.querySelector('.inactive');

  // Aplicar tema al body
  body.className = ''; // Limpiar todas las clases
  body.classList.add(theme);

  // Cambiar el logo si existe
  if (logo) {
    logo.src = isDark ? './assets/images/logo-dark.svg' : './assets/images/logo.svg';
  }

  // Aplicar tema al header
  if (header) {
    header.className = header.className.replace(/\b(light|dark)\b/g, '');
    header.classList.add('header', theme);
  }

  // Aplicar tema al botón de tema
  if (btnTheme) {
    btnTheme.className = btnTheme.className.replace(/\b(light|dark)\b/g, '');
    btnTheme.classList.add('btn__theme', theme);
  }

  // Cambiar icono del tema si existe
  if (iconTheme) {
    iconTheme.src = isDark ? './assets/images/icon-sun.svg' : './assets/images/icon-moon.svg';
  }

  // Aplicar tema al título
  if (title) {
    title.className = title.className.replace(/\b(light|dark)\b/g, '');
    title.classList.add('title__container', theme);
  }

  // Aplicar tema a los filtros
  if (fillAll) {
    fillAll.className = fillAll.className.replace(/\b(light|dark)\b/g, '');
    fillAll.classList.add('all', theme);
  }
  
  if (fillActives) {
    fillActives.className = fillActives.className.replace(/\b(light|dark)\b/g, '');
    fillActives.classList.add('actives', theme);
    if (fillActives.classList.contains('active')) {
      fillActives.classList.add('active'); // Mantener clase active
    }
  }
  
  if (fillInactive) {
    fillInactive.className = fillInactive.className.replace(/\b(light|dark)\b/g, '');
    fillInactive.classList.add('inactive', theme);
  }

  // Aplicar tema a elementos dinámicos (cards) si existen
  applyThemeToDynamicElements(theme);
};

/**
 * Aplica el tema a elementos que se crean dinámicamente
 * @param {string} theme - 'light' o 'dark'
 */
export const applyThemeToDynamicElements = (theme) => {
  // Cards
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.className = card.className.replace(/\b(light|dark)\b/g, '');
    card.classList.add('card', theme);
  });

  // Títulos de las cards
  const cardTitles = document.querySelectorAll('.title__card');
  cardTitles.forEach(cardTitle => {
    cardTitle.className = cardTitle.className.replace(/\b(light|dark)\b/g, '');
    cardTitle.classList.add('title__card', theme);
  });

  // Descripciones de las cards
  const cardDescriptions = document.querySelectorAll('.description__card');
  cardDescriptions.forEach(description => {
    description.className = description.className.replace(/\b(light|dark)\b/g, '');
    description.classList.add('description__card', theme);
  });

  // Botones de eliminar
  const deleteButtons = document.querySelectorAll('.btn__delete');
  deleteButtons.forEach(btnDelete => {
    btnDelete.className = btnDelete.className.replace(/\b(light|dark)\b/g, '');
    btnDelete.classList.add('btn__delete', theme);
  });
};

/**
 * Obtiene el tema actual
 * @returns {string} 'light' o 'dark'
 */
export const getCurrentTheme = () => {
  const body = document.body;
  return body.classList.contains('dark') ? 'dark' : 'light';
};

// Event listener para el botón de cambio de tema
if (btnTheme) {
  btnTheme.addEventListener('click', toggleTheme);
}