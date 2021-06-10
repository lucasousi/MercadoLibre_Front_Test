import Metrics from './metric.model';
import { Transactions } from './transaction.model';

export default interface Seller {
	id: number;
	permalink: string;
	registration_date: string;
	car_dealer: boolean;
	real_estate_agency: boolean;
	tags: string[];
	seller_reputation: SellerReputation;
}
interface SellerReputation {
	transactions: Transactions;
	power_seller_status: string;
	metrics: Metrics;
	protection_end_date: string;
	real_level: string;
	level_id: string;
}
