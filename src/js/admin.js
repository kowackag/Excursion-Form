import './../css/admin.css';

import ExcursionsAPI from './ExcursionsAPI';


document.addEventListener('DOMContentLoaded', init);

function init() {
    console.log('admin');
    // const api = new API();
    const excursions = new ExcursionsAPI();
    excursions.loadData();

    excursions.addData();
    // excursions.insertData();
    // excursions.remove();
    // excursions.add();
    // excursions.update();
}