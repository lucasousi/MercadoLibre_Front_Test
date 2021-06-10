export function toTitleCase(word: string) {
	return word
		.toLowerCase()
		.split(' ')
		.map(() => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
}

export function applyMaskMoneyAG(value: number, hiddenSymbol?: boolean) {
	return hiddenSymbol
		? value.toLocaleString('es-ar', {
				style: 'decimal',
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
		  })
		: value.toLocaleString('es-ar', {
				style: 'currency',
				currency: 'ARS',
		  });
}
