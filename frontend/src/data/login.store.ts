import { StorageItems } from 'src/models/store.model';
import User from 'src/models/user.model';

import userStore from './user.store';

function handleLogin(user: User) {
	userStore.update(user);
}

function handleLogout() {
	localStorage.clear();
	userStore.resetState();
}

function isAuthenticated() {
	const _uid = localStorage.getItem(StorageItems.Uid);
	const _username = localStorage.getItem(StorageItems.Email);
	const _accessToken = localStorage.getItem(StorageItems.AccessToken);
	const _refreshToken = localStorage.getItem(StorageItems.RefreshToken);

	return !!_uid && !!_username && !!_accessToken && !!_refreshToken;
}

const loginStore = {
	login: (user: User) => handleLogin(user),
	logout: () => handleLogout(),
	isAuthenticatedSync: () => isAuthenticated(),
};

export default loginStore;
