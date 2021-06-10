import { Request, Response } from 'express';

import { PostLoginhResponseBody, PostLoginRequestBody } from '../models/auth.model';
import HTTPResponse, { HTTPResponseError } from '../models/response.model';
import { isValidCredentials, loginWithFirebase } from '../services/auth.service';
import { handleRequestException } from '../services/exception.service';

class AuthController {
	async login(
		req: Request<
			null,
			HTTPResponse<PostLoginhResponseBody>,
			PostLoginRequestBody
		>,
		res: Response<HTTPResponse<PostLoginhResponseBody>>,
	) {
		let response = new HTTPResponse<PostLoginhResponseBody>();
		try {
			let { username, password } = req.body as PostLoginRequestBody;

			if (isValidCredentials(username, password)) {
				const firebaseAuthResponse = await loginWithFirebase(
					username,
					password,
				);
				const { user } = firebaseAuthResponse;
				const accessToken = await user.getIdToken();
				const refreshToken = user.refreshToken;
				const authResponse = new PostLoginhResponseBody(
					user.uid,
					user.email,
					accessToken,
					refreshToken,
				).toJSON();
				response.data = authResponse;
				res.send(response.toJSON());
			} else {
				throw {
					msg: 'As credenciais não foram preenchidas corretamente.',
				} as HTTPResponseError;
			}
		} catch (ex: HTTPResponseError | any) {
			const { status, msg } = handleRequestException(ex);
			response.errors = [{ msg: msg }];
			res.status(status || 400).send(response.toJSON());
		}
	}
}

export default AuthController;
