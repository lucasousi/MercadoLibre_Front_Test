import Ratings from './ratings.model';

export interface Transactions {
	total: number;
	canceled: number;
	period: string;
	ratings: Ratings;
	completed: number;
}
