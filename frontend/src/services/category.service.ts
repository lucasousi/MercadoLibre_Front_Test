import IDNamePair from 'src/models/id-name-pair.model';

import API from './service';

export default function useCategoryService() {
	const base_path = '/search/categories';
	async function getCategories() {
		const response = await API.get<null, IDNamePair[]>(`${base_path}`);

		return response;
	}

	return { getCategories };
}
