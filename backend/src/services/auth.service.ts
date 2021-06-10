import { firebaseClient } from './firebase.service';

export function isValidCredentials(username: string, password: string) {
	return username && password && username.length <= 50 && password.length <= 50;
}

export function loginWithFirebase(username: string, password: string) {
	return firebaseClient.auth().signInWithEmailAndPassword(username, password);
}
