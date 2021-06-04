function calculationTaxAnnualIncomeCategory(arr, gross) {
    let tempGross = gross
    let totalTaxAnnualIncome = 0
    for (let el of arr) {
        let isMorethan = false
        if(el.max == "~") isMorethan = true
        if(tempGross >= el.min && tempGross >= el.max) {
            totalTaxAnnualIncome += (el.max * (el.rate / 100))
            tempGross = tempGross - el.max
        } else if (tempGross >= el.min && tempGross <= el.max || (isMorethan && (tempGross >= el.min || tempGross <= el.min))) {
            totalTaxAnnualIncome += (tempGross * (el.rate / 100))
            tempGross = tempGross - tempGross

        }
        if(tempGross <= 0) break
    };
    return totalTaxAnnualIncome
}

function calculatePPH (gross,marital,dependants) {
    let typeTaxRelief = ''
    let taxReliefCategory = [
        {type:"TK0", value:"54000000"},
        {type:"K0", value:"58500000"},
        {type:"K1", value:"63000000"},
        {type:"K2", value:"67500000"},
        {type:"K3", value:"72000000"}
    ]
    let taxAnnualIncomeCategory = [
        {rate:"5", min:"0", max:"50000000"},
        {rate:"15", min:"50000000", max:"250000000"},
        {rate:"25", min:"250000000", max:"500000000"},
        {rate:"30", min:"500000000", max:"~"},
    ]
    switch (marital) {
        case 'married':
            typeTaxRelief = `K${dependants}`
            break;
    
        default:
            typeTaxRelief = `TK${dependants}`
            break;
    }

    if(typeTaxRelief != '') {
        let getTypeTaxRelief = taxReliefCategory.find( value => typeTaxRelief == value.type)
        let annualTaxableIncome = gross - getTypeTaxRelief.value
        if(annualTaxableIncome < 0) return '0'
        let totalPPh = calculationTaxAnnualIncomeCategory(taxAnnualIncomeCategory, annualTaxableIncome)
        return totalPPh
    }
}
