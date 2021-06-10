import { GetProductParams, GetProductResponseBody } from 'src/models/product.model';

import API from './service';

export default function useProductService() {
	const base_path = '/search/products';
	async function getProducts(params: GetProductParams) {
		const response = await API.get<GetProductParams, GetProductResponseBody>(
			`${base_path}`,
			params,
		);

		return response;
	}

	return { getProducts };
}
