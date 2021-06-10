import 'firebase/auth';

import firebaseClient from 'firebase';
import firebaseAdmin from 'firebase-admin';

import { firebaseConfig } from '../config/config';

export function firebaseInitialize() {
	firebaseClient.initializeApp(firebaseConfig);
	firebaseAdmin.initializeApp(firebaseConfig);
}

export { firebaseClient, firebaseAdmin };
