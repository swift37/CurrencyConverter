const dropdowns = document.querySelectorAll('.amount select')

for (let i = 0; i < dropdowns.length; i++) {
	for (currency_code in country_codes) {
		let selected
		if (i === 0) selected = currency_code === 'USD' ? 'selected' : ''
		else if (i === 1) selected = currency_code === 'EUR' ? 'selected' : ''

		let option = `<option value="${currency_code}" ${selected}>${currency_code}</option>`
		dropdowns[i].insertAdjacentHTML('beforeend', option)
	}
}
