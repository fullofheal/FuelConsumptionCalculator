function displayRes(id, value) {
    const total2 = document.getElementById(id);
    if (value) {
        total2.querySelector('span').innerText = value;
        total2.classList.remove('hidden'); 
    } else {
        total2.classList.add('hidden'); 
    }
}

function getInputValue(id) {
    const el = document.getElementById(id);
    return el.value;
}

function calculate() {
    const consumption = getInputValue('consumption');
    const price = getInputValue('price');
    const distance = getInputValue('distance');
    const volume = getInputValue('volume');
    const litres = (distance / 100) * consumption;
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

document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('calc-form');
    console.log(form);


    form.addEventListener('submit', (event) => {
        event.preventDefault();
        calculate();
    });
});