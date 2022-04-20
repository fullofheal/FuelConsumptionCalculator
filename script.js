const IDs = {
    INPUT_CMP: 'consumption',
    INPUT_DIS: 'distance',
    INPUT_VOL: 'volume',
    INPUT_PRC: 'price'
};
const keys = {
    cmp: 'consumption',
    vol: 'volume',
    prc: 'price',
    dis: 'distance'
};



function displayRes(id, value) {
    const total2 = document.getElementById(id);
    if (value) {
        total2.querySelector('span').innerText = value;
        total2.classList.remove('hidden'); 
    } else {
        total2.classList.add('hidden'); 
    }
}

function setInputValue(id, value) {
    const f = document.getElementById(id);
    if (value) {
        f.value = value;
    }
}

function getInputValue(id) {
    const el = document.getElementById(id);
    return el.value;
}

function localStorageSave(consumption, volume, price, distance) {
    if(consumption) {
        localStorage.setItem(keys.cmp, consumption);
    }
    if(volume) {
        localStorage.setItem(keys.vol, volume);
    }
    if(price) {
        localStorage.setItem(keys.prc, price);
    }
    if(distance) {
        localStorage.setItem(keys.dis, distance);
    }
}

function localStorageRestore() {
    const c = localStorage.getItem(keys.cmp);
    const v = localStorage.getItem(keys.vol);
    const p = localStorage.getItem(keys.prc);
    const d = localStorage.getItem(keys.dis);
    setInputValue(IDs.INPUT_CMP, c);
    setInputValue(IDs.INPUT_VOL, v);
    setInputValue(IDs.INPUT_PRC, p);
    setInputValue(IDs.INPUT_DIS, d);
}

function calculate() {
    const consumption = getInputValue(IDs.INPUT_CMP);
    const price = getInputValue(IDs.INPUT_PRC);
    const distance = getInputValue(IDs.INPUT_DIS);
    const volume = getInputValue(IDs.INPUT_VOL);

    if (!consumption || !distance) {
        return;
    } 

    const litres = (distance / 100) * consumption;

    localStorageSave(consumption, volume, price, distance);
    

    let total;
    let ref;

    if(price) {
        total = litres * price;
    }

    if(volume) {
        ref = Math.round(litres / volume)+1;
    }

    const res = document.getElementsByClassName('results');
    if (res.length>0) {
        res[0].classList.remove('hidden');
    }

    displayRes('litres-value', litres);
    displayRes('ref-value', ref);
    displayRes('price-value', total);

    console.log(litres, total, ref);
} 

function clearing() {
    localStorage.clear();
    const res = document.querySelector('.results');
    res.classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('calc-form');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        calculate();
    });

    localStorageRestore();
    calculate();

    form.addEventListener('reset', () => {
        clearing();
    });
});