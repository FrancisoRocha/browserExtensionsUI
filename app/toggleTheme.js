const btnTheme = document.querySelector('.btn__theme');

export const toggleTheme = () => {

  const body = document.body;
  const header = document.querySelector('.header');
  const title = document.querySelector('.title__container');
  const logo = document.querySelector('.logo');
  const iconTheme = document.querySelector('.icon__theme');
  const fillAll = document.querySelector('.all');
  const fillActives = document.querySelector('.actives');
  const fillInactive = document.querySelector('.inactive');

  const isDark = body.classList.toggle('dark');
  body.classList.toggle('light', !isDark)

  // CAMBIAR EL LOGO
  if(logo){
    logo.src = isDark ? '/assets/images/logo-dark.svg' : '/assets/images/logo.svg';
  }

  header.classList.toggle('dark', isDark);
  header.classList.toggle('light', !isDark);

  btnTheme.classList.toggle('light', !isDark);
  btnTheme.classList.toggle('dark', isDark);

  if(iconTheme){
    iconTheme.src = isDark ? '/assets/images/icon-sun.svg' : '/assets/images/icon-moon.svg';
  }

  title.classList.toggle('dark', isDark);
  title.classList.toggle('light', !isDark);

  fillAll.classList.toggle('dark', isDark);
  fillAll.classList.toggle('light', !isDark);

  fillActives.classList.toggle('dark', isDark);
  fillActives.classList.toggle('light', !isDark);

  fillInactive.classList.toggle('dark', isDark);
  fillInactive.classList.toggle('light', !isDark);

  const card = document.querySelectorAll('.card');
  card.forEach(car => {
    car.classList.toggle('dark', isDark);
    car.classList.toggle('light', !isDark);
  })

  const cardTitle = document.querySelectorAll('.title__card');
  cardTitle.forEach(cardsTitle =>{
    cardsTitle.classList.toggle('dark', isDark);
    cardsTitle.classList.toggle('light', !isDark);
  })

  const descriptionCard = document.querySelectorAll('.description__card');
  descriptionCard.forEach(description => {
    description.classList.toggle('dark', isDark);
    description.classList.toggle('light', !isDark);
  })

  const btnDelete = document.querySelectorAll('.btn__delete');
  btnDelete.forEach(btnsDelete => {
    btnsDelete.classList.toggle('dark', isDark);
    btnsDelete.classList.toggle('light', !isDark);
  })


}


btnTheme.addEventListener('click', toggleTheme);
