import loginStore from 'src/data/login.store';
import { LoginRequest } from 'src/models/login.model';
import User from 'src/models/user.model';

import API from './service';

export default function useLoginService() {
	const base_path = '/auth';
	async function postLogin(username: string, password: string) {
		const response = await API.post<LoginRequest, User>(`${base_path}/login`, {
			username: username,
			password: password,
		});

		const { data } = response.data;
		loginStore.login(data);
		return response;
	}

	function isAuthenticatedSync() {
		return loginStore.isAuthenticatedSync();
	}

	async function postLogout() {
		try {
			const response = await API.post(`${base_path}/logout`, {});
			loginStore.logout();
			return response;
		} catch (ex) {
			console.log(ex);
		}
	}

	return { postLogin, isAuthenticatedSync, postLogout };
}
