// Переменные, нужные для работы функционала

// элементы формы расчета
const fromInput = document.getElementById('from');
const toInput = document.getElementById('to');
const calcButton = document.getElementById('calc');
const submitButton = document.getElementById('submit');

// элементы в расчетах
const distanceValue = document.getElementById('distanceValue');
const durationValue = document.getElementById('durationValue');
const rateValue = document.getElementById('rateValue');
const totalValue = document.getElementById('totalValue');

// элементы формы заявки
const orderForm = document.getElementById('orderForm');
const nameInput = document.getElementById('customerName');
const phoneInput = document.getElementById('customerPhone');
const commentInput = document.getElementById('comment');
const orderSuccessBlock = document.getElementById('orderSuccess');
const orderIdValue = document.getElementById('orderId');

// Элементы карточек размеров
const sizes = document.querySelectorAll('.main-size-card');

// Переменные для карты, маршрута и расчетов
let map;
let mapRoute;
let calculation;

// Ставка за км для расчета стоимости в зависимости от размера посылки
const RATES = { xs: 9, s: 13, m: 20, l: 27, xl: 35, max: 70 };
// Минимальные тарифы стоимости в зависимости от размера посылки
const MIN_BY_SIZE = { xs: 149, s: 199, m: 249, l: 349, xl: 499, max: 999 };

// Запускаем стартовый функционал работы карт
ymaps.ready(() => {
    // Создаем карту с центром в Москве.
    map = new ymaps.Map('map', {
        center: [55.751244, 37.618423],
        zoom: 5,
        controls: ['zoomControl']
    });
    // Подключаем подсказки адресов к полям от яндекса
    new ymaps.SuggestView('from');
    new ymaps.SuggestView('to');

    // Логика выбора размера посылки
    sizes.forEach(element => {
        element.addEventListener('click', () => {
            sizes.forEach((c) => c.classList.toggle('is-active', c.dataset.value === element.dataset.value));
        })
    });

    // Дизейблим кнопку Рассчитать если одного или двух значений нет
    [fromInput, toInput].forEach((input) => {
        input.addEventListener('change', () => {
            calcButton.disabled = !(fromInput.value && toInput.value);
        });
    });
});

