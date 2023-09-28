const dropdowns = document.querySelectorAll('.amount select')
const getRateBtn = document.querySelector('.get-rate-button')
const indicativeExRate = document.querySelector('.ex-rate')
const inputCurrency = document.getElementById('inputCurrency')
const outputCurrency = document.getElementById('outputCurrency')
const inputAmount = document.getElementById('inputAmount')
const outputAmount = document.getElementById('outputAmount')

dropdowns.forEach(element => {
	for (currency_code in country_codes) {
		let selected
		if (element.id === 'inputCurrency')
			selected = currency_code === 'USD' ? 'selected' : ''
		else if (element.id === 'outputCurrency')
			selected = currency_code === 'EUR' ? 'selected' : ''

		let option = `<option value="${currency_code}" ${selected}>${currency_code}</option>`
		element.insertAdjacentHTML('beforeend', option)
	}
})

const getExchangeRate = () => {
	if (!inputAmount.value || inputAmount.value <= 0) inputAmount.value = 1
	const amountVal = inputAmount.value

	indicativeExRate.textContent = 'Getting Exchange Rate...'
	let url = `https://v6.exchangerate-api.com/v6/abaf88bd63cbc4e4767ed557/latest/${inputCurrency.value}`
	fetch(url)
		.then(response => response.json())
		.then(result => {
			const exchangeRate = result.conversion_rates[outputCurrency.value]
			outputAmount.value = (inputAmount.value * exchangeRate).toFixed(2)
			indicativeExRate.textContent = `1 ${
				inputCurrency.value
			} = ${exchangeRate.toFixed(2)} ${outputCurrency.value}`
		})
		.catch(error => console.log(error))
}

window.addEventListener('load', getExchangeRate)

getRateBtn.addEventListener('click', e => {
	e.preventDefault()
	getExchangeRate()
})
