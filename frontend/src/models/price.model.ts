import Conditions from './conditions.model';
import Metadata from './metadata.mode';

export default interface Price {
	id: string;
	type: string;
	conditions: Conditions;
	amount: number;
	regular_amount?: number;
	currency_id: string;
	exchange_rate_context: string;
	metadata: Metadata;
	last_updated: string;
}
