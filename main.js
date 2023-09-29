const dropdowns = document.querySelectorAll('.amount select')
const getRateBtn = document.querySelector('.get-rate-button')
const indicativeExRate = document.querySelector('.ex-rate')
const swapBtn = document.querySelector('.swap-button')
const inputCurrency = document.getElementById('inputCurrency')
const outputCurrency = document.getElementById('outputCurrency')
const inputAmount = document.getElementById('inputAmount')
const outputAmount = document.getElementById('outputAmount')

const loadFlag = target => {
	for (currency_code in country_codes) {
		if (currency_code === target.value) {
			const img = target.parentElement.querySelector('img')
			img.src = `https://hatscripts.github.io/circle-flags/flags/${country_codes[
				currency_code
			].toLowerCase()}.svg`
		}
	}
}

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

	element.addEventListener('change', e => loadFlag(e.target))
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

const swapCurrencies = () => {
	const temp = inputCurrency.value
	inputCurrency.value = outputCurrency.value
	outputCurrency.value = temp
	loadFlag(inputCurrency)
	loadFlag(outputCurrency)
	getExchangeRate()
}

swapBtn.addEventListener('click', swapCurrencies)
