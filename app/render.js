
export const renderExtension = (extensions) => {

  const container = document.querySelector('.container');

  // LIMPIAR CONTENIDO  PREVIO
  const existingCards = container.querySelector('.cards__extensions');

  if (existingCards) {
    existingCards.remove();
  }

  // CONTENEDOR DE LAS CARDS
  const cardsContainer = document.createElement('DIV');
  cardsContainer.classList.add('cards__extensions');

  // RENDERIZAR EXTENSIONES
  extensions.forEach(extension => {

    const { logo, name, description, isActive, id } = extension;

    const cardExtension = document.createElement('DIV');
    cardExtension.classList.add('card', 'light');

    cardExtension.innerHTML =
      `
          <!-- INFO -->
          <div class="card__info">
              <img src="${logo}" alt="logo ${name}" class="icon">
              <div class="info">
                  <p class="title__card light">${name}</p>
                  <p class="description__card light">${description}</p>
              </div>
          </div>
          <!-- ACTIONS-->
          <div class="card__actions">
              <button class="btn__delete light" data-name="${name}">Remove</button>
              <input ${ isActive ? 'checked' : '' } type="checkbox" class="switch" data-id="${id}">
          </div>
      `;

    cardsContainer.appendChild(cardExtension)
  })
  container.appendChild(cardsContainer)
}
