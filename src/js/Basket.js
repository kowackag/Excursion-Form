class Basket {
    constructor() {
        this.url = 'http://localhost:3000/basket';
    }
    
    load() {
        return this._fetch()
    }

    addExcursion(data) {
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        return this._fetch(options, '');
    }

    // updateOrders(id, data) { 
    //     const options = {
    //         method: 'PUT',
    //         body: JSON.stringify(data),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     }
    //     return this._fetch(options, `/orders/${id}`);
    // }

    removeExcursion(id) {
        const options = {
            method: 'DELETE'
        };
        // const id
        return this._fetch(options, `/${id}`);
    }

    _fetch(options, additionalPath = '') {
        const url = this.url + additionalPath;
        return fetch(url, options)
            .then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                return Promise.reject(resp);
            });
    }

}

export default Basket;