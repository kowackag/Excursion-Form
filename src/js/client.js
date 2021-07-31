import './../css/client.css';

import ExcursionsAPI from './ExcursionsAPI';
const excursions = new ExcursionsAPI();

document.addEventListener('DOMContentLoaded', init);
const ulEl = document.querySelector('.excursions');
const prototypeExcursion = document.querySelector('.excursions__item--prototype');
const summaryEl = document.querySelector('.summary');
const prototypeOrder = document.querySelector('.summary__item--prototype')


function init() {
    loadExcursions();
    addExcursionToBasket();
    loadBasket(); //Czy nie powinnam dodać ładowania z orders z excursion.json?? czy zostawić tylko ładowanie do koszyka na event "submit" ??
    removeFromBasket();
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
            name,
            adultsPrice,
            adultsNumber,
            childrenPrice,
            childrenNumber
        } = getExcursionData(e.target);
        const data = {
            name,
            adultsPrice,
            adultsNumber,
            childrenPrice,
            childrenNumber
        }
        if (checkNumbers(adultsNumber, childrenNumber)) {
            removeIfInBasket(name);
            excursions.addOrders(data)
                .catch(err => console.error(err))
                .finally(() => loadBasket());
        }
    })
}

function loadBasket() {
    excursions.loadOrders()
        .then(data => showExcursionInBasket(data))
        .catch(err => console.error(err))
}

function showExcursionInBasket(data) {
    summaryEl.innerHTML = '';
    data.forEach(element => {
        const newOrderEl = prepareOrderEl(element);
        summaryEl.appendChild(newOrderEl);
    })
}

function removeFromBasket() {
    summaryEl.addEventListener('click', e => {
        e.preventDefault();
        if (e.target.tagName === 'A') {
            const currentLiEl = e.target.parentElement.parentElement;
            console.log(currentLiEl.dataset.id);
            excursions.removeOrders(currentLiEl.dataset.id)
                .catch(err => console.error(err))
                .finally(() => loadBasket());
            // countOrderTotalPrice();
        }
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

function getExcursionData(item) {
    const {
        adults,
        children
    } = item.elements;
    const name = item.previousElementSibling.querySelector('.excursions__title').innerText;
    const adultsPrice = Number(item.adults.parentElement.querySelector('.excursions__field-price').innerText);
    const childrenPrice = Number(item.children.parentElement.querySelector('.excursions__field-price').innerText);
    const adultsNumber = Number(adults.value);
    const childrenNumber = Number(children.value);
    return {
        name,
        adultsPrice,
        adultsNumber,
        childrenPrice,
        childrenNumber
    }
}

function removeIfInBasket(name) {
    excursions.loadOrders()
        .then(data => data.forEach(element => {
            if (name === element.name) {
                excursions.removeOrders(element.id);
            }
        }))
        .catch(err => console.error(err))
}

function prepareOrderEl(element) {
    const newLiEl = prototypeOrder.cloneNode(true);
    newLiEl.classList.remove('summary__item--prototype');
    const titleEl = newLiEl.querySelector('.summary__name');
    const summaryTotalPriceEl = newLiEl.querySelector('.summary__total-price');
    const paragrafEl = newLiEl.querySelector('.summary__prices');
    newLiEl.dataset.id = element.id;
    titleEl.innerText = element.name;
    summaryTotalPriceEl.innerText = `${element.adultsPrice*element.adultsNumber + element.childrenPrice*element.childrenNumber}PLN`;
    paragrafEl.innerText = `${ element.adultsNumber === 0 ? '' : 'dorośli: ' + element.adultsNumber + ' x ' + element.adultsPrice + 'PLN'} ${element.adultsNumber!== 0 && element.childrenNumber !== 0 ? ',':''} ${ element.childrenNumber === 0 ? '' : 'dzieci: ' + element.childrenNumber + ' x ' + element.childrenPrice + 'PLN'}`;
    return newLiEl;
}

// ----------WALIDACJA DANYCH ----------

function checkNumbers(num1, num2) {
    const errors = []
    if (Number.isNaN(num1) || Number.isNaN(num2) || num1 < 0 || num2 < 0) {
        errors.push('Podano błednie liczbę uczestników');
    } else if (num1 === 0 && num2 === 0) {
        errors.push('Podaj liczbę uczestników wycieczki');
    }
    if (errors.length > 0) {
        showErrors(errors);
    }
    return errors.length > 0 ? false : true;
}

function showErrors(err) {
    let txt = ``;
    err.forEach(function (item) {
        txt += `${item} \n`;
    })
    alert(`${txt}`);
}