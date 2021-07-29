class ExcursionsAPI {
    constructor() {
        this.url = 'http://localhost:3000/excursions';
    }

    loadData() {
        this._fetch()
            .then(data => {
                this.insertData(data);
            })
            .catch(err => console.error(err));
    }
    insertData(data) {
        console.log(data);
        const ulEl = document.querySelector('.excursions');

        data.forEach(element => {
            const newLiEl = this._createLiEl(element);
            ulEl.appendChild(newLiEl);
        })
    }

    addData() {
        const form = document.querySelector('.form');
        form.addEventListener('submit', e => {
            e.preventDefault();
            const {
                name,
                description,
                adultsPrice,
                childrenPrice
            } = e.target.elements;
            console.log(name.value, description.value,
                adultsPrice,
                childrenPrice);
            const data = {
                name: name.value,
                description: description.value,
                adultsPrice: adultsPrice.value,
                childrenPrice: childrenPrice.value
            }
            const options = {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            console.log(data)
            return this._fetch(options)
                .catch(err => console.error(err))
                .finally(() => this.loadData());
        })
    }
    _fetch(options) {
        const url = this.url;
        return fetch(url, options)
            .then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                return Promise.reject(resp);
            });
    }
    _createLiEl(element) {
        const liEl = document.querySelector('.excursions__item');
        const newLiEl = liEl.cloneNode(true);
        newLiEl.dataset.id = element.id;
        const titleEl = newLiEl.querySelector('.excursions__title');
        titleEl.innerText = element.name;
        const descriptionEl = newLiEl.querySelector('.excursions__description');
        descriptionEl.innerText = element.description;
        newLiEl.classList.remove('excursions__item--prototype');
        const fieldList = newLiEl.querySelectorAll('.excursions__field-name');
        fieldList[0].innerHTML = `Dorosły:<strong>${element.adultsPrice}</strong>PLN`;
        fieldList[1].innerHTML = `Dziecko:<strong>${element.childrenPrice}</strong>PLN`
        return newLiEl;
    }
    // _clearElement(element) {
    //     element.innerHTML = '';
    // }
}

export default ExcursionsAPI;