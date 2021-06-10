import axios from 'axios';

export function getAllCategories() {
	return axios.get('https://api.mercadolibre.com/sites/MLA/categories');
}
