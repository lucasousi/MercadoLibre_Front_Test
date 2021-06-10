import { NextFunction, Request, Response } from 'express';

import HTTPResponse, { HTTPResponseError } from '../models/response.model';
import { firebaseAdmin } from '../services/firebase.service';

export async function checkToken(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	let response = new HTTPResponse();
	const authToken = req.headers.authorization;
	if (authToken?.length) {
		const jwtToken = authToken.split(' ').pop();
		try {
			await firebaseAdmin.auth().verifyIdToken(jwtToken);
			next();
		} catch (error: any) {
			res.status(401).send(error);
			return;
		}
	} else {
		const error = {
			msg: 'Usuário sem autorização de acesso.',
		} as HTTPResponseError;
		response.errors = [error];
		res.status(401).send(response);
		return;
	}
}
