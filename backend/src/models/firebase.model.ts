export enum FirebaseExceptions {
	ArgumentError = 'auth/argument-error',
	InvalidEmail = 'auth/invalid-email',
	UserNotFound = 'auth/user-not-found',
	WrongPassword = 'auth/wrong-password',
}

export interface FirebaseException {
	code: string;
	message: string;
}

export interface FirebaseConfig {
	apiKey: string;
	authDomain: string;
	projectId: string;
	storageBucket: string;
	messagingSenderId: string;
	appId: string;
}
