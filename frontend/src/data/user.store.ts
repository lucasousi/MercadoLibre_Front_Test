import { StorageItems } from 'src/models/store.model';
import User from 'src/models/user.model';

function setUserCredentials(user: User) {
	const { uid, email, accessToken, refreshToken } = user;
	localStorage.setItem(StorageItems.Uid, uid);
	localStorage.setItem(StorageItems.Email, email);
	localStorage.setItem(StorageItems.AccessToken, accessToken);
	localStorage.setItem(StorageItems.RefreshToken, refreshToken);
}

function getUserCredentials() {
	const _uid = localStorage.getItem(StorageItems.Uid);
	const _email = localStorage.getItem(StorageItems.Email);
	const _accessToken = localStorage.getItem(StorageItems.AccessToken);
	const _refreshToken = localStorage.getItem(StorageItems.RefreshToken);

	return {
		uid: _uid,
		email: _email,
		accessToken: _accessToken,
		refreshToken: _refreshToken,
	} as User;
}

function clearUser() {
	localStorage.removeItem(StorageItems.Uid);
	localStorage.removeItem(StorageItems.Email);
	localStorage.removeItem(StorageItems.AccessToken);
	localStorage.removeItem(StorageItems.RefreshToken);
}

const userStore = {
	update: (user: User) => setUserCredentials(user),
	resetState: () => clearUser(),
	getCurrentStateSync: () => getUserCredentials(),
};

export default userStore;
