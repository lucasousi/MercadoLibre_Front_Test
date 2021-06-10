import { Observable } from 'rxjs';

export default interface Store<StateType> {
	initialState: StateType | null;
	state$: Observable<StateType>;
	update: (value: StateType) => void;
	resetState: () => void;
	getCurrentState: () => StateType | null;
}

export enum StorageItems {
	Uid = 'uid',
	Email = 'email',
	AccessToken = 'accessToken',
	RefreshToken = 'refreshToken',
	RatedProducts = 'ratedProducts',
	FavoritedProducts = 'favoritedProducts',
}
