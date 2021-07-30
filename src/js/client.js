import './../css/client.css';

import ExcursionsAPI from './ExcursionsAPI';
const excursions = new ExcursionsAPI();

document.addEventListener('DOMContentLoaded', init);
const prototypeExcursion = document.querySelector('.excursions__item--prototype');
const ulEl = document.querySelector('.excursions');
const prototypeOrder = document.querySelector('.summary__item--prototype')


function init() {
    loadExcursions();
    addExcursionToBasket();
    // isInBasket('Warszawa');
}

function loadExcursions() {
    excursions.loadData()
        .then(data => insertExcursions(data))
        .catch(err => console.error(err))
}

function insertExcursions(data) {
    ulEl.innerHTML = '';
    data.forEach(element => {
        const newLiEl = createLiEl(element);
        ulEl.appendChild(newLiEl);
    })
}

function addExcursionToBasket() {
    ulEl.addEventListener('submit', e => {
        e.preventDefault();
        const {
            adults,
            children
        } = e.target.elements;
        const name = e.target.previousElementSibling.querySelector('.excursions__title').innerText;
        const adultsPrice = e.target.adults.parentElement.querySelector('.excursions__field-price').innerText;
        const childrenPrice = e.target.children.parentElement.querySelector('.excursions__field-price').innerText;
        const data = {
            name,
            adultsPrice,
            adultsNumber: adults.value,
            childrenPrice,
            childrenNumber: children.value
        }
        removeIfInBasket(name);
        excursions.addToBasket(data)
            .catch(err => console.error(err))
            .finally(() => loadBasket());
    })
}

function loadBasket() {
    excursions.loadOrders()
        .then(data => insertOrders(data))
        .catch(err => console.error(err))
}

function insertOrders(data) {
    const summaryEl = document.querySelector('.summary');
    data.forEach(element => {
        const newOrderEl = createNewOrderEl(element);
        summaryEl.appendChild(newOrderEl);
    })
}

// ------------------------------------------------------------

function createLiEl(element) {
    const newLiEl = prototypeExcursion.cloneNode(true);
    newLiEl.dataset.id = element.id;
    const titleEl = newLiEl.querySelector('.excursions__title');
    titleEl.innerText = element.name;
    const descriptionEl = newLiEl.querySelector('.excursions__description');
    descriptionEl.innerText = element.description;
    newLiEl.classList.remove('excursions__item--prototype');
    const fieldList = newLiEl.querySelectorAll('.excursions__field-price');
    fieldList[0].innerText = element.adultsPrice;
    fieldList[1].innerText = element.childrenPrice;
    return newLiEl;
}

function removeIfInBasket(name) {
    excursions.loadOrders()
        .then(data => data.forEach(element => {
            if (name === element.name) {
                excursions.removeFromBasket(element.id);
            }
        }))
        .catch(err => console.error(err))
}

function createNewOrderEl(element) {
    const newOrderEl = prototypeOrder.cloneNode(true);




}