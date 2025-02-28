/* РЕАЛИЗУЕТ ОТКРЫТИЕ МЕНЮ В МОБИЛЬНОЙ ВЕРСИИ */
const mainNav = document.querySelector('.nav');
const burger = document.querySelector('.button-burger');

mainNav.classList.remove('nav--opened');
mainNav.classList.add('nav--closed');

burger.addEventListener('click', ()=> {
  if (mainNav.classList.contains('nav--opened')) {
    burger.classList.remove('button-burger--opened');
    burger.classList.add('button-burger--closed');
    mainNav.classList.remove('nav--opened');
    mainNav.classList.add('nav--closed');
  } else {
    burger.classList.add('button-burger--opened');
    burger.classList.remove('button-burger--closed');
    mainNav.classList.add('nav--opened');
    mainNav.classList.remove('nav--closed');
  }
});

/* РЕАЛИЗУЕТ ПЕРЕКЛЮЧЕНИЕ СЛАЙДОВ ПО КНОПКАМ С ГАЛОЧКАМИ И ДИНАМИЧЕСКИЙ ФОН*/
const sliderSection = document.querySelector('.slider');
const cards = document.querySelectorAll('.card');
const prevButton = document.querySelector('.slider__button--prev');
const nextButton = document.querySelector('.slider__button--next');
const stepButton = document.querySelector('.slider__button-step');

let currentCard = 0;

function showCard(index) {
    cards.forEach((card, i) => {
        card.classList.toggle('card--current', i === index);
    });

    const bgType = cards[index].getAttribute('data-bg');
    sliderSection.className = `slider slider--${bgType}`;
    stepButton.className = `slider__button-step slider__button-step--${bgType}`;

    currentCard = index;

    prevButton.disabled = index === 0;
    nextButton.disabled = index === cards.length - 1;
}

prevButton.addEventListener('click', () => {
    if (currentCard > 0) {
        currentCard--;
        showCard(currentCard);
    }
});

nextButton.addEventListener('click', () => {
    if (currentCard < cards.length - 1) {
        currentCard++;
        showCard(currentCard);
    }
});

showCard(currentCard);

/* ОТКРЫВАЕТ SELECT*/
const selectButton = document.querySelector('.products__select-button');
const selectList = document.querySelector('.products__select-list');
const selectItem = document.querySelector('.products__select-item');

selectList.classList.remove('products__select-list--opened');
selectList.classList.add('products__select-list--default');

selectButton.addEventListener('click', ()=> {
  if (selectList.classList.contains('products__select-list--default')) {
    selectButton.classList.remove('products__select-button--default');
    selectButton.classList.add('products__select-button--pressed');
    selectList.classList.remove('products__select-list--default');
    selectList.classList.add('products__select-list--opened');
  } else {
    selectButton.classList.add('products__select-button--default');
    selectButton.classList.remove('products__select-button--pressed');
    selectList.classList.add('products__select-list--default');
    selectList.classList.remove('products__select-list--opened');
  }
})

selectList.addEventListener('click', function(event) {
  if (event.target.tagName === 'LI') {
    selectButton.textContent = event.target.textContent;
    selectItem.style.width = selectButton.style.width;
  }
})

/* noUiSlider */
const rangeSlider = document.querySelector('.range__slider');
const rangeInputs = document.querySelectorAll('.range__input');
const form = document.querySelector('.catalog__form');

noUiSlider.create(rangeSlider, {
  start: [0, 900],
  connect: true,
  cssPrefix: 'range__',
  range: {
    min: 0,
    max: 1000,
  },
  step: 10,
  handleAttributes: [{ 'aria-label': 'Меньше' }, { 'aria-label': 'Больше' }],
  animate: false,
});

rangeSlider.noUiSlider.on('slide', (values, handle) => {
  rangeInputs[handle].value = Math.round(values[handle]);
});

rangeInputs.forEach((input, index) => {
  const values = [];
  input.addEventListener('change', (evt) => {
    values[index] = evt.target.value;
    rangeSlider.noUiSlider.set(values);
  });
});

form.addEventListener('reset', () => rangeSlider.noUiSlider.set([0, 900]));

// /* ПОПЫТКА РЕАЛИЗАЦИИ ПЕРЕКЛЮЧЕНИЯ СЛАЙДОВ ПО КНОПКАМ ПАГИНАЦИИ DESKTOP*/
// document.addEventListener('DOMContentLoaded', function() {
//   const cards = document.querySelectorAll('.card');
//   const stepButtons = document.querySelectorAll('.slider__button-step');

//   function switchCard(index) {
//     cards.forEach(card => {
//       card.style.display = 'none';
//     });
//     cards[index].style.display = 'block';

//     buttons.forEach(button => {
//       button.style.backgroundColor = '';
//     });

//     stepButtons[index].style.backgroundColor = '#7859cf';
//   }

//   stepButtons.forEach((button, index) => {
//     button.addEventListener('click', () => {
//       switchSlide(index);
//     });
//   });

//   switchCard(0);
// });
