export default function formatMoney(number: number, currency = 'R$') {
    let formated = number.toString().replace(".", ",");
    if (formated.includes(',')) {
        if (formated.lastIndexOf(',') == formated.length - 2) {
            formated += '0'
        } else {
            formated = formated.slice(0, formated.lastIndexOf(',') + 3)
        }
    } else {
        formated += ',00'
    }

    formated = `${currency} ${formated}`;
    return formated;
}