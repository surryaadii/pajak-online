const maritalStatusEle = document.querySelector('#marital_status')
const dependantEle = document.querySelector('.dependant-number')
const grossAmountInputEle = document.querySelector('#gross_amount')
const maritalStatusInputEle = document.querySelector('#marital_status')
const dependantInputEle = document.querySelector('#dependant_number')
const resultPphEle = document.querySelector('.result-pph')
const formEle = document.querySelector('form');
maritalStatusEle.addEventListener('change', (e) => {
    if(e.target.value == 'married') {
        dependantEle.classList.remove('hidden')
        dependantInputEle.disabled = false
    } else {
        dependantEle.classList.add('hidden')
        dependantInputEle.disabled = true
    }
})

function formatPrice(value) {
    let val = (value / 1).toFixed(0).replace('.', ',')
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")+` IDR`
}

document.getElementById('button-submit').addEventListener('click', (e) => {
    let totalPPH = calculatePPH(grossAmountInputEle.value, maritalStatusInputEle.value, dependantInputEle.value)
    resultPphEle.innerHTML = formatPrice(totalPPH)
})