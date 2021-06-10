import axios from 'axios';

import { GetProductParams } from '../models/product.model';

export function getProducts(params: GetProductParams) {
	return axios.get('https://api.mercadolibre.com/sites/MLA/search', {
		params: params,
	});
}
