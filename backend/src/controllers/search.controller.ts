import { Request, Response } from 'express';

import IDNamePair from '../models/id-name-pair.model';
import { GetProductParams, GetProductResponseBody } from '../models/product.model';
import HTTPResponse from '../models/response.model';
import { getAllCategories } from '../services/categories.service';
import { handleRequestException } from '../services/exception.service';
import { getProducts } from '../services/products.service';

class SearchController {
	async searchProduct(
		req: Request<
			GetProductParams,
			HTTPResponse<GetProductResponseBody>,
			null,
			GetProductParams
		>,
		res: Response<HTTPResponse<GetProductResponseBody>>,
	) {
		let request = await getProducts(req.query || req.params);
		let response = new HTTPResponse<GetProductResponseBody>();
		try {
			response.data = request.data;
			res.send(response.toJSON());
		} catch (ex: any) {
			const { status, msg } = handleRequestException(ex);
			response.errors = [{ msg: msg }];
			res.status(status || 400).send(response.toJSON());
		}
	}

	async getCategories(
		req: Request<null, HTTPResponse<IDNamePair[]>, null, null>,
		res: Response<HTTPResponse<IDNamePair[]>>,
	) {
		let request = await getAllCategories();
		let response = new HTTPResponse<IDNamePair[]>();
		try {
			response.data = request.data;
			res.send(response.toJSON());
		} catch (ex: any) {
			const { status, msg } = handleRequestException(ex);
			response.errors = [{ msg: msg }];
			res.status(status || 400).send(response.toJSON());
		}
	}
}

export default SearchController;
