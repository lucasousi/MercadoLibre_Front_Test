import { FirebaseException, FirebaseExceptions } from '../models/firebase.model';
import { HTTPResponseError, HTTPStatusCode } from '../models/response.model';

export function isFirebaseException(ex: any) {
	return !!(ex?.code && ex?.message);
}

export function isHTTPResponseError(ex: any) {
	return !!ex?.msg;
}

export function handleRequestException(
	ex: HTTPResponseError | FirebaseExceptions | any,
) {
	if (isFirebaseException(ex)) {
		const _ex = ex as FirebaseException;
		return handleFirebaseRequestException(_ex);
	} else if (isHTTPResponseError(ex)) {
		const _ex = ex as HTTPResponseError;
		return { msg: _ex.msg } as HTTPResponseError;
	} else {
		return { msg: ex } as HTTPResponseError;
	}
}

export function handleFirebaseRequestException(ex: FirebaseException) {
	switch (ex.code) {
		case FirebaseExceptions.InvalidEmail:
			return {
				status: HTTPStatusCode.BAD_REQUEST,
				msg: 'O e-mail está em formato inválido.',
			} as HTTPResponseError;

		case FirebaseExceptions.UserNotFound:
		case FirebaseExceptions.WrongPassword:
			return {
				status: HTTPStatusCode.UNAUTHORIZED,
				msg: 'Credenciais inválidas.',
			} as HTTPResponseError;

		default:
			return {
				status: HTTPStatusCode.UNAUTHORIZED,
				msg: ex.message,
			} as HTTPResponseError;
	}
}
