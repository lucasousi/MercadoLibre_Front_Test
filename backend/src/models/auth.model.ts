import { HTTPResponseMethods } from './response.model';

export interface PostLoginRequestBody {
	username: string;
	password: string;
}

export class PostLoginhResponseBody
	implements HTTPResponseMethods<PostLoginhResponseBody> {
	private _uid: string;
	private _email: string;
	private _accessToken: string;
	private _refreshToken: string;

	constructor(
		uid: string,
		email: string,
		accessToken: string,
		refreshToken: string,
	) {
		this.uid = uid;
		this.email = email;
		this.accessToken = accessToken;
		this.refreshToken = refreshToken;
	}

	get uid() {
		return this._uid;
	}

	set uid(value: string) {
		this._uid = value;
	}

	get email() {
		return this._email;
	}

	set email(value: string) {
		this._email = value;
	}

	get accessToken() {
		return this._accessToken;
	}

	set accessToken(value: string) {
		this._accessToken = value;
	}

	get refreshToken() {
		return this._refreshToken;
	}

	set refreshToken(value: string) {
		this._refreshToken = value;
	}

	toJSON() {
		return {
			uid: this.uid,
			email: this.email,
			accessToken: this.accessToken,
			refreshToken: this.refreshToken,
		} as PostLoginhResponseBody;
	}
}
